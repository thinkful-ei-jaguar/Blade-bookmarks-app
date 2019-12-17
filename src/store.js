/**
 * This file will contain the local store and
 * all functions used to interact with the store
 * locally.  The functions in api.js will call these 
 * functions after manipulating the actual api.
 * 
 * I might need a global variable or two.  I'm 
 * going to use as few as possible.  Starting off,
 * the store will be the only 'global.'
 */

//For now, I'm going to stick a test bookmark here,
//for any testing with local functions.

const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 1
};

//findById will find a bookmark in the store by the id passed in

const findById = function (id) {
  return this.store.bookmarks.find(currentItem => currentItem.id === id);
};

//addItem will add a bookmark to the local store

const addItem = function (bookmark) {
  bookmark.expanded = false;
  this.store.bookmarks.push(bookmark);
  
};

//findAndDelete will delete a bookmark from the local store

const findAndDelete = function (id) {
  this.store.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.id !== id);
};

//findAndUpdate will change a bookmark currently in the local store

const findAndUpdate = function (id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};


//setError will updatte the error in the store to reflect
//what has been passed in from the api error functions

const setError = function (error) {
  this.error = error;
};

export default {
  store,
  findById,
  addItem,
  findAndDelete,
  findAndUpdate,
  setError
};

