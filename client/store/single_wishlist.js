import axios from 'axios';
import { async } from 'regenerator-runtime';

const SET_WISHLIST = 'SET_WISHLIST';
const ADD_ITEM = 'ADD_ITEM';

const TOKEN = 'token';

// ACTION CREATORS
export const setWishlist = (listObj) => {
  return {
    type: SET_WISHLIST,
    payload: listObj,
  };
};

// adding item to current wishlist
const addItem = (newItem) => {
  return {
    type: ADD_ITEM,
    payload: newItem,
  };
};

export const getWishlist = (list) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.get(`/api/wishlist/${list.id}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(setWishlist(res.data));
      }
    } catch (err) {
      console.error('err in getWishlist', err);
    }
  };
};

export const addItemThunk = (itemData) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        let wishlistId = getState().singleWishlist.id;
        console.log(wishlistId)
        const res = await axios.post(
          `/api/wishlist-item`,
          { wishlistId, itemData },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(addItem(res.data));
      }
    } catch (err) {
      console.error('err in addItemThunk', err);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_WISHLIST:
      return action.payload;
    case ADD_ITEM: {
      let prevItems = state.items;
      return { ...state, items: [...prevItems, action.payload] };
    }
    default:
      return state;
  }
}
