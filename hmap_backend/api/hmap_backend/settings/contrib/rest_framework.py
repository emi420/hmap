from ..environment import env


REST_FRAMEWORK = {
    "COERCE_DECIMAL_TO_STRING": False,
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "hmap_backend.apps.accounts.api.authentication.CustomSessionAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "DEFAULT_PARSER_CLASSES": ("rest_framework.parsers.JSONParser",),
    "DEFAULT_RENDERER_CLASSES": env.tuple(
        "HMAP_BACKEND_DEFAULT_RENDERER_CLASSES", default=("rest_framework.renderers.JSONRenderer",)
    ),
    "PAGE_SIZE": 100,
}
