type Action = {
  type: 'NOTIFY' | 'AUTH' | 'ADD_TO_CART' | 'ADD_MODAL' | 'ADD_ORDERS';
  payload: any;
};

type Dispatch = (action: Action) => void;

interface UserData {
  name: string;
  email: string;
  role: string;
  avatar: string;
  root: string;
}

type GlobalState = {
  notify: { error?: string; success?: string; loading?: boolean };
  cart: ProductData[];
  auth: {
    token: string;
    user: Partial<UserData>;
  };
  modal: ModalPayload;
  orders: OrderData[];
};

type ProductData = {
  _id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  currency: 'EUR' | 'GBP' | 'USD' | 'PLN';
  status: 'Available' | 'Unavailable';
  sold: number;
  quantity: number;
  amount: number;
};

type OrderData = {
  _id: string;
  user: Pick<UserData, 'name' | 'email'>;
  address: string;
  phoneNumber: string;
  cart: ProductData[];
  totalPrice: number;
  createdAt: string;
  delivered: boolean;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
  dateOfPayment: Date;
  paymentId: string;
  method: 'Paypal';
};
interface ModalInterface {
  type: 'ADD_TO_CART' | 'ADD_MODAL';
  title: string;
  id: string;
  data: ProductData[];
}
type ModalPayload = Partial<ModalInterface>;

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginPayload = Pick<RegisterPayload, 'email' | 'password'>;
interface UserPayloadInterface {
  msg: string;
  err: string;
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
    root: string;
  };
}
type UserPayload = Partial<UserPayloadInterface>;
interface ProductPayloadInterface {
  product: Array;
  err: string;
  msg: string;
}
type ProductPayload = Partial<ProductPayloadInterface>;
interface ProductsPayloadInterface {
  status: string;
  result: number;
  products: Array;
  err: string;
}
type ProductsPayload = Partial<ProductsPayloadInterface>;

interface AuthPayloadInterface {
  err: string;
  id: string;
  role: string;
  root: string;
}
type AuthPayload = Partial<AuthPayloadInterface>;
interface OrderPayloadInterface {
  err: string;
  msg: string;
  order: OrderData;
  cart: ProductData[];
  totalPrice: number;
}
type OrderPayload = Partial<OrderPayloadInterface>;
