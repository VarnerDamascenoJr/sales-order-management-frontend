import { mockAuditEvents } from "@/features/audit/api/mock-audit-events";
import { mockCustomers } from "@/features/customers/api/mock-customers";
import { mockItems } from "@/features/items/api/mock-items";
import { mockSalesOrders } from "@/features/sales-orders/api/mock-sales-orders";
import { mockTransportTypes } from "@/features/transport-types/api/mock-transport-types";
import type { AuditEvent } from "@/features/audit/types";
import type { Customer } from "@/features/customers/types";
import type { Item } from "@/features/items/types";
import type { SalesOrder } from "@/features/sales-orders/types";
import type { TransportType } from "@/features/transport-types/types";
import { cloneValue } from "@/shared/lib/mock-api/clone-value";

export type MockApiState = {
  customers: Customer[];
  transportTypes: TransportType[];
  items: Item[];
  salesOrders: SalesOrder[];
  auditEvents: AuditEvent[];
};

export function createInitialMockApiState(): MockApiState {
  return {
    customers: cloneValue(mockCustomers),
    transportTypes: cloneValue(mockTransportTypes),
    items: cloneValue(mockItems),
    salesOrders: cloneValue(mockSalesOrders),
    auditEvents: cloneValue(mockAuditEvents),
  };
}
