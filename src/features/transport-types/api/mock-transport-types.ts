import type { TransportType } from "@/features/transport-types/types";

export const mockTransportTypes: TransportType[] = [
  {
    id: "transport-road",
    code: "RODOVIARIO",
    name: "Rodoviario",
    description: "Entrega terrestre para rotas nacionais.",
  },
  {
    id: "transport-air",
    code: "AEREO",
    name: "Aereo",
    description: "Entrega prioritaria por via aerea.",
  },
  {
    id: "transport-sea",
    code: "MARITIMO",
    name: "Maritimo",
    description: "Entrega consolidada para grandes cargas.",
  },
];
