import axios from 'axios';

const SET_SINGLELIST = 'SET_SINGLELIST';
const CLEAR_SINGLELIST = 'CLEAR_SINGLELIST';
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

const TOKEN = 'token';

// ACTION CREATORS
export const setSingleList = (listObj) => {
  return {
    type: SET_SINGLELIST,
    payload: listObj,
  };
};

export const clearSingleList = () => {
  return {
    type: CLEAR_SINGLELIST,
  };
};

// adding item to current wishlist
const addItem = (newItem) => {
  return {
    type: ADD_ITEM,
    payload: newItem,
  };
};

// deleting item to current wishlist
const deleteItem = (deletedItemId) => {
  return {
    type: DELETE_ITEM,
    payload: deletedItemId,
  };
};

export const getSingleList = (list) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.get(`/api/wishlist/${list.id}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(setSingleList(res.data));
      }
    } catch (err) {
      console.error('err in getSingleList', err);
    }
  };
};

export const addItemThunk = (itemData) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        let wishlistId = getState().singleList.id;
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

export const deleteItemThunk = (itemData) => {
  return async (dispatch, getState) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        let wishlistId = getState().singleList.id;
        const { data } = await axios.delete('/api/wishlist-item', {
          headers: {
            authorization: token,
          },
          data: { wishlistId, itemData },
        });
        dispatch(deleteItem(data.itemId));
      }
    } catch (err) {
      console.error('err in deleteItemThunk', err);
    }
  };
};

// reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case SET_SINGLELIST:
      return action.payload;
    case CLEAR_SINGLELIST:
      return {};
    case ADD_ITEM: {
      let prevItems = state.items;
      return { ...state, items: [...prevItems, action.payload] };
    }
    case DELETE_ITEM: {
      let newItems = state.items.filter((item) => item.id != action.payload);
      return { ...state, items: newItems };
    }
    default:
      return state;
  }
}
