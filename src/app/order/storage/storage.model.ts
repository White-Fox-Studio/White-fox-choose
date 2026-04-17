
export interface OrderRequest {
  orderId: string;
  selections: SelectionItem[];
}

export interface SelectionItem {
  slotId: string;
  orderItemId: string;
  itemIndex: number;
  photoNumber?: number;
  disabled?: boolean;
}
