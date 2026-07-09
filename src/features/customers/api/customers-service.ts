import type { Customer } from "@/features/customers/types";
import { DomainError } from "@/shared/lib/errors/domain-error";
import { getMockApiState, mockResponse } from "@/shared/lib/mock-api";

export async function listCustomers() {
  return mockResponse(getMockApiState().customers);
}

export async function getCustomerById(customerId: string) {
  const customer = getMockApiState().customers.find((entry) => entry.id === customerId);

  if (!customer) {
    throw new DomainError("Customer not found.", "CUSTOMER_NOT_FOUND");
  }

  return mockResponse<Customer>(customer);
}
