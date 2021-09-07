const reducers = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        ...state,
        notify: action.payload,
      };
    case 'AUTH':
      return {
        ...state,
        auth: action.payload,
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: action.payload,
      };
    case 'ADD_MODAL':
      return {
        ...state,
        modal: action.payload,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default reducers;
