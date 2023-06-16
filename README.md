## API Documentation

### **Endpoint:** https://model-api-cqk5st7fhq-et.a.run.app

---

### **POST /predict**

This endpoint predicts the class of an uploaded image and sends the prediction along with other data to the backend server. (You need to login first with express API)

**Parameters:**

- Headers:

  - **`authorization`** (string, required) - User authentication token

- Body:
  - **`judul`** (string, required) - Report title
  - **`lokasi`** (string, required) - Report location
  - **`image`** (file, required) - Image file to be predicted

**Response:**

- 200 OK
  - Example Response:
    ```json
    {
      "judul": "Jalan Bagus",
      "gambar": "https://storage.googleapis.com/road-crack-model/198cbb422e576db97580ed96450decfe.jpg",
      "lokasi": "Bintan",
      "desc": "good",
      "akurasi": 93
    }
    ```
- 400 Bad Request
  - Example Response:
    ```json
    {
      "error": "Unauthorized"
    }
    ```
