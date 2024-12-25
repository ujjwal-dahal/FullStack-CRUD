
from django.urls import path
from . import views


urlpatterns = [
  path("user/",views.UserGetPostAPI.as_view(),name="user_get_post"),
  path("user/<int:pk>/",views.UserEachGetPutDeleteAPI.as_view(),name="user_each_get_put_delete"),
  path("faculty-choices/",views.FacultyChoicesAPI.as_view(),name="faculty_choice"), 
]
