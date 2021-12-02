from ..environment import env


SWAGGER_SETTINGS = {
    "DEFAULT_API_URL": env.str("HMAP_BACKEND_BASE_API_URL", default="https://example.com"),
    # Related to #37. JWT auth support, see https://drf-yasg.readthedocs.io/en/stable/security.html
    "SECURITY_DEFINITIONS": {
        "Bearer": {"type": "apiKey", "name": "Authorization", "in": "header"},
    },
}
