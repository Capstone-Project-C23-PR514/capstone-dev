## **API Documentation for '/' Endpoint**

### **Endpoint:** https://api-test-4qeqxjz7lq-et.a.run.app

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

---

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

---

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

---

### DELETE /reports/delete/{reportId}

Delete a report from the reports table.

**Parameters:**

- Headers:

  - **`Authorization`** (Bearer token) - User authentication token

- Path:
  - **`reportId`** (integer, required) - ID of the report to be deleted

**Response:**

- 200 OK
  - Example Response:
    ```json
    {
      "message": "Report successfully deleted"
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
      "error": "Failed to delete report"
    }
    ```

---

## **API Documentation for uploading reports**

### **Endpoint:** https://road-crack-model-4qeqxjz7lq-et.a.run.app

### POST /predict

Upload a report to the reports table.

**Parameters:**

- Headers:

  - **`Authorization`** (Bearer token) - User authentication token

- Body:
  - **`judul`** (string, required) - Report title
  - **`image`** (string, required) - Report image URL
  - **`lokasi`** (string, required) - Report location

**Response:**

- 200 OK
  - Example Response:
    ```json
    {
      "status": 200,
      "message": "Data berhasil diinput",
      "data": {
        "id": 2,
        "user_id": 8,
        "judul": "Jalan Bagus",
        "gambar": "https://storage.googleapis.com/road-crack-model/198cbb422e576db97580ed96450decfe.jpg",
        "lokasi": "Bintan",
        "desc": "good",
        "akurasi": "93",
        "createdAt": "2023-06-08T22:11:08.000Z",
        "updatedAt": "2023-06-08T22:11:08.000Z"
      }
    }
    ```
- 400 Bad Request
  - Example Response:
    ```json
    {
      "error": "Terjadi kesalahan saat menginput data"
    }
    ```
- 401 Unauthorized
  - Example Response:
    ```json
    {
      "error": "Please provide authorization header"
    }
    ```
- 500 Internal Server Error
  - Example Response:
    ```json
    {
      "error": "An error occurred while inputting data"
    }
    ```

---

## **API Documentation or '/reminders' Endpoint**

### **Endpoint:** https://api-test-4qeqxjz7lq-et.a.run.app/reminders

### GET /

Mengembalikan daftar semua pengingat (reminders) yang terdaftar dalam sistem.

**Parameter:**

- Header: **`Authorization`** (Bearer token)

**Respons:**

- 200 OK
  - Contoh Respons:
    ```json
    {
      "data": [
        {
          "id": 2,
          "user_id": 8,
          "tanggal_awal": "2023-11-03T00:00:00.000Z",
          "tanggal_akhir": "2023-11-22T00:00:00.000Z",
          "gambar": "https://storage.googleapis.com/road-crack-model/1686261043714-Good-Roads.jpg",
          "lokasi": "bintan",
          "catatan": "pemblokiran jalan",
          "createdAt": "2023-06-08T20:21:11.000Z",
          "updatedAt": "2023-06-08T21:50:44.000Z"
        }
      ]
    }
    ```
- 401 Unauthorized
  - Contoh Respons:
    ```json
    {
      "error": "Not Authorized"
    }
    ```
- 403 Forbidden
  - Contoh Respons:
    ```json
    {
      "error": "Authorized is not validate"
    }
    ```
- 500 Internal Server Error
  - Contoh Respons:
    ```json
    {
      "error": "Terjadi kesalahan"
    }
    ```

---

### POST /create

Membuat pengingat baru.

**Parameter:**

- Header: **`Authorization`** (Bearer token)
- Body:
  - **`tanggal_awal`** (date, required) - Tanggal dimulai
  - **`tanggal_akhir`** (date, required) - Tanggal berakhir
  - **`gambar`** (string, required) - Gambar proyek jalan
  - **`lokasi`** (string, required) - Lokasi proyek
  - **`catatan`** (string, required) - Catatan

**Respons:**

