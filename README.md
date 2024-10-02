# Vocabulary-App-backend

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- MongoDB (if using a local MongoDB instance)

## Running the Backend (Node.js)

1. Navigate to the backend directory after cloning from reposetory:
    ```bash
    cd vocabulary-app-backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `vocabulary-app-backend` folder with the following environment variables (replace with your actual values):
    ```plaintext
    OXFORD_APP_ID=your_oxford_app_id
    OXFORD_APP_KEY=your_oxford_app_key
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Start the Node.js server:
    ```bash
    node server.js
    ```

5. The backend server should now be running on `http://localhost:5000`.



## Summary of Commands

### Start the Backend:
```bash
cd vocabulary-app-backend
npm install
node server.js
