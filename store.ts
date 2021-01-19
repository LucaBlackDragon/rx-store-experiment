import { BehaviorSubject, Subject } from "rxjs";
import { scan, tap, withLatestFrom } from "rxjs/operators";
import { Action, GENERIC_BUTTON_CLICK, RESET_BUTTON_CLICK } from "./actions";
import { print } from "./utils";

interface State {
  counter: number;
}

const initialState: State = {
  counter: 0
};

const actions$: Subject<Action> = new Subject();

const dispatch = (action: Action) => {
  console.log(`[Dispatcher] dispatch ${action.type}`);
  actions$.next(action);
};

// Store
const store$: Subject<State> = new BehaviorSubject(initialState);

// Root reducer
const rootReducer = (state: State, action: Action) => {
  console.log(`[Reducer] state: ${print(state)}, action: ${print(action)}`);
  switch (action.type) {
    default:
      return state;

    case GENERIC_BUTTON_CLICK:
      return {
        ...state,
        counter: state.counter + 1
      };

    case RESET_BUTTON_CLICK:
      return initialState;
  }
};
actions$
  .pipe(
    scan(rootReducer, initialState),
    tap(state => console.log(`[Reducer] new state: ${print(state)}`))
  )
  .subscribe(state => store$.next(state));

// Log middleware
// (the same pattern could be used for effects/sagas/...)
actions$
  .pipe(withLatestFrom(store$))
  .subscribe(([action, state]: [Action, State]) => {
    console.log(`[Log MW] action: ${action.type}, state: ${print(state)}`);
  });

export { State, dispatch, store$ };
