# API Documentation

## Posts

### Create a new post
- **URL**: `/api/posts`
- **Method**: `POST`
- **Auth required**: Yes
- **Body**: 
  - `title` (string, required)
  - `content` (string, required)
  - `media` (file, optional)

### Get all posts
- **URL**: `/api/posts`
- **Method**: `GET`
- **Auth required**: No

### Get a specific post
- **URL**: `/api/posts/:id`
- **Method**: `GET`
- **Auth required**: No

### Update a post
- **URL**: `/api/posts/:id`
- **Method**: `PATCH`
- **Auth required**: Yes
- **Body**: 
  - `title` (string, optional)
  - `content` (string, optional)
  - `media` (file, optional)

### Delete a post
- **URL**: `/api/posts/:id`
- **Method**: `DELETE`
- **Auth required**: Yes

### Access uploaded media
- **URL**: `/uploads/:filename`
- **Method**: `GET`
- **Auth required**: No

## Users

### Register a new user
- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body**: 
  - `username` (string, required)
  - `email` (string, required)
  - `password` (string, required)

### Login
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**: 
  - `email` (string, required)
  - `password` (string, required)
