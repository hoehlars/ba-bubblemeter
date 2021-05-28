FROM python:3.8-slim-buster

WORKDIR /usr/src/flask

COPY /requirements.txt ./

RUN pip3 install --upgrade pip

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

# start python with unbuffered output
CMD ["python", "./app.py" ]