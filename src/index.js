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
 
const main = function () {}

 function main() {
  console.log('DOM is loaded');

  const startMsg = $('<p>Webpack is working!</p>');
  $('#root').append(startMsg);
}

$(main);