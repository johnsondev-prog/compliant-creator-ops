export type OrderRecord = {
  id: string;
  email: string;
  product: string;
  amountNgn: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  provider: 'manual' | 'partner';
  paymentReference?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

type Store = {
  orders: OrderRecord[];
};

declare global {
  // eslint-disable-next-line no-var
  var __minimalistCreatorOpsStore__: Store | undefined;
}

function getStore(): Store {
  if (!globalThis.__minimalistCreatorOpsStore__) {
    globalThis.__minimalistCreatorOpsStore__ = { orders: [] };
  }
  return globalThis.__minimalistCreatorOpsStore__;
}

export function listOrders() {
  return [...getStore().orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function createOrder(input: Omit<OrderRecord, 'createdAt' | 'updatedAt'>) {
  const timestamp = new Date().toISOString();
  const record: OrderRecord = {
    ...input,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  getStore().orders.push(record);
  return record;
}

export function updateOrder(id: string, patch: Partial<OrderRecord>) {
  const store = getStore();
  const index = store.orders.findIndex((order) => order.id === id);
  if (index === -1) {
    return null;
  }

  store.orders[index] = {
    ...store.orders[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  return store.orders[index];
}

export function findOrderByPaymentReference(reference: string) {
  return getStore().orders.find((order) => order.paymentReference === reference) ?? null;
}
