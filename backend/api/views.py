
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserModel
from .serializers import UserSerializer


'''Just User Ko Data GET ra POST Method lai'''
class UserGetPostAPI(APIView):
    def get(self, request):
        queryset = UserModel.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''Each User ko Data Get , Update & Delete Garna lai'''
class UserEachGetPutDeleteAPI(APIView):
    def get_object(self, pk):
        return get_object_or_404(UserModel, id=pk)

    def get(self, request, pk):
        queryset = self.get_object(pk)
        serializer = UserSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        queryset = self.get_object(pk)

        # Check if an image is included in the request data
        if 'user_image' not in request.data:
            # If no new image is uploaded, keep the existing image
            request.data['user_image'] = queryset.user_image.url  # Assuming the model has an image field

        serializer = UserSerializer(queryset, data=request.data , partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        queryset = self.get_object(pk)
        queryset.delete()
        return Response({"message": "Data is deleted"}, status=status.HTTP_204_NO_CONTENT)


"""Faculty Choice ko Option Frontend lai pathauna"""
class FacultyChoicesAPI(APIView):
    def get(self, request):
        # Extracting choices from the model
        choices = dict(UserModel.faculty_choices)  # Convert tuple to dictionary
        return Response(choices)  # Send choices as JSON