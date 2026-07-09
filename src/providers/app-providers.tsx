"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { makeQueryClient } from "@/shared/lib/react-query/query-client";
import { makeStore } from "@/store";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppProviders({ children }: AppProvidersProps) {
  const [store] = useState(makeStore);
  const [queryClient] = useState(makeQueryClient);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
}
