---
lastModified: 08-14-2024
name: Api reference
---

# Details

To specify an endpoint, you can create a heading and start it's text with the http method related to the endpoint (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`, `HEAD`, `CONNECT` and `TRACE`). The name of the method will be automatically highlighted.

# Usage

You can create a `GET` endpoint to `/users` like so :

```md
# GET /users

This is the `GET` endpoint to `/users`
```

# Exemples
Here is what all http methods look like :

#### GET /users

This endpoint retrieves a list of all users.

#### POST /users

This endpoint creates a new user.

#### PUT /users/:id

This endpoint updates an existing user.

#### DELETE /users/:id

This endpoint deletes a user.

#### PATCH /users/:id

This update deletes a user.

#### OPTIONS /users/

Get the options for the users.

#### HEAD /users/:id

Send user data.

#### CONNECT /users/:id

Connects wia ssl and retrieves a user's data.

#### TRACE /users/:id

Test endpoint.
