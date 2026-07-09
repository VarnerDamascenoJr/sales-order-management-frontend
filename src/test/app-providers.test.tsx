import { screen } from "@testing-library/react";

import { AppProviders } from "@/providers/app-providers";
import { renderWithProviders } from "@/test/test-providers";

describe("AppProviders", () => {
  it("renders nested content with the global provider tree", () => {
    renderWithProviders(
      <AppProviders>
        <span>Infrastructure ready</span>
      </AppProviders>,
    );

    expect(screen.getByText("Infrastructure ready")).toBeInTheDocument();
  });
});
