import type {
  CreateSalesOrderInput,
  SalesOrder,
  SalesOrderFilters,
  SalesOrderItem,
  SalesOrderStatus,
} from "@/features/sales-orders/types";
import {
  assertAuthorizedTransportType,
  assertCanAdvanceSalesOrder,
  assertCanUpdateTransportType,
  assertCreateSalesOrderInput,
  getNextSalesOrderStatus,
} from "@/features/sales-orders/lib/sales-order-rules";
import { DomainError } from "@/shared/lib/errors/domain-error";
import { getMockApiState, mockResponse } from "@/shared/lib/mock-api";

function buildNextSalesOrderCode(salesOrders: SalesOrder[]) {
  const highestSequence = salesOrders.reduce((maxValue, salesOrder) => {
    const [, numericPart = "0"] = salesOrder.code.split("-");
    return Math.max(maxValue, Number(numericPart));
  }, 1000);

  return `SO-${String(highestSequence + 1)}`;
}

function buildSalesOrderItems(
  itemCatalog: Array<{ id: string; unitPrice: number }>,
  inputItems: CreateSalesOrderInput["items"],
) {
  return inputItems.map<SalesOrderItem>((inputItem) => {
    const item = itemCatalog.find((catalogItem) => catalogItem.id === inputItem.itemId);

    if (!item) {
      throw new DomainError("Item not found.", "ITEM_NOT_FOUND");
    }

    return {
      id: crypto.randomUUID(),
      itemId: inputItem.itemId,
      quantity: inputItem.quantity,
      unitPrice: item.unitPrice,
    };
  });
}

function createAuditEvent(
  salesOrderId: string,
  type: "CREATED" | "STATUS_CHANGED" | "SCHEDULE_CHANGED" | "TRANSPORT_CHANGED",
  description: string,
  metadata?: Record<string, unknown>,
) {
  return {
    id: crypto.randomUUID(),
    salesOrderId,
    type,
    occurredAt: new Date().toISOString(),
    actor: "mock-api",
    description,
    metadata,
  };
}

function findSalesOrderOrThrow(orderId: string) {
  const salesOrder = getMockApiState().salesOrders.find((entry) => entry.id === orderId);

  if (!salesOrder) {
    throw new DomainError("Sales order not found.", "SALES_ORDER_NOT_FOUND");
  }

  return salesOrder;
}

export async function listSalesOrders(filters: SalesOrderFilters = {}) {
  const { customerId, transportTypeId, status, query, hasSchedule } = filters;
  const normalizedQuery = query?.trim().toLowerCase();

  const salesOrders = getMockApiState().salesOrders.filter((salesOrder) => {
    if (customerId && salesOrder.customerId !== customerId) {
      return false;
    }

    if (transportTypeId && salesOrder.transportTypeId !== transportTypeId) {
      return false;
    }

    if (status && salesOrder.status !== status) {
      return false;
    }

    if (typeof hasSchedule === "boolean" && (salesOrder.schedule !== null) !== hasSchedule) {
      return false;
    }

    if (normalizedQuery && !salesOrder.code.toLowerCase().includes(normalizedQuery)) {
      return false;
    }

    return true;
  });

  return mockResponse(salesOrders);
}

export async function getSalesOrderById(orderId: string) {
  return mockResponse(findSalesOrderOrThrow(orderId));
}

export async function createSalesOrder(input: CreateSalesOrderInput) {
  assertCreateSalesOrderInput(input);

  const state = getMockApiState();
  const customer = state.customers.find((entry) => entry.id === input.customerId);

  if (!customer) {
    throw new DomainError("Customer not found.", "CUSTOMER_NOT_FOUND");
  }

  const transportType = state.transportTypes.find(
    (entry) => entry.id === input.transportTypeId,
  );

  if (!transportType) {
    throw new DomainError(
      "Transport type not found.",
      "TRANSPORT_TYPE_NOT_FOUND",
    );
  }

  assertAuthorizedTransportType(customer, transportType.id);

  const timestamp = new Date().toISOString();
  const salesOrder: SalesOrder = {
    id: crypto.randomUUID(),
    code: buildNextSalesOrderCode(state.salesOrders),
    customerId: customer.id,
    transportTypeId: transportType.id,
    status: "CRIADA",
    items: buildSalesOrderItems(state.items, input.items),
    schedule: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  state.salesOrders.unshift(salesOrder);
  state.auditEvents.unshift(
    createAuditEvent(salesOrder.id, "CREATED", "Sales order created."),
  );

  return mockResponse(salesOrder);
}

export async function transitionSalesOrderStatus(
  orderId: string,
  nextStatus: SalesOrderStatus,
) {
  const state = getMockApiState();
  const salesOrder = findSalesOrderOrThrow(orderId);
  const previousStatus = salesOrder.status;

  assertCanAdvanceSalesOrder(salesOrder, nextStatus);

  salesOrder.status = nextStatus;
  salesOrder.updatedAt = new Date().toISOString();

  state.auditEvents.unshift(
    createAuditEvent(
      salesOrder.id,
      "STATUS_CHANGED",
      `Status changed from ${previousStatus} to ${nextStatus}.`,
      {
        previousStatus,
        nextStatus,
      },
    ),
  );

  return mockResponse(salesOrder);
}

export async function advanceSalesOrderStatus(orderId: string) {
  const salesOrder = findSalesOrderOrThrow(orderId);
  const nextStatus = getNextSalesOrderStatus(salesOrder.status);

  if (!nextStatus) {
    throw new DomainError(
      "Sales order is already in the final status.",
      "FINAL_STATUS_REACHED",
    );
  }

  return transitionSalesOrderStatus(orderId, nextStatus);
}

export async function updateSalesOrderTransportType(
  orderId: string,
  transportTypeId: string,
) {
  const state = getMockApiState();
  const salesOrder = findSalesOrderOrThrow(orderId);
  const customer = state.customers.find((entry) => entry.id === salesOrder.customerId);

  if (!customer) {
    throw new DomainError("Customer not found.", "CUSTOMER_NOT_FOUND");
  }

  const nextTransportType = state.transportTypes.find(
    (entry) => entry.id === transportTypeId,
  );

  if (!nextTransportType) {
    throw new DomainError(
      "Transport type not found.",
      "TRANSPORT_TYPE_NOT_FOUND",
    );
  }

  assertCanUpdateTransportType(salesOrder);
  assertAuthorizedTransportType(customer, transportTypeId);

  const previousTransportTypeId = salesOrder.transportTypeId;

  salesOrder.transportTypeId = transportTypeId;
  salesOrder.updatedAt = new Date().toISOString();

  if (previousTransportTypeId !== transportTypeId) {
    state.auditEvents.unshift(
      createAuditEvent(
        salesOrder.id,
        "TRANSPORT_CHANGED",
        "Transport type changed.",
        {
          previousTransportTypeId,
          nextTransportTypeId: transportTypeId,
        },
      ),
    );
  }

  return mockResponse(salesOrder);
}
