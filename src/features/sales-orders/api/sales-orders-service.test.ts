import { listAuditEvents } from "@/features/audit/api";
import {
  advanceSalesOrderStatus,
  createSalesOrder,
  listSalesOrders,
  transitionSalesOrderStatus,
  updateSalesOrderTransportType,
} from "@/features/sales-orders/api";
import { scheduleSalesOrder } from "@/features/scheduling/api";
import { DomainError, resetMockApiState } from "@/shared/lib";

describe("salesOrdersService", () => {
  beforeEach(() => {
    resetMockApiState();
  });

  it("filters sales orders by status", async () => {
    const salesOrders = await listSalesOrders({ status: "AGENDADA" });

    expect(salesOrders).toHaveLength(1);
    expect(salesOrders[0]?.id).toBe("order-1002");
  });

  it("rejects unauthorized transport type during creation", async () => {
    await expect(
      createSalesOrder({
        customerId: "customer-northwind",
        transportTypeId: "transport-air",
        items: [
          {
            itemId: "item-pallet",
            quantity: 4,
          },
        ],
      }),
    ).rejects.toMatchObject<Partial<DomainError>>({
      code: "UNAUTHORIZED_TRANSPORT_TYPE",
    });
  });

  it("rejects invalid status transitions", async () => {
    await expect(
      transitionSalesOrderStatus("order-1001", "EM_TRANSPORTE"),
    ).rejects.toMatchObject<Partial<DomainError>>({
      code: "INVALID_STATUS_TRANSITION",
    });
  });

  it("requires a schedule before advancing to AGENDADA", async () => {
    await expect(advanceSalesOrderStatus("order-1001")).rejects.toMatchObject<
      Partial<DomainError>
    >({
      code: "SCHEDULE_REQUIRED",
    });
  });

  it("creates audit events when scheduling and changing transport", async () => {
    const createdOrder = await createSalesOrder({
      customerId: "customer-acme",
      transportTypeId: "transport-road",
      items: [
        {
          itemId: "item-steel-coil",
          quantity: 1,
        },
      ],
    });

    await scheduleSalesOrder(createdOrder.id, {
      deliveryDate: "2026-07-20",
      deliveryWindow: {
        start: "09:00",
        end: "11:00",
      },
    });

    await updateSalesOrderTransportType(createdOrder.id, "transport-air");

    const auditEvents = await listAuditEvents({ salesOrderId: createdOrder.id });

    expect(auditEvents.map((event) => event.type)).toEqual([
      "TRANSPORT_CHANGED",
      "SCHEDULE_CHANGED",
      "CREATED",
    ]);
  });
});
