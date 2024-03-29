import os

from datetime import timedelta

from .environment import env


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def rel(*path):
    return os.path.join(BASE_DIR, *path)


DEBUG = env.bool("HMAP_BACKEND_DEBUG", default=False)

INTERNAL_IPS = env.list("HMAP_BACKEND_INTERNAL_IPS", default=[])

ALLOWED_HOSTS = env.list("HMAP_BACKEND_ALLOWED_HOSTS", default=[])

# Related Task #8 – login: CORS configuration
CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True

# Corsheaders
CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"] + env.list(
    "HMAP_BACKEND_CORS_ALLOWED_ORIGINS", default=[]
)

SECRET_KEY = env.str("HMAP_BACKEND_SECRET_KEY")

INSTALLED_APPS = [
    # django apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 3rd party apps
    "rest_framework",
    "django_extensions",
    "django_filters",
    "drf_yasg",
    "corsheaders",
    "django_celery_beat",
    # our apps
    "hmap_backend.apps.common",
    "hmap_backend.apps.accounts",
    "app",
    "guardian",
] + env.list("HMAP_BACKEND_DEV_INSTALLED_APPS", default=[])

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
] + env.list("HMAP_BACKEND_DEV_MIDDLEWARE", default=[])

ROOT_URLCONF = "hmap_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [rel("templates/")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "hmap_backend.wsgi.application"

DATABASES = {
    "default": env.db("HMAP_BACKEND_DATABASE_URL", default="psql://postgres:Qwerty_12@database:5432/hmap_backend_db")
}

AUTH_USER_MODEL = "accounts.UserAccount"
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

SECURE_BROWSER_XSS_FILTER = env.bool("HMAP_BACKEND_SECURE_BROWSER_XSS_FILTER", default=True)
SECURE_CONTENT_TYPE_NOSNIFF = env.bool("HMAP_BACKEND_SECURE_CONTENT_TYPE_NOSNIFF", default=True)
SESSION_COOKIE_HTTPONLY = env.bool("HMAP_BACKEND_SESSION_COOKIE_HTTPONLY", default=True)
SESSION_COOKIE_SECURE = env.bool("HMAP_BACKEND_SESSION_COOKIE_SECURE", default=True)
CSRF_COOKIE_SECURE = env.bool("HMAP_BACKEND_CSRF_COOKIE_SECURE", default=True)
X_FRAME_OPTIONS = env.str("HMAP_BACKEND_X_FRAME_OPTIONS", default="SAMEORIGIN")
SECURE_HSTS_SECONDS = env.int("HMAP_BACKEND_SECURE_HSTS_SECONDS", default=31536000)  # 1 year
SESSION_COOKIE_NAME = "s"
CSRF_COOKIE_NAME = "c"

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True
LOCALE_PATHS = (rel("..", "..", "api", "locale"),)

STATIC_URL = env.str("HMAP_BACKEND_STATIC_URL", default="/s/")
STATIC_ROOT = env.str("HMAP_BACKEND_STATIC_ROOT", default=rel("..", "..", "public", "static"))

MEDIA_URL = env.str("HMAP_BACKEND_MEDIA_URL", default="/m/")
MEDIA_ROOT = env.str("HMAP_BACKEND_MEDIA_ROOT", rel("..", "..", "public", "media"))
FILE_UPLOAD_PERMISSIONS = 0o644

EMAIL_BACKEND = env.str("HMAP_BACKEND_EMAIL_BACKEND", default="django.core.mail.backends.smtp.EmailBackend")
if EMAIL_BACKEND == "django.core.mail.backends.smtp.EmailBackend":  # pragma: no cover
    EMAIL_HOST = env.str("HMAP_BACKEND_EMAIL_HOST")
    EMAIL_PORT = env.str("HMAP_BACKEND_EMAIL_PORT")
    EMAIL_HOST_USER = env.str("HMAP_BACKEND_EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = env.str("HMAP_BACKEND_EMAIL_HOST_PASSWORD")
    EMAIL_USE_TLS = env.bool("HMAP_BACKEND_EMAIL_USE_TLS", default=True)

SITE_ID = env.int("SITE_ID", default=1)

USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

APPEND_SLASH = False

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",  # this is default
    "guardian.backends.ObjectPermissionBackend",
)

# External data sources
DEFAULT_UPDATE_INTERVAL = 12
UPDATE_INTERVALS = env.dict("UPDATE_INTERVALS", default={})

# Related to task #37: setup JWT login instead of cookie based login.
# It better fits the api login vs server side rending (django templates)
# We need CORS access from the client app and the cookie policy was giving us hard times
# To enable reading the cross site cookies (nevertheless it was properly written with useCredentials=true headers)
SIMPLE_JWT = {
    # 'SIGNING_KEY': settings.SECRET_KEY,
    "USER_ID_FIELD": "uuid",
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=env.int("HMAP_BACKEND_ACCESS_TOKEN_LIFETIME", default=60 * 24)),
}
