import type { AuditEventFilters } from "@/features/audit/types";
import { mockResponse, getMockApiState } from "@/shared/lib/mock-api";

export async function listAuditEvents(filters: AuditEventFilters = {}) {
  const { salesOrderId, type } = filters;

  const auditEvents = getMockApiState().auditEvents.filter((auditEvent) => {
    if (salesOrderId && auditEvent.salesOrderId !== salesOrderId) {
      return false;
    }

    if (type && auditEvent.type !== type) {
      return false;
    }

    return true;
  });

  return mockResponse(auditEvents);
}
