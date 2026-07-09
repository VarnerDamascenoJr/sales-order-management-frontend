import { QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { makeQueryClient } from "@/shared/lib/react-query/query-client";
import { makeStore, type AppStore } from "@/store";

type TestProvidersProps = {
  children: ReactNode;
  store?: AppStore;
};

function TestProviders({ children, store = makeStore() }: TestProvidersProps) {
  const queryClient = makeQueryClient();

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
}

type CustomRenderOptions = Omit<RenderOptions, "wrapper"> & {
  store?: AppStore;
};

export function renderWithProviders(
  ui: ReactElement,
  { store, ...options }: CustomRenderOptions = {},
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders store={store}>{children}</TestProviders>
    ),
    ...options,
  });
}
