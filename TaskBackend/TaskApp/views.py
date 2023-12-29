from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Tasks
from .Serializers import TaskSerializer, UserSerializer


# CRUD OPERATIONS --------------------------------
class TaskCRUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    

# GET and POST OPERATIONS ------------
class TasksView(APIView):
    def get(self, request):
        task = Tasks.objects.all()
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    

# User Login View ------------------------
class UserLoginView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = self.request.user
        print(user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
