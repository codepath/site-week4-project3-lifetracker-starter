# Project #3: LifeTracker Application

## Overview
Hello I can update stuff in the Github!

> Data is the new oil - Clive Humbly

Everywhere around us is data waiting to be collected and utilized. In recent years, we've seen the rise of applications and services that exist to quantify concepts that were previously hard to capture. FitBit, Apple Health, and Woop are all $1 billion dollar services to offer tracking statistics about how we live our lives. The LifeTracker app you'll be building will do exactly that - track your life by quantifying your activity.

## Goals

By the end of this project you will be able to...

- [ ] Develop a full-fledged authentication system using PostgreSQL and `bcrypt`
- [ ] Provide users with an Express API they can interact with to store user-related activity
- [ ] Construct multiple models that implement the core business logic associated with tracking users' lives
- [ ] Write SQL queries that aggregate user statistics and provide summary overviews about their activity
- [ ] Design a React frontend that interacts with the API using an API service class
- [ ] Build multiple pages and forms that communicate with the server using HTTP requests
- [ ] Employ `useEffect` and `useState` hooks to manage application state on the frontend
- [ ] Store user-authenticated JWT tokens in the browser's local storage for persisted authentication

## Application Features

### Core Features

- [ ] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about. *Note:* This is the only page that unauthenticated users should be able to view.
- [ ] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [ ] **Login Page:** A form that allows users to login with email and password.
- [ ] When a user first authenticates, they should be redirected to an authenticated view (i.e., the detailed activity page). When they sign out, all frontend data should be reset.
- [ ] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [ ] If the user is logged in, it should display a **Sign Out** button.
  - [ ] If no user is logged in, it should display **Login** and **Register** buttons.
  - [ ] Display a logo on the far left side, and contain links to the individual detailed activity pages.
- [ ] Users should have the ability to track at least **one** type of activity (i.e., nutrition, exercise, sleep, etc.). Each activity should be tracked on separate pages.
- [ ] **Detailed Activity Page:** Display and enter activities.
  - [ ] Display a feed of all previously tracked activities.
  - [ ] A form to enter relevant information (i.e., if tracking nutrition, the user can enter calories, timestamp, image, category, etc.).
  - [ ] Each activity tracked is given a unique ID for easy lookup.
