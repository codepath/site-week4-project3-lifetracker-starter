# Project #3: LifeTracker Application

## Overview

> Data is the new oil - Clive Humbly

Everywhere around us is data waiting to be collected and utilized. In recent years we've seen the rise of applications and services that exist to quantify concepts that were previously hard to capture. FitBit, Apple Health, and Woop are all $1 billion dollar services to offer tracking statistics about how we live our lives. The LifeTracker app you'll be building will do exactly that - track your life by quantifying your activity.

This application will be built using the battle-tested PERN stack - PostgreSQL, Express, React, and Node.

## Goals

Building this application you will accomplish the following:

- [ ] Develop a full-fledged authentication system using PostgreSQL and Bcrypt
- [ ] Provide users with an Express API they can interact with to store user-related activity
- [ ] Construct multiple Models that implement the core business logic associated with tracking users' lives
- [ ] Write SQL queries that aggregate user statistics and provide summary overviews about their activity
- [ ] Design a React frontend that interacts with the API using an API service class
- [ ] Build multiple pages and forms that communicate with the server using HTTP requests
- [ ] Store user-authenticated JWT tokens in the browser's local storage for persisted authentication
- [ ] Employ useEffect and useState hooks to manage application state on the frontend

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

  - [ ] **`App.jsx`**
    - [ ] Should be wrapped by an element with the `className` of `app`
    - [ ] The core App component that contains the routes for the app wrapped in Context providers
    - [X] Renders the `Navbar` component on every route
    - [X] Renders a `BrowserRouter` component that contains a `Routes` component with the following routes:
      - [X] `/` - Should render the `Landing.jsx` component
      - [X] `/login` - Should render the `LoginPage.jsx` component
      - [X] `/register` - Should render the `RegistrationPage.jsx` component
      - [X] `/activity` - Should render the `ActivityPage.jsx` component (only if the user is logged in, otherwise it renders the `AccessForbidden.jsx` component)
      - [X] `/nutrition/* - should render the `NutritionPage.jsx`component (only if the user is logged in, otherwise it renders the`AccessForbidden.jsx` component)
      - [X] `*` - anything else should render the `NotFound` component
  - [ ] To standarize API requests throughout the application, set up an **`ApiClient`** class

    - [ ] Start by creating a `constants.js` file at the root of the project
      - [ ] In it, export a few variables:
      - [ ] `PRODUCTION_API_BASE_URL` - set to whatever url the production API is deployed at
      - [ ] `DEVELOPMENT_API_BASE_URL` - set to "http://localhost:3001" for development
      - [ ] `API_BASE_URL` - if `process.env.NODE_ENV` is `production`, set this to `PRODUCTION_API_BASE_URL`, otherwise set it to `DEVELOPMENT_API_BASE_URL`
    - [ ] Next, create a `services` directory at the root of the project
    - [ ] Inside that directory, touch an `apiClient.js` file
    - [ ] In that file, import the `axios` package and the `API_BASE_URL` constant from the `constants.js` file
    - [ ] Define a new class in that file called `ApiClient`.
      - [ ] Give it a constructor function that accepts a single parameter - `remoteHostUrl`. The constructor should attach the `remoteHostUrl` parameter to a new instance with `this.remoteHostUrl = remoteHostUrl`. It should also set `this.token = null`.
      - [ ] Export default a new instance of the `ApiClient` class
      - [ ] Add an additional method called `setToken` that accepts a single parameter - `token` and attaches it to the instance.
      - [ ] Create a utility method called `request` that uses `axios` to issue HTTP requests
      - [ ] Add a `login` method that uses the `request` method to send an HTTP request to the `auth/login` endpoint
      - [ ] Add a `signup` method that uses the `request` method to send an HTTP request to the `auth/register` endpoint
      - [ ] Add a `fetchUserFromToken` method that uses the `request` method to send an HTTP request to the `auth/me` endpoint
      - [ ] **Add as many other methods as needed when making API requests**

  - [ ] Create an **`auth`** context:

    - [ ] First, create a `contexts` directory at the root of the project
    - [ ] Inside it, touch the `contexts/auth.jsx` file
    - [ ] In that file, define a new `AuthContext` with `React.createContext`
    - [ ] Use that context to create an `AuthContextProvider` component
      - [ ] The Provider component should create state variables and updaters needed for `user`, `initialized`, `isProcessing`, and `error`.
      - [ ] It should have a `React.useEffect` hook that fires when the component is mounted to the screen
        - [ ] That hook should check to see if a JWT token exists in local storage under the `lifetracker_token` key
          - [ ] If it does:
            - [ ] It should add that token to `ApiClient` class with the `setToken` method
            - [ ] Then, it should set the `isProcessing` state variable to `true` and the `error` state variable to `null`
            - [ ] Next, it should send a `GET` request to the `/auth/me` endpoint
              - [ ] If it fails, it should set the `error` prop to a valid error message
              - [ ] If it is successful...
                - [ ] It should set the `user` state variable with the `user` returned in the response
                - [ ] It should set the `error` state variable to `null`
            - [ ] Regardless, it should set the `isProcessing` state variable to `false` and the `initialized` state variable to `true`
          - [ ] The user returned from that request should be stored in state. This will ensure that users stay logged in even if they refresh the page.
      - [ ] It should also define handler functions for:
        - [ ] `loginUser` - should make a request to log the user in
        - [ ] `signupUser` - should make a request to sign the user up
        - [ ] `fetchUserFromToken` - should make a request to the `/auth/me` route to get the user's info
        - [ ] `logoutUser` - this function should remove the `lifetracker_token` from local storage and refresh the page so that all user data is reset
      - [ ] Make sure to set all the state variables as the `value` prop passed to the `AuthContext.Provider` component
    - [ ] Create and export a `useAuthContext` hook that calls the `React.useContext` hook with the newly created `AuthContext` and returns it.
    - [ ] In `App.jsx` file create an `AppContainer` component that wraps the `App` component with the `AuthContextProvider` component (which should still be nested inside the `BrowserRouter` component from `react-router-dom`). Export the `AppContainer` component by default instead of the `App`

  - [ ] The **`Loading.jsx`** component

    - [ ] Should render JSX that is wrapped by an element with the `className` of `loading`
    - [ ] Should render an element with the `className` of `loading-message` that contains the text `"Loading"`

  - [ ] The **`Navbar.jsx`** component

    - [x] Should render JSX that is wrapped by a `nav` element with the `className` of `navbar`
    - [ ] Should render the app's logo:
      - [X] It should be an element with the `className` of `logo`.
      - [X] Inside that element should be a `Link` component from `react-router-dom` that navigates the user to the `/` route when clicked.
      - [X] Inside that `Link` component should be the application's logo (text or image)
    - [ ] Should render the `NavLinks.jsx` component with links to each of the resources and the `/activity` route

  - [ ] The **`NavLinks.jsx`** component:

    - [X] Should render JSX that is wrapped by an element with a `className` of `nav-links`
    - [ ] Should render a `Link` element from `react-router-dom` for:
      - [X] The `/activity` route. It should have a label of `Activity`.
      - [X] The `/nutrition` route. It should have a label of `Nutrition`.
      - [ ] A route for any other resource page
    - [ ] If a valid user is logged in:
      - [ ] It should render an element with the `className` of `logout-button` that calls the `logoutUser` function when clicked.
        - [ ] That function should remove the `lifetracker_token` from local storage and refresh the page so that all user data is reset.
    - [ ] If no valid user is logged in:
      - [ ] It should render a `Link` element that redirects to the `/login` route with the label `Login`
      - [ ] It should render a `Link` element that redirects to the `/register` route with the label `Sign Up`

  - [ ] The **`LoginForm.jsx`** component:

    - [X] Should render JSX that is wrapped by an element with the `className` of `login-form`
    - [ ] Should render an input element for the following fields:
      - [X] `email`
      - [X] `password`
    - [X] Each `input` element in the form should have a `className` of `form-input` and should have the following props set:
      - [X] `name` - the `name` of the `input` field being rendered (`email`, `password`)
      - [X] `type` - the type of the `input` element (`text`, `email`, `number`, etc)
      - [X] `value` - the current value of the `input` element
      - [X] `onChange` - the `onChange` handler function
    - [X] The component should validate the `email` field:
      - [X] If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the `className` of `error` indicating that the entry is not a valid email.
    - [ ] The component should gracefully handle errors:
      - [ ] If the user has attempted to login and gotten a `401` error, then an error message should be displayed in an element with the `className` of `error` indicating that the `email` and `password` combination is incorrect.
      - [ ] If the user has attempted to login and gotten a `400` or `422` error, then an error message should be displayed in an element with the `className` of `error` indicating what went wrong.
    - [ ] There should be a `button` element with the `className` of `submit-login`:
      - [ ] It should contain the text `"Login"`
      - [ ] When clicked, it should call the `loginUser` function

  - [ ] The **`LoginPage.jsx`** component:

    - [X] Should render JSX that is wrapped by an element with the `className` of `login-page`
    - [ ] Using either a custom hook, context, or manually set state, this component should check to see if a user is already logged in
      - [ ] If the user is already logged in, it should redirect them to the `/activity` page
      - [ ] If no user is authenticated, it should render the `LoginForm.jsx` component and pass it any props it needs

  - [ ] The **`RegistrationForm.jsx`** component:

    - [X] Should render JSX that is wrapped by an element with the `className` of `registration-form`
    - [X] Should render an input element for the following fields:
      - [X] `email`
      - [X] `username`
      - [X] `firstName`
      - [X] `lastName`
      - [X] `password`
      - [X] `passwordConfirm`
    - [ ] Each `input` element in the form should have a `className` of `form-input` and should have the following props set:
      - [X] `name` - the `name` of the `input` field being rendered (`email`, `username`, `firstName`, `lastName`, `password`, `passwordConfirm`)
      - [X] `type` - the type of the `input` element (`text`, `email`, `number`, etc)
      - [X] `value` - the current value of the `input` element
      - [X] `onChange` - the `onChange` handler function
    - [X] The component should validate the `email` field:
      - [X] If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the `className` of `error` indicating that the entry is not a valid email.
    - [X] The component should validate the `password` and `passwordConfirm` fields:
      - [X] If the user has entered text into the `password` and `passwordConfirm` fields and they don't match, then a message should be displayed in an element with the `className` of `error` with a message that contains the text: `passwords don't match`
    - [ ] The component should gracefully handle errors:
      - [ ] If the user has attempted to login and gotten a `401` error, then the `errors` object should contain a `form` property that contains a message indicating that the `email` and `password` combination is incorrect.
      - [ ] If the user has attempted to login and gotten a `400` or `422` error, then the `errors` object should contain a `form` property that contains a message indicating what went wrong.
    - [ ] There should be a `button` element with the `className` of `submit-registration`:
      - [ ] It should contain the text `"Create Account"`
      - [ ] When clicked, it should call the `signupUser` function

  - [ ] The **`RegistrationPage.jsx`** component:

    - [X] Should render JSX that is wrapped by an element with the `className` of `registration-page`
    - [ ] Using either a custom hook, context, or manually handled state, this component should check to see if a user is already logged in
      - [ ] If the user is already logged in, it should redirect them to the `/activity` page
      - [ ] If no user is authenticated, it should render the `RegistrationForm.jsx` component and pass it any props it needs

  - [ ] The **`LandingPage.jsx`** component:

    - [X] Should render JSX that is wrapped by an element with the `className` of `landing-page`
    - [X] Should render an element with the `className` of `hero`
      - [X] Inside it, display a large hero image using an `img` element with the `className` of `hero-img`
      - [X] Render a brief blurb on what this application is about inside an element with the `className` of `cta`
    - [ ] Should allow unauthenticated access

  - [ ] The **`activity`** context

    - [ ] Create a file in the `contexts directory - `/contexts/activity.jsx`
    - [ ] In that file, define a new `ActivityContext` with `React.createContext`
    - [ ] Use that context to create an `ActivityContextProvider` component
      - [ ] The `ActivityContextProvider` component should create state variables and updaters needed for `activity`, `initialized`, `isLoading`, and `error`.
      - [ ] It should call the `useAuthContext` hook and check to see if a valid user is logged in.
      - [ ] It should have a `React.useEffect` hook that fires when the component is mounted to the screen
        - [ ] That hook should check to see if a user is logged in.
        - [ ] If a user is logged in...
          - [ ] Set the `isLoading` state variable to `true` and the `error` state variable to `null`
          - [ ] Then, it should make a `GET` request to the `/activity` endpoint
            - [ ] If there is an error with the request, it should set a message as the `error` state variable
            - [ ] If all goes well...
              - [ ] It should set the data as the `activity` state variable
              - [ ] It should set the `error` state variable to `null`
          - [ ] Regardless, at the end, set the `isLoading` state variable to `false` and the `initialized` state variable to `true`
      - [ ] Make sure to pass an object containing all the state variables to the `value` prop of the `ActivityContext.Provider` component
    - [ ] Create and export a `useActivityContext` hook that calls the `React.useContext` hook with the newly created `ActivityContext` and returns it.
    - [ ] In the `App.jsx` file, nest the `ActivityContextProvider` inside the `AuthContextProvider`.

  - [ ] The **`ActivityPage.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `activity-page`
    - [ ] It should call the `useActivityContext` hook and extract all the necessary data from it.
    - [ ] If the `isProcessing` flag is `true`, it should render the `Loading.jsx` component
    - [ ] If the `isProcessing` flag is `false`, it should render the `ActivityFeed.jsx` component and pass it the appropriate props

  - [ ] The **`ActivityFeed.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `activity-feed`
    - [ ] Should accept **at least** the following props:
      - [ ] `totalCaloriesPerDay` - an array of items containing summary data about the total calories consumed per day
      - [ ] `avgCaloriesPerCategory` - an array of items containing summary data about the average calories consumed per category
      - [ ] Any other
    - [ ] Inside an element with the `className` of `per-category`, it should:
      - [ ] Render the text: `"Average Calories Per Category` inside an `h4` element
      - [ ] Take the first `6` or less items in the `avgCaloriesPerCategory` array and render a `SummaryStat.jsx` component for each item.
        - [ ] It should pass the calories **rounded down to one decimal place** as the `stat` prop
        - [ ] It should pass the string of `calories` as the `label` prop
        - [ ] It should pass the `category` as the `substat` prop
    - [ ] Inside an element with the `className` of `per-day`, it should:
      - [ ] Render the text: `"Total Calories Per Day` inside an `h4` element
      - [ ] For each item in the `totalCaloriesPerDay` array, it should render a `SummaryStat.jsx` component.
        - [ ] It should pass the calories **rounded down to the nearest whole number** as the `stat` prop
        - [ ] It should pass the string of `calories` as the `label` prop
        - [ ] It should pass the `date` in the format `dd/mm/yyyy` - example: `07/02/2022` - as the `substat` prop

  - [ ] The **`SummaryStat.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `summary-stat`
    - [ ] Should accept **at least** the following props:
      - [ ] `stat` - the primary statistic to display
      - [ ] `label` - the unit label assigned to the statistic
      - [ ] `substat` - a secondary statistic related to the primary statistic
    - [ ] It should render the `stat` prop inside an element with the `className` of `primary-statistic`
    - [ ] It should render the `label` prop inside an element with the `className` of `stat-label`
    - [ ] It should render the `substat` prop inside an element with the `className` of `secondary-statistic`

  - [ ] The **`nutrition`** context

    - [ ] Create a file in the `contexts directory - `/contexts/nutrition.jsx`
    - [ ] In that file, define a new `NutritionContext` with `React.createContext`
    - [ ] Use that context to create a `NutritionContextProvider` component
      - [ ] The `NutritionContextProvider` component should create state variables and updaters needed for `nutritions`, `initialized`, `isLoading`, and `error`.
      - [ ] It should call the `useAuthContext` hook and check to see if a valid user is logged in.
      - [ ] It should have a `React.useEffect` hook that fires when the component is mounted to the screen
        - [ ] That hook should check to see if a user is logged in.
        - [ ] If a user is logged in...
          - [ ] Set the `isLoading` state variable to `true`
          - [ ] Then, it should make a `GET` request to the `/nutritions` endpoint
            - [ ] If there is an error with the request, it should set a message as the `error` state variable
            - [ ] If all goes well:
              - [ ] It should set the data as the `nutritions` state variable
          - [ ] Regardless, at the end, set the `isLoading` state variable to `false` and the `initialized` state variable to `true`
      - [ ] Make sure to pass an object containing all the state variables to the `value` prop of the `NutritionContext.Provider` component
    - [ ] Create and export a `useNutritionContext` hook that calls the `React.useContext` hook with the newly created `NutritionContext` and returns it.

  - [ ] The **`NutritionPage.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `nutrition-page`
    - [ ] Should render a nested `Routes` component from `react-router-dom`.
      - [ ] There should be multiple `Route` components:
        - [ ] The `/nutrition` route should render the `NutritionOverview.jsx` component
        - [ ] The `/nutrition/create` route should render the `NutritionNew.jsx` component
        - [ ] The `/nutrition/id/:nutritionId` should render the `NutritionDetail.jsx` component
        - [ ] Any other route should render the `NotFound` component

  - [ ] The **`NutritionOverview.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `nutrition-overview`
    - [ ] It should call the `useNutritionContext` hook and extract all the necessary data from it.
      - [ ] If the `error` state variable has a valid string in it, it should render the `error` message inside an element with the `className` of `error`
      - [ ] If the `isLoading` boolean is `true`, it should render the `Loading.jsx` component
      - [ ] If the `isLoading` boolean is `false`, it should render the `NutritionFeed.jsx` component and pass it the appropriate props
    - [ ] Near the top of the component, it should render a `Link` component that directs to the `/nutrition/create` route and contains the text: `"Record Nutrition"`

  - [ ] The **`NutritionFeed.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `nutrition-feed`
    - [ ] It should receive **at least** the following props:
      - [ ] `nutritions` - an array of `nutrition` items
    - [ ] If the `nutritions` array has no items in it, it should render an empty message that says `Nothing here yet` inside an element with the `className` of `empty-message`
    - [ ] If the `nutritions` array does have items in it:
      - [ ] For each item in the `nutritions` array, it should render a `NutritionCard.jsx` component

  - [ ] The **`NutritionNew.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `nutrition-new`
    - [ ] Should render the `NutritionForm.jsx` component and pass it the appropriate props

  - [ ] The **`NutritionForm.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `nutrition-form`
    - [ ] Should render an input element for the following fields:
      - [ ] `name` - name of the nutrition item (defaults to an empty string)
      - [ ] `calories` - number of calories in the nutrition item (defaults to 1)
      - [ ] `imageUrl` - the `url` of an image to show for this nutrition item (defaults to an empty string)
      - [ ] `category` - the category that this nutrition item belongs to, like fruit, meat, soda, snack, nuts, etc. (defaults to an empty string)
    - [ ] Each `input` element in the form should have a `className` of `form-input` and should have the following props set:
      - [ ] `name` - the `name` of the `input` field being rendered (`name`, `calories`, `imageUrl`, `category`)
      - [ ] `type` - the type of the `input` element (`text`, `email`, `number`, etc)
      - [ ] `value` - the current value of the `input` element
      - [ ] `onChange` - the `onChange` handler function
    - [ ] The component should gracefully handle errors:
      - [ ] If any of the required fields are left blank, there should be an error message inside of an element with the `className` of `error` indicating which fields are required.
      - [ ] If the user has attempted to create a nutrition entry and gotten a `400` or `422` error, then that message should be displayed inside an element with the `className` of `error`
    - [ ] There should be a `button` element with the `className` of `submit-nutrition`:
      - [ ] It should contain the text `"Save"`
      - [ ] When clicked, it should call a function that creates a new nutrition entry
    - [ ] After the form has been succesfully submitted:
      - [ ] Ensure that the new nutrition entry is stored in the `nutrition` context's `nutritions` array and is displayed in the `NutritionFeed.jsx` component
      - [ ] Refetch the `activity` data so that new summary stats will be calculated

  - [ ] The **`NutritionDetail.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `nutrition-detail`
    - [ ] It should leverage the `useParams` hook from `react-router-dom` to extract the `nutritionId` param from the url
    - [ ] When the component is mounted to the screen...
      - [ ] It should make a `GET` request to the `/nutrition/:nutritionId` endpoint with the `axios.get` method.
      - [ ] The `:nutritionId` part of the request should be replaced with the `nutritionId` pulled from the url.
      - [ ] When the initial request is loading, it should render an `h1` element with the `className` of `loading` and contain the text `"Loading..."`
      - [ ] It should store the `nutrition` received by the request in state and then render a `NutritionCard.jsx` component for that nutrition.
      - [ ] If no `nutrition` is found with that `id`, it should render the `NotFound.jsx` component

  - [ ] The **`NutritionCard.jsx`** component:

    - [ ] Should render JSX that is wrapped by an element with the `className` of `nutrition-card`
    - [ ] Should accept **at least** the following props:
      - [ ] `nutrition` - should be a nutrition entry object containing the following attributes:
        - [ ] `imageUrl` - (not required)
        - [ ] `name` - (required)
        - [ ] `calories` - (required)
        - [ ] `category` - (required)
        - [ ] `createdAt` - (required)
    - [ ] It should render the `name` of the `nutrition` entry inside an element with the `className` of `nutrition-name`
    - [ ] If the `nutrition` entry has a valid `imageUrl` attribute, it should render an `img` element with the `className` of `nutrition-image` and use that `imageUrl` as its `src`
    - [ ] It should render the `calories` attribute of the `nutrition` entry inside an element with the `className` of `nutrition-calories`
    - [ ] It should render the `category` attribute of the `nutrition` entry inside an element with the `className` of `nutrition-category`
    - [ ] It should render the `createdAt` attribute of the `nutrition` entry in the format `dd/mm/yyyy` - example: `07/02/2022` - inside an element with the `className` of `nutrition-date`.

  - [ ] DO THE SAME FOR ANY OTHER RESOURCE THAT IS IN THE APPLICATION

    - [ ] Choose whatever resources you want!

  - [ ] The **`ProtectedRoute.jsx`** component:
    - [ ] Create a `ProtectedRoute.jsx` component that uses the `useAuthContext` hook to get access to the `initialized` and `user` variables.
    - [ ] It should accept a component as the `element` prop and render that component.
    - [ ] If the application isn't currently loading and no user is found, it should render the `LoginPage.jsx` component instead of rendering the route the user intended to go to. This way, we can ensure that only authenticated users can access the provided component.
    - [ ] Any unauthenticated user should be shown the `LoginPage.jsx` component with a message indicating that they need to authenticate first
    - [ ] Update the `LoginPage.jsx` component so that it accepts a `message` prop that is displayed in the login form - if it exists.
    - [ ] Make sure to protect the entire `ActivityPage` component route and the `NutritionPage` component route (along with any other private resource pages). Don't protect the `LandingPage` component or the `LoginPage` and `RegistrationPage` components, as they should be public.

