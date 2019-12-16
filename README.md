This is Blade's solo bookmark app project.  

"Stay awhile and listen." -Deckard Cain

I can add bookmarks to my bookmark list. Bookmarks contain:

title
url link
description
rating (1-5)

/** Yes, but the description is optional and rating is prechosen (to avoid null)


I can see a list of my bookmarks when I first open the app.
All bookmarks in the list default to a "condensed" view showing only title and rating.

/** Yep

I can click on a bookmark to display the "detailed" view.
Detailed view expands to additionally display description and a "Visit Site" link

/** Yes you can, but the interface is currently (temporarily) hideous

I can remove bookmarks from my bookmark list

/** Yes you can, but I had to "cheat" and use a page reload because it wouldn't rerender

I receive appropriate feedback when I cannot submit a bookmark

/** Yes, but for some reason when you click okay you're going to be taken back to the main view.  I am going to put in a ticket for this to get help on Monday

I can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection

/** You sure can and it actually works cleanly.  Unfortunately it does not sort them in order of ratings, which would be cool but I probably won't have time for.


(Extension feature - optional) I can edit the rating and description of a bookmark in my list

/** No, you can't, but if I finish making it look pretty in time I will add that in :-)