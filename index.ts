import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { dispatch, store$ } from "./store";
import { genericButtonClick, resetClick } from "./actions";

const genericButton = document.querySelector("#generic-btn");
const resetButton = document.querySelector("#reset-btn");
const clicksCounter = document.querySelector("#clicks-counter");

store$.subscribe(state => {
  clicksCounter.innerHTML = state.counter.toString();
});

const reset = () => dispatch(resetClick());

fromEvent(genericButton, "click")
  .pipe(debounceTime(60))
  .subscribe(() => dispatch(genericButtonClick()));

fromEvent(resetButton, "click").subscribe(() => reset());

// needed to initialize/"trigger" the store reducer
reset();
