export const ORDER_TYPES = {
  applications: {
    IGetOrderByIdApplication: 'IGetOrderByIdApplication',
    IGetOrdersByStoreId: 'IGetOrdersByStoreId',
    IGetOrdersByStoreIdAndStatus: 'IGetOrdersByStoreIdAndStatus',
    IPutStatusById: 'IPutStatusById',
    IPostOrder: 'IPostOrder',
    IGetOrderByExternalPaymentId: 'IGetOrderByExternalPaymentId',
    IUpdateOrderPaymentStatus: 'IUpdateOrderPaymentStatus',
    IUpdateOrderStatus: 'IUpdateOrderStatus',
  },
  repositories: {
    IOrderRepository: 'IOrderRepository',
  },
};
