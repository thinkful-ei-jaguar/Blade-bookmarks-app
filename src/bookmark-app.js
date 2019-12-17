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
        <li class = 'bookmark-element' data-item-id="${element.id}" id = 'expanded-li-element' tabindex = "0">
          <div class = 'expanded-bookmark-title'>${element.title}</div><div class = 'expanded-bookmark-rating'>Rated ${element.rating}/5</div>
          <div class = 'break'></div>
          <a href = '${element.url}' target = "_blank">${element.url}</a>
          <button class = 'delete-bookmark-button'>Delete Bookmark?</button>
          <div class = 'break'></div>
          <p>Description:  ${element.desc}</p>
        </li>
        
          
    
       
  `;
  } else {
  
    return `
        <li class = 'bookmark-element' data-item-id="${element.id}" tabindex = "0">
          <span class = 'bookmark-title'>${element.title}</span><span class = 'bookmark-rating'>
          Rated ${element.rating}/5
          </span>
        </li>
  `;}
};

//generateBookmarkString will string together each of the 
//generated html portions to create the entire list of bookmarks
//Might want to split up each html generation into its own separate
//function.  Yep, having to do that with the adding view.

const generateAddFilterString = function () {
  return `
  <form id = 'bookmarks-form'>
  <section>
      <h1>My Bookmarks</h1>
      <div class = 'add-filter-buttons'>
      <button class = 'add-entry-button' type = 'button'>Add Bookmark</button>
      <label for="filter-button"></label>
      <select name="ratings" id="filter-button">
        <option value="1">Filter By Rating</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars or more</option>
        <option value="3">3 Stars or more</option>
        <option value="2">2 Stars or more</option>
        <option value="1">1 Star or more</option>
      </select>
      </div>
    </section>  
    </form>
  `;
};

const generateBookmarkString = function (bookmarkList, filterValue) {
  const bookmarks = bookmarkList.map((item) => generateBookmarkElement(item, filterValue));
  const addFilter = generateAddFilterString();
  // eslint-disable-next-line quotes
  const ulStart = `<ul class = 'bookmarks-section'>`;
  // eslint-disable-next-line quotes
  const ulEnd = `</ul>`;
  // eslint-disable-next-line quotes
  const divError = `<div class = 'error-container'></div>`;
  return divError+addFilter + ulStart + bookmarks.join('') + ulEnd;
};

//generateAddingString will generate an html string for the adding a bookmark view

const generateAddingString = function () {
  let addingString = `
  <h1>My Bookmarks</h1>
  <div class = 'error-container'></div>
  <form id = "bookmarks-form">
  <label for="new-bookmark-name">Enter a new bookmark here:</label>
      <input type="text" name = "new-bookmark-name" id = "new-bookmark-name" placeholder = "New bookmark name" required>
      <div class = 'break'></div>
      <label for="new-bookmark-url">Enter the URL.  Please include the https://</label>
      <input type="url" name = "new-bookmark-url" id = "new-bookmark-url" placeholder = "https://www.example.com" pattern = "https://.*" required>
      <div class = 'break'></div>
      <label for = "new-bookmark-rating"">Give it a rating</label>
      <select name="ratings" id="rating-dropdown">
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      <div class = 'break'></div>
      <label for="new-bookmark-description">Enter a description for the bookmark:</label>
      <textarea name="new-bookmark-description" id="new-bookmark-description" cols="20" rows="10" placeholder="Enter your description here"></textarea>
      <div class = 'break'></div>
      <button class = 'create-new-bookmark' type = 'submit'>Create New Bookmark</button>
      <button class = 'cancel-new-bookmark' type = 'reset'>Cancel</button>
    </form>
      `;
  $('body').html('');
  $('body').html(addingString);
};

//generateError will create the html to display the error message

const generateError = function (message) {
  return `
      
      <p>Error!  The following error has occurred: ${message}</p>
      <button id='cancel-error'>Okay :-(</button>
  `;
};

//renderError checks the store to see if there is an error
//if there is one, it passes it to generateError

const renderError = function () {
  if (store.error) {
    const el = generateError(store.error);    
    $('.error-container').html(el);  
  } else {
    $('.error-container').empty();
  }
};

//handleCloseError just listens on the error message 
//for when the user closes it

const handleCloseError = function () {
  $('body').on('click', '#cancel-error', () => {
    console.log('Calling handleCloseError');
    store.setError(null);
    renderError();
  });
};

//render is what it sounds like :-)

const render = function () {
  console.log('Render function fired');
  renderError();
  let filterValue = store.filter;
  let bookmarks = store.bookmarks;
  console.log(bookmarks);
  
  if (store.adding === true) {
    return generateAddingString();
  } else { 
    const bookmarkString = generateBookmarkString(bookmarks, filterValue);
    $('body').html('');
    $('body').html(bookmarkString);
  }

};

//handleNewBookmarkClick listens for a user to click 'add bookmark'

const handleNewBookmarkClick = function () {
  $('body').on('click', '.add-entry-button', function (event) {
    event.preventDefault();
    console.log('Add bookmark button clicked');
    store.adding = true;
    store.bookmarks.forEach(element => element.expanded = false);
    render();
  });
};


//handleNewBookmarkCancel listens for a user to click 'cancel' if they are done
//adding bookmarks or wish to discard the current one

const handleNewBookmarkCancel = function () {
  $('body').on('click', 'button.cancel-new-bookmark', function (event) {
    event.preventDefault();
    store.adding = false;  
    return render();
  });
};


//handleNewBookmarkSubmit listens for a user to click 'create' after filling out a
//new bookmark info

const handleNewBookmarkSubmit = function () {


  $('body').on('submit', 'form', function (event) {
    event.preventDefault();

    console.log('Create new bookmark clicked');

    let newBookmarkName = $('#new-bookmark-name').val();
    

    let newUrlName = $('#new-bookmark-url').val();

  
    let newRating = parseInt($('#rating-dropdown').val());
   

    let newDescription = $('#new-bookmark-description').val();
   

    const newBookmarkEntry = {
      title: newBookmarkName,
      url: newUrlName,
      desc: newDescription,
      rating: newRating
    };


    
    api.createItem(newBookmarkEntry)
      .then((res) => {
        console.log(res);
        store.addItem(res);  
        store.adding = false;
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        //alert(`testing newbookmark with error messages ${error.message}`);
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
    store.filter = filterValue;
    store.bookmarks.forEach(element => element.expanded = false);
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
    store.bookmarks.forEach(element => {
      if (element.id === id) {
        element.expanded = !element.expanded;
        return render();
      }
    });
  });
};

//handleExpandKeyboard does the same as above with the keyboard
const handleExpandKeyboard = function () {
  $('body').on('keypress', 'li.bookmark-element', function (event) {
    
    if (event.target !== this) {
      return;
    }   
    event.preventDefault();
    event.stopPropagation();
    console.log('You clicked a list item');
    const id = getItemIdFromElement(event.currentTarget);
    console.log(id);
    store.bookmarks.forEach(element => {
      if (element.id === id) {
        element.expanded = !element.expanded;
        return render();

      }
    });
    $('#expanded-li-element').focus();
  });
};


//handleDeleteBookmarkClicked will listen for when a user deletes
//a bookmark item

const handleDeleteBookmarkClicked = function () {
  $('body').on('click', '.delete-bookmark-button', function (event) {
    console.log('Delete button clicked');
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id)
      .then(() => {
        store.findAndDelete(id);
        return render();                      
        // eslint-disable-next-line indent
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
  handleNewBookmarkCancel();
  handleNewBookmarkClick();
  handleDeleteBookmarkClicked();
  handleEditBookmarkSubmit();
  handleExpandBookmark();
  handleCloseError();
  handleRatingsDropdown();
  handleExpandKeyboard();
};

export default {
  render,
  renderError,
  bindEventListeners
};








