export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_USER':
      const {user} = action.payload;
      const newUserList = [user, ...state.userList];
      return {...state, userList: newUserList};

    default:
      return state;
  }
}
