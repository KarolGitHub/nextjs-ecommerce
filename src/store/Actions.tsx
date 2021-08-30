export const addToCart = (
  product: ProductData,
  cart: ProductData[]
): Action => {
  if (product.status == 'Unavailable') {
    return {
      type: 'NOTIFY',
      payload: { error: 'This product is currently unavailable' },
    };
  }

  if (!product.quantity) {
    return {
      type: 'NOTIFY',
      payload: { error: 'This product is out of stock' },
    };
  }

  return {
    type: 'ADD_TO_CART',
    payload: [...cart, { ...product, amount: product.amount ?? 1 }],
  };
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

export const deleteItem = (items: ProductData[], id: string): Action => {
  const newItems = items.filter((item) => item._id !== id);
  return { type: 'ADD_TO_CART', payload: newItems };
};
