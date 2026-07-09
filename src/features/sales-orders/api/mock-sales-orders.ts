import type { SalesOrder } from "@/features/sales-orders/types";

export const mockSalesOrders: SalesOrder[] = [
  {
    id: "order-1001",
    code: "SO-1001",
    customerId: "customer-acme",
    transportTypeId: "transport-road",
    status: "PLANEJADA",
    items: [
      {
        id: "order-item-1001",
        itemId: "item-steel-coil",
        quantity: 2,
        unitPrice: 4800,
      },
      {
        id: "order-item-1002",
        itemId: "item-pallet",
        quantity: 10,
        unitPrice: 120,
      },
    ],
    schedule: null,
    createdAt: "2026-07-01T09:00:00.000Z",
    updatedAt: "2026-07-02T13:15:00.000Z",
  },
  {
    id: "order-1002",
    code: "SO-1002",
    customerId: "customer-globex",
    transportTypeId: "transport-sea",
    status: "AGENDADA",
    items: [
      {
        id: "order-item-1003",
        itemId: "item-copper-wire",
        quantity: 6,
        unitPrice: 860,
      },
    ],
    schedule: {
      deliveryDate: "2026-07-15",
      deliveryWindow: {
        start: "08:00",
        end: "12:00",
      },
    },
    createdAt: "2026-06-28T11:30:00.000Z",
    updatedAt: "2026-07-03T16:00:00.000Z",
  },
  {
    id: "order-1003",
    code: "SO-1003",
    customerId: "customer-northwind",
    transportTypeId: "transport-road",
    status: "EM_TRANSPORTE",
    items: [
      {
        id: "order-item-1004",
        itemId: "item-refrigerated-kit",
        quantity: 3,
        unitPrice: 1320,
      },
    ],
    schedule: {
      deliveryDate: "2026-07-10",
      deliveryWindow: {
        start: "13:00",
        end: "18:00",
      },
    },
    createdAt: "2026-06-25T08:45:00.000Z",
    updatedAt: "2026-07-06T14:20:00.000Z",
  },
];
