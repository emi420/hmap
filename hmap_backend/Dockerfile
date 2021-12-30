FROM python:3.8-slim-buster

# set environment variables
# ENV HMAP_BACKEND_DATABASE_URL psql://postgres:Qwerty_12@127.0.0.1:5432/hmap_backend_db
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . /code/

WORKDIR /code

RUN set -ex \
    && pip install --upgrade pip \
    && pip install -r api/requirements-dev.txt


# copy project
RUN mkdir -p /code/public/static

CMD ./api/manage.py makemigrations && ./api/manage.py migrate && ./api/manage.py collectstatic --no-input && cd api && gunicorn -b 0.0.0.0:8000 hmap_backend.wsgi
