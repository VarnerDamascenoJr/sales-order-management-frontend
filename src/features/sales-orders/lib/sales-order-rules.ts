import type { Customer } from "@/features/customers/types";
import type {
  CreateSalesOrderInput,
  CreateSalesOrderItemInput,
  SalesOrder,
  SalesOrderStatus,
} from "@/features/sales-orders/types";
import type { Schedule } from "@/features/scheduling/types";
import { DomainError } from "@/shared/lib/errors/domain-error";

const salesOrderStatusFlow: Record<SalesOrderStatus, SalesOrderStatus | null> = {
  CRIADA: "PLANEJADA",
  PLANEJADA: "AGENDADA",
  AGENDADA: "EM_TRANSPORTE",
  EM_TRANSPORTE: "ENTREGUE",
  ENTREGUE: null,
};

function assertHasEntityId(value: string, fieldName: string) {
  if (!value.trim()) {
    throw new DomainError(`${fieldName} is required.`, "VALIDATION_ERROR");
  }
}

function assertItems(items: CreateSalesOrderItemInput[]) {
  if (items.length === 0) {
    throw new DomainError(
      "Sales order must contain at least one item.",
      "EMPTY_ITEMS",
    );
  }

  items.forEach((item) => {
    if (item.quantity <= 0) {
      throw new DomainError(
        "Sales order item quantity must be greater than zero.",
        "INVALID_ITEM_QUANTITY",
      );
    }

    assertHasEntityId(item.itemId, "Item");
  });
}

export function assertCreateSalesOrderInput(input: CreateSalesOrderInput) {
  assertHasEntityId(input.customerId, "Customer");
  assertHasEntityId(input.transportTypeId, "Transport type");
  assertItems(input.items);
}

export function isTransportTypeAuthorized(
  customer: Pick<Customer, "authorizedTransportTypeIds">,
  transportTypeId: string,
) {
  return customer.authorizedTransportTypeIds.includes(transportTypeId);
}

export function assertAuthorizedTransportType(
  customer: Pick<Customer, "authorizedTransportTypeIds" | "name">,
  transportTypeId: string,
) {
  if (!isTransportTypeAuthorized(customer, transportTypeId)) {
    throw new DomainError(
      `Transport type is not authorized for customer ${customer.name}.`,
      "UNAUTHORIZED_TRANSPORT_TYPE",
    );
  }
}

export function getNextSalesOrderStatus(status: SalesOrderStatus) {
  return salesOrderStatusFlow[status];
}

export function canTransitionSalesOrderStatus(
  currentStatus: SalesOrderStatus,
  nextStatus: SalesOrderStatus,
) {
  return salesOrderStatusFlow[currentStatus] === nextStatus;
}

export function assertValidStatusTransition(
  currentStatus: SalesOrderStatus,
  nextStatus: SalesOrderStatus,
) {
  if (!canTransitionSalesOrderStatus(currentStatus, nextStatus)) {
    throw new DomainError(
      `Invalid status transition from ${currentStatus} to ${nextStatus}.`,
      "INVALID_STATUS_TRANSITION",
    );
  }
}

export function assertScheduleInput(schedule: Schedule) {
  if (!schedule.deliveryDate.trim()) {
    throw new DomainError("Delivery date is required.", "INVALID_SCHEDULE");
  }

  if (!schedule.deliveryWindow.start.trim() || !schedule.deliveryWindow.end.trim()) {
    throw new DomainError("Delivery window is required.", "INVALID_SCHEDULE");
  }

  if (schedule.deliveryWindow.start >= schedule.deliveryWindow.end) {
    throw new DomainError(
      "Delivery window end must be after start.",
      "INVALID_SCHEDULE",
    );
  }
}

export function assertCanAdvanceSalesOrder(
  salesOrder: Pick<SalesOrder, "status" | "schedule">,
  nextStatus: SalesOrderStatus,
) {
  assertValidStatusTransition(salesOrder.status, nextStatus);

  if (nextStatus === "AGENDADA" && salesOrder.schedule === null) {
    throw new DomainError(
      "Sales order must be scheduled before moving to AGENDADA.",
      "SCHEDULE_REQUIRED",
    );
  }
}

export function assertCanUpdateTransportType(
  salesOrder: Pick<SalesOrder, "status">,
) {
  if (salesOrder.status === "EM_TRANSPORTE" || salesOrder.status === "ENTREGUE") {
    throw new DomainError(
      "Transport type cannot be changed after the shipment has started.",
      "TRANSPORT_CHANGE_NOT_ALLOWED",
    );
  }
}

export function assertCanScheduleSalesOrder(
  salesOrder: Pick<SalesOrder, "status">,
) {
  if (salesOrder.status === "ENTREGUE") {
    throw new DomainError(
      "Delivered sales orders cannot be rescheduled.",
      "SCHEDULE_NOT_ALLOWED",
    );
  }
}
