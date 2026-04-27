export interface OrderResponse extends Order {
  success: boolean;
}

export interface Order {
  orderId: string;
  orderStatus: 'pending' | 'completed';
  isReadOnly: boolean;
  student: Student;
  items: (ProductItem | Package)[]
}

export interface Student {
  firstName: string;
  lastName: string;
  classGrade: string;
}

export interface ProductItemInfo {
  orderItemId: string;
  itemIndex: number;
  sku: string;
  nameEN: string;
  nameTH: string;
  sizeLabel: string;
  selectionType: string;
}

export interface ProductItem extends ProductItemInfo {
  layouts: Layout[];
}

export interface PackageInfo {
  packageId: string;
  sku: string;
  nameEN: string;
  nameTH: string;
}

export interface Package extends PackageInfo {
  products: ProductItem[];
}

export interface Layout {
  groupImageUrl: string | null;
  slots: Pose[];
  underlineEN?: string;
  underlineTH?: string;
}

export interface PackageLayout extends Layout {
  orderItemId: string;
  itemIndex: number;
}

export interface Pose {
  slotId: string;
  savedPhoto?: string | null;
  disabled?: boolean;
  commentEN?: string;
  commentTH?: string;
  tooltipEN?: string | null;
  tooltipTH?: string | null;
  min: number;
  max: number;
  key: IdKeys;
  index: number;
}

export interface IdKeys {
  orderId: string;
  orderItemId: string;
  itemIndex: number;
}

export function getSlotKey(slot: Pose) {
  const {orderItemId} = slot.key
  return `${orderItemId}_${slot.slotId}_${slot.index}`
}
