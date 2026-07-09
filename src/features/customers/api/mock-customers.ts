import type { Customer } from "@/features/customers/types";

export const mockCustomers: Customer[] = [
  {
    id: "customer-acme",
    name: "Acme Industrial",
    city: "Recife",
    state: "PE",
    authorizedTransportTypeIds: ["transport-road", "transport-air"],
  },
  {
    id: "customer-globex",
    name: "Globex Brasil",
    city: "Salvador",
    state: "BA",
    authorizedTransportTypeIds: ["transport-road", "transport-sea"],
  },
  {
    id: "customer-northwind",
    name: "Northwind Foods",
    city: "Fortaleza",
    state: "CE",
    authorizedTransportTypeIds: ["transport-road"],
  },
];
