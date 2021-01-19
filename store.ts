import { BehaviorSubject, Subject } from "rxjs";
import { scan, tap, withLatestFrom } from "rxjs/operators";
import { Action, GENERIC_BUTTON_CLICK, RESET_BUTTON_CLICK } from "./actions";

interface State {
  counter: number;
}

const initialState: State = {
  counter: 0
};

const actions$: Subject<Action> = new Subject();

const dispatch = (action: Action) => {
  console.log(`Dispatching action ${action.type}`);
  actions$.next(action);
};

// Store
const store$: Subject<State> = new BehaviorSubject({ ...initialState });

// Main reducer
actions$
  .pipe(
    scan(
      (acc: State, action: Action) => {
        console.log(`Main reducer:
action: ${action.type}, initial state: ${JSON.stringify(acc)}`);
        switch (action.type) {
          default:
            return acc;

          case GENERIC_BUTTON_CLICK:
            return {
              ...acc,
              counter: acc.counter + 1
            };

          case RESET_BUTTON_CLICK:
            return {
              ...initialState
            };
        }
      },
      { ...initialState }
    ),
    tap(ev =>
      console.log(`Main reducer:
new state: ${JSON.stringify(ev)}`)
    )
  )
  .subscribe(state => store$.next(state));

// Log middleware
// (the same pattern could be used for effects/sagas/...)
actions$
  .pipe(withLatestFrom(store$))
  .subscribe(([action, state]: [Action, State]) => {
    console.log(`Log middleware:
action: ${action.type}, state: ${JSON.stringify(state)}`);
  });

export { State, dispatch, store$ };
