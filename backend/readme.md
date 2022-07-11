# Backend

## Testing the app using Postman
- Routes:
  - **User Route**
    - REGISTRATION (**POST** to `/api/users/register`)
        Fields: fullName, email, password, phoneNumber
    - LOGIN (**POST** to `/api/users/login`)
        Fields: email, password
    - DASHBOARD (**GET** to `/api/users/dashboard`)
        Fields: -
        Authorization: Bearer token (token given from login/registration)  

  - **Business Route**
    For all of these routes, use bearer token for authorization type and put in the user token.
    - GET BUSINESS DATA (**GET** to `/api/business/`)
        Fields: -
    - ADD BUSINESS DATA (**POST** to `/api/business/`)
        Fields: businessName, business_category, hasDigitalized
    - UPDATE BUSINESS DATA (**PUT** to `/api/business/:id`)
        Fields: businessName, business_category, progress
    - DELETE BUSINESS DATA (**DELETE** to `/api/business/:id`)
        Fields: -

## Postman
To input fields as raw json file, click on `body` -> `raw` and then set the type as `JSON`
To set authorization (if needed), click on `authorization` -> `set authorization type` and then set the type as **bearer token**

## Frontend Interaction and Test
`main` branch is up running in `https://orbital-digital-it.herokuapp.com` so for frontend test, we can direct requests from the frontend development server to that heroku link instead of relying on local server for tests. This reduces the probability of failing due to the local hardware not properly set for running the backend API since the server that runs on heroku is ensured to be perfectly working.

Testing requests and responses via Postman can also go directly to that link instead of running the API on a local hardware.

_Example:_

_instead of doing_ `GET to http://localhost:5000/api/users/login`,

_do_ `GET to https://orbital-digital-it.herokuapp.com/api/users/login` instead.
