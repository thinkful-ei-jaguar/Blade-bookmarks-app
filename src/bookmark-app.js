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

const generateBookmarkElement = function (element) {
  if (element.expanded) {
    return `
        <li class = 'bookmark-element'>
          ${element.title}
          <span class = 'bookmark-rating'>Rated ${element.rating}/5</span>
        </li>
        <div class = 'visit-delete-bookmark'></div>
          <button class = 'visit-bookmark-button'>Visit Site</button>
          <button class = 'delete-bookmark-button'>Delete Bookmark?</button>
       </div>
       <p>Description:  This will be the description that the user can enter for a particular bookmark.  It will only be visible when this item is clicked on.</p>
  `;
  } else {
  
    return `
        <li class = 'bookmark-element'>
          ${element.title}
          <span class = 'bookmark-rating'>Rated ${element.rating}/5</span>
        </li>
  `;}
};

//generateBookmarkString will string together each of the 
//generated html portions to create the entire list of bookmarks
//Might want to split up each html generation into its own separate
//function

const generateBookmarkString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((item) => generateBookmarkElement(item));
  return bookmarks.join('');
};

//generateExpandedString will generate an html string for the expanded view

const generateAddingString = function () {
  let addingString = `
  <label for="new-bookmark-name">Enter a new bookmark here:</label>
      <input type="text" name = "new-bookmark-name" id = "new-bookmark-name" placeholder = "New bookmark name">
      <label for="new-bookmark-url">Enter the URL:</label>
      <input type="text" name = "new-bookmark-url" id = "new-bookmark-url" placeholder = "https://www.example.com">
      <select name="ratings" id="filter-button">
          <option value="">Select a Rating</option>
          <option value="five-star">5 Stars</option>
          <option value="four-star">4 Stars</option>
          <option value="three-star">3 Stars</option>
          <option value="two-star">2 Stars</option>
          <option value="one-star">1 Star</option>
        </select>
      <label for="new-bookmark-description">Enter a description for the bookmark:</label>
      <textarea name="new-bookmark-description" id="new-bookmark-description" cols="40" rows="10" placeholder="Enter your description here"></textarea>
      <button class = 'cancel-new-bookmark'>Create</button>
      <button class = 'create-new-bookmark'>Cancel</button>
      `;

  $('.bookmarks-section').html(addingString);
};

//generateError will create the html to display the error message

const generateError = function  () {};

//renderError checks the store to see if there is an error
//if there is one, it passes it to generateError

const renderError = function () {};

//handleCloseError just listens on the error message 
//for when the user closes it

const handleCloseError = function () {};

//render is what it sounds like :-)

const render = function () {
  console.log('Render function fired');
  let bookmarks = store.store.bookmarks;

  if (store.store.adding) {
    return generateAddingString();
  } 

  const bookmarkString = generateBookmarkString(bookmarks);

  $('.bookmarks-section').html(bookmarkString);

};

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








