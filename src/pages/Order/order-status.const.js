export const OrderStatus = [
  "Trong giỏ hàng",
  "Chờ xác nhận",
  "Đã xác nhận",
  "Đang giao hàng",
  "Đã nhận",
  "Hoàn thành",
  "Đã huỷ",
];

export const OrderStatusEnum = {
  INCART: 0,
  WAITING_CONFIRM: 1,
  CONFIRMED: 2,
  SHIPPING: 3,
  RECEIVED: 4,
  SUCCESS: 5,
  REJECT: 6,
};

export const PaymentStatus = ["Chưa thanh toán", "Đã thanh toán"];
export const PaymentMethodEnum = {
  MONEY: 0,
  CARD: 1,
};
export const PaymentStatusEnum = {
  IN_PROGRESS: 0, //Chờ thanh toán/thanh toán khi nhận hàng
  COMPLETE: 1, //Hoàn thành /Đã thanh toán
};
