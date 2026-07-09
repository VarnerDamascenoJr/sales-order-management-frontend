import type { EntityId } from "@/shared/types";

export type Customer = {
  id: EntityId;
  name: string;
  city: string;
  state: string;
  authorizedTransportTypeIds: EntityId[];
};
