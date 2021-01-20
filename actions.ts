// Interfaccia base delle azioni
export interface Action {
  type: string;
  payload?: any;
}

// Costanti che identificano i tipi diversi di azioni
export const GENERIC_BUTTON_CLICK = "GENERIC_BUTTON_CLICK";
export const RESET_BUTTON_CLICK = "RESET_BUTTON_CLICK";

// Esempi di action creators
export const genericButtonClick = (): Action => ({
  type: GENERIC_BUTTON_CLICK
});
export const resetClick = (): Action => ({
  type: RESET_BUTTON_CLICK
});
