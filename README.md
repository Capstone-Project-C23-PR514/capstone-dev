## **API Documentation**

### **Endpoint:** https://api-test-4qeqxjz7lq-et.a.run.app/

### GET /

Retrieve the dashboard data for authenticated users.

**Parameters:**

- Header: **`Authorization`** (Bearer token)

**Response:**

- 200 OK
    - Example Response:
        
        ```json
        {
            "message": "Welcome to Dashboard, zaka",
            "reports": [
                {
                    "id": 2,
                    "user_id": 8,
                    "title": "Jalan Bagus",
                    "image": "https://storage.googleapis.com/road-crack-model/198cbb422e576db97580ed96450decfe.jpg",
                    "location": "Bintan",
                    "description": "good",
                    "accuracy": "93",
                    "createdAt": "2023-06-08T22:11:08.000Z",
                    "updatedAt": "2023-06-08T22:11:08.000Z"
                }
            ]
        }
        ```
        
- 401 Unauthorized
    - Example Response:
        
        ```json
        {
            "error": "Not Authorized"
        }
        ```
        
- 403 Forbidden
    - Example Response:
        
        ```json
        {
            "error": "Authorized is not validate"
        }
        ```
        
- 500 Internal Server Error
    - Example Response:
        
        ```json
        { 
            "error": "Terjadi kesalahan saat mengambil data report" 
        }
        ```
        

---

### GET /detail/{reportId}

Retrieve detailed information for a specific report.

**Parameters:**

- Header: **`Authorization`** (Bearer token)
- Path: **`reportId`** (string, required) - Report ID

**Response:**

- 200 OK
    - Example Response:
        
        ```json
        {
            "data": {
                "id": 2,
                "user_id": 8,
                "title": "Jalan Bagus",
                "image": "https://storage.googleapis.com/road-crack-model/198cbb422e576db97580ed96450decfe.jpg",
                "location": "Bintan",
                "description": "good",
                "accuracy": "93",
                "createdAt": "2023-06-08T22:11:08.000Z",
                "updatedAt": "2023-06-08T22:11:08.000Z"
            }
        }
        ```
        
- 401 Unauthorized
    - Example Response:
        
        ```json
        {
            "error": "Not Authorized"
        }
        ```
        
- 403 Forbidden
    - Example Response:
        
        ```json
        {
            "error": "Unauthorized validation failed"
        }
        ```
        
- 404 Not Found
    - Example Response:
        
        ```json
        {
            "error": "Report not found"
        }
        ```
        
- 500 Internal Server Error
    - Example Response:
        
        ```json
        { 
            "error": "Terjadi kesalahan saat mengambil data report" 
        }
        ```
        

---

### POST /register

Register a new user.

**Parameters:**

- Body:
    - **`nama_lengkap`** (string, required) - User's full name
    - **`email`** (string, required) - User's email address
    - **`password`** (string, required) - User's password

**Response:**

- 200 OK
    - Example Response:
        
        ```json
        {
            "registered": {
                "id": 25,
                "full_name": "Muhammad Nurfatkhur Rahman",
                "email": "mhmdnurf215@gmail.com",
                "password": "$2a$10$sDpg9R8iP5IlOHHXrMN1dOWDinEOXXDqB5oyv9Dd47YCDbvwIzI8m",
                "updatedAt": "2023-06-09T18:57:51.798Z",
                "createdAt": "2023-06-09T18:57:51.798Z"
            },
            "message": "Register berhasil"
        }
        ```
        
- 400 Bad Request
    - Example Response:
        
        ```json
        {
            "message": "Register gagal"
        }
        ```
        

### POST /login

Authenticate the user and get an access token.

**Parameters:**

- Body:
    - **`email`** (string, required) - User's email address
    - **`password`** (string, required) - User's password

**Response:**

- 200 OK
    - Example Response:
        
        ```json
        {
            "loginUsers": {
                "user_id": 8,
                "full_name": "zaka",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ6YWxkZWJhcmVuekBnbWFpbC5jb20iLCJpYXQiOjE2ODY3MzE4MzAsImV4cCI6MTcxODI2NzgzMH0.PhQvRdt72awvEWajZsES5E"
            },
            "message": "Login berhasil"
        }
        ```
        
- 400 Bad Request
    - Example Response:
        
        ```json
        {
            "error": "Mohon lengkapi semua field"
        }
        ```
        
- 401 Unauthorized
    - Example Response:
        
        ```json
        {
            "error": "Email atau password salah"
        }
        ```
        
- 500 Internal Server Error
    - Example Response:
        
        ```json
        {
            "error": "Terjadi kesalahan saat memverifikasi pengguna"
        }
        ```
    

### GET /search

Search for reports based on title or description.

**Parameters:**

- Header: **`Authorization`** (Bearer token)
- Query: **`search`** (string, required) - Search keyword based on title and description

**Response:**

- 200 OK
    - Example Response:
        
        ```json
        {
            "data": [
                {
                    "id": 2,
                    "user_id": 8,
                    "title": "Jalan Bagus",
                    "image": "https://storage.googleapis.com/road-crack-model/198cbb422e576db97580ed96450decfe.jpg",
                    "location": "Bintan",
                    "description": "good",
                    "accuracy": "93",
                    "createdAt": "2023-06-08T22:11:08.000Z",
                    "updatedAt": "2023-06-08T22:11:08.000Z"
                }
            ]
        }
        ```
        
- 200 OK (no data)
    - Example Response:
        
        ```json
        {
          "message": "Data tidak ditemukan"
        }
        ```
        
- 401 Unauthorized
    - Example Response:
        
        ```json
        {
            "error": "Not Authorized"
        }
        ```
        
- 403 Forbidden
    - Example Response:
        
        ```json
        {
            "error": "Authorized is not validate"
        }
        ```
        
- 500 Internal Server Error
    - Example Response:
        
        ```json
        {
            "error": "Pencarian gagal"
        }
        ```
