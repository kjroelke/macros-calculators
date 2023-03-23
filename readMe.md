# Macro Calculator

A macro calculator to help simplify calculations for my wife's business.

Developed in MVC Pattern with 7-1 SCSS structure.

# Changelog

## v1.2.5

- Minor UI tweaks

## v1.2.4

- Switched number input type to work better for mobile UIs.

## v1.2.3

- Fixed UI for mobile devices so the output isn't hilariously large.

## v1.2.2

- Bug fixes.
- Better UI for mobile devices.

## v1.2.1

Refactored underlying JS for proper MVC architecture.

## v1.2

### Password Protected!

The calculator now has a very basic password protection so it can be publically viewable and still inaccessible (as this is a private tool for Sara's business and a personal point of pride for me as a web developer).

Also added a quick AJAX request to ipinfo.io to bypass the password if we're at home so we don't have to type in the password (as that will most likely be 95% of use cases for this tool for now).

## v1.1

### The Calculator has a new UI!

I've updated the tool to have Macros By Sara official branding, as well as set the desktop version to be a 2-column flex-grid that utilizes `position:sticky` to keep the results in-focus.

_No more scrolling to see the numbers being crunched!_

### Dev notes

- Now firing `myCopright()` inside `init()`
  - `myCopyright()` is now located inside of newly-renamed `utilities.js` module
- Added docs in `view.js`
- Refactored SCSS to implement `@use` in favor of deprecated `@import`

## v 1.0

Init.
