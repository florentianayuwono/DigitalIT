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
        Fields: businessName, categories, hasDigitalized
    - UPDATE BUSINESS DATA (**PUT** to `/api/business/:id`)
        Fields: businessName, category, progress
    - DELETE BUSINESS DATA (**DELETE** to `/api/business/:id`)
        Fields: -

## Postman
To input fields as raw json file, click on `body` -> `raw` and then set the type as `JSON`
To set authorization (if needed), click on `authorization` -> `set authorization type` and then set the type as **bearer token**