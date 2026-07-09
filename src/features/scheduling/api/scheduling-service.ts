import type { Schedule } from "@/features/scheduling/types";
import {
  assertCanScheduleSalesOrder,
  assertScheduleInput,
} from "@/features/sales-orders/lib/sales-order-rules";
import { DomainError } from "@/shared/lib/errors/domain-error";
import { getMockApiState, mockResponse } from "@/shared/lib/mock-api";

function findSalesOrderOrThrow(orderId: string) {
  const salesOrder = getMockApiState().salesOrders.find((entry) => entry.id === orderId);

  if (!salesOrder) {
    throw new DomainError("Sales order not found.", "SALES_ORDER_NOT_FOUND");
  }

  return salesOrder;
}

function createScheduleAuditEvent(
  orderId: string,
  previousSchedule: Schedule | null,
  nextSchedule: Schedule,
) {
  return {
    id: crypto.randomUUID(),
    salesOrderId: orderId,
    type: "SCHEDULE_CHANGED" as const,
    occurredAt: new Date().toISOString(),
    actor: "mock-api",
    description:
      previousSchedule === null
        ? "Delivery schedule created."
        : "Delivery schedule updated.",
    metadata: {
      previousSchedule,
      nextSchedule,
    },
  };
}

async function saveSchedule(orderId: string, schedule: Schedule) {
  assertScheduleInput(schedule);

  const state = getMockApiState();
  const salesOrder = findSalesOrderOrThrow(orderId);

  assertCanScheduleSalesOrder(salesOrder);

  const previousSchedule = salesOrder.schedule;

  salesOrder.schedule = schedule;
  salesOrder.updatedAt = new Date().toISOString();

  state.auditEvents.unshift(
    createScheduleAuditEvent(orderId, previousSchedule, schedule),
  );

  return mockResponse(salesOrder);
}

export async function scheduleSalesOrder(orderId: string, schedule: Schedule) {
  return saveSchedule(orderId, schedule);
}

export async function rescheduleSalesOrder(orderId: string, schedule: Schedule) {
  return saveSchedule(orderId, schedule);
}
