# Project #3: LifeTracker Application

## Overview

> Data is the new oil - Clive Humbly

Everywhere around us is data waiting to be collected and utilized. In recent years, we've seen the rise of applications and services that exist to quantify concepts that were previously hard to capture. FitBit, Apple Health, and Woop are all $1 billion dollar services to offer tracking statistics about how we live our lives. The LifeTracker app you'll be building will do exactly that - track your life by quantifying your activity.

## Goals

By the end of this project you will be able to...

- [X] Develop a full-fledged authentication system using PostgreSQL and `bcrypt`
- [X] Provide users with an Express API they can interact with to store user-related activity
- [X] Construct multiple models that implement the core business logic associated with tracking users' lives
- [X] Write SQL queries that aggregate user statistics and provide summary overviews about their activity
- [X] Design a React frontend that interacts with the API using an API service class
- [X] Build multiple pages and forms that communicate with the server using HTTP requests
- [X] Employ `useEffect` and `useState` hooks to manage application state on the frontend
- [X] Store user-authenticated JWT tokens in the browser's local storage for persisted authentication

## Application Features

### Core Features

- [X] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about. *Note:* This is the only page that unauthenticated users should be able to view.
- [X] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [X] **Login Page:** A form that allows users to login with email and password.
- [X] When a user first authenticates, they should be redirected to an authenticated view (i.e., the detailed activity page). When they sign out, all frontend data should be reset.
- [X] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [X] If the user is logged in, it should display a **Sign Out** button.
  - [X] If no user is logged in, it should display **Login** and **Register** buttons.
  - [X] Display a logo on the far left side, and contain links to the individual detailed activity pages.
- [X] Users should have the ability to track at least **one** type of activity (i.e., nutrition, exercise, sleep, etc.). Each activity should be tracked on separate pages.
- [X] **Detailed Activity Page:** Display and enter activities.
  - [X] Display a feed of all previously tracked activities.
  - [X] A form to enter relevant information (i.e., if tracking nutrition, the user can enter calories, timestamp, image, category, etc.).
  - [X] Each activity tracked is given a unique ID for easy lookup.
