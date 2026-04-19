FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download model during build so Space starts instantly
RUN python -c "from transformers import pipeline; pipeline('image-classification', model='umm-maybe/AI-image-detector', device=-1)"

# Copy app code
COPY . .

# HuggingFace Spaces requires port 7860
EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
