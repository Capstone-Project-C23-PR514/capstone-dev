import os
import uvicorn
from tensorflow import keras
from PIL import Image
import numpy as np
from fastapi import FastAPI, UploadFile, File
from google.cloud import storage
import requests

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "credentials.json"

bucket_name = 'road-crack-model'
model_filename = 'model_CNN.h5'
backend_url = 'http://localhost:3000'  # Ganti dengan URL backend Express.js

app = FastAPI()
client = storage.Client()
bucket = client.get_bucket(bucket_name)
blob = bucket.blob(model_filename)
blob.download_to_filename(model_filename)
model = keras.models.load_model(model_filename)
class_names = ['crack', 'pothole']

@app.post('/predict')
async def predict(image: UploadFile = File(...)):
    img = Image.open(image.file).resize((224, 224))
    img = np.array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0
    predictions = model.predict(img)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = class_names[predicted_class_index]
    
    # Mengirimkan hasil prediksi ke backend Express.js
    files = {'gambar': (image.filename, image.file)}
    payload = {'lokasi': 'lokasi', 'desc': predicted_class}
    response = requests.post(f"{backend_url}/reports/upload", files=files, data=payload)
    
    return {'prediction': predicted_class}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
