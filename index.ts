import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { dispatch, store$ } from "./store";

store$.subscribe(state => {
  document.querySelector("#clicks").innerHTML = state.counter.toString();
});

const incrementClicks = (quantity: number) =>
  dispatch({
    type: "INCREMENT",
    payload: quantity
  });

const reset = () => dispatch({ type: "RESET" });

fromEvent(document.querySelector("#btn"), "click")
  .pipe(debounceTime(60))
  .subscribe(() => incrementClicks(1));

fromEvent(document.querySelector("#reset"), "click").subscribe(() => reset());

// needed to initialize/"trigger" the store reducer
reset();
