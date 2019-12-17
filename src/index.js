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
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      console.log(store, "26");
      store.bookmarks.forEach((item) => item.expanded = false);
      bookmarkApp.render(1);
    })
    .catch((error) => {
      console.log(store, "31");
      store.setError(error.message);
      //alert(`testing newbookmark with error messages ${error.message}`);
      bookmarkApp.renderError();
    });


  bookmarkApp.bindEventListeners();
  bookmarkApp.render(1);
};

$(main);