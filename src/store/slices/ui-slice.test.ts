import {
  openCommandMenu,
  toggleCommandMenu,
  uiReducer,
} from "@/store/slices/ui-slice";

describe("uiSlice", () => {
  it("opens the command menu", () => {
    const state = uiReducer(undefined, openCommandMenu());

    expect(state.isCommandMenuOpen).toBe(true);
  });

  it("toggles the command menu", () => {
    const initialState = uiReducer(undefined, { type: "unknown" });
    const nextState = uiReducer(initialState, toggleCommandMenu());

    expect(nextState.isCommandMenuOpen).toBe(true);
  });
});
