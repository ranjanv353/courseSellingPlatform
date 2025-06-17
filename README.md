# Course Selling Platform

This is a simple course selling API built with Node.js, Express and MongoDB. A minimal HTML frontend is provided in the `frontend` folder.

## Prerequisites

- Node.js (v18 or later recommended)
- MongoDB instance (local or hosted)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and define the following variables:

   ```env
   PORT=3000
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<any-random-string>
   ```

3. Start the server:

   ```bash
   node index.js
   ```

   The API will run on `http://localhost:3000` by default.

4. Open `frontend/index.html` in your browser to use the example interface.

## Available Endpoints

- `POST /user/signup` – register a new user
- `POST /user/signin` – user login
- `GET /user/courses` – list all courses
- `POST /user/courses/:courseId` – purchase a course
- `GET /user/purchasedCourses` – view purchased courses
- `POST /admin/signup` – register a new admin
- `POST /admin/signin` – admin login
- `POST /admin/course` – create a course (admin only)
- `PUT /admin/course` – update a course (admin only)
- `GET /course` – list all courses
- `GET /course/:courseId` – get single course details

See the source code for additional endpoints and behaviour.
