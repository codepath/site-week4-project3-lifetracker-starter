# Project #3: LifeTracker Application

## Overview

> Data is the new oil - Clive Humbly

Everywhere around us is data waiting to be collected and utilized. In recent years we've seen the rise of applications and services that exist to quantify concepts that were previously hard to capture. FitBit, Apple Health, and Woop are all $1 billion dollar services to offer tracking statistics about how we live our lives. The LifeTracker app you'll be building will do exactly that - track your life by quantifying your activity.

This application will be built using the battle-tested PERN stack - PostgreSQL, Express, React, and Node.

📝 `NOTE` Use this template to initialize the contents of a README.md file for your application. As you work on your assignment over the course of the week, update the required or stretch features lists to indicate which features you have completed by changing `[ ]` to `[x]`. (🚫 Remove this paragraph before submitting your assignment.)

## Application Features

### Core Features

- [x] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [x] If the user is logged in, it should display a **Sign Out** button. 
  - [x] If no user is logged in, it should display **Login** and **Register** buttons
  - [x] Display a logo on the far left side, and contain links to the individual detailed activity page. 
- [x] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about
- [x] **Login Page:** A form that allows users to login with email and password.
- [x] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [x] When a user first authenticates, they should be redirected to an authenticated view (i.e the detailed activity page). When they sign out, all frontend data should be reset.
- [x] Users have access to an overview Activity page that show one summary statistic about each of the 3 types of activity tracked.
- [x] The API should have a `security` middleware that only allows authenticated users to access resources and only allows users to access resources about themselves. 
- [x] Users should have the ability to track at least **1** types of activities (i.e Nutrition, Exercise, Sleep, etc.). Each activity should be tracked on separate pages.
- [x] Deployed website with Heroku & Surge. 
* [Link](https://new-lifetracker.surge.sh/)

**Detailed Activity Page:**
- [x] The detailed activity page should display a feed of all previous tracked activities.
- [x] The detailed activity should contain a form to contain relevant information. (i.e if tracking nutrition this form allows the user to capture calories, timestamp, image, category, etc.) 
- [x] The activity tracked should be given a unique id for easy lookup.
  * [Table Schema](https://github.com/aileen-ji/tdd-lifetracker-starter/blob/week5/lifetracker-api/lifetracker-schema.sql) 

### Stretch Features

Implement any of the following features to improve the application:
- [x] Each model (`nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource. Create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [x] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item.
- [x] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the life tracker application and allow users to follow each other.

### Walkthrough Video
Week 4
![](https://github.com/aileen-ji/tdd-lifetracker-starter/blob/main/lifetracker-ui/src/assets/walkthrough-new.gif)
Week 5
![](https://github.com/aileen-ji/tdd-lifetracker-starter/blob/week5/lifetracker-ui/src/assets/walkthrough-newest.gif)


### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I was unprepared for the jwt tokens, security middleware and the api client. Youtube was helpful and I had to do a lot of self studying.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would do the loading handler, and learn about the contexts more. I would also modify my feed and build the activity page.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I was able to show most features I did, but I forgot to do the refresh thing since I went first and I was a bit nervous. I would want to highlight the navlink that is currently selected to make the page more accessible.

### Open-source libraries used

pexels(https://www.pexels.com/) 
icons8(https://icons8.com/)

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

Shout out to my pod for being supportive!

## Goals

Building this application you will accomplish the following:

- [x] Develop a full-fledged authentication system using PostgreSQL and Bcrypt
- [x] Provide users with an Express API they can interact with to store user-related activity
- [x] Construct multiple Models that implement the core business logic associated with tracking users' lives
- [x] Write SQL queries that aggregate user statistics and provide summary overviews about their activity
- [x] Design a React frontend that interacts with the API using an API service class
- [x] Build multiple pages and forms that communicate with the server using HTTP requests
- [x] Store user-authenticated JWT tokens in the browser's local storage for persisted authentication
- [x] Employ useEffect and useState hooks to manage application state on the frontend

## Application Features

This assignment asks SITE interns to accomplish the following:

### Frontend

### React UI

For the React frontend, Site interns will be building a number of components. Make sure to keep the same component structure as the starter code, as that is how the tests will know where to find each component.

In general, the components directory should resemble:

```text
│
└── components
    └── App
        │
        ├── Landing
        │   └── Landing.jsx
        │   └── Landing.css

        ... other components

        ├── Navbar
        │   └── Navbar.jsx
        │   └── Navbar.css
        ├── NutritionPage
        │   └── NutritionPage.jsx
        │   └── NutritionPage.css

        ... other components

```

> NOTE: Each components should be exported from the file as the `default` export!

The components in the `App.jsx` file should render the following components (along with any others that might be needed):

```text
│
└── App
    │
    ├── Navbar (all routes)
    │   ├── Logo
    │   └── NavLinks
    │
    ├── LandingPage (the `/` route)
    ├── LoginPage (the `/login` route)
    │   └── LoginForm
    ├── RegistrationPage (the `/register` route)
    │   └── RegistrationForm
    │
    ├── ActivityPage (the `/activity` route)
    │   ├── SummaryStat
    │   ├── SummaryStat
    │   ├── ... as many as needed
    │   └── SummaryStat
    │
    ├── NutritionPage (the `/nutrition` route, which renders more nested routes)
    │   ├── NutritionOverview (the main component rendered at the `/nutrition` route)
    │   │   └── NutritionFeed
    │   │       ├── NutritionCard
    │   │       ├── NutritionCard
    │   │       ├── ... as many as needed
    │   │       ├── NutritionCard
    │   │       └── NutritionCard
    │   │
    │   ├── NutritionNew (rendered at the `/nutrition/create` route)
    │   │   └── NutritionForm
    │   │
    │   ├── NutritionDetail (rendered at the `/nutrition/id/:nutritionId` route)
    │   │   └── NutritionCard
    │   │   └── NotFound (only if no `nutrition` with that `nutritionId` exists)
    │   │
    │   └── NotFound (all other routes that don't match any of the nested routes)
    │
    └── NotFound (all other routes that don't match)

```

> **IMPORTANT**:
> NOTE - Make sure that each component can render without crashing, even when none of the required props are provided! Components will be rigorously tested using only a few props. So, to ensure that all the tests pass, either add default props to components where needed, or check that certain props exist before rendering JSX that depends on them.

- To build out the front-end, start with the `App.jsx` component:

  - [x] **`App.jsx`**
    - [x] Should be wrapped by an element with the `className` of `app`
    - [x] The core App component that contains the routes for the app wrapped in Context providers
    - [x] Renders the `Navbar` component on every route
    - [x] Renders a `BrowserRouter` component that contains a `Routes` component with the following routes:
      - [x] `/` - Should render the `Landing.jsx` component
      - [x] `/login` - Should render the `LoginPage.jsx` component
      - [x] `/register` - Should render the `RegistrationPage.jsx` component
      - [x] `/activity` - Should render the `ActivityPage.jsx` component (only if the user is logged in, otherwise it renders the `AccessForbidden.jsx` component)
      - [x] `/nutrition/* - should render the `NutritionPage.jsx`component (only if the user is logged in, otherwise it renders the`AccessForbidden.jsx` component)
      - [x] `*` - anything else should render the `NotFound` component
  - [x] To standarize API requests throughout the application, set up an **`ApiClient`** class

    - [x] Start by creating a `constants.js` file at the root of the project
      - [x] In it, export a few variables:
      - [x] `PRODUCTION_API_BASE_URL` - set to whatever url the production API is deployed at
      - [x] `DEVELOPMENT_API_BASE_URL` - set to "http://localhost:3001" for development
      - [x] `API_BASE_URL` - if `process.env.NODE_ENV` is `production`, set this to `PRODUCTION_API_BASE_URL`, otherwise set it to `DEVELOPMENT_API_BASE_URL`
    - [x] Next, create a `services` directory at the root of the project
    - [x] Inside that directory, touch an `apiClient.js` file
    - [x] In that file, import the `axios` package and the `API_BASE_URL` constant from the `constants.js` file
    - [x] Define a new class in that file called `ApiClient`.
      - [x] Give it a constructor function that accepts a single parameter - `remoteHostUrl`. The constructor should attach the `remoteHostUrl` parameter to a new instance with `this.remoteHostUrl = remoteHostUrl`. It should also set `this.token = null`.
      - [x] Export default a new instance of the `ApiClient` class
      - [x] Add an additional method called `setToken` that accepts a single parameter - `token` and attaches it to the instance.
      - [x] Create a utility method called `request` that uses `axios` to issue HTTP requests
      - [x] Add a `login` method that uses the `request` method to send an HTTP request to the `auth/login` endpoint
      - [x] Add a `signup` method that uses the `request` method to send an HTTP request to the `auth/register` endpoint
      - [x] Add a `fetchUserFromToken` method that uses the `request` method to send an HTTP request to the `auth/me` endpoint
      - [x] **Add as many other methods as needed when making API requests**

  - [x] Create an **`auth`** context:

    - [x] First, create a `contexts` directory at the root of the project
    - [x] Inside it, touch the `contexts/auth.jsx` file
    - [x] In that file, define a new `AuthContext` with `React.createContext`
    - [x] Use that context to create an `AuthContextProvider` component
      - [x] The Provider component should create state variables and updaters needed for `user`, `initialized`, `isProcessing`, and `error`.
      - [x] It should have a `React.useEffect` hook that fires when the component is mounted to the screen
        - [x] That hook should check to see if a JWT token exists in local storage under the `lifetracker_token` key
          - [x] If it does:
            - [x] It should add that token to `ApiClient` class with the `setToken` method
            - [x] Then, it should set the `isProcessing` state variable to `true` and the `error` state variable to `null`
            - [x] Next, it should send a `GET` request to the `/auth/me` endpoint
              - [x] If it fails, it should set the `error` prop to a valid error message
              - [x] If it is successful...
                - [x] It should set the `user` state variable with the `user` returned in the response
                - [x] It should set the `error` state variable to `null`
            - [x] Regardless, it should set the `isProcessing` state variable to `false` and the `initialized` state variable to `true`
          - [x] The user returned from that request should be stored in state. This will ensure that users stay logged in even if they refresh the page.
      - [x] It should also define handler functions for:
        - [x] `loginUser` - should make a request to log the user in
        - [x] `signupUser` - should make a request to sign the user up
        - [x] `fetchUserFromToken` - should make a request to the `/auth/me` route to get the user's info
        - [x] `logoutUser` - this function should remove the `lifetracker_token` from local storage and refresh the page so that all user data is reset
      - [x] Make sure to set all the state variables as the `value` prop passed to the `AuthContext.Provider` component
    - [x] Create and export a `useAuthContext` hook that calls the `React.useContext` hook with the newly created `AuthContext` and returns it.
    - [x] In `App.jsx` file create an `AppContainer` component that wraps the `App` component with the `AuthContextProvider` component (which should still be nested inside the `BrowserRouter` component from `react-router-dom`). Export the `AppContainer` component by default instead of the `App`

  - [x] The **`Loading.jsx`** component

    - [x] Should render JSX that is wrapped by an element with the `className` of `loading`
    - [x] Should render an element with the `className` of `loading-message` that contains the text `"Loading"`

  - [x] The **`Navbar.jsx`** component

    - [x] Should render JSX that is wrapped by a `nav` element with the `className` of `navbar`
    - [x] Should render the app's logo:
      - [x] It should be an element with the `className` of `logo`.
      - [x] Inside that element should be a `Link` component from `react-router-dom` that navigates the user to the `/` route when clicked.
      - [x] Inside that `Link` component should be the application's logo (text or image)
    - [x] Should render the `NavLinks.jsx` component with links to each of the resources and the `/activity` route

  - [x] The **`NavLinks.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with a `className` of `nav-links`
    - [x] Should render a `Link` element from `react-router-dom` for:
      - [x] The `/activity` route. It should have a label of `Activity`.
      - [x] The `/nutrition` route. It should have a label of `Nutrition`.
      - [ ] A route for any other resource page
    - [x] If a valid user is logged in:
      - [x] It should render an element with the `className` of `logout-button` that calls the `logoutUser` function when clicked.
        - [x] That function should remove the `lifetracker_token` from local storage and refresh the page so that all user data is reset.
    - [x] If no valid user is logged in:
      - [x] It should render a `Link` element that redirects to the `/login` route with the label `Login`
      - [x] It should render a `Link` element that redirects to the `/register` route with the label `Sign Up`

  - [x] The **`LoginForm.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `login-form`
    - [x] Should render an input element for the following fields:
      - [x] `email`
      - [x] `password`
    - [x] Each `input` element in the form should have a `className` of `form-input` and should have the following props set:
      - [x] `name` - the `name` of the `input` field being rendered (`email`, `password`)
      - [x] `type` - the type of the `input` element (`text`, `email`, `number`, etc)
      - [x] `value` - the current value of the `input` element
      - [x] `onChange` - the `onChange` handler function
    - [x] The component should validate the `email` field:
      - [x] If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the `className` of `error` indicating that the entry is not a valid email.
    - [x] The component should gracefully handle errors:
      - [x] If the user has attempted to login and gotten a `401` error, then an error message should be displayed in an element with the `className` of `error` indicating that the `email` and `password` combination is incorrect.
      - [x] If the user has attempted to login and gotten a `400` or `422` error, then an error message should be displayed in an element with the `className` of `error` indicating what went wrong.
    - [x] There should be a `button` element with the `className` of `submit-login`:
      - [x] It should contain the text `"Login"`
      - [x] When clicked, it should call the `loginUser` function

  - [x] The **`LoginPage.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `login-page`
    - [x] Using either a custom hook, context, or manually set state, this component should check to see if a user is already logged in
      - [x] If the user is already logged in, it should redirect them to the `/activity` page
      - [x] If no user is authenticated, it should render the `LoginForm.jsx` component and pass it any props it needs

  - [x] The **`RegistrationForm.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `registration-form`
    - [x] Should render an input element for the following fields:
      - [x] `email`
      - [x] `username`
      - [x] `firstName`
      - [x] `lastName`
      - [x] `password`
      - [x] `passwordConfirm`
    - [x] Each `input` element in the form should have a `className` of `form-input` and should have the following props set:
      - [x] `name` - the `name` of the `input` field being rendered (`email`, `username`, `firstName`, `lastName`, `password`, `passwordConfirm`)
      - [x] `type` - the type of the `input` element (`text`, `email`, `number`, etc)
      - [x] `value` - the current value of the `input` element
      - [x] `onChange` - the `onChange` handler function
    - [x] The component should validate the `email` field:
      - [x] If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the `className` of `error` indicating that the entry is not a valid email.
    - [x] The component should validate the `password` and `passwordConfirm` fields:
      - [x] If the user has entered text into the `password` and `passwordConfirm` fields and they don't match, then a message should be displayed in an element with the `className` of `error` with a message that contains the text: `passwords don't match`
    - [x] The component should gracefully handle errors:
      - [x] If the user has attempted to login and gotten a `401` error, then the `errors` object should contain a `form` property that contains a message indicating that the `email` and `password` combination is incorrect.
      - [x] If the user has attempted to login and gotten a `400` or `422` error, then the `errors` object should contain a `form` property that contains a message indicating what went wrong.
    - [x] There should be a `button` element with the `className` of `submit-registration`:
      - [x] It should contain the text `"Create Account"`
      - [x] When clicked, it should call the `signupUser` function

  - [x] The **`RegistrationPage.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `registration-page`
    - [x] Using either a custom hook, context, or manually handled state, this component should check to see if a user is already logged in
      - [x] If the user is already logged in, it should redirect them to the `/activity` page
      - [x] If no user is authenticated, it should render the `RegistrationForm.jsx` component and pass it any props it needs

  - [x] The **`LandingPage.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `landing-page`
    - [x] Should render an element with the `className` of `hero`
      - [x] Inside it, display a large hero image using an `img` element with the `className` of `hero-img`
      - [x] Render a brief blurb on what this application is about inside an element with the `className` of `cta`
    - [x] Should allow unauthenticated access

  - [x] The **`activity`** context

    - [x] Create a file in the `contexts directory - `/contexts/activity.jsx`
    - [x] In that file, define a new `ActivityContext` with `React.createContext`
    - [x] Use that context to create an `ActivityContextProvider` component
      - [x] The `ActivityContextProvider` component should create state variables and updaters needed for `activity`, `initialized`, `isLoading`, and `error`.
      - [x] It should call the `useAuthContext` hook and check to see if a valid user is logged in.
      - [x] It should have a `React.useEffect` hook that fires when the component is mounted to the screen
        - [x] That hook should check to see if a user is logged in.
        - [x] If a user is logged in...
          - [x] Set the `isLoading` state variable to `true` and the `error` state variable to `null`
          - [x] Then, it should make a `GET` request to the `/activity` endpoint
            - [x] If there is an error with the request, it should set a message as the `error` state variable
            - [x] If all goes well...
              - [x] It should set the data as the `activity` state variable
              - [x] It should set the `error` state variable to `null`
          - [x] Regardless, at the end, set the `isLoading` state variable to `false` and the `initialized` state variable to `true`
      - [x] Make sure to pass an object containing all the state variables to the `value` prop of the `ActivityContext.Provider` component
    - [x] Create and export a `useActivityContext` hook that calls the `React.useContext` hook with the newly created `ActivityContext` and returns it.
    - [x] In the `App.jsx` file, nest the `ActivityContextProvider` inside the `AuthContextProvider`.

  - [x] The **`ActivityPage.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `activity-page`
    - [x] It should call the `useActivityContext` hook and extract all the necessary data from it.
    - [x] If the `isProcessing` flag is `true`, it should render the `Loading.jsx` component
    - [x] If the `isProcessing` flag is `false`, it should render the `ActivityFeed.jsx` component and pass it the appropriate props

  - [x] The **`ActivityFeed.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `activity-feed`
    - [x] Should accept **at least** the following props:
      - [x] `totalCaloriesPerDay` - an array of items containing summary data about the total calories consumed per day
      - [x] `avgCaloriesPerCategory` - an array of items containing summary data about the average calories consumed per category
      - [x] Any other
    - [x] Inside an element with the `className` of `per-category`, it should:
      - [x] Render the text: `"Average Calories Per Category` inside an `h4` element
      - [x] Take the first `6` or less items in the `avgCaloriesPerCategory` array and render a `SummaryStat.jsx` component for each item.
        - [x] It should pass the calories **rounded down to one decimal place** as the `stat` prop
        - [x] It should pass the string of `calories` as the `label` prop
        - [x] It should pass the `category` as the `substat` prop
    - [x] Inside an element with the `className` of `per-day`, it should:
      - [x] Render the text: `"Total Calories Per Day` inside an `h4` element
      - [x] For each item in the `totalCaloriesPerDay` array, it should render a `SummaryStat.jsx` component.
        - [x] It should pass the calories **rounded down to the nearest whole number** as the `stat` prop
        - [x] It should pass the string of `calories` as the `label` prop
        - [x] It should pass the `date` in the format `dd/mm/yyyy` - example: `07/02/2022` - as the `substat` prop

  - [x] The **`SummaryStat.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `summary-stat`
    - [x] Should accept **at least** the following props:
      - [x] `stat` - the primary statistic to display
      - [x] `label` - the unit label assigned to the statistic
      - [x] `substat` - a secondary statistic related to the primary statistic
    - [x] It should render the `stat` prop inside an element with the `className` of `primary-statistic`
    - [x] It should render the `label` prop inside an element with the `className` of `stat-label`
    - [x] It should render the `substat` prop inside an element with the `className` of `secondary-statistic`

  - [x] The **`nutrition`** context

    - [x] Create a file in the `contexts directory - `/contexts/nutrition.jsx`
    - [x] In that file, define a new `NutritionContext` with `React.createContext`
    - [x] Use that context to create a `NutritionContextProvider` component
      - [x] The `NutritionContextProvider` component should create state variables and updaters needed for `nutritions`, `initialized`, `isLoading`, and `error`.
      - [x] It should call the `useAuthContext` hook and check to see if a valid user is logged in.
      - [x] It should have a `React.useEffect` hook that fires when the component is mounted to the screen
        - [x] That hook should check to see if a user is logged in.
        - [x] If a user is logged in...
          - [x] Set the `isLoading` state variable to `true`
          - [x] Then, it should make a `GET` request to the `/nutritions` endpoint
            - [x] If there is an error with the request, it should set a message as the `error` state variable
            - [x] If all goes well:
              - [x] It should set the data as the `nutritions` state variable
          - [x] Regardless, at the end, set the `isLoading` state variable to `false` and the `initialized` state variable to `true`
      - [x] Make sure to pass an object containing all the state variables to the `value` prop of the `NutritionContext.Provider` component
    - [x] Create and export a `useNutritionContext` hook that calls the `React.useContext` hook with the newly created `NutritionContext` and returns it.

  - [x] The **`NutritionPage.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `nutrition-page`
    - [x] Should render a nested `Routes` component from `react-router-dom`.
      - [x] There should be multiple `Route` components:
        - [x] The `/nutrition` route should render the `NutritionOverview.jsx` component
        - [x] The `/nutrition/create` route should render the `NutritionNew.jsx` component
        - [x] The `/nutrition/id/:nutritionId` should render the `NutritionDetail.jsx` component
        - [x] Any other route should render the `NotFound` component

  - [x] The **`NutritionOverview.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `nutrition-overview`
    - [x] It should call the `useNutritionContext` hook and extract all the necessary data from it.
      - [x] If the `error` state variable has a valid string in it, it should render the `error` message inside an element with the `className` of `error`
      - [x] If the `isLoading` boolean is `true`, it should render the `Loading.jsx` component
      - [x] If the `isLoading` boolean is `false`, it should render the `NutritionFeed.jsx` component and pass it the appropriate props
    - [x] Near the top of the component, it should render a `Link` component that directs to the `/nutrition/create` route and contains the text: `"Record Nutrition"`

  - [x] The **`NutritionFeed.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `nutrition-feed`
    - [x] It should receive **at least** the following props:
      - [x] `nutritions` - an array of `nutrition` items
    - [x] If the `nutritions` array has no items in it, it should render an empty message that says `Nothing here yet` inside an element with the `className` of `empty-message`
    - [x] If the `nutritions` array does have items in it:
      - [x] For each item in the `nutritions` array, it should render a `NutritionCard.jsx` component

  - [x] The **`NutritionNew.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `nutrition-new`
    - [x] Should render the `NutritionForm.jsx` component and pass it the appropriate props

  - [x] The **`NutritionForm.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `nutrition-form`
    - [x] Should render an input element for the following fields:
      - [x] `name` - name of the nutrition item (defaults to an empty string)
      - [x] `calories` - number of calories in the nutrition item (defaults to 1)
      - [x] `imageUrl` - the `url` of an image to show for this nutrition item (defaults to an empty string)
      - [x] `category` - the category that this nutrition item belongs to, like fruit, meat, soda, snack, nuts, etc. (defaults to an empty string)
    - [x] Each `input` element in the form should have a `className` of `form-input` and should have the following props set:
      - [x] `name` - the `name` of the `input` field being rendered (`name`, `calories`, `imageUrl`, `category`)
      - [x] `type` - the type of the `input` element (`text`, `email`, `number`, etc)
      - [x] `value` - the current value of the `input` element
      - [x] `onChange` - the `onChange` handler function
    - [x] The component should gracefully handle errors:
      - [x] If any of the required fields are left blank, there should be an error message inside of an element with the `className` of `error` indicating which fields are required.
      - [x] If the user has attempted to create a nutrition entry and gotten a `400` or `422` error, then that message should be displayed inside an element with the `className` of `error`
    - [x] There should be a `button` element with the `className` of `submit-nutrition`:
      - [x] It should contain the text `"Save"`
      - [x] When clicked, it should call a function that creates a new nutrition entry
    - [x] After the form has been succesfully submitted:
      - [x] Ensure that the new nutrition entry is stored in the `nutrition` context's `nutritions` array and is displayed in the `NutritionFeed.jsx` component
      - [x] Refetch the `activity` data so that new summary stats will be calculated

  - [x] The **`NutritionDetail.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `nutrition-detail`
    - [x] It should leverage the `useParams` hook from `react-router-dom` to extract the `nutritionId` param from the url
    - [x] When the component is mounted to the screen...
      - [x] It should make a `GET` request to the `/nutrition/:nutritionId` endpoint with the `axios.get` method.
      - [x] The `:nutritionId` part of the request should be replaced with the `nutritionId` pulled from the url.
      - [x] When the initial request is loading, it should render an `h1` element with the `className` of `loading` and contain the text `"Loading..."`
      - [x] It should store the `nutrition` received by the request in state and then render a `NutritionCard.jsx` component for that nutrition.
      - [x] If no `nutrition` is found with that `id`, it should render the `NotFound.jsx` component

  - [x] The **`NutritionCard.jsx`** component:

    - [x] Should render JSX that is wrapped by an element with the `className` of `nutrition-card`
    - [x] Should accept **at least** the following props:
      - [x] `nutrition` - should be a nutrition entry object containing the following attributes:
        - [x] `imageUrl` - (not required)
        - [x] `name` - (required)
        - [x] `calories` - (required)
        - [x] `category` - (required)
        - [x] `createdAt` - (required)
    - [x] It should render the `name` of the `nutrition` entry inside an element with the `className` of `nutrition-name`
    - [x] If the `nutrition` entry has a valid `imageUrl` attribute, it should render an `img` element with the `className` of `nutrition-image` and use that `imageUrl` as its `src`
    - [x] It should render the `calories` attribute of the `nutrition` entry inside an element with the `className` of `nutrition-calories`
    - [x] It should render the `category` attribute of the `nutrition` entry inside an element with the `className` of `nutrition-category`
    - [x] It should render the `createdAt` attribute of the `nutrition` entry in the format `dd/mm/yyyy` - example: `07/02/2022` - inside an element with the `className` of `nutrition-date`.

  - [ ] DO THE SAME FOR ANY OTHER RESOURCE THAT IS IN THE APPLICATION

    - [ ] Choose whatever resources you want!

  - [x] The **`ProtectedRoute.jsx`** component:
    - [x] Create a `ProtectedRoute.jsx` component that uses the `useAuthContext` hook to get access to the `initialized` and `user` variables.
    - [x] It should accept a component as the `element` prop and render that component.
    - [x] If the application isn't currently loading and no user is found, it should render the `LoginPage.jsx` component instead of rendering the route the user intended to go to. This way, we can ensure that only authenticated users can access the provided component.
    - [x] Any unauthenticated user should be shown the `LoginPage.jsx` component with a message indicating that they need to authenticate first
    - [x] Update the `LoginPage.jsx` component so that it accepts a `message` prop that is displayed in the login form - if it exists.
    - [x] Make sure to protect the entire `ActivityPage` component route and the `NutritionPage` component route (along with any other private resource pages). Don't protect the `LandingPage` component or the `LoginPage` and `RegistrationPage` components, as they should be public.

### API

Note that when developing the backend, SITE interns will be asked to write tests for each API feature. However, the test suite will NOT be checking to see if actual tests have been written. These tests are only there to guide development. The features themselves are what will be evaluated.

Here are the pieces of functionality that should be built out for the backend:

- **Project setup**
  - [x] First things first, bootstrap the Express application with some essential files and starter code
  - [x] Create a `.gitignore` file, an `app.js` file, an `app.test.js` file, and a `server.js` file
  - [x] Make sure `node_modules` are added to the `.gitignore` file.
  - [x] Add dependencies for `express@next`, `morgan`, `cors`, and `nodemon`
  - [x] Install new dependencies for `bcrypt`, `jsonwebtoken`, `colors`, `dotenv`, `pg`
  - [x] Commit all work to `git`
  - [x] Add a `.env` file to the root of the repo and include the following environment variables
    - [x] `PORT` (default to `3001`)
    - [x] `SECRET_KEY` (set to a long random string)
    - [x] `BCRYPT_WORK_FACTOR` (set to `13`)
    - [x] `DATABASE_USER`
    - [x] `DATABASE_PASS`
    - [x] `DATABASE_HOST`
    - [x] `DATABASE_PORT`
    - [x] `DATABASE_NAME` - (set to `lifetracker`)
    - [x] `DATABASE_TEST_NAME` - (set to `lifetracker_test`)
  - [x] Add a `config.test.js` file
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
  - [x] Add a `config.js` file
    - [x] Use the `dotenv` package to parse the environment variables from the `.env` file.
    - [x] Export each of the environment variables from the `config.js` file until the tests pass
    - [x] Write a `getDatabaseUri` function so that all the tests pass
  - [x] Commit all work to `git`
  - [x] The project should now be ready to go!
- **PostgreSQL database**
  - Time bring in a PostgreSQL database client as the application's persistence layer
  - Make sure the PostgreSQL server is running
  - Create two files at the root of the project:
    - [x] `lifetracker-schema.sql`
      - [x] This script should:
        - [x] Create a `users` table with the following columns:
          - [x] `id`
          - [x] `username`
          - [x] `password`
          - [x] `first_name`
          - [x] `last_name`
          - [x] `email`
          - [x] `created_at`
          - [x] `updated_at`
        - [x] Create a `nutrition` table with the following columns:
          - [x] `id`
          - [x] `name`
          - [x] `category`
          - [x] `calories`
          - [x] `image_url`
          - [x] `user_id`
          - [x] `created_at`
        - [ ] **Any other tables** that the application might depend on
    - [x] `lifetracker.sql`
      - [x] This script should:
        - [x] 1. Let the user know that they're about to delete the `lifetracker` db and prompt them to confirm that is what they want.
        - [x] 2. Drop the `lifetracker` database and then create a new `lifetracker` database, before connecting to the `lifetracker` database.
        - [x] 3. It should then run the `lifetracker-schema.sql` file.
        - [ ] Follow the exact same steps for `1`, `2`, and `3`, but with the `lifetracker_test` database.
  - [x] Setup the database by running `psql -f lifetracker.sql`
  - [x] Create a new file at the root of the project called `db.js`. In that file:
    - [x] Import the `getDatabaseUri` function from the `config.js` file.
    - [x] Initialize a new postgres client with the `pg` package and connect to PostgreSQL using any necessary config variables.
    - [x] Connect to postgres and log a message to the terminal on success or failure.
    - [x] Export the connected database client
  - [x] Commit all work to `git`
  - [x] A database client is now ready to be used!
- **Server**
  - [x] Build out a bare-bones Express server with a healthcheck route and an adequate middleware pipeline.
  - [x] Create a `utils` directory
    - [x] In the `utils` directory, create an `errors.js` file.
    - [x] Create error classes inside the file that will be used throughout the app.
  - [ ] In the `app.test.js` file, write tests that:
    - [ ] Ensure that the Express application responds to `GET` requests to the `/` route with a JSON object of `{ "ping": "pong" }`
    - [ ] Check that middleware like `morgan` and `cors` exist, along with the JSON `body-parser` middleware from `express`
    - [ ] Include an `afterAll` hook that calls `await db.end()` so that any open database connections close when all the tests are finished.
  - [x] Add code to the `app.js` and `server.js` file to get a simple server running along with responding to `GET` requests to the `/` route
  - [x] Create error classes inside the `utils/errors.js` file.
  - [x] Add `404` and generic error handler middlewares to the `app.js` file.
  - [x] In the `server.js` file:
    - [x] Import the Express app and the `config.js` file
    - [x] Have the `app` listen on the port specified by `config.PORT`.
  - [x] Commit all work to `git`
  - [x] Test out the fancy new Express server by starting it up in a new terminal window!
- **Common Test Configuration**
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
  - [ ] In any new test file, make sure to import these functions and use them with the correct `jest` lifecycle hooks
- **Authentication**
  - [x] Go ahead and build out a full-fledged authentication flow using PostgreSQL, `bcrypt`, and JSON Web Tokens. For it all to work, we'll need a `User` model, a `security` middleware, some `tokens` utility functions, and the appropriate `auth` routes.
  - [x] Add new directories for `models`, `routes`, and `middleware`
  - [x] The **User** model
    - [x] In the `models` directory, create two new files: `models/user.js` and `models/user.test.js`
      - [x] The `User` model should have **at least** the following static methods:
        - [x] `login`
        - [x] `register`
        - [x] `fetchUserByEmail`
    - [ ] In the `models/user.test.js` file:
      - [ ] Test the `login` method. Write test cases for:
        - [x] User can login successfully with proper credentials
        - [x] Unknown email throws `UnauthorizedError`
        - [x] Invalid credentials throws `UnauthorizedError`
      - [ ] Test the `register` method. Write test cases for:
        - [x] User can successfully register with proper credentials
        - [x] Registering with duplicate email throws `BadRequestError`
        - [x] Registering with duplicate username throws `BadRequestError`
        - [x] Registering with invalid email throws `BadRequestError`
      - [ ] Test the `fetchUserByEmail` method:. Write test cases for:
        - [x] A valid email returns a user from the database
        - [x] Invalid emails are handled correctly
      - [ ] It will probably be important to use the `beforeAll`, `afterAll`, `beforeEach`, and `afterEach` hooks to add and delete users from the database before running the tests
    - [ ] In the `models/user.js` file:
      - [x] Import the `bcrypt` package, the `db` client, and the app `config`.
      - [ ] Implement the features outlined in the tests until they're all passing.
  - [ ] Commit all work to `git`
  - [x] The **tokens** utility functions
    - [x] In the `utils` directory, create two new files: `utils/tokens.js` and `utils/tokens.test.js`
      - [x] At the bare minimum, two functions will be needed:
        - [x] One that accepts a JSON payload as an argument and converts it into a JWT
        - [x] One that accepts a JWT as an argument, validates it, and returns the JSON payload encoded within - if it's valid
    - [ ] In the `utils/tokens.test.js` file:
      - [ ] Write test cases for:
        - [x] Can create valid JWT tokens for user payloads
        - [x] Can extract a payload from a valid JWT with the correct secret
        - [x] No payload gets returned when invalid tokens are parsed
    - [ ] In the `utils/tokens.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
  - [ ] Commit all work to `git`
  - [ ] The **security** middleware
    - [x] In the `middleware` directory, create two new files: `middleware/security.js` and `middleware/security.test.js`
      - [x] One middleware will be responsible for extracting a user from a valid JWT in the request:
        - [x] Checking the `Authentication` header of each request for the existence of a JWT.
        - [x] If one exists, it should extract the token, validate it, extract the encoded JSON payload, and attach it to the response's `locals` property
      - [x] One middleware will be responsible for ensuring that an authenticated user exists:
        - [x] Checking that a valid user exists on the response's `locals` property
        - [x] If one does, the middleware should simply call next
        - [x] If no valid user exists, it should throw an `UnauthorizedError`
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
    - [x] In the `middleware/security.js` file:
      - [x] Implement the features outlined in the tests until they're all passing
    - [ ] In the `app.js` file, add the `Authentication` header parsing middleware to the Express app's middleware pipeline
  - [ ] Commit all work to `git`
  - [ ] The **/auth** routes
    - [ ] In the `routes` directory, create two new files: `routes/auth.js` and `routes/auth.test.js`
      - [ ] A new Express router should be created. It should handle:
        - [x] A `GET` request to the `/me` endpoint
          - [x] It should send a JSON response back to the client with the user info like so: `{ "user": { "email": "user@gmail.com", ... } }`
        - [x] A `POST` request to the `/login` endpoint
          - [x] It should accept a request body with `email` and `password` keys
          - [x] It should send a JSON response back to the client with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
        - [x] A `POST` request to the `/register` endpoint
          - [x] It should accept a request body with `email`, `username`, `firstName`, `lastName`, and `password` keys
          - [x] It should send a JSON response back to the client with a `201` status code, along with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
      - [x] It should be mounted at the `/auth` endpoint in the `app.js` file
    - [ ] In the `routes/auth.test.js` file:
      - [ ] Test the `POST /auth/login` endpoint
        - [ ] Write test cases for:
          - [ ] Allows user to register with valid credentials and responds with JSON containing a valid token and user in the "token" and "user" fields
          - [x] Throws `UnauthorizedError` when user doesn't exist in db
          - [x] Throws `UnauthorizedError` when user provides wrong password
          - [x] Throws `BadRequestError` when user doesn't provide password
          - [x] Throws `BadRequestError` when user doesn't provide email
      - [ ] Test the `POST /auth/register` endpoint
        - [ ] Write test cases for:
          - [ ] Allows user to login successfully with valid credentials and responds with a `201` status code, along with JSON containing a valid token and user in the "token" and "user" fields
          - [ ] Throws `BadRequestError` when user doesn't provide one of the required fields
          - [ ] Throws `BadRequestError` when user provides email that already exists
          - [ ] Throws `BadRequestError` when user provides username that already exists
      - [ ] Test the `POST /auth/me` endpoint
        - [ ] Write test cases for:
          - [ ] Provides the user with their user info when a valid JWT is present in the `Authentication` header of the request
          - [x] Throws an `UnauthorizedError` when no valid user is logged in
    - [ ] In the `routes/auth.js` file:
      - [ ] Create a new Express router
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] In the `app.js` file:
    - [ ] Mount the router at the `/auth` endpoint
  - [ ] Commit all work to `git`
  - [ ] There should now be a full-fledged authentication system in place!
- **Resources and Permissions**
  - [ ] Next, implement the functionality to allow users to save instances of things they've drank/eaten, so that they can track their own nutrition data! Also make sure users can only access the data that they themselves have created. No other user should be able to see any data owned by another user!
  - [x] The **Nutrition** model
    - [x] In the `models` directory, create two new files: `models/nutrition.js` and `models/nutrition.test.js`
      - [x] The `Nutrition` model should have **at least** the following static methods:
        - [x] `createNutrition`
          - [x] Should insert a new nutrition instance into the database when values are supplied for all of the required fields: `"name"`, `"category"`, `"calories"`, and `"image_url"`. The `quantity` field should default to `1`.
          - [x] The new nutrition instance should have its `user_id` field set to the `id` of the authenticated user
          - [x] Should throw a `BadRequestError` (`400` status code) or `UnprocessableEntityError` (`422` status code) when any of those values are not supplied.
        - [x] `fetchNutritionById`
          - [x] When supplied with a valid `id`, fetches the a nutrition instance from the database that matches that `id`.
          - [x] If no nutrition instance matches that `id`, throws a `NotFoundError` (`404` status code)
        - [x] `listNutritionForUser`
          - [x] Should list all nutrition instances in the database that are owned by a particular user
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
    - [x] In the `models/nutrition.js` file:
      - [x] Implement the features outlined in the tests until they're all passing
    - [x] Commit all work to `git`
  - [x] The **permissions** middleware
    - [x] In the `middleware` directory, create two new files: `middleware/permissions.js` and `middleware/permissions.test.js`
      - [x] Though more functions will need to be added here as the number of resources grows, for now only 1 function needs to be created.
      - [x] The `authedUserOwnsNutrition` middleware function should:
        - [x] Probably be called after the `requireAuthenticatedUser` security middleware in any route's middleware pipeline
        - [x] Extract a parameter from the request endpoint that corresponds to the `id` of the nutrition instance
        - [x] Query the database for that nutrition instance
        - [x] Check that it is owned by the authenticated user
          - [x] If it doesn't, it should throw a `ForbiddenError` (`403` status code)
          - [x] If the nutrition instance does belong to the authed user, it should attach it to the `locals` property of the `response` as its `nutrition` property so that it doesn't need to be fetched again by the database (this isn't required, but is probably a good idea).
    - [ ] In the `middleware/permissions.test.js` file:
      - [ ] Test the `authedUserOwnsNutrition` middleware function
        - [ ] Write test cases for:
          - [ ] Throws error if authed user doesn't own nutrition
          - [ ] Throws `NotFoundError` if `id` of nutrition isn't found in database
          - [ ] Doesn't throw error if authed user is nutrition owner
          - [ ] (OPTIONAL) Attaches the `nutrition` to the `locals` property of the response when the user owns the nutrition instance
    - [x] In the `middleware/permissions.js` file:
      - [x] Implement the features outlined in the tests until they're all passing
    - [x] Commit all work to `git`
  - [x] The **/nutrition** routes
    - [x] In the `routes` directory, create two new files: `routes/nutrition.js` and `routes/nutrition.test.js`
      - [x] A new Express router should be created that will be mounted at the `/nutrition` endpoint. It should handle:
        - [x] `GET` requests to the `/` endpoint
          - [x] It should send a JSON response back to the client with all of the user-owned nutrition instances in an array like so: `{ "nutritions": [...] }`
        - [x] `POST` requests to the `/` endpoint
          - [x] It should accept a request body with one `nutrition` key containing an object with all the attributes of the `nutrition` entry
          - [x] It should send a JSON response back to the client with a `201` status code, and the newly created nutrition instance like so: `{ "nutrition": { ... } }`
        - [x] `GET` requests to the `/:nutritionId` endpoint
          - [x] It should send a JSON response back to the client with the nutrition instance that matches the `:nutritionId` parameter like so: `{ "nutrition": { ... } }`
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
    - [x] In the `routes/nutrition.js` file:
      - [x] Implement the features outlined in the tests until they're all passing
  - [x] Commit all work to `git`
- **Additional Resources**
  - [ ] Create model and routes files for 1-2 additional resources that your app will track (sleep, exercise, steps, floors climbed, meditation, mood, heartrate, music practice, etc)
  - [ ] Commit all work to `git`
- **Summary Statistics**
  - [x] One of the last features of the API will be a model that calculates summary statistic on the different resources that users are tracking. This includes statistics like average calories per day, or max calories per category. To do that, we'll create a new `Activity` model and an `activity` route that will be used to populate the frontend.
  - [x] The **Activity** model
    - [x] In the `models` directory, create two new files: `models/Activity.js` and `models/Activity.test.js`
      - [x] The `Activity` model should have **at least** the following static methods:
        - [x] `calculateDailyCaloriesSummaryStats`
          - [x] Should execute a SQL query that calculates **at least** the total calories consumed per day (aliased as `totalCaloriesPerDay`), along with the day (aliased as `date`).
          - [x] The query should return a row for **each day** containing the total calories consumed per day, and the average calric content per nutrition entry.
            - [x] For instance, here's a set of 7 **simplified** nutrition item entries (actual data will look different):
              - 1. `{ id: 1, user_id: 1, calories: 100, category: "candy", created_at: "12-22-2022" }`
              - 2. `{ id: 2, user_id: 1, calories: 200, category: "drink", created_at: "12-22-2022" }`
              - 3. `{ id: 3, user_id: 1, calories: 200, category: "fruit", created_at: "12-23-2022" }`
              - 4. `{ id: 4, user_id: 1, calories: 400, category: "dairy", created_at: "12-23-2022" }`
              - 5. `{ id: 5, user_id: 1, calories: 400, category: "drink", created_at: "12-23-2022" }`
              - 6. `{ id: 6, user_id: 1, calories: 700, category: "fruit", created_at: "12-24-2022" }`
              - 7. `{ id: 7, user_id: 1, calories: 100, category: "fruit", created_at: "12-24-2022" }`
            - [x] The summary stats returned from the query should look like this:
              - 1. `{ date: "12-22-2022", totalCaloriesPerDay: 300 }`
              - 2. `{ date: "12-23-2022", totalCaloriesPerDay: 1000 }`
              - 3. `{ date: "12-24-2022", totalCaloriesPerDay: 800 }`
        - [x] `calculatePerCategoryCaloriesSummaryStats`
          - [x] Should execute a SQL query that calculates **at least** the average calories consumed per category (aliased as `avgCaloriesPerCategory` and **rounded down to one decimal place**), along with the category (aliased as `category`).
          - [x] The query should return a row for **each day** containing the total calories consumed per day, and the average calric content per nutrition entry.
            - [x] For instance, here's a set of 7 **simplified** nutrition item entries (actual data will look different):
              - 1. `{ id: 1, user_id: 1, calories: 100, category: "candy", created_at: "12-22-2022" }`
              - 2. `{ id: 2, user_id: 1, calories: 200, category: "drink", created_at: "12-22-2022" }`
              - 3. `{ id: 3, user_id: 1, calories: 200, category: "fruit", created_at: "12-23-2022" }`
              - 4. `{ id: 4, user_id: 1, calories: 400, category: "dairy", created_at: "12-23-2022" }`
              - 5. `{ id: 5, user_id: 1, calories: 400, category: "drink", created_at: "12-23-2022" }`
              - 6. `{ id: 6, user_id: 1, calories: 700, category: "fruit", created_at: "12-24-2022" }`
              - 7. `{ id: 7, user_id: 1, calories: 100, category: "fruit", created_at: "12-24-2022" }`
            - [x] The summary stats returned from the query should look like this:
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
    - [x] Commit all work to `git`
  - [x] The **/activity** routes
    - [x] In the `routes` directory, create two new files: `routes/activity.js` and `routes/activity.test.js`
      - [x] A new Express router should be created that will be mounted at the `/activity` endpoint. It should handle:
        - [x] `GET` requests to the `/` endpoint
          - [x] It should send a JSON response back to the client with summary stats for each resource in the following format:
            - [x] `{ "nutrition": { "calories": { "perDay": [...], "perCategory": [...] }, ...anyOtherStats }, ...statsForOtherResources }`
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
  - [x] Commit all work to `git`

## Wrapping Up and Resources

This is a huge project and represents a complete application with user-owned resources. Accordingly, it can, should, and will test the limits of your capabilities. Do your best and don't be afraid to Google! Especially in regards to any SQL that might be tricky.