- 200 OK
  - Contoh Respons:
    ```json
    {
      "message": "Data reminder berhasil diinput",
      "data": {
        "id": 6,
        "user_id": 8,
        "tanggal_awal": "2023-06-10T00:00:00.000Z",
        "tanggal_akhir": "2023-06-12T00:00:00.000Z",
        "gambar": "https://storage.googleapis.com/road-crack-model/1686338334218-20626821_web1_47220456_581615692282053_7979177864413052928_n.jpg",
        "lokasi": "Tanjungpinang",
        "catatan": "Perbaikan Jalan",
        "updatedAt": "2023-06-09T19:18:54.728Z",
        "createdAt": "2023-06-09T19:18:54.728Z"
      }
    }
    ```
- 401 Unauthorized
  - Contoh Respons:
    ```json
    {
      "error": "Not Authorized"
    }
    ```
- 403 Forbidden
  - Contoh Respons:
    ```json
    {
      "error": "Authorized is not validate"
    }
    ```
- 500 Internal Server Error
  - Contoh Respons:
    ```json
    {
      "error": "Data Gagal diinput"
    }
    ```

---

### POST /detail/:reminderId

Mendaftarkan pengguna baru.

**Parameter:**

- Path : **`reminderId`** (string, required) - ID reminder

**Respons:**

- 200 OK
  - Contoh Respons:
    ```json
    {
      "data": {
        "id": 4,
        "user_id": 8,
        "tanggal_awal": "2023-06-10T00:00:00.000Z",
        "tanggal_akhir": "2023-06-12T00:00:00.000Z",
        "gambar": "https://storage.googleapis.com/road-crack-model/1686260509243-0f767a96cc13b7b3711ac429ad3d4c52.jpg",
        "lokasi": "Tanjungpinang",
        "catatan": "Perbaikan Jalan",
        "createdAt": "2023-06-08T21:41:49.000Z",
        "updatedAt": "2023-06-08T21:41:49.000Z"
      }
    }
    ```
- 401 Unauthorized
  - Contoh Respons:
    ```json
    {
      "error": "Not Authorized"
    }
    ```
- 403 Forbidden
  - Contoh Respons:
    ```json
    {
      "error": "Authorized is not validate"
    }
    ```
- 404 Not Found
  - Contoh Respons:
    ```json
    {
      "error": "Report not found"
    }
    ```
- 500 Internal Server Error
  - Contoh Respons:
    ```json
    {
      "error": "Terjadi kesalahan saat mengambil detail report"
    }
    ```

---

### PUT /edit/:reminderId

Autentikasi pengguna dan mendapatkan token akses.

**Parameter:**

- Path : **`reminderId`** (string, required) - ID reminder

**Respons:**

- 200 OK
  - Contoh Respons:
    ```json
    {
      "message": "Data reminder berhasil diupdate"
    }
    ```
- 401 Unauthorized
  - Contoh Respons:
    ```json
    {
      "error": "Not Authorized"
    }
    ```
- 403 Forbidden
  - Contoh Respons:
    ```json
    {
      "error": "Authorized is not validate"
    }
    ```
- 500 Internal Server Error
- Contoh Respons:
  ```json
  {
    "error": "Terjadi kesalahan saat memverifikasi pengguna"
  }
  ```

---

### GET /search

Mencari laporan berdasarkan judul atau deskripsi.

**Parameter:**

- Header: **`Authorization`** (Bearer token)
- Query: **`search`** (string, required) - Kata kunci pencarian berdasarkan judul dan desc

**Respons:**

- 200 OK
  - Contoh Respons:
    ```json
    {
      "data": [
        {
          "id": 2,
          "user_id": 8,
          "judul": "Jalan Bagus",
          "gambar": "https://storage.googleapis.com/road-crack-model/198cbb422e576db97580ed96450decfe.jpg",
          "lokasi": "Bintan",
          "desc": "good",
          "akurasi": "93",
          "createdAt": "2023-06-08T22:11:08.000Z",
          "updatedAt": "2023-06-08T22:11:08.000Z"
        }
      ]
    }
    ```
- 200 OK (tanpa data)
  - Contoh Respons:
    ```json
    {
      "message": "Data tidak ditemukan"
    }
    ```
- 401 Unauthorized
  - Contoh Respons:
    ```json
    {
      "error": "Not Authorized"
    }
    ```
- 403 Forbidden
  - Contoh Respons:
    ```json
    {
      "error": "Authorized is not validate"
    }
    ```
- 500 Internal Server Error

  - Contoh Respons:

    ```json
    {
      "error": "Pencarian gagal"
    }
    ```