### API

Note that when developing the backend, SITE interns will be asked to write tests for each API feature. However, the test suite will NOT be checking to see if actual tests have been written. These tests are only there to guide development. The features themselves are what will be evaluated.

Here are the pieces of functionality that should be built out for the backend:

- **Project setup**
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
- **PostgreSQL database**
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
        - [X] 1. Let the user know that they're about to delete the `lifetracker` db and prompt them to confirm that is what they want.
        - [X] 2. Drop the `lifetracker` database and then create a new `lifetracker` database, before connecting to the `lifetracker` database.
        - [X] 3. It should then run the `lifetracker-schema.sql` file.
        - [X] Follow the exact same steps for `1`, `2`, and `3`, but with the `lifetracker_test` database.
  - [X] Setup the database by running `psql -f lifetracker.sql`
  - [X] Create a new file at the root of the project called `db.js`. In that file:
    - [X] Import the `getDatabaseUri` function from the `config.js` file.
    - [X] Initialize a new postgres client with the `pg` package and connect to PostgreSQL using any necessary config variables.
    - [X] Connect to postgres and log a message to the terminal on success or failure.
    - [X] Export the connected database client
  - [X] Commit all work to `git`
  - [X] A database client is now ready to be used!
- **Server**
  - [X] Build out a bare-bones Express server with a healthcheck route and an adequate middleware pipeline.
  - [X] Create a `utils` directory
    - [X] In the `utils` directory, create an `errors.js` file.
    - [X] Create error classes inside the file that will be used throughout the app.
  - [ ] In the `app.test.js` file, write tests that:
    - [ ] Ensure that the Express application responds to `GET` requests to the `/` route with a JSON object of `{ "ping": "pong" }`
    - [ ] Check that middleware like `morgan` and `cors` exist, along with the JSON `body-parser` middleware from `express`
    - [ ] Include an `afterAll` hook that calls `await db.end()` so that any open database connections close when all the tests are finished.
  - [X] Add code to the `app.js` and `server.js` file to get a simple server running along with responding to `GET` requests to the `/` route
  - [X] Create error classes inside the `utils/errors.js` file.
  - [X] Add `404` and generic error handler middlewares to the `app.js` file.
  - [X] In the `server.js` file:
    - [X] Import the Express app and the `config.js` file
    - [X] Have the `app` listen on the port specified by `config.PORT`.
  - [X] Commit all work to `git`
  - [X] Test out the fancy new Express server by starting it up in a new terminal window!
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
  - [ ] Go ahead and build out a full-fledged authentication flow using PostgreSQL, `bcrypt`, and JSON Web Tokens. For it all to work, we'll need a `User` model, a `security` middleware, some `tokens` utility functions, and the appropriate `auth` routes.
  - [X] Add new directories for `models`, `routes`, and `middleware`
  - [X] The **User** model
    - [ ] In the `models` directory, create two new files: `models/user.js` and `models/user.test.js`
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
      - [ ] It will probably be important to use the `beforeAll`, `afterAll`, `beforeEach`, and `afterEach` hooks to add and delete users from the database before running the tests
    - [X] In the `models/user.js` file:
      - [X] Import the `bcrypt` package, the `db` client, and the app `config`.
      - [X] Implement the features outlined in the tests until they're all passing.
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
      - [X] A new Express router should be created. It should handle:
        - [X] A `GET` request to the `/me` endpoint
          - [ ] It should send a JSON response back to the client with the user info like so: `{ "user": { "email": "user@gmail.com", ... } }`
        - [X] A `POST` request to the `/login` endpoint
          - [ ] It should accept a request body with `email` and `password` keys
          - [ ] It should send a JSON response back to the client with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
        - [X] A `POST` request to the `/register` endpoint
          - [X] It should accept a request body with `email`, `username`, `firstName`, `lastName`, and `password` keys
          - [ ] It should send a JSON response back to the client with a `201` status code, along with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
      - [ ] It should be mounted at the `/auth` endpoint in the `app.js` file
    - [ ] In the `routes/auth.test.js` file:
      - [ ] Test the `POST /auth/login` endpoint
        - [ ] Write test cases for:
          - [ ] Allows user to register with valid credentials and responds with JSON containing a valid token and user in the "token" and "user" fields
          - [ ] Throws `UnauthorizedError` when user doesn't exist in db
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
- **Resources and Permissions**
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
          - [ ] If the nutrition instance does belong to the authed user, it should attach it to the `locals` property of the `response` as its `nutrition` property so that it doesn't need to be fetched again by the database (this isn't required, but is probably a good idea).
    - [ ] In the `middleware/permissions.test.js` file:
      - [ ] Test the `authedUserOwnsNutrition` middleware function
        - [ ] Write test cases for:
          - [ ] Throws error if authed user doesn't own nutrition
          - [ ] Throws `NotFoundError` if `id` of nutrition isn't found in database
          - [ ] Doesn't throw error if authed user is nutrition owner
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
  - [ ] Create model and routes files for 1-2 additional resources that your app will track (sleep, exercise, steps, floors climbed, meditation, mood, heartrate, music practice, etc)
  - [ ] Commit all work to `git`
- **Summary Statistics**
  - [ ] One of the last features of the API will be a model that calculates summary statistic on the different resources that users are tracking. This includes statistics like average calories per day, or max calories per category. To do that, we'll create a new `Activity` model and an `activity` route that will be used to populate the frontend.
  - [ ] The **Activity** model
    - [ ] In the `models` directory, create two new files: `models/Activity.js` and `models/Activity.test.js`
      - [ ] The `Activity` model should have **at least** the following static methods:
        - [ ] `calculateDailyCaloriesSummaryStats`
          - [ ] Should execute a SQL query that calculates **at least** the total calories consumed per day (aliased as `totalCaloriesPerDay`), along with the day (aliased as `date`).
          - [ ] The query should return a row for **each day** containing the total calories consumed per day, and the average calric content per nutrition entry.
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
          - [ ] The query should return a row for **each day** containing the total calories consumed per day, and the average calric content per nutrition entry.
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

## Wrapping Up and Resources

This is a huge project and represents a complete application with user-owned resources. Accordingly, it can, should, and will test the limits of your capabilities. Do your best and don't be afraid to Google! Especially in regards to any SQL that might be tricky.
