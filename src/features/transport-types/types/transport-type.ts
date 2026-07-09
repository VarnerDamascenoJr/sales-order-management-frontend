import type { EntityId } from "@/shared/types";

export type TransportType = {
  id: EntityId;
  code: string;
  name: string;
  description: string;
};
