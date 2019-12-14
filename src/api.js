//This will be our base api url that we append specific queries to
const BASE_URL = '';


/**
 * listApiFetch will be our wrapper function for fetch to standardize
 * our error handling.
 * 
 * 
 */

const listApiFetch = function (...args) {};

/** 
 * Now we need 4 ways to communicate with the API.
 * We need to be able to 'get' the api server state,
 * 'post' new bookmarks to the server,  'patch' (update)
 * bookmarks in the server, and 'delete' items in the server.
 */

//getItems simply GETS the api server (api store) state

const getItems = function () {};

//createItem POSTS a new item to the api

const createItem = function () {};

//updateItem PATCHES an item within the api

const updateItem = function () {};

//deleteItem DELETES a bookmark from the api server

const deleteItem = function () {};

//Need to export all of these api manipulating functions

export default {
  getItems,
  createItem,
  uppdateItem,
  deleteItem
};
