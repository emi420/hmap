from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy

from hmap_backend.apps.common import models as core_models
from hmap_backend.apps.common.models import CoreModel


class UserManager(core_models.CoreManager, BaseUserManager):
    def get_queryset(self):
        return core_models.CoreQuerySet(self.model, using=self._db)

    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must give an email address")

        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class UserAccount(PermissionsMixin, CoreModel, AbstractBaseUser):

    email = models.EmailField(verbose_name=gettext_lazy("Email"), max_length=128, unique=True)
    first_name = models.CharField(verbose_name=gettext_lazy("first name"), max_length=30, blank=True, null=True)
    last_name = models.CharField(verbose_name=gettext_lazy("last name"), max_length=30, blank=True, null=True)
    is_staff = models.BooleanField(
        gettext_lazy("staff status"),
        default=False,
        help_text=gettext_lazy("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        gettext_lazy("active"),
        default=True,
        help_text=gettext_lazy(
            "Designates whether this user should be treated as active. Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ("first_name", "last_name")

    def __str__(self):
        return self.email

    def get_short_name(self) -> str:
        return str(self.email)

    def get_full_name(self) -> str:
        if self.first_name and self.last_name:
            full_name = f"{self.first_name} {self.last_name} <{self.email}>"
        else:
            full_name = self.get_short_name()
        return full_name

    @property
    def notification_salutation(self):
        if self.first_name and self.last_name:
            salutation = f"{self.first_name} {self.last_name}"
        else:
            salutation = gettext_lazy("Dear client")
        return salutation

    @property
    def id(self):
        return self.uuid
