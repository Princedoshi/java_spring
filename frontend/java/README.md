Customer Management System
This project is a CRUD (Create, Read, Update, Delete) application for managing customer records. It consists of a backend developed using Spring Boot (or JSP Servlet) and a frontend developed with basic HTML, CSS, and JavaScript.

Features
Create a customer
Update a customer
Get a list of customers with pagination, sorting, and searching
Get a single customer based on ID
Delete a customer
JWT authentication for secure API calls
Prerequisites
Before running the application, ensure you have the following installed:

Java Development Kit (JDK)
MySQL database
Node.js (for frontend development)
Getting Started
Backend (Spring Boot)
Clone the repository:

git clone https://github.com/your-username/customer-management-system.git
cd customer-management-system/backend
Set up your MySQL database and update application.properties with your database configuration.

Run the Spring Boot application:

./mvnw spring-boot:run
The backend will be accessible at http://localhost:8080.

Frontend (HTML/CSS/JS)
In a new terminal, navigate to the frontend directory:

cd customer-management-system/frontend
Open index.html in a web browser or set up a local server (e.g., using http-server).

npx http-server
The frontend will be accessible at http://localhost:8081 (or another port if specified).

Authentication
To authenticate and obtain a Bearer token:

Run curl -X POST -H "Content-Type: application/json" -d '{"login_id":"your_username", "password":"your_password"}' https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp

Replace your_username and your_password with your credentials.

API Documentation
Get Customer List
Run curl -X GET -H "Authorization: Bearer token_received_in_authentication_API_call" https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list

Replace token_received_in_authentication_API_call with the actual token obtained during authentication.

Sync Customer List
To sync the customer list:

Go to the Customer List Screen in the frontend.
Click the "Sync" button.
This will call the remote API to fetch the customer list and update your database.





