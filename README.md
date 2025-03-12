# Inventory Management Web Application 📦

A simple, Dockerized Flask-based inventory management application that performs CRUD operations (Create, Read, Update, Delete) with a web-based user interface.

---

## 🚀 Features

- Add, view, and delete inventory items.
- Persistent storage using SQLite database.
- Containerized using Docker for easy deployment.
- Simple and intuitive UI with responsive design.

## 🛠️ Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS, JavaScript
- **Database:** SQLite, SQLAlchemy
- **Deployment:** Docker

## Installation & Setup

### Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (required).
- Install [Git](https://git-scm.com/downloads).

---

## Running with Docker 🐳

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/inventory-web-app.git
cd inventory-web-app
```

### Step 2: Build the Docker Image

```bash
docker build -t inventory-app .
```

### Step 3: Run the Docker Container

```bash
docker run -d -p 5000:5000 inventory-app
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.






