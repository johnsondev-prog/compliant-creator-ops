export type ProviderQuoteRequest = {
  product: string;
  quantity?: number;
};

export type ProviderQuote = {
  provider: 'manual';
  unitCostNgn: number;
  notes: string;
};

export async function quotePartnerFulfillment(input: ProviderQuoteRequest): Promise<ProviderQuote> {
  return {
    provider: 'manual',
    unitCostNgn: input.quantity ? input.quantity * 1000 : 1000,
    notes: `No live provider is connected for ${input.product}. Fulfill manually or implement a compliant first-party adapter.`,
  };
}
