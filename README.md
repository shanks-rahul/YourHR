
1. YourHR - Job Search Service

```
    YourHR is a job search service that aims to help job seekers find ideal job roles based on their qualifications and preferences. This project is a web application that allows job seekers to sign up, submit their resumes, and access job-related services.
```

2. Features
```
    User Authentication: Secure signup and login functionality using JWT (JSON Web Token).
    Resume Upload: Job seekers can upload their resumes in PDF or DOCX formats using Multer and store them in Amazon S3.
    Admin Access: Admins can view uploaded resumes and manage user data.
    Notifications: Real-time notifications using React Hot Toast.
    State Management: Efficient state management with Redux Toolkit.
    Tech Stack
    Frontend: React.js
    Backend: Node.js, Express.js
    Database: MongoDB
    File Storage: Multer
    Authentication: JWT
    State Management: Redux Toolkit
    Notifications (Pop-Up): React Hot Toast
```

3. Clone the repository:

```
    git clone https://github.com/yourusername/yourhr.git
    cd yourHR
```
4. Install dependencies for backend:

```
    cd backend
    npm install
```
5. Install dependencies for frontend:

```
    cd client
    npm install
```

6. Run the backend
```
    cd server
    nodemon index.js
```
7. Run the frontend:
```
    cd client
    npm run dev
```
8. Usage

```
    Sign Up/Login: Job seekers can sign up and log in to their accounts.
    Upload Resume: After logging in, users can upload their resumes.
    HR Panel: HRs can view all resumes and user data.
```
9. API Endpoints

```
    POST /api/v1/user/signup: Sign up a new user.
    POST /api/v1/user/login: Log in an existing user.
    POST /api/v1/resume/create: Upload a resume (PDF/DOCX).
    GET /api/resume/get/AllResume: Fetch a specific resume.   
```
10. File Upload with Multer

```
    Resumes are uploaded using Multer middleware. The file metadata is stored in MongoDB, allowing for efficient retrieval and management.
```

11. JWT Authentication

```
     User authentication is handled with JWT. Tokens are stored in HTTP-only cookies for security. Protected routes require a valid JWT to access.
```

12. Notifications with React Hot Toast
```
    React Hot Toast is used for real-time notifications, providing users with feedback on actions like successful login, errors, and more.
```

13. State Management with Redux Toolkit
```
    Redux Toolkit is used to manage the application's state, making it easier to handle complex state logic and asynchronous operations.
```