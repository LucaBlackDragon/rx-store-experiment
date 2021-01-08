import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { dispatch, store$ } from "./store";
import { genericButtonClick, resetClick } from "./actions";

store$.subscribe(state => {
  document.querySelector("#clicks").innerHTML = state.counter.toString();
});

const reset = () => dispatch(resetClick());

fromEvent(document.querySelector("#btn"), "click")
  .pipe(debounceTime(60))
  .subscribe(() => dispatch(genericButtonClick()));

fromEvent(document.querySelector("#reset"), "click").subscribe(() => reset());

// needed to initialize/"trigger" the store reducer
reset();
