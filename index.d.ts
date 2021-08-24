declare type RegisterPayload = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type UserPayload = {
  msg?: string;
  err?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar: string;
    root: string;
  };
};

type ProductPayload = {
  product?: Array;
  err?: string;
  msg?: string;
};

type ProductsPayload = {
  status?: string;
  result?: number;
  products?: Array;
  err?: string;
};

type AuthPayload = {
  err?: string;
  id?: string;
  role?: string;
  root?: string;
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
};

declare type GlobalState = {
  notify?: { error?: string; success?: string };
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
};

declare type Action = {
  type: 'NOTIFY' | 'AUTH';
  payload: {};
};

declare type Dispatch = (action: Action) => void;
