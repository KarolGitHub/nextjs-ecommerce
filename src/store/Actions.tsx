export const addToCart = (
  product: ProductData,
  cart: ProductData[]
): Action => {
  switch (true) {
    case product.status == 'Unavailable':
      return {
        type: 'NOTIFY',
        payload: { error: 'This product is currently unavailable' },
      };
    case !product.quantity:
      return {
        type: 'NOTIFY',
        payload: { error: 'This product is out of stock' },
      };
    case cart.findIndex((item) => item._id === product._id) > -1:
      return {
        type: 'NOTIFY',
        payload: { error: 'This product is already in cart' },
      };
    default:
      return {
        type: 'ADD_TO_CART',
        payload: [...cart, { ...product, amount: product.amount ?? 1 }],
      };
  }
};

export const increaseItemAmount = (
  items: ProductData[],
  id: string
): Action => {
  const newItems = [...items];
  newItems.forEach((item) => {
    if (item._id === id) item.amount += 1;
  });

  return { type: 'ADD_TO_CART', payload: newItems };
};

export const decreaseItemAmount = (
  items: ProductData[],
  id: string
): Action => {
  const newItems = [...items];
  newItems.forEach((item) => {
    if (item._id === id) item.amount -= 1;
  });

  return { type: 'ADD_TO_CART', payload: newItems };
};

export const deleteItem = (
  type: Action['type'],
  items?: ProductData[],
  id?: string
): Action => {
  const newItems = items?.filter((item) => item._id !== id);
  return { type, payload: newItems };
};

export const updateItem = (
  type: Action['type'],
  data: OrderData[],
  id: string,
  post: OrderData
): Action => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return { type, payload: newData };
};
