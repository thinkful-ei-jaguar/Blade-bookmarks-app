import bookmarkApp from "./bookmark-app";
import store from "./store";


//This will be our base api url that we append specific queries to
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Blade/bookmarks';



//listApiFetch will be our wrapper function for fetch to 
//standardize our error handling.


const listApiFetch = function (...args) {
  // setup var in scope outside of promise chain
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        // if response is not 2xx, start building error object
        error = { code: res.status };
        // if response is not JSON type, place statusText in error object and
        // immediately reject promise
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }

      // otherwise, return parsed JSON
      return res.json();
    })
    .then(data => {
      // if error exists, place the JSON message into the error object and 
      // reject the Promise with your error object so it lands in the next 
      // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
      // will respond with a JSON object containing message key
      if (error) {
        error.message = data.message;
        
        /*
        store.store.error = error.message;
        console.log(store.store.error);
        bookmarkApp.renderError();
        */

        return Promise.reject(error);
      }

      // otherwise, return the json as normal resolved Promise
      return data;
    });
};


/** 
 * Now we need 4 ways to communicate with the API.
 * We need to be able to 'get' the api server state,
 * 'post' new bookmarks to the server,  'patch' (update)
 * bookmarks in the server, and 'delete' items in the server.
 */

//getItems simply GETS the api server (api store) state

const getItems = function () {
  return listApiFetch(BASE_URL);
};

//createItem POSTS a new item to the api




const createItem = function (bookmark) {
  let newBookmark = JSON.stringify(bookmark);
  console.log(newBookmark);
  return listApiFetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  });
};

 

//updateItem PATCHES an item within the api

const updateItem = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
};

//deleteItem DELETES a bookmark from the api server

const deleteItem = function (id) {
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
};

//Need to export all of these api manipulating functions

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  
};
