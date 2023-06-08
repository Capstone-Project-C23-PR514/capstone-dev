import os
import uvicorn
from tensorflow import keras
from PIL import Image
import numpy as np
from fastapi import FastAPI, UploadFile, File, Header, Form
from google.cloud import storage
import mimetypes
import requests

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "credentials.json"

bucket_name = 'road-crack-model'
model_filename = 'model_CNN.h5'
backend_url = 'http://localhost:8080'

app = FastAPI()
client = storage.Client()
bucket = client.get_bucket(bucket_name)
blob = bucket.blob(model_filename)
blob.download_to_filename(model_filename)
model_downloaded = False

if not os.path.exists(model_filename):
    blob.download_to_filename(model_filename)
    model_downloaded = True

model = keras.models.load_model(model_filename)
class_names = ['crack', 'pothole']

@app.post('/predict')
async def predict(judul: str = Form(...), lokasi: str = Form(...),image: UploadFile = File(...), authorization: str = Header(None)):
    if not authorization:
        return {'error': 'Unauthorized'}
    
    token = authorization
    
    img = Image.open(image.file).resize((224, 224))
    img = np.array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0
    predictions = model.predict(img)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = class_names[predicted_class_index]

    accuracy = round(predictions[0][predicted_class_index] * 100)

    blob = bucket.blob(image.filename)
    image.file.seek(0)
    blob.upload_from_file(image.file, content_type=image.content_type)
    gambar_url = blob.public_url
    
    headers = {'Authorization': token}
    payload = {'judul': judul, 'lokasi': lokasi, 'desc': predicted_class, 'akurasi': accuracy, 'gambar': gambar_url}
    response = requests.post(f"{backend_url}/reports/upload", json=payload, headers=headers)
    
    return {'judul': judul, 'gambar': gambar_url, 'lokasi': lokasi, 'desc': predicted_class,  'akurasi': accuracy, }

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 3000)))