- [ ] Deploy your website with Render. Check out our [Render Deployment Guide](https://courses.codepath.org/snippets/site/render_deployment_guide) for detailed instructions.

### Stretch Features

Implement any of the following features to improve the application:

- [ ] Users have access to an overview Activity page that shows one summary statistic about each of the three types of activity tracked (i.e., total number of minutes exercised, average calories consumed, max hours of sleep in one night, etc.). These summary statistics should be created using the `AVG`, `SUM`, `COUNT`, `MIN`, `MAX`, functions in SQL queries and served from a dedicated API endpoint. *Note: Summary statistics should not be calculated on the frontend.*
- [ ] Each model (i.e `nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource.
  - You should also create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item. Example: filter exercise or nutrition by category, or filter sleep by the week/month it was recorded.
- [ ] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the LifeTracker application and allow users to follow each other. You'll want to create a new table to store this data.
- [ ] Implement `security` middleware on the API that allows only authenticated users to access resources and allows users to only access resources about themselves.

### Building the app

#### The `App` Component

- [ ] Build the `App` component to:
  - [ ] Be wrapped by an element with the class name of `app`
  - [ ] Contain the routes for the app
  - [ ] Render the `Navbar` component on every route
  - [ ] Render a `BrowserRouter` component that contains a `Routes` component with the following routes:
    - [ ] `/` - Render the `Landing` component
    - [ ] `/login` - Render the `LoginPage` component
    - [ ] `/register` - Render the `RegistrationPage` component
    - [ ] `/activity` - Render the `ActivityPage` component **only** if the user is logged in, otherwise it renders the `AccessForbidden` component
    - [ ] `/nutrition/*` - Render the `NutritionPage`component **only** if the user is logged in, otherwise it renders the`AccessForbidden` component
    - [ ] `*` - Anything else renders the `NotFound` component

#### Handling API Requests

- [ ] Create a `constants.js` file at the root of the project that exports the following variables:
  - [ ] `PRODUCTION_API_BASE_URL` - set to whatever URL the production API is deployed at
  - [ ] `DEVELOPMENT_API_BASE_URL` - set to `"http://localhost:3001"` for development
  - [ ] `API_BASE_URL` - If `process.env.NODE_ENV` is `production`, set this to `PRODUCTION_API_BASE_URL`, otherwise set it to `DEVELOPMENT_API_BASE_URL`
- [ ] Create a `services` directory at the root of the project.
- [ ] Inside the `services` directory, create an `apiClient.js` file
- [ ] In the `apiClient.js` file, import the `axios` package and the `API_BASE_URL` constant from the `constants.js` file.
- [ ] Define a new class in that file called `ApiClient`.
  - [ ] Give it a constructor function that accepts a single parameter - `remoteHostUrl`. The constructor should attach the `remoteHostUrl` parameter to a new instance with `this.remoteHostUrl = remoteHostUrl`. It should also set `this.token = null`.
  - [ ] Export default a new instance of the `ApiClient` class.
  - [ ] Add an additional method called `setToken` that accepts a single parameter - `token` and attaches it to the instance.
  - [ ] Create a utility method called `request` that uses `axios` to issue HTTP requests
  - [ ] Add a `login` method that uses the `request` method to send an HTTP request to the `auth/login` endpoint
  - [ ] Add a `signup` method that uses the `request` method to send an HTTP request to the `auth/register` endpoint
  - [ ] Add a `fetchUserFromToken` method that uses the `request` method to send an HTTP request to the `auth/me` endpoint
  - [ ] **Add as many other methods as needed when making API requests.**

#### Manage Authentication State

Update the `App` component to manage authentication state:

- [ ] Create a state variable called `appState` with a function called `setAppState` to update that state.
  - [ ] Initialize `appState` with an object containing properties like `user`, `isAuthenticated`, `nutrition`, `sleep`, and `exercise`.
- [ ] Implement a `useEffect` hook to fetch the user data.
  - [ ] Define an asynchronous function named `fetchUser` to fetch the user data.
    - [ ] Inside the `fetchUser` function, retrieve a token from `localStorage` using `localStorage.getItem("lifetracker_token")`
    - [ ] Call the `setToken` function from the `apiClient.js` file.
    - [ ] Make an API call to fetch user data using the `fetchUser` function from the `apiClient.js` file and extract the `data` from the response.
    - [ ] If `data` is not null and not undefined, update the component's state using the `setAppState` function. Pass a callback to `setAppState` that takes the previous state and returns a new state object.
    - [ ] In the callback, use the spread operator (`...`) to copy the previous state's properties to the new state object.
    - [ ] Assign the following properties from the `data` object to the new state object:
      - [ ] `user`
      - [ ] `token`
    - [ ] Assign at least **one** of the following properties from the `data` object to the new state object:
      - [ ] `nutrition`
      - [ ] `exercise`
      - [ ] `sleep`
    - [ ] Call the `setAppState` with a new state object to update the component's state.
    - [ ] Outside the `fetchUser` function, call `fetchUser` to trigger the initial data fetch when the component mounts.
    - [ ] The effect should be triggered whenever the value of `appState.isAuthenticated` changes.

#### Implement the `Loading` Component

- [ ] Build the **`Loading`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `loading`
  - [ ] Render an element with the class name of `loading-message` that contains the text `"Loading"`

#### Implement the `Navbar` Component

- [ ] Build the **`Navbar`** component to:
  - [ ] Render JSX that is wrapped by a `nav` element with the class name of `navbar`
  - [ ] Render the app's logo as an element with the class name of `logo`.
    - [ ] Inside that element should be a `Link` component from `react-router-dom` that navigates the user to the `/` route when clicked.
    - [ ] Inside that `Link` component should be the application's logo (text or image).
  - [ ] Render the `NavLinks.jsx` component with links to each of the resources and the `/activity` route.

#### Implement the `NavLinks` Component

- [ ] Build the **`NavLinks`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `nav-links`
  - [ ] Render a `Link` element from `react-router-dom` for:
    - [ ] The `/activity` route with a label of `Activity`.
    - [ ] The `/nutrition` route with a label of `Nutrition`.
    - [ ] A route for any other resource page
  - [ ] If a valid user is logged in, it should render an element with the class name of `logout-button` that calls the `logoutUser` function when clicked.
    - [ ] The `logoutUser` function should remove the `lifetracker_token` from local storage and refresh the page so that all user data is reset.
  - [ ] If no valid user is logged in:
    - [ ] Render a `Link` element that redirects to the `/login` route with the label `Login`
    - [ ] Render a `Link` element that redirects to the `/register` route with the label `Sign Up`

#### Implement the `LoginForm` Component

- [ ] Build the **`LoginForm`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `login-form`
  - [ ] Render an input element for the following fields:
    - [ ] `email`
    - [ ] `password`
  - [ ] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [ ] `name` - the `name` of the `input` field being rendered (`email`, `password`)
    - [ ] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [ ] `value` - the current value of the `input` element
    - [ ] `onChange` - the `onChange` handler function
  - [ ] Validate the `email` field. If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the class name of `error` indicating that the entry is not a valid email.
  - [ ] Gracefully handle errors:
    - [ ] If the user has attempted to login and gotten a `401` error, then an error message should be displayed in an element with the class name of `error` indicating that the `email` and `password` combination is incorrect.
    - [ ] If the user has attempted to login and gotten a `400` or `422` error, then an error message should be displayed in an element with the class name of `error` indicating what went wrong.
  - [ ] There should be a `button` element with the class name of `submit-login`:
    - [ ] It should contain the text `"Login"`
    - [ ] When clicked, it should call the `loginUser` function

#### Implement the `LoginPage` Component

- [ ] Build the **`LoginPage`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `login-page`
  - [ ] Using either a custom hook, context, or manually set state, check to see if a user is already logged in
    - [ ] If the user is already logged in, redirect them to the `/activity` page.
    - [ ] If no user is authenticated, render the `LoginForm` component and pass it any props it needs.

#### Implement the `RegistrationForm` Component

- [ ] Build the **`RegistrationForm`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `registration-form`
  - [ ] Should render an input element for the following fields:
    - [ ] `email`
    - [ ] `username`
    - [ ] `firstName`
    - [ ] `lastName`
    - [ ] `password`
    - [ ] `passwordConfirm`
  - [ ] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [ ] `name` - the `name` of the `input` field being rendered (`email`, `username`, `firstName`, `lastName`, `password`, `passwordConfirm`)
    - [ ] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [ ] `value` - the current value of the `input` element
    - [ ] `onChange` - the `onChange` handler function
  - [ ] Validate the `email` field: If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the class name of `error` indicating that the entry is not a valid email.
  - [ ] Validate the `password` and `passwordConfirm` fields: If the user has entered text into the `password` and `passwordConfirm` fields and they don't match, then a message should be displayed in an element with the `className` of `error` with a message that contains the text: `passwords don't match`
  - [ ] Gracefully handle errors:
    - [ ] If the user has attempted to login and gotten a `401` error, then the `errors` object should contain a `form` property that contains a message indicating that the `email` and `password` combination is incorrect.
    - [ ] If the user has attempted to login and gotten a `400` or `422` error, then the `errors` object should contain a `form` property that contains a message indicating what went wrong.
  - [ ] There should be a `button` element with the `className` of `submit-registration`:
    - [ ] It should contain the text `"Create Account"`
    - [ ] When clicked, it should call the `signupUser` function

#### Implement the `RegistrationPage` component

- [ ] Build the **`RegistrationPage`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `registration-page`
  - [ ] Using either a custom hook, context, or manually handled state, check to see if a user is already logged in
    - [ ] If the user is already logged in, it should redirect them to the `/activity` page
    - [ ] If no user is authenticated, it should render the `RegistrationForm` component and pass it any props it needs

#### Implement the `LandingPage` Component

- [ ] Build the **`LandingPage`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `landing-page`
  - [ ] Render an element with the class name of `hero`
    - [ ] Inside it, display a large hero image using an `img` element with the class name of `hero-img`
    - [ ] Render a brief blurb on what this application is about inside an element with the class name of `cta`
  - [ ] Allow unauthenticated access

#### Implement the `ActivityPage` Component

- [ ] Build the **`ActivityPage`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `activity-page`
  - [ ] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [ ] If the `isProcessing` flag is `true`, it should render the `Loading` component.
  - [ ] If the `isProcessing` flag is `false`, it should render the `ActivityFeed` component and pass it the appropriate props.

#### Implement the `ActivityFeed` Component

- [ ] Build the **`ActivityFeed`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `activity-feed`
  - [ ] Accept **at least** the following props:
    - [ ] `totalCaloriesPerDay` - an array of items containing summary data about the total calories consumed per day
    - [ ] `avgCaloriesPerCategory` - an array of items containing summary data about the average calories consumed per category
    - [ ] Any other props as needed
  - [ ] Inside an element with the class name of `per-category`, it should:
    - [ ] Render the text: `"Average Calories Per Category` inside an `h4` element
    - [ ] Take the first `6` or less items in the `avgCaloriesPerCategory` array and render a `SummaryStat` component for each item.
      - [ ] Pass the calories **rounded down to one decimal place** as the `stat` prop
      - [ ] Pass the string of `calories` as the `label` prop
      - [ ] Pass the `category` as the `substat` prop
  - [ ] Inside an element with the class name of `per-day`, it should:
    - [ ] Render the text: `"Total Calories Per Day` inside an `h4` element
    - [ ] For each item in the `totalCaloriesPerDay` array, render a `SummaryStat` component.
      - [ ] Pass the calories **rounded down to the nearest whole number** as the `stat` prop
      - [ ] Pass the string of `calories` as the `label` prop
      - [ ] Pass the `date` in the format `dd/mm/yyyy` - example: `07/02/2022` - as the `substat` prop

#### Implement the `SummaryStat` Component

- [ ] Build the **`SummaryStat`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `summary-stat`
  - [ ] Accept **at least** the following props:
    - [ ] `stat` - the primary statistic to display
    - [ ] `label` - the unit label assigned to the statistic
    - [ ] `substat` - a secondary statistic related to the primary statistic
  - [ ] Render the `stat` prop inside an element with the class name of `primary-statistic`
  - [ ] Render the `label` prop inside an element with the class name of `stat-label`
  - [ ] Render the `substat` prop inside an element with the class name of `secondary-statistic`

#### Implement the `NutritionPage` Component

- [ ] Build the **`NutritionPage`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `nutrition-page`
  - [ ] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [ ] Render a nested `Routes` component from `react-router-dom`.
    - [ ] There should be multiple `Route` components:
      - [ ] The `/nutrition` route should render the `NutritionOverview` component
      - [ ] The `/nutrition/create` route should render the `NutritionNew` component
      - [ ] The `/nutrition/id/:nutritionId` should render the `NutritionDetail` component
      - [ ] Any other route should render the `NotFound` component

#### Implement the `NutritionOverview` Component

- [ ] Build the **`NutritionOverview`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `nutrition-overview`
  - [ ] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
    - [ ] If the `error` state variable has a valid string in it, it should render the `error` message inside an element with the class name of `error`
    - [ ] If `isLoading` is `true`, it should render the `Loading` component
    - [ ] If `isLoading` is `false`, it should render the `NutritionFeed` component and pass it the appropriate props
  - [ ] Near the top of the component, it should render a `Link` component that directs to the `/nutrition/create` route and contains the text: `"Record Nutrition"`

#### Implement the `NutritionFeed` Component

- [ ] Build the **`NutritionFeed`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `nutrition-feed`
  - [ ] Receive **at least** the following props:
    - [ ] `nutritions` - an array of `nutrition` items
  - [ ] If the `nutritions` array has no items in it, render an empty message that says `Nothing here yet` inside an element with the class name of `empty-message`
  - [ ] If the `nutritions` array does have items in it:
    - [ ] For each item in the `nutritions` array, it should render a `NutritionCard` component

#### Implement the `NutritionNew` Component

- [ ] Build the **`NutritionNew`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `nutrition-new`
  - [ ] Render the `NutritionForm` component and pass it the appropriate props

#### Implement the `NutritionForm` Component

- [ ] Build the **`NutritionForm`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `nutrition-form`
  - [ ] Render an input element for the following fields:
    - [ ] `name` - name of the nutrition item (defaults to an empty string)
    - [ ] `calories` - number of calories in the nutrition item (defaults to 1)
    - [ ] `imageUrl` - the `url` of an image to show for this nutrition item (defaults to an empty string)
    - [ ] `category` - the category that this nutrition item belongs to, like fruit, meat, soda, snack, nuts, etc. (defaults to an empty string)
  - [ ] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [ ] `name` - the `name` of the `input` field being rendered (`name`, `calories`, `imageUrl`, `category`)
    - [ ] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [ ] `value` - the current value of the `input` element
    - [ ] `onChange` - the `onChange` handler function
  - [ ] Gracefully handle errors:
    - [ ] If any of the required fields are left blank, there should be an error message inside of an element with the class name of `error` indicating which fields are required.
    - [ ] If the user has attempted to create a nutrition entry and gotten a `400` or `422` error, then that message should be displayed inside an element with the class name of `error`
  - [ ] There should be a `button` element with the class name of `submit-nutrition`:
    - [ ] Contain the text `"Save"`
    - [ ] When clicked, it should call a function that creates a new nutrition entry
  - [ ] After the form has been successfully submitted:
    - [ ] Ensure that the new nutrition entry is stored in the `nutrition` context's `nutritions` array and is displayed in the `NutritionFeed` component
    - [ ] Fetch the `activity` data again so that new summary stats will be calculated

#### Implement the `NutritionDetail` Component

- [ ] Build the **`NutritionDetail.jsx`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `nutrition-detail`
  - [ ] Leverage the `useParams` hook from `react-router-dom` to extract the `nutritionId` param from the URL
  - [ ] When the component is mounted to the screen...
    - [ ] It should make a `GET` request to the `/nutrition/:nutritionId` endpoint with the `axios.get` method.
    - [ ] The `:nutritionId` part of the request should be replaced with the `nutritionId` pulled from the URL.
    - [ ] When the initial request is loading, it should render an `h1` element with the class name of `loading` and contain the text `"Loading..."`
    - [ ] Store the `nutrition` received by the request in state and then render a `NutritionCard` component for that nutrition.
    - [ ] If no `nutrition` is found with that `id`, it should render the `NotFound` component

#### Implement the `NutritionCard` Component

- [ ] Build the **`NutritionCard`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `nutrition-card`
  - [ ] Accept **at least** the following props:
    - [ ] `nutrition` - should be a nutrition entry object containing the following attributes:
      - [ ] `imageUrl` - (not required)
      - [ ] `name` - (required)
      - [ ] `calories` - (required)
      - [ ] `category` - (required)
      - [ ] `createdAt` - (required)
  - [ ] Render the `name` of the `nutrition` entry inside an element with the class name of `nutrition-name`
  - [ ] If the `nutrition` entry has a valid `imageUrl` attribute, render an `img` element with the class name of `nutrition-image` and use that `imageUrl` as its `src`
  - [ ] Render the `calories` attribute of the `nutrition` entry inside an element with the class name of `nutrition-calories`
  - [ ] Render the `category` attribute of the `nutrition` entry inside an element with the class name of `nutrition-category`
  - [ ] Render the `createdAt` attribute of the `nutrition` entry in the format `dd/mm/yyyy` - example: `07/02/2022` - inside an element with the class name of `nutrition-date`.

  - [ ] **DO THE SAME FOR ANY OTHER RESOURCE THAT IS IN THE APPLICATION**
    - [ ] Choose whatever resources you want!

#### Implement the `ProtectedRoute` Component

- [ ] Build the **`ProtectedRoute`** component to:
  - [ ] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [ ] Accept a component as the `element` prop and render that component.
  - [ ] If the application isn't currently loading and no user is found, render the `LoginPage` component instead of rendering the route the user intended to go to. This way, we can ensure that only authenticated users can access the provided component.
  - [ ] Any unauthenticated user should be shown the `LoginPage` component with a message indicating that they need to authenticate first
  - [ ] Update the `LoginPage` component so that it accepts a `message` prop that is displayed in the login form - if it exists.
  - [ ] Make sure to protect the entire `ActivityPage` component route and the `NutritionPage` component route (along with any other private resource pages). Don't protect the `LandingPage` component or the `LoginPage` and `RegistrationPage` components, as they should be public.

### API

Here are the pieces of functionality that should be built out for the backend:

- [ ] **Project setup**
  - [ ] First things first, bootstrap the Express application with some essential files and starter code
  - [ ] Create a `.gitignore` file, an `app.js` file, an `app.test.js` file, and a `server.js` file
  - [ ] Make sure `node_modules` are added to the `.gitignore` file.
  - [ ] Add dependencies for `express@next`, `morgan`, `cors`, and `nodemon`
  - [ ] Install new dependencies for `bcrypt`, `jsonwebtoken`, `colors`, `dotenv`, `pg`
  - [ ] Commit all work to `git`
  - [ ] Add a `.env` file to the root of the repo and include the following environment variables
    - [ ] `PORT` (default to `3001`)
    - [ ] `SECRET_KEY` (set to a long random string)
    - [ ] `BCRYPT_WORK_FACTOR` (set to `13`)
    - [ ] `DATABASE_USER`
    - [ ] `DATABASE_PASS`
    - [ ] `DATABASE_HOST`
    - [ ] `DATABASE_PORT`
    - [ ] `DATABASE_NAME` - (set to `lifetracker`)
    - [ ] `DATABASE_TEST_NAME` - (set to `lifetracker_test`)
  - [ ] Add a `config.test.js` file
    - [ ] Write tests that check to make sure that:
      - [ ] `process.env.NODE_ENV` is set to `test` when the test suite is run
      - [ ] There is an `IS_TESTING` variable that is exported, which should only be true if `process.env.NODE_ENV` is set to `test`
    - [ ] Write tests to ensure that certain environment variables are exported from the `config.js` file and can be imported:
      - [ ] `PORT`
      - [ ] `SECRET_KEY`
      - [ ] `BCRYPT_WORK_FACTOR`
      - [ ] `IS_TESTING`
    - [ ] Write tests to ensure that a `getDatabaseUri` function is exported from the `config.js` file
      - [ ] The `getDatabaseUri` function should:
        - [ ] Check to see if a valid `process.env.DATABASE_URL` environment variable exists, and return that if it does.
        - [ ] When `IS_TESTING` is `true`, the `getDatabaseUri` function should use the test database
        - [ ] Otherwise, it should combine the proper database environment variables into a database connection string if no `process.env.DATABASE_URL` environment variable exists
  - [ ] Add a `config.js` file
    - [ ] Use the `dotenv` package to parse the environment variables from the `.env` file.
    - [ ] Export each of the environment variables from the `config.js` file until the tests pass
    - [ ] Write a `getDatabaseUri` function so that all the tests pass
  - [ ] Commit all work to `git`
  - [ ] The project should now be ready to go!
- [ ] **PostgreSQL database**
  - Time bring in a PostgreSQL database client as the application's persistence layer
  - Make sure the PostgreSQL server is running
  - Create two files at the root of the project:
    - [ ] `lifetracker-schema.sql`
      - [ ] This script should:
        - [ ] Create a `users` table with the following columns:
          - [ ] `id`
          - [ ] `username`
          - [ ] `password`
          - [ ] `first_name`
          - [ ] `last_name`
          - [ ] `email`
          - [ ] `created_at`
          - [ ] `updated_at`
        - [ ] Create a `nutrition` table with the following columns:
          - [ ] `id`
          - [ ] `name`
          - [ ] `category`
          - [ ] `calories`
          - [ ] `image_url`
          - [ ] `user_id`
          - [ ] `created_at`
        - [ ] **Any other tables** that the application might depend on
    - [ ] `lifetracker.sql`
      - [ ] This script should:
        - [ ] 1. Let the user know that they're about to delete the `lifetracker` database and prompt them to confirm that is what they want.
        - [ ] 2. Drop the `lifetracker` database and then create a new `lifetracker` database, before connecting to the `lifetracker` database.
        - [ ] 3. It should then run the `lifetracker-schema.sql` file.
        - [ ] Follow the exact same steps for `1`, `2`, and `3`, but with the `lifetracker_test` database.
  - [ ] Setup the database by running `psql -f lifetracker.sql`
  - [ ] Create a new file at the root of the project called `db.js`. In that file:
    - [ ] Import the `getDatabaseUri` function from the `config.js` file.
    - [ ] Initialize a new PostgreSQL client with the `pg` package and connect to PostgreSQL using any necessary config variables.
    - [ ] Connect to PostgreSQL and log a message to the terminal on success or failure.
    - [ ] Export the connected database client
  - [ ] Commit all work to `git`
  - [ ] A database client is now ready to be used!
- [ ] **Server**
  - [ ] Build out a bare-bones Express server with a health check route and an adequate middleware pipeline.
  - [ ] Create a `utils` directory
    - [ ] In the `utils` directory, create an `errors.js` file.
    - [ ] Create error classes inside the file that will be used throughout the app.
  - [ ] In the `app.test.js` file, write tests that:
    - [ ] Ensure that the Express application responds to `GET` requests to the `/` route with a JSON object of `{ "ping": "pong" }`
    - [ ] Check that middleware like `morgan` and `cors` exist, along with the JSON `body-parser` middleware from `express`
    - [ ] Include an `afterAll` hook that calls `await db.end()` so that any open database connections close when all the tests are finished.
  - [ ] Add code to the `app.js` and `server.js` file to get a simple server running along with responding to `GET` requests to the `/` route
  - [ ] Create error classes inside the `utils/errors.js` file.
  - [ ] Add `404` and generic error handler middleware to the `app.js` file.
  - [ ] In the `server.js` file:
    - [ ] Import the Express app and the `config.js` file
    - [ ] Have the `app` listen on the port specified by `config.PORT`.
  - [ ] Commit all work to `git`
  - [ ] Test out the fancy new Express server by starting it up in a new terminal window!
- [ ] **Common Test Configuration**
  - [ ] It would probably be helpful to create some common test functions that can be used throughout the application's testing suite.
  - [ ] Create a new directory called `tests`
  - [ ] Now, touch a new file at `tests/common.js`
    - [ ] In that file:
      - [ ] Import the `db` client
      - [ ] Create and export four functions:
        - [ ] `commonBeforeAll`
          - [ ] Actions that should happen before any tests in a particular file run.
          - [ ] This should include things like executing queries that delete all items from any tables in the test database that might have been added during testing
        - [ ] `commonBeforeEach`
          - [ ] Actions that should happen before any **single** test in a particular file runs.
          - [ ] This should include things like starting a database transaction
        - [ ] `commonAfterEach`
          - [ ] Actions that should happen after any **single** test in a particular file runs.
          - [ ] This should include things like rolling back any database actions before they're committed
        - [ ] `commonAfterAll`
          - [ ] Actions that should occur after all tests in a particular file run.
          - [ ] This should include things like ending any open database client connections
  - [ ] Commit all work to `git`
- [ ] **Authentication**
  - [ ] Go ahead and build out a full-fledged authentication flow using PostgreSQL, `bcrypt`, and JSON Web Tokens. For it all to work, we'll need a `User` model, a `security` middleware, some `tokens` utility functions, and the appropriate `auth` routes.
  - [ ] Add new directories for `models`, `routes`, and `middleware`
  - [ ] The **User** model
    - [ ] In the `models` directory, create two new files: `models/user.js` and `models/user.test.js`
      - [ ] The `User` model should have **at least** the following static methods:
        - [ ] `login`
        - [ ] `register`
        - [ ] `fetchUserByEmail`
    - [ ] In the `models/user.test.js` file:
      - [ ] Test the `login` method. Write test cases for:
        - [ ] User can login successfully with proper credentials
        - [ ] Unknown email throws `UnauthorizedError`
        - [ ] Invalid credentials throws `UnauthorizedError`
      - [ ] Test the `register` method. Write test cases for:
        - [ ] User can successfully register with proper credentials
        - [ ] Registering with duplicate email throws `BadRequestError`
        - [ ] Registering with duplicate username throws `BadRequestError`
        - [ ] Registering with invalid email throws `BadRequestError`
      - [ ] Test the `fetchUserByEmail` method:. Write test cases for:
        - [ ] A valid email returns a user from the database
        - [ ] Invalid emails are handled correctly
      - [ ] It will probably be important to use the `beforeAll`, `afterAll`, `beforeEach`, and `afterEach` hooks to add and delete users from the database before running the tests
    - [ ] In the `models/user.js` file:
      - [ ] Import the `bcrypt` package, the `db` client, and the app `config`.
      - [ ] Implement the features outlined in the tests until they're all passing.
  - [ ] Commit all work to `git`
  - [ ] The **tokens** utility functions
    - [ ] In the `utils` directory, create two new files: `utils/tokens.js` and `utils/tokens.test.js`
      - [ ] At the bare minimum, two functions will be needed:
        - [ ] One that accepts a JSON payload as an argument and converts it into a JWT
        - [ ] One that accepts a JWT as an argument, validates it, and returns the JSON payload encoded within - if it's valid
    - [ ] In the `utils/tokens.test.js` file:
      - [ ] Write test cases for:
        - [ ] Can create valid JWT tokens for user payloads
        - [ ] Can extract a payload from a valid JWT with the correct secret
        - [ ] No payload gets returned when invalid tokens are parsed
    - [ ] In the `utils/tokens.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
  - [ ] Commit all work to `git`
  - [ ] The **security** middleware
    - [ ] In the `middleware` directory, create two new files: `middleware/security.js` and `middleware/security.test.js`
      - [ ] One middleware will be responsible for extracting a user from a valid JWT in the request:
        - [ ] Checking the `Authentication` header of each request for the existence of a JWT.
        - [ ] If one exists, it should extract the token, validate it, extract the encoded JSON payload, and attach it to the response's `locals` property
      - [ ] One middleware will be responsible for ensuring that an authenticated user exists:
        - [ ] Checking that a valid user exists on the response's `locals` property
        - [ ] If one does, the middleware should simply call next
        - [ ] If no valid user exists, it should throw an `UnauthorizedError`
    - [ ] In the `middleware/security.test.js` file:
      - [ ] Test the `Authentication` header parsing middleware
        - [ ] Write test cases for:
          - [ ] Extracts user from valid JWT in `Authentication` header
          - [ ] No user is stored when no valid JWT exists in the `Authentication` header
          - [ ] No user is stored when an invalid JWT is in the `Authentication` header
      - [ ] Test the middleware that ensures an authenticated user exists
        - [ ] Write test cases for:
          - [ ] Doesn't throw an error when a valid user is present
          - [ ] Throws an `UnauthorizedError` when no valid user is present
    - [ ] In the `middleware/security.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] In the `app.js` file, add the `Authentication` header parsing middleware to the Express app's middleware pipeline
  - [ ] Commit all work to `git`
  - [ ] The **/auth** routes
    - [ ] In the `routes` directory, create two new files: `routes/auth.js` and `routes/auth.test.js`
      - [ ] A new Express router should be created. It should handle:
        - [ ] A `GET` request to the `/me` endpoint
          - [ ] It should send a JSON response back to the client with the user info like so: `{ "user": { "email": "user@gmail.com", ... } }`
        - [ ] A `POST` request to the `/login` endpoint
          - [ ] It should accept a request body with `email` and `password` keys
          - [ ] It should send a JSON response back to the client with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
        - [ ] A `POST` request to the `/register` endpoint
          - [ ] It should accept a request body with `email`, `username`, `firstName`, `lastName`, and `password` keys
          - [ ] It should send a JSON response back to the client with a `201` status code, along with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
      - [ ] It should be mounted at the `/auth` endpoint in the `app.js` file
    - [ ] In the `routes/auth.test.js` file:
      - [ ] Test the `POST /auth/login` endpoint
        - [ ] Write test cases for:
          - [ ] Allows user to register with valid credentials and responds with JSON containing a valid token and user in the "token" and "user" fields
          - [ ] Throws `UnauthorizedError` when user doesn't exist in database
          - [ ] Throws `UnauthorizedError` when user provides wrong password
          - [ ] Throws `BadRequestError` when user doesn't provide password
          - [ ] Throws `BadRequestError` when user doesn't provide email
      - [ ] Test the `POST /auth/register` endpoint
        - [ ] Write test cases for:
          - [ ] Allows user to login successfully with valid credentials and responds with a `201` status code, along with JSON containing a valid token and user in the "token" and "user" fields
          - [ ] Throws `BadRequestError` when user doesn't provide one of the required fields
          - [ ] Throws `BadRequestError` when user provides email that already exists
          - [ ] Throws `BadRequestError` when user provides username that already exists
      - [ ] Test the `POST /auth/me` endpoint
        - [ ] Write test cases for:
          - [ ] Provides the user with their user info when a valid JWT is present in the `Authentication` header of the request
          - [ ] Throws an `UnauthorizedError` when no valid user is logged in
    - [ ] In the `routes/auth.js` file:
      - [ ] Create a new Express router
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] In the `app.js` file:
    - [ ] Mount the router at the `/auth` endpoint
  - [ ] Commit all work to `git`
  - [ ] There should now be a full-fledged authentication system in place!
- [ ] **Resources and Permissions**
  - [ ] Next, implement the functionality to allow users to save instances of things they've drank/eaten, so that they can track their own nutrition data! Also make sure users can only access the data that they themselves have created. No other user should be able to see any data owned by another user!
  - [ ] The **Nutrition** model
    - [ ] In the `models` directory, create two new files: `models/nutrition.js` and `models/nutrition.test.js`
      - [ ] The `Nutrition` model should have **at least** the following static methods:
        - [ ] `createNutrition`
          - [ ] Should insert a new nutrition instance into the database when values are supplied for all of the required fields: `"name"`, `"category"`, `"calories"`, and `"image_url"`. The `quantity` field should default to `1`.
          - [ ] The new nutrition instance should have its `user_id` field set to the `id` of the authenticated user
          - [ ] Should throw a `BadRequestError` (`400` status code) or `UnprocessableEntityError` (`422` status code) when any of those values are not supplied.
        - [ ] `fetchNutritionById`
          - [ ] When supplied with a valid `id`, fetches the a nutrition instance from the database that matches that `id`.
          - [ ] If no nutrition instance matches that `id`, throws a `NotFoundError` (`404` status code)
        - [ ] `listNutritionForUser`
          - [ ] Should list all nutrition instances in the database that are owned by a particular user
    - [ ] In the `models/nutrition.test.js` file:
      - [ ] Test the `createNutrition` method. Write test cases for:
        - [ ] A user can create a nutrition instance when they supply the appropriate values
        - [ ] The appropriate error is thrown when any of the provided errors are invalid
        - [ ] The user that creates the nutrition instance now owns that nutrition instance
      - [ ] Test the `fetchNutritionById` method. Write test cases for:
        - [ ] Fetches the nutrition instance that matches the supplied `id`
        - [ ] Throws a `NotFoundError` when no nutrition instances matches the supplied `id`
      - [ ] Test the `listNutritionForUser` method. Write test cases for:
        - [ ] Fetches all nutrition instances belonging to a particular user
        - [ ] Doesn't include any nutrition instances belonging to a different user
        - [ ] Returns an empty array if no nutrition instances are found in the database that belong to that user
    - [ ] In the `models/nutrition.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] Commit all work to `git`
  - [ ] The **permissions** middleware
    - [ ] In the `middleware` directory, create two new files: `middleware/permissions.js` and `middleware/permissions.test.js`
      - [ ] Though more functions will need to be added here as the number of resources grows, for now only 1 function needs to be created.
      - [ ] The `authedUserOwnsNutrition` middleware function should:
        - [ ] Probably be called after the `requireAuthenticatedUser` security middleware in any route's middleware pipeline
        - [ ] Extract a parameter from the request endpoint that corresponds to the `id` of the nutrition instance
        - [ ] Query the database for that nutrition instance
        - [ ] Check that it is owned by the authenticated user
          - [ ] If it doesn't, it should throw a `ForbiddenError` (`403` status code)
          - [ ] If the nutrition instance does belong to the authenticated user, it should attach it to the `locals` property of the `response` as its `nutrition` property so that it doesn't need to be fetched again by the database (this isn't required, but is probably a good idea).
    - [ ] In the `middleware/permissions.test.js` file:
      - [ ] Test the `authedUserOwnsNutrition` middleware function
        - [ ] Write test cases for:
          - [ ] Throws error if authenticated user doesn't own nutrition
          - [ ] Throws `NotFoundError` if `id` of nutrition isn't found in database
          - [ ] Doesn't throw error if authenticated user is nutrition owner
          - [ ] (OPTIONAL) Attaches the `nutrition` to the `locals` property of the response when the user owns the nutrition instance
    - [ ] In the `middleware/permissions.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] Commit all work to `git`
  - [ ] The **/nutrition** routes
    - [ ] In the `routes` directory, create two new files: `routes/nutrition.js` and `routes/nutrition.test.js`
      - [ ] A new Express router should be created that will be mounted at the `/nutrition` endpoint. It should handle:
        - [ ] `GET` requests to the `/` endpoint
          - [ ] It should send a JSON response back to the client with all of the user-owned nutrition instances in an array like so: `{ "nutritions": [...] }`
        - [ ] `POST` requests to the `/` endpoint
          - [ ] It should accept a request body with one `nutrition` key containing an object with all the attributes of the `nutrition` entry
          - [ ] It should send a JSON response back to the client with a `201` status code, and the newly created nutrition instance like so: `{ "nutrition": { ... } }`
        - [ ] `GET` requests to the `/:nutritionId` endpoint
          - [ ] It should send a JSON response back to the client with the nutrition instance that matches the `:nutritionId` parameter like so: `{ "nutrition": { ... } }`
    - [ ] In the `routes/nutrition.test.js` file:
      - [ ] Test the `GET /nutrition` endpoint
        - [ ] Write test cases for:
          - [ ] Returns an array of all `nutrition` entries belonging to the user
          - [ ] Other user's entries aren't included in the `nutritions` array
          - [ ] Throws `UnauthorizedError` if no valid user is logged in
      - [ ] Test the `POST /nutrition` endpoint
        - [ ] Write test cases for:
          - [ ] Authenticated users can create a new `nutrition` entry when providing values for all the required fields
          - [ ] The new `nutrition` entry belongs to the user that created it
          - [ ] Throws a `BadRequestError` if any of the required fields are missing
          - [ ] Throws an `UnauthorizedError` if no valid user is logged in
      - [ ] Test the `GET /nutrition/:nutritionId` endpoint
        - [ ] Write test cases for:
          - [ ] Nutrition owner can fetch a `nutrition` entry when providing a valid `id`
          - [ ] Throws a `403 ForbiddenError` if a user tries to access a `nutrition` instance that does not belong to them
          - [ ] Throws a `404 NotFoundError` when the `nutritionId` does not match any nutrition in the database
          - [ ] Throws a `401 UnauthorizedError` if no valid user is logged in
    - [ ] In the `routes/nutrition.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
  - [ ] Commit all work to `git`
- **Additional Resources**
  - [ ] Create model and routes files for 1-2 additional resources that your app will track (sleep, exercise, steps, floors climbed, meditation, mood, heartrate, music practice, etc.)
  - [ ] Commit all work to `git`
- **Summary Statistics**
  - [ ] One of the last features of the API will be a model that calculates summary statistic on the different resources that users are tracking. This includes statistics like average calories per day, or max calories per category. To do that, we'll create a new `Activity` model and an `activity` route that will be used to populate the frontend.
  - [ ] The **Activity** model
    - [ ] In the `models` directory, create two new files: `models/Activity.js` and `models/Activity.test.js`
      - [ ] The `Activity` model should have **at least** the following static methods:
        - [ ] `calculateDailyCaloriesSummaryStats`
          - [ ] Should execute a SQL query that calculates **at least** the total calories consumed per day (aliased as `totalCaloriesPerDay`), along with the day (aliased as `date`).
          - [ ] The query should return a row for **each day** containing the total calories consumed per day, and the average caloric content per nutrition entry.
            - [ ] For instance, here's a set of 7 **simplified** nutrition item entries (actual data will look different):
              - 1. `{ id: 1, user_id: 1, calories: 100, category: "candy", created_at: "12-22-2022" }`
              - 2. `{ id: 2, user_id: 1, calories: 200, category: "drink", created_at: "12-22-2022" }`
              - 3. `{ id: 3, user_id: 1, calories: 200, category: "fruit", created_at: "12-23-2022" }`
              - 4. `{ id: 4, user_id: 1, calories: 400, category: "dairy", created_at: "12-23-2022" }`
              - 5. `{ id: 5, user_id: 1, calories: 400, category: "drink", created_at: "12-23-2022" }`
              - 6. `{ id: 6, user_id: 1, calories: 700, category: "fruit", created_at: "12-24-2022" }`
              - 7. `{ id: 7, user_id: 1, calories: 100, category: "fruit", created_at: "12-24-2022" }`
            - [ ] The summary stats returned from the query should look like this:
              - 1. `{ date: "12-22-2022", totalCaloriesPerDay: 300 }`
              - 2. `{ date: "12-23-2022", totalCaloriesPerDay: 1000 }`
              - 3. `{ date: "12-24-2022", totalCaloriesPerDay: 800 }`
        - [ ] `calculatePerCategoryCaloriesSummaryStats`
          - [ ] Should execute a SQL query that calculates **at least** the average calories consumed per category (aliased as `avgCaloriesPerCategory` and **rounded down to one decimal place**), along with the category (aliased as `category`).
          - [ ] The query should return a row for **each day** containing the total calories consumed per day, and the average caloric content per nutrition entry.
            - [ ] For instance, here's a set of 7 **simplified** nutrition item entries (actual data will look different):
              - 1. `{ id: 1, user_id: 1, calories: 100, category: "candy", created_at: "12-22-2022" }`
              - 2. `{ id: 2, user_id: 1, calories: 200, category: "drink", created_at: "12-22-2022" }`
              - 3. `{ id: 3, user_id: 1, calories: 200, category: "fruit", created_at: "12-23-2022" }`
              - 4. `{ id: 4, user_id: 1, calories: 400, category: "dairy", created_at: "12-23-2022" }`
              - 5. `{ id: 5, user_id: 1, calories: 400, category: "drink", created_at: "12-23-2022" }`
              - 6. `{ id: 6, user_id: 1, calories: 700, category: "fruit", created_at: "12-24-2022" }`
              - 7. `{ id: 7, user_id: 1, calories: 100, category: "fruit", created_at: "12-24-2022" }`
            - [ ] The summary stats returned from the query should look like this:
              - 1. `{ category: "candy", avgCaloriesPerCategory: 100.0 }`
              - 2. `{ category: "drink", avgCaloriesPerCategory: 300.0 }`
              - 3. `{ category: "fruit", avgCaloriesPerCategory: 266.6 }`
              - 4. `{ category: "dairy", avgCaloriesPerCategory: 400.0 }`
    - [ ] In the `models/Activity.test.js` file:
      - [ ] Test the `calculateDailyCaloriesSummaryStats` method. Write test cases for:
        - [ ] The `calculateDailyCaloriesSummaryStats` method correctly calculates summary statistics per day
        - [ ] Only uses the `nutrition` entries belonging to the user when calculating summary statistics
        - [ ] Returns an empty array when the user has no `nutrition` entries
      - [ ] Test the `calculatePerCategoryCaloriesSummaryStats` method. Write test cases for:
        - [ ] The `calculatePerCategoryCaloriesSummaryStats` method correctly calculates average calories per category summary statistics
        - [ ] Only uses the `nutrition` entries belonging to the user when calculating summary statistics
        - [ ] Returns an empty array when the user has no `nutrition` entries
    - [ ] In the `models/Activity.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] Commit all work to `git`
  - [ ] The **/activity** routes
    - [ ] In the `routes` directory, create two new files: `routes/activity.js` and `routes/activity.test.js`
      - [ ] A new Express router should be created that will be mounted at the `/activity` endpoint. It should handle:
        - [ ] `GET` requests to the `/` endpoint
          - [ ] It should send a JSON response back to the client with summary stats for each resource in the following format:
            - [ ] `{ "nutrition": { "calories": { "perDay": [...], "perCategory": [...] }, ...anyOtherStats }, ...statsForOtherResources }`
    - [ ] In the `routes/activity.test.js` file:
      - [ ] Test the `GET /activity` endpoint
        - [ ] Write test cases for:
          - [ ] Provides a JSON response containing arrays of summary stats for resources, attributes, and metrics
          - [ ] Correctly calculates `totalCaloriesPerDay` for a user's `nutrition` entries
          - [ ] Correctly calculates `avgCaloriesPerCategory` for a user's `nutrition` entries
          - [ ] Only returns summary stats based on entries that the currently authenticated user owns
          - [ ] Throws an `UnauthenticatedError` if no valid user is logged in
    - [ ] In the `routes/activity.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
  - [ ] Commit all work to `git`
