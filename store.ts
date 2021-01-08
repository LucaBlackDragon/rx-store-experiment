import { Subject } from "rxjs";
import { scan } from "rxjs/operators";

interface Action {
  type: string;
  payload?: any;
}

interface CounterAction extends Action {
  payload: number;
}

interface State {
  counter: number;
}

const initialState: State = {
  counter: 0
};

const actions$ = new Subject();

const store$ = actions$.pipe(
  scan((acc: State, action: Action) => {
    switch (action.type) {
      default:
        return acc;

      case "INCREMENT":
        return {
          ...acc,
          counter: acc.counter + (action as CounterAction).payload
        };

      case "RESET":
        return {
          ...initialState
        };
    }
  }, initialState)
);

const dispatch = (action: Action) => actions$.next(action);

export { State, Action, CounterAction, dispatch, store$ };
