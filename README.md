# Book Library Project

This repository contains the source code for the Book Library project. It consists of a frontend and a backend, both running in Docker containers, and can be easily set up using Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository:

    ```bash
    git clone https://github.com/theunhackable/book-library.git
    cd book-library
    ```

2. Build the Docker containers for the frontend and backend:

    ```bash
    docker-compose build
    ```

3. Start the containers:

    ```bash
    docker-compose up
    ```
  `Note: Use sudo command if necessary whenever running docker`

4. Access the application:

    - Frontend: Open your web browser and navigate to `http://localhost:3000`
    - Backend: The backend API is available at `http://localhost:8000`

## Usage

- The frontend provides a user interface for managing a book library.
- The backend serves as an API for CRUD operations on books and authors.

