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
import { filter } from 'minimatch';


//generateBookmarkElement will generate the html for an addition
//to the bookmark list

const generateBookmarkElement = function (element, filterValue) {
  if (element.rating < filterValue) {
    return '';
  }
  if (element.expanded) {
    return `
        <li class = 'bookmark-element' data-item-id="${element.id}">
          ${element.title}
          <span class = 'bookmark-rating'>Rated ${element.rating}/5</span>
          <a href = '${element.url}' target = "_blank">${element.url}</a>
          <button class = 'delete-bookmark-button'>Delete Bookmark?</button>
        </li>
        
          
    
       <p>Description:  ${element.desc}</p>
  `;
  } else {
  
    return `
        <li class = 'bookmark-element' data-item-id="${element.id}">
          ${element.title}
          <span class = 'bookmark-rating'>Rated ${element.rating}/5</span>
        </li>
  `;}
};

//generateBookmarkString will string together each of the 
//generated html portions to create the entire list of bookmarks
//Might want to split up each html generation into its own separate
//function.  Yep, having to do that with the adding view.

const generateBookmarkString = function (bookmarkList, filterValue) {
  const bookmarks = bookmarkList.map((item) => generateBookmarkElement(item, filterValue));
  return bookmarks.join('');
};

//generateAddingString will generate an html string for the adding a bookmark view

const generateAddingString = function () {
  let addingString = `
  <label for="new-bookmark-name">Enter a new bookmark here:</label>
      <input type="text" name = "new-bookmark-name" id = "new-bookmark-name" placeholder = "New bookmark name">
      <label for="new-bookmark-url">Enter the URL.  Please include the https://</label>
      <input type="text" name = "new-bookmark-url" id = "new-bookmark-url" placeholder = "https://www.example.com">
      <select name="ratings" id="rating-dropdown">
          <option value="">Select a Rating</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      <label for="new-bookmark-description">Enter a description for the bookmark:</label>
      <textarea name="new-bookmark-description" id="new-bookmark-description" cols="40" rows="10" placeholder="Enter your description here"></textarea>
      <button class = 'create-new-bookmark'>Create</button>
      <button class = 'cancel-new-bookmark'>Cancel</button>
      `;

  $('.bookmarks-section').html(addingString);
};

//generateError will create the html to display the error message

const generateError = function (message) {
  return `
    <dialog class = 'error-content' open>
      <p>${message}</p>
      <button id='cancel-error'>Okie Dokie</button>
    </dialog>
  `;
};

//renderError checks the store to see if there is an error
//if there is one, it passes it to generateError

const renderError = function () {
  if (store.store.error) {
    generateError(store.store.error);    
  }
};

//handleCloseError just listens on the error message 
//for when the user closes it

const handleCloseError = function () {
};

//render is what it sounds like :-)

const render = function (filterValue = 1) {
  console.log('Render function fired');
  renderError();
  let bookmarks = store.store.bookmarks;

  if (store.store.adding) {
    return generateAddingString();
  } 

  const bookmarkString = generateBookmarkString(bookmarks, filterValue);

  $('.bookmarks-section').html(bookmarkString);

};

//handleNewBookmarkClick listens for a user to click 'add bookmark'

const handleNewBookmarkClick = function () {
  $('form').on('click', '.add-entry-button', function (event) {
    event.preventDefault();
    console.log('Add bookmark button clicked');
    store.store.adding = true;
    handleNewBookmarkSubmit();
    render();
  });
};

//handleNewBookmarkSubmit listens for a user to click 'create' after filling out a
//new bookmark info

const handleNewBookmarkSubmit = function () {
  $('.bookmarks-section').off('click').on('click', '.cancel-new-bookmark', function (event) {
    event.preventDefault();
    store.store.adding = false;
    render();
  });
  


  $('.bookmarks-section').off('click').on('click', '.create-new-bookmark', function (event) {
    event.preventDefault();
    let newBookmarkName = $('#new-bookmark-name').val();
    console.log(newBookmarkName);

    let newUrlName = $('#new-bookmark-url').val();
    console.log(newUrlName);
  
    let newRating = parseInt($('#rating-dropdown').val());
    console.log(newRating);

    let newDescription = $('#new-bookmark-description').val();
    console.log(newDescription);

    const newBookmarkEntry = {
      title: newBookmarkName,
      url: newUrlName,
      desc: newDescription,
      rating: newRating
    };
    
    api.createItem(newBookmarkEntry)
      .then(res => res.json())
      .then((newItem) => {
        store.addItem(newItem);
        renderError();
        store.store.adding = false;
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
      
  });

};

//getItemIdFromElement returns .data about an item...will have to return to this one


const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.bookmark-element')
    .data('item-id');  
};

//handleRatingsDropdown will update the view of the bookmarks to reflect
//the filter chosen by the user

const handleRatingsDropdown = function () {
  $('body').on('change', '#filter-button', function (event) {
    event.preventDefault();
    const filterValue = parseInt($('#filter-button').val());
    render(filterValue);
  });  
};


//handleExpandBookmark will change to expanded view and back when item
//is clicked

const handleExpandBookmark = function () {
  $('body').on('click', 'li.bookmark-element', function (event) {
    if (event.target !== this) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    console.log('You clicked a list item');
    const id = getItemIdFromElement(event.currentTarget);
    console.log(id);
    store.store.bookmarks.forEach(element => {
      if (element.id === id) {
        element.expanded = !element.expanded;
        return render();
      }
    });
  });
};

//handleDeleteBookmarkClicked will listen for when a user deletes
//a bookmark item

//This doesn't work right yet.  It is functional but
//has to use location.reload(), which in my mind isn't right.
const handleDeleteBookmarkClicked = function () {
  $('form').on('click', '.delete-bookmark-button', function (event) {
    console.log('Delete button clicked');
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id)
      .then(res => res.json)
      .then(res => store.findAndDelete(res))
      .then(res => api.getItems())
      .then(res => {
        render();
        //I don't like this.  I shouldn't have to do this right?
        location.reload();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
      
    
    
  });
};

//handleEditBookmarkSubmit will listen for when a user wants to
//edit a bookmark item

const handleEditBookmarkSubmit = function () {};

//Now we'll make an event listener binding function, so that we
//can call them from anywhere with one function

const bindEventListeners = function () {
  handleNewBookmarkSubmit();
  handleNewBookmarkClick();
  handleDeleteBookmarkClicked();
  handleEditBookmarkSubmit();
  handleExpandBookmark();
  handleCloseError();
  handleRatingsDropdown();
};

export default {
  render,
  bindEventListeners
};








