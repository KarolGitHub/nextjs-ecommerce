const reducers = (state: GlobalState, action: Action): {} => {
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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default reducers;
