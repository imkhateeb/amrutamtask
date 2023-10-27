# TakeYourMedicine

I have developed "TakeYourMedicine"
powered by Amrutam Ayurveda. This
is a full-stack web application built
on MERN stack. TakeYourMedicine is
a platform for the patients who need
a gentle reminder for the necessary
medication using web-technology. Here
users can schedule their medication
according to the prescription and we
will notify them using email and other
messaging services
Users can also appoint a caretaker or
request for a caretaker for them which
will also remind him from time to time.
used React for frontend and NodeJs
ExpressJs, and MongoDB for backend
I also used node-schedule to schedule
tasks and nodemailer, email[dot]js and twillio
to send notifications

![Screenshot (324)](https://github.com/imkhateeb/TheHackTrixProject/assets/49562163/bcac4694-f339-4fcd-8480-2cdee1a34683)



## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Tech stack](#Tech-Stack)
- [API Routes](#api-routes)

## Installation
- Fork the repository: `https://github.com/imkhateeb/amrutamtask`
- Clone the repository: `https://github.com/imkhateeb/amrutamtask.git`
- change directory : `cd amrutamtask`
- Backend Configuration
  - Change Directory: `cd amrutamtask_backend`
  - Install dependencies `npm i`
  - setup env
  - Run the server `nodemon app.js`

 - env for backend
```
MONGODB_USERNAME='your-mongodb-username'
MONGODB_PASSWORD='your-mongodb-password'
EXPRESS_APP_JWT_SECRET_KEY='your-jwt-secret-key'
NODEMAILER_USERNAME='your-nodemailer-from-email'
NODEMAILER_PASSWORD='your-mail-app-password'
PORT=5000
```

 - env for frontend
```
REACT_APP_EMAILJS_SERVICE_ID='your-emailjs-service-id'
REACT_APP_EMAILJS_REMINDER_TEMPLATE_ID='your-emailjs-template-id'
REACT_APP_EMAILJS_PUBLIC_KEY='your-emailjs-public-key'
```
  


- Frontend Configuration
  - Change Directory `cd amrutamtask_frontend`
  - Install dependencies `npm i`
  - Start the client `npm start`

## Features 
- User Authentication and Authorization 
 ![image](https://github.com/imkhateeb/TheHackTrixProject/assets/49562163/548ed56f-dc57-474e-b96e-d261f11163fc)
 ![Screenshot 2023-10-27 004549](https://github.com/imkhateeb/TheHackTrixProject/assets/49562163/be29dc77-bec0-4546-a3a2-a0f7892c2bab)

- Medication Management
![Screenshot 2023-10-27 004302](https://github.com/imkhateeb/TheHackTrixProject/assets/49562163/ba650b32-6ee4-4578-b28a-8fb2bbd917cd)
![Screenshot 2023-10-27 004041](https://github.com/imkhateeb/TheHackTrixProject/assets/49562163/a95d1d98-991e-486a-8b99-877770dfb57a)

- Reminder & Notification

![reminder1](https://github.com/imkhateeb/amrutamtask/assets/49562163/63037cb8-d370-4604-abca-0a46ef396797)
![reminder2](https://github.com/imkhateeb/amrutamtask/assets/49562163/08558c7c-d228-4024-ad4c-608eb3227142)



## Tech-Stack
- `React` for building user interface
- `Tailwindcss` to style user interface
- `ANTD` for date and time component
- `NodeJs & expressjs` a web framework for Node.js, to create web applications and APIs.
- `MongoDB & Mongoose` uses MongoDB as the database and Mongoose as the ODM library to interact and manage with the database.
- `node-scheduler` leverages Node.js for scheduling tasks, allowing you to automate and manage recurring processes efficiently.
- `md5` a widely used cryptographic hash function, for data integrity and security purposes.
- `JWT (JSON Web Tokens)` for secure authentication and data exchange between the client and server.
- `Nodemailer` a module for Node.js, to send emails programmatically.
- `EmailJs` to send email to patient directly from the client-side.
- `Twilio` for seamless integration of SMS, voice, and other communication services.
- `Git` for version control and is hosted on `GitHub`, making it easy to collaborate, track changes, and manage the project's source code
- `local storage` for authentication, providing a client-side mechanism for securely managing user authentication and session data.
- `Axios` a popular JavaScript library, to simplify and manage HTTP requests, enabling efficient communication with external APIs and resources.
-  `npm (Node Package Manager)` to easily manage and install project dependencies.

## RestAPI
- `POST /api/create-user` to create new user.
- `GET /api/auth-user` to authenticate the user.
- `GET /api/get-user` to fetch the current user.
- `GET /api/get-all-caretaker` to fetch all the care takers.
- `POST /api/medicine-schedule` to schedule a medication for user.
- `GET /api/accept-medicine-schedule` to accept the medication request by care taker.
- `GET /api/complete-medicine-schedule` to notify the medication is completed.
- `GET /api/my-patient-list` to fetch the list of all the patient of care taker.
- `GET /api/my-schedule-list` to fetch all the medication schedules.
- `GET /api/caretaker-request-list` to fetch all the medication request.


  




