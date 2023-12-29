from django.urls import path
from .views import  TaskCRUDView, TasksView, UserLoginView

urlpatterns = [
    path('<int:pk>/', TaskCRUDView.as_view()),
    path('data/', TasksView.as_view()),
    path('login/', UserLoginView.as_view()),
]