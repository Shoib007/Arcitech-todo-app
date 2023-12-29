from django.contrib import admin
from .models import Tasks, UsersModel

admin.site.register([Tasks, UsersModel])
