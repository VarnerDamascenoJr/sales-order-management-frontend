import {
  createInitialMockApiState,
  type MockApiState,
} from "@/shared/lib/mock-api/seed";

let mockApiState = createInitialMockApiState();

export function getMockApiState() {
  return mockApiState;
}

export function resetMockApiState() {
  mockApiState = createInitialMockApiState();

  return mockApiState;
}

export function setMockApiState(nextState: MockApiState) {
  mockApiState = nextState;
}
