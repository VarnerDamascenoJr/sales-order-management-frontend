import type { Item } from "@/features/items/types";

export const mockItems: Item[] = [
  {
    id: "item-steel-coil",
    sku: "ITM-1001",
    name: "Steel Coil",
    unitPrice: 4800,
    unitOfMeasure: "UN",
  },
  {
    id: "item-pallet",
    sku: "ITM-1002",
    name: "Wood Pallet",
    unitPrice: 120,
    unitOfMeasure: "UN",
  },
  {
    id: "item-copper-wire",
    sku: "ITM-1003",
    name: "Copper Wire",
    unitPrice: 860,
    unitOfMeasure: "CX",
  },
  {
    id: "item-refrigerated-kit",
    sku: "ITM-1004",
    name: "Refrigerated Kit",
    unitPrice: 1320,
    unitOfMeasure: "KIT",
  },
];
