# Billing System

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Samarth622/Billing-System)

A full-stack billing application designed for retail shops, featuring a Spring Boot backend and a React frontend. The system facilitates item and category management, user administration, order processing with payment integration, and a real-time dashboard.

## Features

-   **Authentication:** Secure JWT-based authentication for both regular users and administrators.
-   **Dashboard:** Provides a quick overview of today's sales, total orders, and a list of recent transactions.
-   **Item & Category Management:** Admins can perform full CRUD (Create, Read, Update, Delete) operations on items and categories, including image uploads to Cloudinary.
-   **User Management:** Admins can register and delete user accounts.
-   **Billing & Order Processing:** An intuitive interface for creating new orders, adding items to a cart, entering customer details, and calculating totals with tax.
-   **Payment Integration:** Supports both `CASH` and `UPI` payment methods, with UPI payments handled through Razorpay.
-   **Order History:** View a comprehensive history of all processed orders.

## Tech Stack

| Category      | Technology                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| **Backend**   | [Java 17](https://www.oracle.com/java/), [Spring Boot](https://spring.io/projects/spring-boot), [Spring Security (JWT)](https://spring.io/projects/spring-security), [Spring Data JPA](https://spring.io/projects/spring-data-jpa), [MySQL](https://www.mysql.com/), [Maven](https://maven.apache.org/) |
| **Frontend**  | [React](https://react.dev/), [Vite](https://vitejs.dev/), [Axios](https://axios-http.com/), [React Router](https://reactrouter.com/), [Bootstrap](https://getbootstrap.com/), [React Hot Toast](https://react-hot-toast.com/) |
| **Services**  | [Cloudinary](https://cloudinary.com/) (Image Storage), [Razorpay](https://razorpay.com/) (Payment Gateway)                                 |
| **API Testing** | [Postman](https://www.postman.com/)                                                                           |

## Project Structure

The repository is organized into two main directories:

-   `billingsoftware/`: The Spring Boot backend application.
-   `bsclient/`: The React frontend application.
-   `Billing Software.postman_collection.json`: A Postman collection for testing the backend API.

## Prerequisites

-   Java Development Kit (JDK) 17 or later
-   Apache Maven
-   Node.js and npm
-   MySQL Server

## Setup and Installation

### Backend (`billingsoftware`)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Samarth622/Billing-System.git
    cd Billing-System/billingsoftware
    ```
2.  **Configure the application:**
    Open `src/main/resources/application.properties` and provide the necessary credentials for your local environment.

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password

    jwt.secret.key=your_strong_jwt_secret_key

    razorpay.key.id=your_razorpay_key_id
    razorpay.key.secret=your_razorpay_key_secret
    ```
    > **Note:** Cloudinary credentials are currently hardcoded in `src/main/java/com/billingsoftware/billingsoftware/config/CloudinaryConfig.java`. For production, it is recommended to externalize these into the `application.properties` file or environment variables.

3.  **Run the application:**
    You can run the backend server using Maven or your IDE.
    ```bash
    mvn spring-boot:run
    ```
    The server will start on `http://localhost:8081`.

### Frontend (`bsclient`)

1.  **Navigate to the client directory:**
    ```bash
    cd ../bsclient
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the `bsclient` root directory and add your Razorpay Key ID. This is used by the frontend to initiate payments.
    ```
    VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

## API Endpoints

The backend API is served under the base path `/api/v1.0`. A comprehensive collection of API endpoints is available in the `Billing Software.postman_collection.json` file, which can be imported into Postman for easy testing.

### Key Endpoint Groups:
-   **Authentication:** `/login`
-   **Dashboard:** `/dashboard`
-   **Orders:** `/orders`
-   **Payments:** `/payments`
-   **Items:** `/items`
-   **Categories:** `/categories`
-   **Admin Routes:** `/admin/**` (for managing users, items, and categories)