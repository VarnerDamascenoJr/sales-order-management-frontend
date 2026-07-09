export type DeliveryWindow = {
  start: string;
  end: string;
};

export type Schedule = {
  deliveryDate: string;
  deliveryWindow: DeliveryWindow;
};
