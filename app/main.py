import os
import uvicorn
from tensorflow import keras
from PIL import Image
import numpy as np
from fastapi import FastAPI, UploadFile, File
from google.cloud import storage

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "credentials.json"

model_bucket_name = 'road-crack-model'
image_bucket_name = 'result-images-691211'
model_filename = 'model_CNN.h5'

app = FastAPI()
client = storage.Client()

# Download model jika belum ada
model_bucket = client.get_bucket(model_bucket_name)
model_blob = model_bucket.blob(model_filename)
if os.path.exists(model_filename):
    print("Model already exists, skipping download.")
else:
    model_blob.download_to_filename(model_filename)

# Load model
model = keras.models.load_model(model_filename)
class_names = ['crack', 'pothole']

# Upload gambar ke bucket result-images-691211
def upload_image_to_bucket(image, filename):
    image_bucket = client.get_bucket(image_bucket_name)
    blob = image_bucket.blob(filename)
    blob.upload_from_file(image, content_type='image/jpeg')

@app.post('/predict')
async def predict(image: UploadFile = File(...)):
    img = Image.open(image.file).resize((224, 224))
    img = np.array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0
    predictions = model.predict(img)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = class_names[predicted_class_index]
    
    # Upload gambar ke bucket result-images-691211
    image.seek(0)
    upload_image_to_bucket(image.file, image.filename)
    
    return {'prediction': predicted_class}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
