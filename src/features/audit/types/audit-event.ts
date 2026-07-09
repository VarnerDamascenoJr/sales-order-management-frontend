import type { SalesOrderStatus } from "@/features/sales-orders/types";
import type { Schedule } from "@/features/scheduling/types";
import type { EntityId } from "@/shared/types";

export type AuditEventType =
  | "CREATED"
  | "STATUS_CHANGED"
  | "SCHEDULE_CHANGED"
  | "TRANSPORT_CHANGED";

export type AuditEventMetadata = {
  previousStatus?: SalesOrderStatus;
  nextStatus?: SalesOrderStatus;
  previousTransportTypeId?: EntityId;
  nextTransportTypeId?: EntityId;
  previousSchedule?: Schedule | null;
  nextSchedule?: Schedule | null;
};

export type AuditEvent = {
  id: EntityId;
  salesOrderId: EntityId;
  type: AuditEventType;
  occurredAt: string;
  actor: string;
  description: string;
  metadata?: AuditEventMetadata;
};

export type AuditEventFilters = {
  salesOrderId?: EntityId;
  type?: AuditEventType;
};
