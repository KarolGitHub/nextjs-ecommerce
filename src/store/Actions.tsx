export const addToCart = (product: ProductData, cart: string[]): Action => {
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
    payload: [...cart, product._id],
  };
};
