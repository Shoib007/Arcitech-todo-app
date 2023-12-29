from rest_framework import serializers
from .models import Tasks, UsersModel

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = '__all__'
        

class UserSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer()
    class Meta:
        model = UsersModel
        fields = ['id', 'first_name', 'last_name', 'tasks']
    
    
    def create(self, validated_data):
        user = UsersModel.objects.create(**validated_data)
        user.set_password(validated_data.get('password'))
        user.save()

        return user