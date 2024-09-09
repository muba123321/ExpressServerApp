# ExpressServerApp
## Activity Management App
An Activity Management application built with Node.js, Express.js, and EJS. Users can create activities, specify privacy (public or private), and select participants. The app provides a user-friendly interface to manage and view activities dynamically.

### Features
 * Create new activities with details like name, description, date, and privacy settings.
 * Select multiple participants for private activities.
 * List all activities with a modern, responsive design.
 * Public and private activity filtering.
 * Dynamic user list for participants.
 * Sleek and modern UI with custom-styled form elements.
 * Technologies Used
 * Node.js: JavaScript runtime environment
 * Express.js: Web framework for Node.js
 * EJS: Templating engine for server-side rendering
 * CSS: For styling the application
 * Nodemon: For automatic server restarts during development

1. Home Page
The home page lists all the activities created by users. Each activity card displays:

 * Activity name
 * Description
 * Date
 * Privacy (public or private)
 * Number of participants
2. Create New Activity
Click the Create Activity link in the navigation bar to navigate to the Create Activity form. The form allows you to:

 * Add the activity name, description, participants and date.
 * Choose the privacy setting (public or private).
 * Select participants from a multi-select dropdown (private activities only).
3. View All Activities
You can view all the activities listed on the homepage. Private activities will only be visible to the selected participants when creating the activity.