- [X] Deploy your website with Render. Check out our [Render Deployment Guide](https://courses.codepath.org/snippets/site/render_deployment_guide) for detailed instructions.

### Video Walkthrough Week 2
https://drive.google.com/file/d/1XnT90cItQSgiODGBka4ooS_2dBswP4n2/view

### Deployed Website Link
https://lifetracker-ui-4pqm.onrender.com/ 

### Stretch Features

Implement any of the following features to improve the application:

- [X] Users have access to an overview Activity page that shows one summary statistic about each of the three types of activity tracked (i.e., total number of minutes exercised, average calories consumed, max hours of sleep in one night, etc.). These summary statistics should be created using the `AVG`, `SUM`, `COUNT`, `MIN`, `MAX`, functions in SQL queries and served from a dedicated API endpoint. *Note: Summary statistics should not be calculated on the frontend.*
- [ ] Each model (i.e `nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource.
  - You should also create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item. Example: filter exercise or nutrition by category, or filter sleep by the week/month it was recorded.
- [X] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the LifeTracker application and allow users to follow each other. You'll want to create a new table to store this data.
- [X] Implement `security` middleware on the API that allows only authenticated users to access resources and allows users to only access resources about themselves.

### Building the app

#### The `App` Component

- [X] Build the `App` component to:
  - [X] Be wrapped by an element with the class name of `app`
  - [X] Contain the routes for the app
  - [X] Render the `Navbar` component on every route
  - [X] Render a `BrowserRouter` component that contains a `Routes` component with the following routes:
    - [X] `/` - Render the `Landing` component
    - [X] `/login` - Render the `LoginPage` component
    - [X] `/register` - Render the `RegistrationPage` component
    - [X] `/activity` - Render the `ActivityPage` component **only** if the user is logged in, otherwise it renders the `AccessForbidden` component
    - [X] `/nutrition/*` - Render the `NutritionPage`component **only** if the user is logged in, otherwise it renders the`AccessForbidden` component
    - [X] `*` - Anything else renders the `NotFound` component

#### Handling API Requests

- [X] Create a `constants.js` file at the root of the project that exports the following variables:
  - [X] `PRODUCTION_API_BASE_URL` - set to whatever URL the production API is deployed at
  - [X] `DEVELOPMENT_API_BASE_URL` - set to `"http://localhost:3001"` for development
  - [X] `API_BASE_URL` - If `process.env.NODE_ENV` is `production`, set this to `PRODUCTION_API_BASE_URL`, otherwise set it to `DEVELOPMENT_API_BASE_URL`
- [X] Create a `services` directory at the root of the project.
- [X] Inside the `services` directory, create an `apiClient.js` file
- [X] In the `apiClient.js` file, import the `axios` package and the `API_BASE_URL` constant from the `constants.js` file.
- [X] Define a new class in that file called `ApiClient`.
  - [X] Give it a constructor function that accepts a single parameter - `remoteHostUrl`. The constructor should attach the `remoteHostUrl` parameter to a new instance with `this.remoteHostUrl = remoteHostUrl`. It should also set `this.token = null`.
  - [X] Export default a new instance of the `ApiClient` class.
  - [X] Add an additional method called `setToken` that accepts a single parameter - `token` and attaches it to the instance.
  - [X] Create a utility method called `request` that uses `axios` to issue HTTP requests
  - [X] Add a `login` method that uses the `request` method to send an HTTP request to the `auth/login` endpoint
  - [X] Add a `signup` method that uses the `request` method to send an HTTP request to the `auth/register` endpoint
  - [X] Add a `fetchUserFromToken` method that uses the `request` method to send an HTTP request to the `auth/me` endpoint
  - [X] **Add as many other methods as needed when making API requests.**

#### Manage Authentication State

Update the `App` component to manage authentication state:

- [X] Create a state variable called `appState` with a function called `setAppState` to update that state.
  - [X] Initialize `appState` with an object containing properties like `user`, `isAuthenticated`, `nutrition`, `sleep`, and `exercise`.
- [X] Implement a `useEffect` hook to fetch the user data.
  - [X] Define an asynchronous function named `fetchUser` to fetch the user data.
    - [X] Inside the `fetchUser` function, retrieve a token from `localStorage` using `localStorage.getItem("lifetracker_token")`
    - [X] Call the `setToken` function from the `apiClient.js` file.
    - [X] Make an API call to fetch user data using the `fetchUser` function from the `apiClient.js` file and extract the `data` from the response.
    - [X] If `data` is not null and not undefined, update the component's state using the `setAppState` function. Pass a callback to `setAppState` that takes the previous state and returns a new state object.
    - [X] In the callback, use the spread operator (`...`) to copy the previous state's properties to the new state object.
    - [X] Assign the following properties from the `data` object to the new state object:
      - [X] `user`
      - [X] `token`
    - [X] Assign at least **one** of the following properties from the `data` object to the new state object:
      - [X] `nutrition`
      - [X] `exercise`
      - [X] `sleep`
    - [X] Call the `setAppState` with a new state object to update the component's state.
    - [X] Outside the `fetchUser` function, call `fetchUser` to trigger the initial data fetch when the component mounts.
    - [X] The effect should be triggered whenever the value of `appState.isAuthenticated` changes.

#### Implement the `Loading` Component

- [X] Build the **`Loading`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `loading`
  - [X] Render an element with the class name of `loading-message` that contains the text `"Loading"`

#### Implement the `Navbar` Component

- [X] Build the **`Navbar`** component to:
  - [X] Render JSX that is wrapped by a `nav` element with the class name of `navbar`
  - [X] Render the app's logo as an element with the class name of `logo`.
    - [X] Inside that element should be a `Link` component from `react-router-dom` that navigates the user to the `/` route when clicked.
    - [X] Inside that `Link` component should be the application's logo (text or image).
  - [X] Render the `NavLinks.jsx` component with links to each of the resources and the `/activity` route.

#### Implement the `NavLinks` Component

- [X] Build the **`NavLinks`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `nav-links`
  - [X] Render a `Link` element from `react-router-dom` for:
    - [X] The `/activity` route with a label of `Activity`.
    - [X] The `/nutrition` route with a label of `Nutrition`.
    - [X] A route for any other resource page
  - [X] If a valid user is logged in, it should render an element with the class name of `logout-button` that calls the `logoutUser` function when clicked.
    - [X] The `logoutUser` function should remove the `lifetracker_token` from local storage and refresh the page so that all user data is reset.
  - [X] If no valid user is logged in:
    - [X] Render a `Link` element that redirects to the `/login` route with the label `Login`
    - [X] Render a `Link` element that redirects to the `/register` route with the label `Sign Up`

#### Implement the `LoginForm` Component

- [X] Build the **`LoginForm`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `login-form`
  - [X] Render an input element for the following fields:
    - [X] `email`
    - [X] `password`
  - [X] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [X] `name` - the `name` of the `input` field being rendered (`email`, `password`)
    - [X] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [X] `value` - the current value of the `input` element
    - [X] `onChange` - the `onChange` handler function
  - [X] Validate the `email` field. If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the class name of `error` indicating that the entry is not a valid email.
  - [X] Gracefully handle errors:
    - [X] If the user has attempted to login and gotten a `401` error, then an error message should be displayed in an element with the class name of `error` indicating that the `email` and `password` combination is incorrect.
    - [X] If the user has attempted to login and gotten a `400` or `422` error, then an error message should be displayed in an element with the class name of `error` indicating what went wrong.
  - [X] There should be a `button` element with the class name of `submit-login`:
    - [X] It should contain the text `"Login"`
    - [X] When clicked, it should call the `loginUser` function

#### Implement the `LoginPage` Component

- [X] Build the **`LoginPage`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `login-page`
  - [X] Using either a custom hook, context, or manually set state, check to see if a user is already logged in
    - [X] If the user is already logged in, redirect them to the `/activity` page.
    - [X] If no user is authenticated, render the `LoginForm` component and pass it any props it needs.

#### Implement the `RegistrationForm` Component

- [X] Build the **`RegistrationForm`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `registration-form`
  - [X] Should render an input element for the following fields:
    - [X] `email`
    - [X] `username`
    - [X] `firstName`
    - [X] `lastName`
    - [X] `password`
    - [X] `passwordConfirm`
  - [X] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [X] `name` - the `name` of the `input` field being rendered (`email`, `username`, `firstName`, `lastName`, `password`, `passwordConfirm`)
    - [X] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [X] `value` - the current value of the `input` element
    - [X] `onChange` - the `onChange` handler function
  - [X] Validate the `email` field: If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the class name of `error` indicating that the entry is not a valid email.
  - [X] Validate the `password` and `passwordConfirm` fields: If the user has entered text into the `password` and `passwordConfirm` fields and they don't match, then a message should be displayed in an element with the `className` of `error` with a message that contains the text: `passwords don't match`
  - [X] Gracefully handle errors:
    - [X] If the user has attempted to login and gotten a `401` error, then the `errors` object should contain a `form` property that contains a message indicating that the `email` and `password` combination is incorrect.
    - [X] If the user has attempted to login and gotten a `400` or `422` error, then the `errors` object should contain a `form` property that contains a message indicating what went wrong.
  - [X] There should be a `button` element with the `className` of `submit-registration`:
    - [X] It should contain the text `"Create Account"`
    - [X] When clicked, it should call the `signupUser` function

#### Implement the `RegistrationPage` component

- [X] Build the **`RegistrationPage`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `registration-page`
  - [X] Using either a custom hook, context, or manually handled state, check to see if a user is already logged in
    - [X] If the user is already logged in, it should redirect them to the `/activity` page
    - [X] If no user is authenticated, it should render the `RegistrationForm` component and pass it any props it needs

#### Implement the `LandingPage` Component

- [X] Build the **`LandingPage`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `landing-page`
  - [X] Render an element with the class name of `hero`
    - [X] Inside it, display a large hero image using an `img` element with the class name of `hero-img`
    - [X] Render a brief blurb on what this application is about inside an element with the class name of `cta`
  - [X] Allow unauthenticated access

#### Implement the `ActivityPage` Component

- [X] Build the **`ActivityPage`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `activity-page`
  - [X] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [X] If the `isProcessing` flag is `true`, it should render the `Loading` component.
  - [X] If the `isProcessing` flag is `false`, it should render the `ActivityFeed` component and pass it the appropriate props.

#### Implement the `ActivityFeed` Component

- [X] Build the **`ActivityFeed`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `activity-feed`
  - [X] Accept **at least** the following props:
    - [X] `totalCaloriesPerDay` - an array of items containing summary data about the total calories consumed per day
    - [X] `avgCaloriesPerCategory` - an array of items containing summary data about the average calories consumed per category
    - [X] Any other props as needed
  - [X] Inside an element with the class name of `per-category`, it should:
    - [X] Render the text: `"Average Calories Per Category` inside an `h4` element
    - [X] Take the first `6` or less items in the `avgCaloriesPerCategory` array and render a `SummaryStat` component for each item.
      - [X] Pass the calories **rounded down to one decimal place** as the `stat` prop
      - [X] Pass the string of `calories` as the `label` prop
      - [X] Pass the `category` as the `substat` prop
  - [X] Inside an element with the class name of `per-day`, it should:
    - [X] Render the text: `"Total Calories Per Day` inside an `h4` element
    - [X] For each item in the `totalCaloriesPerDay` array, render a `SummaryStat` component.
      - [X] Pass the calories **rounded down to the nearest whole number** as the `stat` prop
      - [X] Pass the string of `calories` as the `label` prop
      - [X] Pass the `date` in the format `dd/mm/yyyy` - example: `07/02/2022` - as the `substat` prop

#### Implement the `SummaryStat` Component

- [X] Build the **`SummaryStat`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `summary-stat`
  - [X] Accept **at least** the following props:
    - [X] `stat` - the primary statistic to display
    - [X] `label` - the unit label assigned to the statistic
    - [X] `substat` - a secondary statistic related to the primary statistic
  - [X] Render the `stat` prop inside an element with the class name of `primary-statistic`
  - [X] Render the `label` prop inside an element with the class name of `stat-label`
  - [X] Render the `substat` prop inside an element with the class name of `secondary-statistic`

#### Implement the `NutritionPage` Component

- [X] Build the **`NutritionPage`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `nutrition-page`
  - [X] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [X] Render a nested `Routes` component from `react-router-dom`.
    - [X] There should be multiple `Route` components:
      - [X] The `/nutrition` route should render the `NutritionOverview` component
      - [X] The `/nutrition/create` route should render the `NutritionNew` component
      - [X] The `/nutrition/id/:nutritionId` should render the `NutritionDetail` component
      - [X] Any other route should render the `NotFound` component

#### Implement the `NutritionOverview` Component

- [X] Build the **`NutritionOverview`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `nutrition-overview`
  - [X] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
    - [X] If the `error` state variable has a valid string in it, it should render the `error` message inside an element with the class name of `error`
    - [X] If `isLoading` is `true`, it should render the `Loading` component
    - [X] If `isLoading` is `false`, it should render the `NutritionFeed` component and pass it the appropriate props
  - [X] Near the top of the component, it should render a `Link` component that directs to the `/nutrition/create` route and contains the text: `"Record Nutrition"`

#### Implement the `NutritionFeed` Component

- [X] Build the **`NutritionFeed`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `nutrition-feed`
  - [X] Receive **at least** the following props:
    - [X] `nutritions` - an array of `nutrition` items
  - [X] If the `nutritions` array has no items in it, render an empty message that says `Nothing here yet` inside an element with the class name of `empty-message`
  - [X] If the `nutritions` array does have items in it:
    - [X] For each item in the `nutritions` array, it should render a `NutritionCard` component

#### Implement the `NutritionNew` Component

- [X] Build the **`NutritionNew`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `nutrition-new`
  - [X] Render the `NutritionForm` component and pass it the appropriate props

#### Implement the `NutritionForm` Component

- [X] Build the **`NutritionForm`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `nutrition-form`
  - [X] Render an input element for the following fields:
    - [X] `name` - name of the nutrition item (defaults to an empty string)
    - [X] `calories` - number of calories in the nutrition item (defaults to 1)
    - [X] `imageUrl` - the `url` of an image to show for this nutrition item (defaults to an empty string)
    - [X] `category` - the category that this nutrition item belongs to, like fruit, meat, soda, snack, nuts, etc. (defaults to an empty string)
  - [X] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [X] `name` - the `name` of the `input` field being rendered (`name`, `calories`, `imageUrl`, `category`)
    - [X] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [X] `value` - the current value of the `input` element
    - [X] `onChange` - the `onChange` handler function
  - [X] Gracefully handle errors:
    - [X] If any of the required fields are left blank, there should be an error message inside of an element with the class name of `error` indicating which fields are required.
    - [X] If the user has attempted to create a nutrition entry and gotten a `400` or `422` error, then that message should be displayed inside an element with the class name of `error`
  - [X] There should be a `button` element with the class name of `submit-nutrition`:
    - [X] Contain the text `"Save"`
    - [X] When clicked, it should call a function that creates a new nutrition entry
  - [X] After the form has been successfully submitted:
    - [X] Ensure that the new nutrition entry is stored in the `nutrition` context's `nutritions` array and is displayed in the `NutritionFeed` component
    - [X] Fetch the `activity` data again so that new summary stats will be calculated

#### Implement the `NutritionDetail` Component

- [X] Build the **`NutritionDetail.jsx`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `nutrition-detail`
  - [X] Leverage the `useParams` hook from `react-router-dom` to extract the `nutritionId` param from the URL
  - [X] When the component is mounted to the screen...
    - [X] It should make a `GET` request to the `/nutrition/:nutritionId` endpoint with the `axios.get` method.
    - [X] The `:nutritionId` part of the request should be replaced with the `nutritionId` pulled from the URL.
    - [X] When the initial request is loading, it should render an `h1` element with the class name of `loading` and contain the text `"Loading..."`
    - [X] Store the `nutrition` received by the request in state and then render a `NutritionCard` component for that nutrition.
    - [X] If no `nutrition` is found with that `id`, it should render the `NotFound` component

#### Implement the `NutritionCard` Component

- [X] Build the **`NutritionCard`** component to:
  - [X] Render JSX that is wrapped by an element with the class name of `nutrition-card`
  - [X] Accept **at least** the following props:
    - [X] `nutrition` - should be a nutrition entry object containing the following attributes:
      - [X] `imageUrl` - (not required)
      - [X] `name` - (required)
      - [X] `calories` - (required)
      - [X] `category` - (required)
      - [X] `createdAt` - (required)
  - [X] Render the `name` of the `nutrition` entry inside an element with the class name of `nutrition-name`
  - [X] If the `nutrition` entry has a valid `imageUrl` attribute, render an `img` element with the class name of `nutrition-image` and use that `imageUrl` as its `src`
  - [X] Render the `calories` attribute of the `nutrition` entry inside an element with the class name of `nutrition-calories`
  - [X] Render the `category` attribute of the `nutrition` entry inside an element with the class name of `nutrition-category`
  - [X] Render the `createdAt` attribute of the `nutrition` entry in the format `dd/mm/yyyy` - example: `07/02/2022` - inside an element with the class name of `nutrition-date`.

  - [X] **DO THE SAME FOR ANY OTHER RESOURCE THAT IS IN THE APPLICATION**
    - [X] Choose whatever resources you want!

#### Implement the `ProtectedRoute` Component

- [X] Build the **`ProtectedRoute`** component to:
  - [X] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [X] Accept a component as the `element` prop and render that component.
  - [X] If the application isn't currently loading and no user is found, render the `LoginPage` component instead of rendering the route the user intended to go to. This way, we can ensure that only authenticated users can access the provided component.
  - [X] Any unauthenticated user should be shown the `LoginPage` component with a message indicating that they need to authenticate first
  - [X] Update the `LoginPage` component so that it accepts a `message` prop that is displayed in the login form - if it exists.
  - [X] Make sure to protect the entire `ActivityPage` component route and the `NutritionPage` component route (along with any other private resource pages). Don't protect the `LandingPage` component or the `LoginPage` and `RegistrationPage` components, as they should be public.

### API

Here are the pieces of functionality that should be built out for the backend:

- [X] **Project setup**
  - [X] First things first, bootstrap the Express application with some essential files and starter code
  - [X] Create a `.gitignore` file, an `app.js` file, an `app.test.js` file, and a `server.js` file
  - [X] Make sure `node_modules` are added to the `.gitignore` file.
  - [X] Add dependencies for `express@next`, `morgan`, `cors`, and `nodemon`
  - [X] Install new dependencies for `bcrypt`, `jsonwebtoken`, `colors`, `dotenv`, `pg`
  - [X] Commit all work to `git`
  - [X] Add a `.env` file to the root of the repo and include the following environment variables
    - [X] `PORT` (default to `3001`)
    - [X] `SECRET_KEY` (set to a long random string)
    - [X] `BCRYPT_WORK_FACTOR` (set to `13`)
    - [X] `DATABASE_USER`
    - [X] `DATABASE_PASS`
    - [X] `DATABASE_HOST`
    - [X] `DATABASE_PORT`
    - [X] `DATABASE_NAME` - (set to `lifetracker`)
    - [X] `DATABASE_TEST_NAME` - (set to `lifetracker_test`)
  - [X] Add a `config.test.js` file
    - [X] Write tests that check to make sure that:
      - [X] `process.env.NODE_ENV` is set to `test` when the test suite is run
      - [X] There is an `IS_TESTING` variable that is exported, which should only be true if `process.env.NODE_ENV` is set to `test`
    - [X] Write tests to ensure that certain environment variables are exported from the `config.js` file and can be imported:
      - [X] `PORT`
      - [X] `SECRET_KEY`
      - [X] `BCRYPT_WORK_FACTOR`
      - [X] `IS_TESTING`
    - [X] Write tests to ensure that a `getDatabaseUri` function is exported from the `config.js` file
      - [X] The `getDatabaseUri` function should:
        - [X] Check to see if a valid `process.env.DATABASE_URL` environment variable exists, and return that if it does.
        - [X] When `IS_TESTING` is `true`, the `getDatabaseUri` function should use the test database
        - [X] Otherwise, it should combine the proper database environment variables into a database connection string if no `process.env.DATABASE_URL` environment variable exists
  - [X] Add a `config.js` file
    - [X] Use the `dotenv` package to parse the environment variables from the `.env` file.
    - [X] Export each of the environment variables from the `config.js` file until the tests pass
    - [X] Write a `getDatabaseUri` function so that all the tests pass
  - [X] Commit all work to `git`
  - [X] The project should now be ready to go!
- [X] **PostgreSQL database**
  - Time bring in a PostgreSQL database client as the application's persistence layer
  - Make sure the PostgreSQL server is running
  - Create two files at the root of the project:
    - [X] `lifetracker-schema.sql`
      - [X] This script should:
        - [X] Create a `users` table with the following columns:
          - [X] `id`
          - [X] `username`
          - [X] `password`
          - [X] `first_name`
          - [X] `last_name`
          - [X] `email`
          - [X] `created_at`
          - [X] `updated_at`
        - [X] Create a `nutrition` table with the following columns:
          - [X] `id`
          - [X] `name`
          - [X] `category`
          - [X] `calories`
          - [X] `image_url`
          - [X] `user_id`
          - [X] `created_at`
        - [X] **Any other tables** that the application might depend on
    - [X] `lifetracker.sql`
      - [X] This script should:
        - [X] 1. Let the user know that they're about to delete the `lifetracker` database and prompt them to confirm that is what they want.
        - [X] 2. Drop the `lifetracker` database and then create a new `lifetracker` database, before connecting to the `lifetracker` database.
        - [X] 3. It should then run the `lifetracker-schema.sql` file.
        - [X] Follow the exact same steps for `1`, `2`, and `3`, but with the `lifetracker_test` database.
  - [X] Setup the database by running `psql -f lifetracker.sql`
  - [X] Create a new file at the root of the project called `db.js`. In that file:
    - [X] Import the `getDatabaseUri` function from the `config.js` file.
    - [] Initialize a new PostgreSQL client with the `pg` package and connect to PostgreSQL using any necessary config variables.
    - [X] Connect to PostgreSQL and log a message to the terminal on success or failure.
    - [X] Export the connected database client
  - [X] Commit all work to `git`
  - [X] A database client is now ready to be used!
- [X] **Server**
  - [X] Build out a bare-bones Express server with a health check route and an adequate middleware pipeline.
  - [X] Create a `utils` directory
    - [X] In the `utils` directory, create an `errors.js` file.
    - [X] Create error classes inside the file that will be used throughout the app.
  - [X] In the `app.test.js` file, write tests that:
    - [X] Ensure that the Express application responds to `GET` requests to the `/` route with a JSON object of `{ "ping": "pong" }`
    - [X] Check that middleware like `morgan` and `cors` exist, along with the JSON `body-parser` middleware from `express`
    - [X] Include an `afterAll` hook that calls `await db.end()` so that any open database connections close when all the tests are finished.
  - [X] Add code to the `app.js` and `server.js` file to get a simple server running along with responding to `GET` requests to the `/` route
  - [X] Create error classes inside the `utils/errors.js` file.
  - [X] Add `404` and generic error handler middleware to the `app.js` file.
  - [X] In the `server.js` file:
    - [X] Import the Express app and the `config.js` file
    - [X] Have the `app` listen on the port specified by `config.PORT`.
  - [X] Commit all work to `git`
  - [X] Test out the fancy new Express server by starting it up in a new terminal window!
- [X] **Common Test Configuration**
  - [X] It would probably be helpful to create some common test functions that can be used throughout the application's testing suite.
  - [X] Create a new directory called `tests`
  - [X] Now, touch a new file at `tests/common.js`
    - [X] In that file:
      - [X] Import the `db` client
      - [X] Create and export four functions:
        - [X] `commonBeforeAll`
          - [X] Actions that should happen before any tests in a particular file run.
          - [X] This should include things like executing queries that delete all items from any tables in the test database that might have been added during testing
        - [X] `commonBeforeEach`
          - [X] Actions that should happen before any **single** test in a particular file runs.
          - [X] This should include things like starting a database transaction
        - [X] `commonAfterEach`
          - [X] Actions that should happen after any **single** test in a particular file runs.
          - [X] This should include things like rolling back any database actions before they're committed
        - [X] `commonAfterAll`
          - [X] Actions that should occur after all tests in a particular file run.
          - [X] This should include things like ending any open database client connections
  - [X] Commit all work to `git`
- [X] **Authentication**
  - [X] Go ahead and build out a full-fledged authentication flow using PostgreSQL, `bcrypt`, and JSON Web Tokens. For it all to work, we'll need a `User` model, a `security` middleware, some `tokens` utility functions, and the appropriate `auth` routes.
  - [X] Add new directories for `models`, `routes`, and `middleware`
  - [X] The **User** model
    - [X] In the `models` directory, create two new files: `models/user.js` and `models/user.test.js`
      - [X] The `User` model should have **at least** the following static methods:
        - [X] `login`
        - [X] `register`
        - [X] `fetchUserByEmail`
    - [X] In the `models/user.test.js` file:
      - [X] Test the `login` method. Write test cases for:
        - [X] User can login successfully with proper credentials
        - [X] Unknown email throws `UnauthorizedError`
        - [X] Invalid credentials throws `UnauthorizedError`
      - [X] Test the `register` method. Write test cases for:
        - [X] User can successfully register with proper credentials
        - [X] Registering with duplicate email throws `BadRequestError`
        - [X] Registering with duplicate username throws `BadRequestError`
        - [X] Registering with invalid email throws `BadRequestError`
      - [X] Test the `fetchUserByEmail` method:. Write test cases for:
        - [X] A valid email returns a user from the database
        - [X] Invalid emails are handled correctly
      - [X] It will probably be important to use the `beforeAll`, `afterAll`, `beforeEach`, and `afterEach` hooks to add and delete users from the database before running the tests
    - [X] In the `models/user.js` file:
      - [X] Import the `bcrypt` package, the `db` client, and the app `config`.
      - [X] Implement the features outlined in the tests until they're all passing.
  - [X] Commit all work to `git`
  - [X] The **tokens** utility functions
    - [X] In the `utils` directory, create two new files: `utils/tokens.js` and `utils/tokens.test.js`
      - [X] At the bare minimum, two functions will be needed:
        - [X] One that accepts a JSON payload as an argument and converts it into a JWT
        - [X] One that accepts a JWT as an argument, validates it, and returns the JSON payload encoded within - if it's valid
    - [X] In the `utils/tokens.test.js` file:
      - [X] Write test cases for:
        - [X] Can create valid JWT tokens for user payloads
        - [X] Can extract a payload from a valid JWT with the correct secret
        - [X] No payload gets returned when invalid tokens are parsed
    - [X] In the `utils/tokens.js` file:
      - [X] Implement the features outlined in the tests until they're all passing
  - [X] Commit all work to `git`
  - [X] The **security** middleware
    - [X] In the `middleware` directory, create two new files: `middleware/security.js` and `middleware/security.test.js`
      - [X] One middleware will be responsible for extracting a user from a valid JWT in the request:
        - [X] Checking the `Authentication` header of each request for the existence of a JWT.
        - [X] If one exists, it should extract the token, validate it, extract the encoded JSON payload, and attach it to the response's `locals` property
      - [X] One middleware will be responsible for ensuring that an authenticated user exists:
        - [X] Checking that a valid user exists on the response's `locals` property
        - [X] If one does, the middleware should simply call next
        - [X] If no valid user exists, it should throw an `UnauthorizedError`
    - [X] In the `middleware/security.test.js` file:
      - [X] Test the `Authentication` header parsing middleware
        - [X] Write test cases for:
          - [X] Extracts user from valid JWT in `Authentication` header
          - [X] No user is stored when no valid JWT exists in the `Authentication` header
          - [X] No user is stored when an invalid JWT is in the `Authentication` header
      - [X] Test the middleware that ensures an authenticated user exists
        - [X] Write test cases for:
          - [X] Doesn't throw an error when a valid user is present
          - [X] Throws an `UnauthorizedError` when no valid user is present
    - [X] In the `middleware/security.js` file:
      - [X] Implement the features outlined in the tests until they're all passing
    - [X] In the `app.js` file, add the `Authentication` header parsing middleware to the Express app's middleware pipeline
  - [X] Commit all work to `git`
  - [X] The **/auth** routes
    - [X] In the `routes` directory, create two new files: `routes/auth.js` and `routes/auth.test.js`
      - [X] A new Express router should be created. It should handle:
        - [X] A `GET` request to the `/me` endpoint
          - [X] It should send a JSON response back to the client with the user info like so: `{ "user": { "email": "user@gmail.com", ... } }`
        - [X] A `POST` request to the `/login` endpoint
          - [X] It should accept a request body with `email` and `password` keys
          - [X] It should send a JSON response back to the client with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
        - [X] A `POST` request to the `/register` endpoint
          - [X] It should accept a request body with `email`, `username`, `firstName`, `lastName`, and `password` keys
          - [X] It should send a JSON response back to the client with a `201` status code, along with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
      - [X] It should be mounted at the `/auth` endpoint in the `app.js` file
    - [X] In the `routes/auth.test.js` file:
      - [X] Test the `POST /auth/login` endpoint
        - [X] Write test cases for:
          - [X] Allows user to register with valid credentials and responds with JSON containing a valid token and user in the "token" and "user" fields
          - [X] Throws `UnauthorizedError` when user doesn't exist in database
          - [X] Throws `UnauthorizedError` when user provides wrong password
          - [X] Throws `BadRequestError` when user doesn't provide password
          - [X] Throws `BadRequestError` when user doesn't provide email
      - [X] Test the `POST /auth/register` endpoint
        - [X] Write test cases for:
          - [X] Allows user to login successfully with valid credentials and responds with a `201` status code, along with JSON containing a valid token and user in the "token" and "user" fields
          - [X] Throws `BadRequestError` when user doesn't provide one of the required fields
          - [X] Throws `BadRequestError` when user provides email that already exists
          - [X] Throws `BadRequestError` when user provides username that already exists
      - [X] Test the `POST /auth/me` endpoint
        - [X] Write test cases for:
          - [X] Provides the user with their user info when a valid JWT is present in the `Authentication` header of the request
          - [X] Throws an `UnauthorizedError` when no valid user is logged in
    - [X] In the `routes/auth.js` file:
      - [X] Create a new Express router
      - [X] Implement the features outlined in the tests until they're all passing
    - [X] In the `app.js` file:
    - [X] Mount the router at the `/auth` endpoint
  - [X] Commit all work to `git`
  - [X] There should now be a full-fledged authentication system in place!
- [X] **Resources and Permissions**
  - [X] Next, implement the functionality to allow users to save instances of things they've drank/eaten, so that they can track their own nutrition data! Also make sure users can only access the data that they themselves have created. No other user should be able to see any data owned by another user!
  - [X] The **Nutrition** model
    - [X] In the `models` directory, create two new files: `models/nutrition.js` and `models/nutrition.test.js`
      - [X] The `Nutrition` model should have **at least** the following static methods:
        - [X] `createNutrition`
          - [X] Should insert a new nutrition instance into the database when values are supplied for all of the required fields: `"name"`, `"category"`, `"calories"`, and `"image_url"`. The `quantity` field should default to `1`.
          - [X] The new nutrition instance should have its `user_id` field set to the `id` of the authenticated user
          - [X] Should throw a `BadRequestError` (`400` status code) or `UnprocessableEntityError` (`422` status code) when any of those values are not supplied.
        - [X] `fetchNutritionById`
          - [X] When supplied with a valid `id`, fetches the a nutrition instance from the database that matches that `id`.
          - [X] If no nutrition instance matches that `id`, throws a `NotFoundError` (`404` status code)
        - [X] `listNutritionForUser`
          - [X] Should list all nutrition instances in the database that are owned by a particular user
    - [X] In the `models/nutrition.test.js` file:
      - [X] Test the `createNutrition` method. Write test cases for:
        - [X] A user can create a nutrition instance when they supply the appropriate values
        - [X] The appropriate error is thrown when any of the provided errors are invalid
        - [X] The user that creates the nutrition instance now owns that nutrition instance
      - [X] Test the `fetchNutritionById` method. Write test cases for:
        - [X] Fetches the nutrition instance that matches the supplied `id`
        - [X] Throws a `NotFoundError` when no nutrition instances matches the supplied `id`
      - [X] Test the `listNutritionForUser` method. Write test cases for:
        - [X] Fetches all nutrition instances belonging to a particular user
        - [X] Doesn't include any nutrition instances belonging to a different user
        - [X] Returns an empty array if no nutrition instances are found in the database that belong to that user
    - [X] In the `models/nutrition.js` file:
      - [X] Implement the features outlined in the tests until they're all passing
    - [X] Commit all work to `git`
  - [X] The **permissions** middleware
    - [X] In the `middleware` directory, create two new files: `middleware/permissions.js` and `middleware/permissions.test.js`
      - [X] Though more functions will need to be added here as the number of resources grows, for now only 1 function needs to be created.
      - [X] The `authedUserOwnsNutrition` middleware function should:
        - [X] Probably be called after the `requireAuthenticatedUser` security middleware in any route's middleware pipeline
        - [X] Extract a parameter from the request endpoint that corresponds to the `id` of the nutrition instance
        - [X] Query the database for that nutrition instance
        - [X] Check that it is owned by the authenticated user
          - [X] If it doesn't, it should throw a `ForbiddenError` (`403` status code)
          - [X] If the nutrition instance does belong to the authenticated user, it should attach it to the `locals` property of the `response` as its `nutrition` property so that it doesn't need to be fetched again by the database (this isn't required, but is probably a good idea).
    - [X] In the `middleware/permissions.test.js` file:
      - [X] Test the `authedUserOwnsNutrition` middleware function
        - [X] Write test cases for:
          - [X] Throws error if authenticated user doesn't own nutrition
          - [X] Throws `NotFoundError` if `id` of nutrition isn't found in database
          - [X] Doesn't throw error if authenticated user is nutrition owner
          - [X] (OPTIONAL) Attaches the `nutrition` to the `locals` property of the response when the user owns the nutrition instance
    - [X] In the `middleware/permissions.js` file:
      - [X] Implement the features outlined in the tests until they're all passing
    - [X] Commit all work to `git`
  - [X] The **/nutrition** routes
    - [X] In the `routes` directory, create two new files: `routes/nutrition.js` and `routes/nutrition.test.js`
      - [X] A new Express router should be created that will be mounted at the `/nutrition` endpoint. It should handle:
        - [X] `GET` requests to the `/` endpoint
          - [X] It should send a JSON response back to the client with all of the user-owned nutrition instances in an array like so: `{ "nutritions": [...] }`
        - [X] `POST` requests to the `/` endpoint
          - [X] It should accept a request body with one `nutrition` key containing an object with all the attributes of the `nutrition` entry
          - [X] It should send a JSON response back to the client with a `201` status code, and the newly created nutrition instance like so: `{ "nutrition": { ... } }`
        - [X] `GET` requests to the `/:nutritionId` endpoint
          - [X] It should send a JSON response back to the client with the nutrition instance that matches the `:nutritionId` parameter like so: `{ "nutrition": { ... } }`
    - [X] In the `routes/nutrition.test.js` file:
      - [X] Test the `GET /nutrition` endpoint
        - [X] Write test cases for:
          - [X] Returns an array of all `nutrition` entries belonging to the user
          - [X] Other user's entries aren't included in the `nutritions` array
          - [X] Throws `UnauthorizedError` if no valid user is logged in
      - [X] Test the `POST /nutrition` endpoint
        - [X] Write test cases for:
          - [X] Authenticated users can create a new `nutrition` entry when providing values for all the required fields
          - [X] The new `nutrition` entry belongs to the user that created it
          - [X] Throws a `BadRequestError` if any of the required fields are missing
          - [X] Throws an `UnauthorizedError` if no valid user is logged in
      - [X] Test the `GET /nutrition/:nutritionId` endpoint
        - [X] Write test cases for:
          - [X] Nutrition owner can fetch a `nutrition` entry when providing a valid `id`
          - [X] Throws a `403 ForbiddenError` if a user tries to access a `nutrition` instance that does not belong to them
          - [X] Throws a `404 NotFoundError` when the `nutritionId` does not match any nutrition in the database
          - [X] Throws a `401 UnauthorizedError` if no valid user is logged in
    - [X] In the `routes/nutrition.js` file:
      - [X] Implement the features outlined in the tests until they're all passing
  - [X] Commit all work to `git`
- **Additional Resources**
  - [X] Create model and routes files for 1-2 additional resources that your app will track (sleep, exercise, steps, floors climbed, meditation, mood, heartrate, music practice, etc.)
  - [X] Commit all work to `git`
- **Summary Statistics**
  - [X] One of the last features of the API will be a model that calculates summary statistic on the different resources that users are tracking. This includes statistics like average calories per day, or max calories per category. To do that, we'll create a new `Activity` model and an `activity` route that will be used to populate the frontend.
  - [X] The **Activity** model
    - [X] In the `models` directory, create two new files: `models/Activity.js` and `models/Activity.test.js`
      - [X] The `Activity` model should have **at least** the following static methods:
        - [X] `calculateDailyCaloriesSummaryStats`
          - [X] Should execute a SQL query that calculates **at least** the total calories consumed per day (aliased as `totalCaloriesPerDay`), along with the day (aliased as `date`).
          - [X] The query should return a row for **each day** containing the total calories consumed per day, and the average caloric content per nutrition entry.
            - [X] For instance, here's a set of 7 **simplified** nutrition item entries (actual data will look different):
              - 1. `{ id: 1, user_id: 1, calories: 100, category: "candy", created_at: "12-22-2022" }`
              - 2. `{ id: 2, user_id: 1, calories: 200, category: "drink", created_at: "12-22-2022" }`
              - 3. `{ id: 3, user_id: 1, calories: 200, category: "fruit", created_at: "12-23-2022" }`
              - 4. `{ id: 4, user_id: 1, calories: 400, category: "dairy", created_at: "12-23-2022" }`
              - 5. `{ id: 5, user_id: 1, calories: 400, category: "drink", created_at: "12-23-2022" }`
              - 6. `{ id: 6, user_id: 1, calories: 700, category: "fruit", created_at: "12-24-2022" }`
              - 7. `{ id: 7, user_id: 1, calories: 100, category: "fruit", created_at: "12-24-2022" }`
            - [X] The summary stats returned from the query should look like this:
              - 1. `{ date: "12-22-2022", totalCaloriesPerDay: 300 }`
              - 2. `{ date: "12-23-2022", totalCaloriesPerDay: 1000 }`
              - 3. `{ date: "12-24-2022", totalCaloriesPerDay: 800 }`
        - [X] `calculatePerCategoryCaloriesSummaryStats`
          - [X] Should execute a SQL query that calculates **at least** the average calories consumed per category (aliased as `avgCaloriesPerCategory` and **rounded down to one decimal place**), along with the category (aliased as `category`).
          - [X] The query should return a row for **each day** containing the total calories consumed per day, and the average caloric content per nutrition entry.
            - [X] For instance, here's a set of 7 **simplified** nutrition item entries (actual data will look different):
              - 1. `{ id: 1, user_id: 1, calories: 100, category: "candy", created_at: "12-22-2022" }`
              - 2. `{ id: 2, user_id: 1, calories: 200, category: "drink", created_at: "12-22-2022" }`
              - 3. `{ id: 3, user_id: 1, calories: 200, category: "fruit", created_at: "12-23-2022" }`
              - 4. `{ id: 4, user_id: 1, calories: 400, category: "dairy", created_at: "12-23-2022" }`
              - 5. `{ id: 5, user_id: 1, calories: 400, category: "drink", created_at: "12-23-2022" }`
              - 6. `{ id: 6, user_id: 1, calories: 700, category: "fruit", created_at: "12-24-2022" }`
              - 7. `{ id: 7, user_id: 1, calories: 100, category: "fruit", created_at: "12-24-2022" }`
            - [X] The summary stats returned from the query should look like this:
              - 1. `{ category: "candy", avgCaloriesPerCategory: 100.0 }`
              - 2. `{ category: "drink", avgCaloriesPerCategory: 300.0 }`
              - 3. `{ category: "fruit", avgCaloriesPerCategory: 266.6 }`
              - 4. `{ category: "dairy", avgCaloriesPerCategory: 400.0 }`
    - [X] In the `models/Activity.test.js` file:
      - [X] Test the `calculateDailyCaloriesSummaryStats` method. Write test cases for:
        - [X] The `calculateDailyCaloriesSummaryStats` method correctly calculates summary statistics per day
        - [X] Only uses the `nutrition` entries belonging to the user when calculating summary statistics
        - [X] Returns an empty array when the user has no `nutrition` entries
      - [X] Test the `calculatePerCategoryCaloriesSummaryStats` method. Write test cases for:
        - [X] The `calculatePerCategoryCaloriesSummaryStats` method correctly calculates average calories per category summary statistics
        - [X] Only uses the `nutrition` entries belonging to the user when calculating summary statistics
        - [X] Returns an empty array when the user has no `nutrition` entries
    - [X] In the `models/Activity.js` file:
      - [X] Implement the features outlined in the tests until they're all passing
    - [X] Commit all work to `git`
  - [X] The **/activity** routes
    - [X] In the `routes` directory, create two new files: `routes/activity.js` and `routes/activity.test.js`
      - [X] A new Express router should be created that will be mounted at the `/activity` endpoint. It should handle:
        - [X] `GET` requests to the `/` endpoint
          - [X] It should send a JSON response back to the client with summary stats for each resource in the following format:
            - [X] `{ "nutrition": { "calories": { "perDay": [...], "perCategory": [...] }, ...anyOtherStats }, ...statsForOtherResources }`
    - [X] In the `routes/activity.test.js` file:
      - [X] Test the `GET /activity` endpoint
        - [X] Write test cases for:
          - [X] Provides a JSON response containing arrays of summary stats for resources, attributes, and metrics
          - [X] Correctly calculates `totalCaloriesPerDay` for a user's `nutrition` entries
          - [X] Correctly calculates `avgCaloriesPerCategory` for a user's `nutrition` entries
          - [X] Only returns summary stats based on entries that the currently authenticated user owns
          - [X] Throws an `UnauthenticatedError` if no valid user is logged in
    - [X] In the `routes/activity.js` file:
      - [X] Implement the features outlined in the tests until they're all passing
  - [X] Commit all work to `git`
