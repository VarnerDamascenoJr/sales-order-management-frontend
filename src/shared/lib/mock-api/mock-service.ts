import { cloneValue } from "@/shared/lib/mock-api/clone-value";

type MockResponseOptions = {
  delayInMs?: number;
};

const DEFAULT_DELAY_IN_MS = 120;

export async function mockResponse<T>(
  value: T,
  options: MockResponseOptions = {},
) {
  const { delayInMs = DEFAULT_DELAY_IN_MS } = options;

  await new Promise((resolve) => setTimeout(resolve, delayInMs));

  return cloneValue(value);
}
