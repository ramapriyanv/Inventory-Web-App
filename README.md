# Inventory Management Web Application 📦 (React + Flask)

A modern and advanced inventory management application built with a Flask backend and React frontend. It supports **CRUD operations (Create, Read, Update, Delete)** with a clean, responsive, and attractive UI using Material-UI.

---

## 🚀 Features

- Add, view, edit, and delete inventory items seamlessly.
- Persistent storage using SQLite database.
- Containerized using Docker for easy deployment.
- Modern and responsive UI built with React and Material-UI.
- Dark Mode Support and Dynamic Theming.
- Integrated Flask-React Communication with Axios.

---

## 🛠️ Tech Stack

- **Backend:** Python, Flask, Flask-SQLAlchemy, Flask-CORS
- **Frontend:** React, Axios, Material-UI
- **Database:** SQLite, SQLAlchemy
- **Deployment:** Docker

---

## Installation & Setup

### Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- Install [Git](https://git-scm.com/downloads).
- Install [Node.js and npm](https://nodejs.org/) for React frontend.

---

## Running Locally

### Backend Setup
1. Clone the repository:
```bash
 git clone https://github.com/your-username/inventory-web-app.git
 cd inventory-web-app
```
2. Install Python dependencies:
```bash
pip install -r requirements.txt
```
3. Run the Flask application:
```bash
python app.py
```

### Frontend Setup
1. Navigate to the `frontend` directory:
```bash
cd frontend
```
2. Install npm dependencies:
```bash
npm install
```
3. Run the React application:
```bash
npm run dev
```

---

## Running with Docker 🐳

### Step 1: Build the Docker Image
```bash
docker build -t inventory-app .
```

### Step 2: Run the Docker Container
```bash
docker run -d -p 5000:5000 inventory-app
```

---

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

