FROM python:3.8-slim-buster

WORKDIR /usr/src/flask

COPY /bubblemeter/backend/flask_backend/requirements.txt ./

RUN pip3 install --upgrade pip

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

# start python with unbuffered output
CMD ["python", "./app.py" ]