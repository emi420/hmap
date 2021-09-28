from ..environment import env


REDIS_URL = env.str("HMAP_BACKEND_REDIS_URL", default="redis://redis:6379/2")
