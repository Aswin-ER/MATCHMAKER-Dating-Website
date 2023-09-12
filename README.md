# MATCHMAKER-Dating-Website
MatchMaker Dating Website is a web application that combines a React frontend with a Node.js Express.js backend. The platform provides users with the tools to create profiles, search for potential partners based on various criteria, and engage in communication to foster connections and potentially find love. 

## Deployment

This project is deployed in a distributed manner:

- *Frontend*: The frontend is hosted on Vercel and accessible at [makermatch.online](https://makermatch.online).
- *Backend*: The backend is hosted on AWS EC2 and accessible at [api.makermatch.online](https://api.makermatch.online).

## Features

- *User Authentication*: Users can create accounts, log in, and securely manage each route.
- *Real-time Interactions*: Enjoy real-time messaging to stay connected.
- *User Profiles*: Users have customizable profiles where they can showcase their interests.
- *Likes and Matchs*:  Like feature, allowing users to express their interest in one another. When two users mutually "like" each other's profiles, they are matched, opening the door for further communication and potential romantic connections. 
- *Premium Membership*: Users can purchase premium membership by completing payments using Razorpay so they can see umlimited user profiles.

## Admin Panel

- *Dashboard*: The admin dashboard provides an overview of the platform's activity, including user statistics, users age statistics, and premium membership statistics.
- *User Management*: Admins can manage user accounts, including account Block/unblock.
- *Membership Management*: Admins have the ability to moderate premium membership plans taken by the users.

## Technologies Used

- *Frontend*:
  - React
  - Redux
  - Tailwind Css
  - RazorPay
  - Google-oauth(Google signup and login)
  - Axios (for API communication)
- *Backend*:
  - Node.js
  - Express.js
  - NodeMailer
  - Cloudinary
  - Multer
  - Mongoose
  - JSON Web Tokens (JWT) for authentication
  - Socket.IO for real-time communication

## Local Development

To run the project locally, follow these steps:

### Frontend (React)

1. Clone the repository:

   bash
   git clone https://github.com/Aswin-ER/MATCHMAKER-Dating-Website.git
   
2. Change directory to client folder:

    bash
   cd Frontend

3. Install dependencys:

   bash
   npm i

4. Run project:

   bash
   npm start

No need to run backend already connected with the api.makermatch.online
