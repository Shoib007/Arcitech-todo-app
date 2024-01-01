from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from uuid import uuid4
import enum

""" 
    Message to reviewer
    
    As this project is simple and small so I'm adding all the model inside single file.

"""

class UserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError(_("The email must be provided"))
        email = self.normalize_email(email)
        user = self.model(email = email, **kwargs)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self, email, password, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)
        
        if kwargs.get('is_staff') != True:
            raise ValueError(_('is_staff must be True'))
        if kwargs.get('is_superuser') != True:
            raise ValueError(_('is_superuser must be True'))
        
        return self.create_user(email, password, **kwargs)


class StatusEnum(enum.Enum):
    PENDING = 'PENDING'
    COMPLETED = 'COMPLETED'    

    @classmethod
    def choices(cls):
        return [(name.value, name.name) for name in cls]


class Tasks(models.Model):
    title = models.CharField(max_length = 200)
    description = models.TextField()
    status = models.CharField(max_length = 30, choices = StatusEnum.choices(), default = "PENDING")
    active = models.BooleanField(default = True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
    def __str__(self) -> str:
        return self.title


class UsersModel(AbstractUser):
    username = None
    email = models.EmailField(unique=True, db_index=True)
    tasks = models.ForeignKey(Tasks, on_delete = models.DO_NOTHING, null=True, blank = True)
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self) -> str:
        return self.email