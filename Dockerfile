# Menggunakan base image Python
FROM python:3.9

# Mengatur direktori kerja
WORKDIR /app

# Menyalin file requirements.txt ke dalam image
COPY requirements.txt .

# Menginstal dependensi
RUN pip install -r requirements.txt

# Menyalin kode aplikasi ke dalam image
COPY . .

# Menyalin file credentials.json ke dalam image
COPY lippo-capstone.json .

# Menjalankan aplikasi
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
