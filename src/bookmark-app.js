/**
 * This file will contain all event listeners and DOM manipulation.
 * It could quickly get pretty large and convoluted, so I 
 * might break it into multiple files if it gets unmanageable.
 * Or, I might consider putting the html generating functions
 * in their own files.
 * 
 * For now I will attempt to keep it all here and keep it
 * well commented and under control.
 *
 */


import $ from 'jquery';

import store from './store';
import api from './api';


//generateBookmarkElement will generate the html for an addition
//to the bookmark list

const generateBookmarkElement = function () {};

//generateBookmarkString will string together each of the 
//generated html portions to create the entire list of bookmarks

const generateBookmarkString = function () {};

//generateError will create the html to display the error message

const generateError = function  () {};

//renderError checks the store to see if there is an error
//if there is one, it passes it to generateError

const renderError = function () {};

//handleCloseError just listens on the error message 
//for when the user closes it

const handleCloseError = function () {};

//render is what it sounds like :-)

const render = function () {};

//handleNewBookmarkSubmit listens for a user to click 'add bookmark'

const handleNewBookmarkSubmit = function () {};

//getItemIdFromElement returns .data about an item...will have to return to this one

const getItemIdFromElement = function () {};

//handleDeleteBookmarkClicked will listen for when a user deletes
//a bookmark item

const handleDeleteBookmarkClicked = function () {};

//handleEditBookmarkSubmit will listen for when a user wants to
//edit a bookmark item

const handleEditBookmarkSubmit = function () {};

//Now we'll make an event listener binding function, so that we
//can call them from anywhere with one function

const bindEventListeners = function () {
  handleNewBookmarkSubmit();
  handleDeleteBookmarkClicked();
  handleEditBookmarkSubmit();
  handleCloseError();
};

export default {
  render,
  bindEventListeners
};








