import type { EntityId } from "@/shared/types";

export type Item = {
  id: EntityId;
  sku: string;
  name: string;
  unitPrice: number;
  unitOfMeasure: string;
};
