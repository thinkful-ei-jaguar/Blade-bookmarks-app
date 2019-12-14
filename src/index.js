import $ from 'jquery';

import './index.css';


/**
 * This file will tie the others together, so that 
 */

function main() {
  console.log('DOM is loaded');

  const startMsg = $('<p>Webpack is working!</p>');
  $('#root').append(startMsg);
}

$(main);