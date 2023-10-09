# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app/backend

# Copy the requirements file into the container at /app/backend
COPY requirements.txt ./

# Install FastAPI and Uvicorn
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--log-level", "debug", "--reload-dir", "/app/backend"]
# Expose port 8000
EXPOSE 8000
