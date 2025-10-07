

# SmartGate

**SmartGate** is a modern, comprehensive **Society Management System** designed to streamline and simplify daily operations for residential communities. It offers robust features for visitor tracking, maintenance request management, and secure document storage.

-----

##  Key Features

###  Visitor Management

  * **Real-Time Tracking:** Log, track, and monitor all visitors in real time.
  * **Search & Filtering:** Easily search visitors by name, the resident they're visiting, or the house number.
  * **Entry Logs:** Quickly view recent visitors and today's entry statistics.

###  Maintenance Tracking

  * **Request Management:** Create, track, and manage all maintenance requests in one place.
  * **Status Monitoring:** Distinguish between pending and completed tasks.
  * **Categorization:** Tasks are categorized (e.g., **Electrical**, **Plumbing**, **Cleaning**) for efficient assignment and tracking.

###  Document Management

  * **Secure Storage:** Upload, store, and manage all important society documents securely.
  * **Audit Trail:** Track which user uploaded each document.
  * **Easy Access:** Provide secure and easy access to necessary files for authorized users.

###  Authentication & Security

  * **Secure Login:** Implement a secure user login process.
  * **Session Management:** Maintain user sessions using industry-standard methods like **Cookies** or **JSON Web Tokens (JWT)**.

-----

##  Tech Stack

SmartGate is built with a modern and scalable MERN stack architecture:

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Axios, React Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT / Cookies |

-----

##  Environment Variables

To run the application, you must create separate `.env` files in both the `/server` and `/client` directories.

### Server (`/server/.env`)

This file contains sensitive configuration for the backend.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartgate
JWT_SECRET=your_strong_secret_key_here
```

### Client (`/client/.env`)

This file is used to specify the backend API location for the frontend.

```env
VITE_BACKEND_URL=http://localhost:5000
```

-----

##  Installation & Setup

Follow these steps to get SmartGate running on your local machine.

### 1\. Clone the Repository

```bash
git clone https://github.com/yourusername/SmartGate.git
cd SmartGate
```

### 2\. Backend Setup

Navigate to the server directory, install dependencies, and start the server.

```bash
cd server
npm install
npm run server
```

### 3\. Frontend Setup

Open a **new terminal window**, navigate to the client directory, install dependencies, and start the development server.

```bash
cd ../client
npm install
npm run dev
```

