import $ from 'jquery';

import 'normalize.css';
import './index.css';

import api from './api';
import store from './store';
import bookmarkApp from './bookmark-app';
import newBookmark from './api';

/**
 * This file will tie the others together, so that 
 * our modules and webpack work together correctly.
 * This will also contain the main jquery function that fires when
 * the dom is loaded.
 */

//Fires when the dom is loaded.  This makes the store reflect the server.
const testBookmark = {
  title: "not youtube",
  url: "https://www.youtube.com"
};

const updateData = {
  title: "definitely not not youtube",
  url: "https://www.google.com"
};


let id = "ck464zl5o00070kz1g2ttxfue";


const main = function () {
  // eslint-disable-next-line quotes
  console.log("It's alive!!!!");
  api.getItems()
    .then(res => res.json())
    .then(res => console.log(res));
  
  /*
  api.createItem(testBookmark)
    .then(res => res.json())
    .then(res => console.log(res));
  
  */
  /*
  api.deleteItem(id)
    .then(res => res.json())
    .then(res => console.log(res));
  */
  /*
  api.updateItem(id, updateData)
    .then(res => res.json())
    .then(res => console.log(res));  
  */
  

  bookmarkApp.bindEventListeners();
  bookmarkApp.render();
  console.log('Called render function');
};

$(main);