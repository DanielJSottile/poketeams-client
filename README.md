# PokéTeams

Link: https://poketeams.now.sh

Test Login Users: 

UserName: test
Password: password

Please only create teams in a new test folder by copying from the export of another team; PLEASE DO NOT DELETE ANY OF MY TEAMS!

## API Documentation

- '/api/all/search[params]' : This gets 10 public teams with optional search parameters.
- '/api/all/:team_id' : This gets 1 team by its ID.
- '/api/all/:team_id/sets' : This gets all the sets for a team by its ID.
- 'api/all/set/:set_id : This gets 1 set by its ID.

(API calls below require User Authentication)

- /api/build/folder/:folder_id : Allows the user to get and delete a set by its ID.
- /api/build/folders/:user_id : Allows to get all User Folders, as well as post/patch them.
- /api/build/folders/:user_id/filter/ : Allows the user to get their folders when applied to the search filter.
- /api/build/teams/:user_id : Allows the user to get all User Teams, as well as post/patch them.
- /api/build/team/:team_id : Allows the user to get and delete a team by its ID.
- /api/build/teams/:user_id/filter/ : Allows the user to get their teams when applied to the search filter.
- /api/build/sets/:user_id : Allows the user to get all User Sets, as well as post/patch them.
- /api/build/set/:team_id/:set_id : Allows the user to get and delete a set by its team ID and its own ID.
- /api/build/sets/:user_id/filter/ : Allows the user to get their sets when applied to the search filter.

## Screenshots

### Organizing with Folders, Teams, Sets

![Organize page](https://imgur.com/9wYBaMQ.png "Organize")

### Editing a Set

![Editing Sets](https://imgur.com/HR1yjKA.png "Editing Sets")

### Example of a Search and Results

![Search Bar and Results](https://imgur.com/JwMxPdp.png "search bar and results")

### Example of Exporting and the Share URL

![Exporting](https://imgur.com/JWIgCyL.png "exporting")

## Summary

### What does this app do?

This app is designed as a permanent solution to an extremely niche problem: safely storing Pokemon Showdown teams in a permanent way for tens of thousands of users.  Before, players needed to export batches of text to a pastebin and save/share the URL in order to access it in the future.  Now, users can import text and have an interactive and shareable team that is easier to find, share, and edit in a permanent database.  Not only that, but new players can look for teams with Pokemon they want specically on that team!

### Features

- Allows the public to look through 10 current teams based on search parameters!
- Allows the public to look through the next or previous 10 teams!
- Allows the public to search the public database based on Species and Sorting options!
- Allows users to create Folders to store Teams!
- Allows users to create a brand new team from scratch, with an optional team import from Pokemon Showdown (This populates the sets of the team automatically)!
- Allows users to add Pokemon to a team (This creates a default Pokemon)!
- Allows users to edit this Pokemon either by parameters or by importing a set from Pokemon Showdown (this will populate the fields of the set automatically)!
- Allows users to edit and delete these as desired!
- Allows users to search through their own sets by Species and sort parameters!

### List of Future Additions to this app!

In the future...

- More refined data extraction from a database!  Things will run faster!
- Ability to Import the contents of an entire Folder, which will automatically create teams and sets in those teams!
- Ability to Import EVERYTHING!  Users will simply be able to backup their teams from Pokemon Showdown and then paste it into one box.  This will populate all their teams, and the user can do this at any given time.
- Ability to like teams and add them to a Favorites Folder for the user!  The most liked teams can be searchable via the search parameters!
- A refined Team and Set view more akin to Pokemon Showdown, more compactified and better visualization for Stats for better teambuilding!
- More customization!  An open forum that allows users to request custom Pokemon for use in the app!
- And MORE!


## List of Tech Used!
- JavaScript
- React
- Node.js
- CSS
- HTML5
- Jest
- Enzyme
- Mocha
- Chai
- Supertest
- XSS
- Winston
- NYC
- PostgresQL
- Knex

...As well as additional resources from:
- Pokemon Showdown Sprite Repository: 'http://play.pokemonshowdown.com/sprites/'

...And a shoutout to the hardworking people at Smogon, Game Freak, and the Pokemon Company!
