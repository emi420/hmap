import os

from celery import Celery


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hmap_backend.settings")

celery_app = Celery("hmap_backend")
celery_app.config_from_object("django.conf:settings", namespace="CELERY")
celery_app.autodiscover_tasks()
