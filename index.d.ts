declare type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  cf_password: string;
};

declare type GlobalState = {
  notify?: any;
};

declare type Action = {
  type: 'NOTIFY' | 'AUTH';
  payload: {};
};

declare type Dispatch = (action: Action) => void;
