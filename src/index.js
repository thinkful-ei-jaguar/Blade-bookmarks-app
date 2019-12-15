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


const main = function () {
  // eslint-disable-next-line quotes
  api.getItems()
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      res.forEach((item) => store.addItem(item));
      store.store.bookmarks.forEach((item) => item.expanded = false);
      bookmarkApp.render();
    });


  bookmarkApp.bindEventListeners();
  bookmarkApp.render();
};

$(main);