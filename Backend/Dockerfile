# pull official base image
FROM python:3.8.10-alpine
# set work directory
RUN adduser -D dockuser

WORKDIR /usr/src/app
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# install dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev libffi-dev \
    && apk add jpeg-dev zlib-dev
# install python dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt 
USER dockuser
# copy project 
COPY . .
#RUN echo $(ls -1 /usr/src/app/static/)