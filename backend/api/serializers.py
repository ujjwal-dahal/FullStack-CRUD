from rest_framework import serializers
from .models import UserModel


'''
Creating Serializer For UserModel

-> Esko Kaam bhaneko Complex Data Types like QuerySet lai Python Object Ma Convert Garcha

'''
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserModel
    fields = "__all__"