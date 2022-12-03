# Development

### Link to Deployed Website

https://volatilepenguin222.github.io/development/`

### Goal and Value of the Application

This site's goal is to share my opinion of bread or bread-remisicient things. The value is in terms of creativity and experience, meant to inspire users to try various breads or think more about them!

Tiers range from S-A-B-C-D-E-F. Ratings are more sporadic and based on smaller details, but they allow a user to aggregate something while they add or remove breads from their would-eat-right-now list.

### Usability Principles Considered

A user can sort items by their deemed tier, rating, or alphabetically. Additionally, they can filter by flavor profile (sweet, savory, or versatile) and dietary restrictions (egg-free, gluten-free, nut-free, and dairy-free). Taste filtering uses radio buttons, since items fall into only one of the three categories, and dietary restriction filtering uses checkboxes, as an item can fall into multiple categories.

### Organization of Components

- radio button component + checkbox component
  These components and the functions involved with them utilize props to pass item information amongst the functions before the final state for the overall filtered and sorted list is set.

- reset filter button
  On click, this button sets filter states to their initial state, which are stored as consts.

- add-to-favorites toggle button component + agreggator component
  These are maintained by a state array of booleans, one per item, and an empty state array for favorited items. If an 'add' button is clicked, then the relevant state array item will be updated to True, the itme will be added to the state favorites list, and the rating of that item will be added to the total state. In the other case (the item was previously added, now the button has been toggled to its 'remove' option), then the same toggling steps will occur, with subtraction rather than addition.

- bread item component
  This component allows me to utilize an identical layout for each item of data.

### How Data is Passed Down Through Components

Bread data is an object stored in a JSON format in bread-data.json. This data is passed through various sort and filter functions until it is passed through a BreadItem.js component and rendered on the platform. Upon any sorting or filtering button click, Data will be filtered by the user-determined taste, then dietary restrictions, then sort. If the Favorites option is toggled, then this occurs before sort. Finally, each data is mapped as its own item with its own add-to-favorites toggle button. Pressing the favorites toggle button of an item uses the rating of that item to either be added or subtracted (depending if the user favorites or unfavorites) to the total rating.

### How the User Triggers State Changes

Using various forms of buttons (default, radio, checkboxes) that are marked with onChange/onClick operations leading to update-state-functions, a user will trigger State changes.
