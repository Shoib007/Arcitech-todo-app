from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('task/',include('TaskApp.urls')),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_view'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh_view'),
]
