import type { AuditEvent } from "@/features/audit/types";

export const mockAuditEvents: AuditEvent[] = [
  {
    id: "audit-1001",
    salesOrderId: "order-1001",
    type: "CREATED",
    occurredAt: "2026-07-01T09:00:00.000Z",
    actor: "system",
    description: "Sales order created.",
  },
  {
    id: "audit-1002",
    salesOrderId: "order-1001",
    type: "STATUS_CHANGED",
    occurredAt: "2026-07-02T13:15:00.000Z",
    actor: "planner",
    description: "Status changed from CRIADA to PLANEJADA.",
    metadata: {
      previousStatus: "CRIADA",
      nextStatus: "PLANEJADA",
    },
  },
  {
    id: "audit-1003",
    salesOrderId: "order-1002",
    type: "CREATED",
    occurredAt: "2026-06-28T11:30:00.000Z",
    actor: "system",
    description: "Sales order created.",
  },
  {
    id: "audit-1004",
    salesOrderId: "order-1002",
    type: "SCHEDULE_CHANGED",
    occurredAt: "2026-07-02T10:00:00.000Z",
    actor: "planner",
    description: "Delivery schedule updated.",
    metadata: {
      previousSchedule: null,
      nextSchedule: {
        deliveryDate: "2026-07-15",
        deliveryWindow: {
          start: "08:00",
          end: "12:00",
        },
      },
    },
  },
  {
    id: "audit-1005",
    salesOrderId: "order-1002",
    type: "STATUS_CHANGED",
    occurredAt: "2026-07-03T16:00:00.000Z",
    actor: "planner",
    description: "Status changed from PLANEJADA to AGENDADA.",
    metadata: {
      previousStatus: "PLANEJADA",
      nextStatus: "AGENDADA",
    },
  },
  {
    id: "audit-1006",
    salesOrderId: "order-1003",
    type: "CREATED",
    occurredAt: "2026-06-25T08:45:00.000Z",
    actor: "system",
    description: "Sales order created.",
  },
  {
    id: "audit-1007",
    salesOrderId: "order-1003",
    type: "TRANSPORT_CHANGED",
    occurredAt: "2026-07-01T14:00:00.000Z",
    actor: "planner",
    description: "Transport type changed.",
    metadata: {
      previousTransportTypeId: "transport-air",
      nextTransportTypeId: "transport-road",
    },
  },
  {
    id: "audit-1008",
    salesOrderId: "order-1003",
    type: "STATUS_CHANGED",
    occurredAt: "2026-07-06T14:20:00.000Z",
    actor: "operations",
    description: "Status changed from AGENDADA to EM_TRANSPORTE.",
    metadata: {
      previousStatus: "AGENDADA",
      nextStatus: "EM_TRANSPORTE",
    },
  },
];
