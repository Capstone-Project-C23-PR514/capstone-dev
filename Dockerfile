# Menggunakan base image Python
FROM python:3.9

# Mengatur direktori kerja
WORKDIR /app

# Menyalin file requirements.txt ke dalam image
COPY requirements.txt .

# Menginstal dependensi
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin kode aplikasi ke dalam image
COPY app/ .

# Menyalin file credentials.json ke dalam image
COPY credentials.json .

# Menjalankan aplikasi
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
