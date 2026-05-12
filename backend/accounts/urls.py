from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('profile/', views.profile_data, name='profile_data'),
    path('users/', views.users_list, name='users_list'),
    path('connect/', views.send_connect_email, name='send_connect_email'),
    path('schedule/', views.get_schedule, name='get_schedule'),
    path('schedule/save/', views.save_schedule, name='save_schedule'),
    path('hashtags/', views.save_hashtags, name='save_hashtags'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('password/reset/', views.reset_password, name='reset_password'),
    path('account/delete/', views.delete_account, name='delete_account'),
]