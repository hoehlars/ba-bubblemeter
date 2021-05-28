FROM python:3.8-slim-buster

WORKDIR /usr/src/process-friends

COPY /bubblemeter/backend/process-friends/requirements.txt ./

RUN pip3 install --upgrade pip

RUN pip3 install --no-cache-dir -r requirements.txt

COPY /bubblemeter/backend/process-friends/ .

# start python with unbuffered output
CMD ["python", "./process_request_queue.py" ]