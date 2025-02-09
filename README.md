# **Event Management System**  

An event management system where users can create, join, and chat within events.

## **Features**
✅ User authentication (Login/Register) using JWT  
✅ Create, edit, and delete events  
✅ Upload event images (Cloudinary integration)  
✅ Join events as a registered user or Join as Guest  
✅ Real-time event chat using **Socket.io**  
✅ Toast notifications for actions  
✅ Responsive UI with Bootstrap  

## **Tech Stack**
- **Frontend**: React, React Router, Axios, Bootstrap, Toastify  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Cloudinary  
- **Real-time Chat**: Socket.io  
- **Deployment**: Render  

## **Installation & Setup**

### **1. Clone the Repository**
```sh
git clone To https://github.com/SHIVUKUMARA/EventManagement-Client.git
cd client
```

### **2. Clone Repository**
```sh
git clone To https://github.com/SHIVUKUMARA/EventManagement-Server.git
cd server
```

- Create a **.env** file inside `server/` and add:
```.env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
- Start the backend server:
```sh
npm install
node server.js / nodemon server.js
```

### **3. Set Up Frontend**
```sh
npm install
```

- Start the frontend:
```sh
npm start
```

## **Deployment**
## **Backend**: [Deployed on Render](https://eventmanagement-mmpi.onrender.com)    - click for Live Demo
## **Frontend**: [Deployed on Netlify](https://shivukumara-event-management.netlify.app/)   - click for Live Demo

## **Folder Structure**
```
Event-Management/
│── server/  # Backend
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── middleware/    # Auth middleware
│   ├── utils/         # Cloudinary setup
│   ├── server.js      # Main entry file
│── client/  # Frontend
│   ├── src/
│   │   ├── pages/      # All page components
│   │   ├── components/ # Reusable components
│   │   ├── App.js      # Main App component
│── .gitignore  
│── README.md  
```

## **Contributing**
- Fork the repo  
- Create a new branch: `git checkout -b feature-name`  
- Commit changes: `git commit -m "Added feature"`  
- Push: `git push origin feature-name`  
- Open a Pull Request  

### **📌 Note:**  
- Add `.gitignore` file and include:  
```
node_modules/
.env
```
