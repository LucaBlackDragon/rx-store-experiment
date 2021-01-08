import { Subject } from "rxjs";
import { scan, withLatestFrom } from "rxjs/operators";
import {
  Action,
  GENERIC_BUTTON_CLICK,
  RESET_BUTTON_CLICK
} from "./actions";

interface State {
  counter: number;
}

const initialState: State = {
  counter: 0
};

const actions$ = new Subject();

const dispatch = (action: Action) => actions$.next(action);

const store$ = actions$.pipe(
  scan((acc: State, action: Action) => {
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
  }, initialState)
);

// middleware/effects/sagas/...
actions$
  .pipe(withLatestFrom(store$))
  .subscribe(([action, state]: [Action, State]) => {
    console.log(`action: ${action.type}, state: ${JSON.stringify(state)}`);
  });

export { State, dispatch, store$ };
