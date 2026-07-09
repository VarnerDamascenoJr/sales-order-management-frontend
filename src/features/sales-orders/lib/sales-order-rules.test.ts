import {
  canTransitionSalesOrderStatus,
  getNextSalesOrderStatus,
  isTransportTypeAuthorized,
} from "@/features/sales-orders/lib/sales-order-rules";

describe("salesOrderRules", () => {
  it("returns the next status in the valid flow", () => {
    expect(getNextSalesOrderStatus("AGENDADA")).toBe("EM_TRANSPORTE");
    expect(getNextSalesOrderStatus("ENTREGUE")).toBeNull();
  });

  it("validates the linear status flow", () => {
    expect(canTransitionSalesOrderStatus("CRIADA", "PLANEJADA")).toBe(true);
    expect(canTransitionSalesOrderStatus("CRIADA", "AGENDADA")).toBe(false);
  });

  it("checks customer transport authorization", () => {
    expect(
      isTransportTypeAuthorized(
        {
          authorizedTransportTypeIds: ["transport-road", "transport-air"],
        },
        "transport-air",
      ),
    ).toBe(true);
  });
});
