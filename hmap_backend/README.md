# hmap-backend

### First run:

Install Python 3.8.2 & setup virtual environment. We recommend to use [pyenv](https://github.com/pyenv/pyenv) & [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv):

```bash
pyenv install 3.8.2
pyenv virtualenv 3.8.2 hmap_backend
pyenv activate hmap_backend
```

Update `pip` & `setuptools`, install `fabric`, `invoke` & `pip-tools`:

```bash
pip install -U fabric invoke pip pip-tools setuptools
```

Install Python requirements:

```bash
cd hmap_backend
fab pip.sync
```

Copy initial settings for Django project:

```bash
cp ./api/.env.example ./api/.env
```

Generate `SECRET_KEY`:

```bash
./api/manage.py generate_secret_key
```

and write it to `./api/.env`:

```
HMAP_BACKEND_SECRET_KEY=<your-generated-key>
```

Run backing services (require Docker):

```bash
fab compose.up -d
```

Run migrations:

```bash
./api/manage.py migrate
```

Run Django server:

```bash
fab run
```

### Load all default layers.

The default layers files – geojson and style json – are placed in hmap_backend/api/app/management/commands/default_public_layers/

TODO: A simple logging output when loading is going on

``` bash
./api/manage.py loaddefaultpubliclayer
```

### Create or update the periodic tasks

TODO: A simple logging output while refreshing periodic tasks configuration

``` bash
./api/manage.py configexternaldatasources
```

### Run the celery worker

In a new terminal run:

``` bash
fab celery.worker
```

### Run the celery beat process.

In a new terminal run:
```bash
fab celery.beat
```

### Environment variables

+ 'UPDATE_INTERVALS': set each external source refresh frequency. It
  is a comma separated <service_key>=<number_of_hours> string. Current
  valid keys:  'firms_modis', 'firms_viirs' and 'goes'.
  See .env.example file.
