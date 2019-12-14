import $ from 'jquery';

import 'normalize.css';
import './index.css';

import api from './api';
import store from './store';
import bookmarkApp from './bookmark-app';

/**
 * This file will tie the others together, so that 
 * our modules and webpack work together correctly.
 * This will also contain the main jquery function that fires when
 * the dom is loaded.
 */

//Fires when the dom is loaded.  This makes the store reflect the server.
const testBookmark = {
  "title": "DefNotYahoo",
  "url": "http://www.yahoo.com",
  "desc": "definitely not yahoo",
  "rating": 5
};

const main = function () {
  // eslint-disable-next-line quotes
  console.log("It's alive!!!!");
  api.getItems()
    .then(res => res.json())
    .then(res => console.log(res));

  console.log(`${JSON.stringify(testBookmark)}`);
  api.createItem(testBookmark)
    .then(res => res.json())
    .then(res => console.log(res));

  bookmarkApp.bindEventListeners();
  bookmarkApp.render();
};

$(main);