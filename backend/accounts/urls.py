from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('profile/', views.profile_data, name='profile_data'),
    path('users/', views.users_list, name='users_list'),
    path('connect/', views.send_connect_email, name='send_connect_email'),
]