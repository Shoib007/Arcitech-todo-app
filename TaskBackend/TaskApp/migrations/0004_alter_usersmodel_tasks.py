# Generated by Django 5.0 on 2023-12-29 04:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TaskApp', '0003_alter_tasks_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersmodel',
            name='tasks',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='TaskApp.tasks'),
        ),
    ]
