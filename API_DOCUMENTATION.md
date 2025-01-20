# API Documentation

## Posts

### Create a new post
- **URL**: `/posts`
- **Method**: `POST`
- **Auth required**: Yes
- **Body**: 
  - `title` (string, required)
  - `content` (string, required)
  - `media` (file, optional)

### Get all posts
- **URL**: `/posts`
- **Method**: `GET`
- **Auth required**: No

### Get a specific post
- **URL**: `/posts/:id`
- **Method**: `GET`
- **Auth required**: No

### Update a post
- **URL**: `/posts/:id`
- **Method**: `PATCH`
- **Auth required**: Yes
- **Body**: 
  - `title` (string, optional)
  - `content` (string, optional)
  - `media` (file, optional)

### Delete a post
- **URL**: `/posts/:id`
- **Method**: `DELETE`
- **Auth required**: Yes

## Users

### Register a new user
- **URL**: `/users/register`
- **Method**: `POST`
- **Body**: 
  - `username` (string, required)
  - `email` (string, required)
  - `password` (string, required)

### Login
- **URL**: `/users/login`
- **Method**: `POST`
- **Body**: 
  - `email` (string, required)
  - `password` (string, required)