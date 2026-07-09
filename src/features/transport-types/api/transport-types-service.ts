import type { TransportType } from "@/features/transport-types/types";
import { DomainError } from "@/shared/lib/errors/domain-error";
import { getMockApiState, mockResponse } from "@/shared/lib/mock-api";

export async function listTransportTypes() {
  return mockResponse(getMockApiState().transportTypes);
}

export async function getTransportTypeById(transportTypeId: string) {
  const transportType = getMockApiState().transportTypes.find(
    (entry) => entry.id === transportTypeId,
  );

  if (!transportType) {
    throw new DomainError(
      "Transport type not found.",
      "TRANSPORT_TYPE_NOT_FOUND",
    );
  }

  return mockResponse<TransportType>(transportType);
}
