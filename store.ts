import { BehaviorSubject, Subject } from "rxjs";
import { scan, share, startWith, tap, withLatestFrom } from "rxjs/operators";
import { Action, GENERIC_BUTTON_CLICK, RESET_BUTTON_CLICK } from "./actions";
import { print } from "./utils";

interface State {
  counter: number;
}

const initialState: State = {
  counter: 0
};

// Stream delle azioni
const actions$: Subject<Action> = new Subject();

// Dispatcher
// utilizzato per aggiungere una nuova azione allo stream
const dispatch = (action: Action) => {
  console.log(`[Dispatcher] dispatch ${action.type}`);
  actions$.next(action);
};

// Store "pubblico"
// Utilizzo un BehaviorSubject per "pubblicare" lo stato, in
// modo che chi si sottoscrive riceva subito il valore corrente
// dello store
const store$: Subject<State> = new BehaviorSubject(undefined);

// Root reducer
// produce il nuovo stato a partire dallo stato precedente e
// dall'azione ricevuta (comportamento classico)
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

// Stato dell'applicazione
// ottenuto applicando lo stream delle azioni allo stato iniziale
// e "pubblicato" nel BehaviorSubject precedentemente definito
actions$
  .pipe(
    startWith(initialState),
    scan(rootReducer),
    tap(state => console.log(`[Reducer] new state: ${print(state)}`)),
    share() // protezione contro eventuali subscribe multipli
  )
  // invio il nuovo stato allo store "pubblico"
  .subscribe(state => store$.next(state));

// Log middleware
// questo pattern può essere esteso per implementare effects/sagas/...
actions$
  .pipe(withLatestFrom(store$))
  .subscribe(([action, state]: [Action, State]) => {
    console.log(`[Log MW] action: ${action.type}, state: ${print(state)}`);
  });

export { dispatch, store$ };
