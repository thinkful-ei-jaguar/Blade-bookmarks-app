# My Bookmarks

This is Blade's solo bookmark app project.  

#### It allows a user to create bookmarks with links to websites.  The bookmarks have a title, url, rating, and description that are provided by the user.


## User Stories

1.) I can add bookmarks to my bookmark list. Bookmarks contain:

  a.) title
  b.) url link
  c.) description
  d.) rating (1-5)

/** Yes, but the description is optional and rating defaults to 5 if
one is not chosen.  Also, no pretty stars :(


2.) I can see a list of my bookmarks when I first open the app.
All bookmarks in the list default to a "condensed" view showing only title and rating.

/** Yes.  Bookmarks also condense whenever applying a filter or going to the
add bookmark section and adding a bookmark or canceling.

3.) I can click on a bookmark to display the "detailed" view.
Detailed view expands to additionally display description and a 
"Visit Site" link

/** Yes you can.  Unfortunately for keyboard users, your focus switches back
to the first tabindex on the page after you close an expanded bookmark.  Trying to see if I can change this.

4.) I can remove bookmarks from my bookmark list

/** Yes you can

5.) I receive appropriate feedback when I cannot submit a bookmark

/** Yes you do.  As a user you will probably only get an html based error if you fill out the add bookmark form incorrectly.  However if there is a 40x error code
it will display at the top of the app.


6.) I can select from a dropdown (a select element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection.  <br />


/** You sure can and it actually works cleanly.  Unfortunately it does not sort them in order of ratings, which would be cool but I probably won't have time for.    

### App Link

https://thinkful-ei-jaguar.github.io/Blade-bookmarks-app/dist/