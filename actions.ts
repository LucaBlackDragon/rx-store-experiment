export interface Action {
  type: string;
  payload?: any;
}

export const GENERIC_BUTTON_CLICK = "GENERIC_BUTTON_CLICK";
export const RESET_BUTTON_CLICK = "RESET_BUTTON_CLICK";

// Action creators

export const genericButtonClick = (): Action => ({
  type: GENERIC_BUTTON_CLICK
});

export const resetClick = (): Action => ({
  type: RESET_BUTTON_CLICK
});
