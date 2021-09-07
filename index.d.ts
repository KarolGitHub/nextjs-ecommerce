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

interface ModalInterface {
  type: 'ADD_TO_CART' | 'ADD_MODAL';
  title: string;
  id: string;
  data: ProductData[];
}
type ModalPayload = Partial<ModalInterface>;

type GlobalState = {
  notify: { error?: string; success?: string; loading?: boolean };
  cart: ProductData[];
  auth?: {
    token: string;
    user: {
      name: string;
      email: string;
      role: string;
      avatar: string;
      root: string;
    };
  };
  modal: ModalPayload;
};

type Action = {
  type: 'NOTIFY' | 'AUTH' | 'ADD_TO_CART' | 'ADD_MODAL';
  payload: any;
};

type Dispatch = (action: Action) => void;
