# Generated by Django 5.1.4 on 2024-12-25 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=250)),
                ('email', models.EmailField(max_length=400)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('faculty', models.CharField(choices=[('electronics', 'ELECTRONICS'), ('computer', 'COMPUTER'), ('civil', 'CIVIL'), ('architecture', 'ARCHITECTURE'), ('mechanical', 'MECHANICAL'), ('industrial', 'INDUSTRIAL')], max_length=200)),
                ('user_image', models.ImageField(upload_to='user_image/')),
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
            ],
        ),
    ]
