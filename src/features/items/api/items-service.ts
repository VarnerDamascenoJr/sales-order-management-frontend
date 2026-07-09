import type { Item } from "@/features/items/types";
import { DomainError } from "@/shared/lib/errors/domain-error";
import { getMockApiState, mockResponse } from "@/shared/lib/mock-api";

export async function listItems() {
  return mockResponse(getMockApiState().items);
}

export async function getItemById(itemId: string) {
  const item = getMockApiState().items.find((entry) => entry.id === itemId);

  if (!item) {
    throw new DomainError("Item not found.", "ITEM_NOT_FOUND");
  }

  return mockResponse<Item>(item);
}
