declare type RegisterPayload = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type Data = {
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
