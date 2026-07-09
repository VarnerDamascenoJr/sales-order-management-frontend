import type { Schedule } from "@/features/scheduling/types";
import type { EntityId } from "@/shared/types";

export const salesOrderStatuses = [
  "CRIADA",
  "PLANEJADA",
  "AGENDADA",
  "EM_TRANSPORTE",
  "ENTREGUE",
] as const;

export type SalesOrderStatus = (typeof salesOrderStatuses)[number];

export type SalesOrderItem = {
  id: EntityId;
  itemId: EntityId;
  quantity: number;
  unitPrice: number;
};

export type SalesOrder = {
  id: EntityId;
  code: string;
  customerId: EntityId;
  transportTypeId: EntityId;
  status: SalesOrderStatus;
  items: SalesOrderItem[];
  schedule: Schedule | null;
  createdAt: string;
  updatedAt: string;
};

export type SalesOrderFilters = {
  customerId?: EntityId;
  transportTypeId?: EntityId;
  status?: SalesOrderStatus;
  query?: string;
  hasSchedule?: boolean;
};

export type CreateSalesOrderItemInput = {
  itemId: EntityId;
  quantity: number;
};

export type CreateSalesOrderInput = {
  customerId: EntityId;
  transportTypeId: EntityId;
  items: CreateSalesOrderItemInput[];
};
