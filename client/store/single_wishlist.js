import axios from 'axios';

const SET_WISHLIST = 'SET_WISHLIST'


const TOKEN = 'token';

export const setWishlist = (data) => {
  return {
    type: SET_WISHLIST,
    payload : data
  }
}

export const getWishlist = (list) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.get(`/api/wishlist/${list.id}`, {
          headers: {
            authorization: token
          }
        });
        dispatch(setWishlist(res.data));
      }
    } catch (err) {
      console.err('err in getWishlist', err);
    }
  }
}

export default function(state = {}, action) {
  switch(action.type) {
    case SET_WISHLIST:
      return action.payload
    default:
      return state;
  }
}
