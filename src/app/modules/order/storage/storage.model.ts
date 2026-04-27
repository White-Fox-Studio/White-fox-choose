
export interface OrderRequest {
  orderId: string;
  selections: SelectionItem[];
}

export interface SelectionItem {
  slotId: string;
  slotIndex: number;
  orderItemId: string;
  itemIndex: number;
  photoNumber?: number;
  disabled?: boolean;
}

export function getSlotKeyBySelection(item: SelectionItem) {
  const {orderItemId, slotId, slotIndex} = item;
  return `${orderItemId}_${slotId}_${slotIndex}`;
}
