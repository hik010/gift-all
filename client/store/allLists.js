import axios from 'axios';
import { async } from 'regenerator-runtime';
import { clearSingleList } from './singleList';

const SET_LISTS = 'SET_LISTS';
const ADD_NEW_LIST = 'ADD_NEW_LIST';
const DELETE_LIST = 'DELETE_LIST';

const TOKEN = 'token';
const options = {headers : {
  authorization: window.localStorage.getItem(TOKEN)
}};

const setAllLists = (data) => {
  return {
    type: SET_LISTS,
    payload: data,
  };
};

const addNewList = (newList) => {
  return {
    type: ADD_NEW_LIST,
    payload: newList,
  };
};

const deleteList = (deletedList) => {
  return {
    type: DELETE_LIST,
    payload: deletedList.id
  }
}

export const getAllLists = (receiver) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.get(`/api/wishlist/${receiver}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(setAllLists(res.data));
      }
    } catch (err) {
      console.error('err in getAllLists', err);
    }
  };
};

export const addListThunk = (newListData) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const res = await axios.post('/api/wishlist', newListData, {
          headers: {
            authorization: token,
          },
        });
        dispatch(addNewList(res.data));

      }
    } catch (err) {
      console.error('err in addListThunk', err);
    }
  };
};

export const deleteListThunk = (listToDelete) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if(token) {
        const res = await axios.delete(`/api/wishlist/${listToDelete.id}`, options)
        dispatch(deleteList(res.data));
        dispatch(clearSingleList());
      }
    } catch (err) {
      console.error('err in deleteListThunk', err);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  switch (action.type) {
    case SET_LISTS:
      return action.payload;
    case ADD_NEW_LIST:
      return [...state, action.payload];
    case DELETE_LIST:
      return state.filter(list => list.id !== action.payload)
    default:
      return state;
  }
}
