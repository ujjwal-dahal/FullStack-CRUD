from django.db import models

'''Creating Model Here'''

class UserModel(models.Model):
    
    faculty_choices = (
        ("electronics", "ELECTRONICS"),
        ("computer", "COMPUTER"),
        ("civil", "CIVIL"),
        ("architecture", "ARCHITECTURE"),
        ("mechanical", "MECHANICAL"),
        ("industrial", "INDUSTRIAL"),
    )
    
    full_name = models.CharField(max_length=250) 
    email = models.EmailField(max_length=400)  
    phone_number = models.CharField(max_length=15, blank=True, null=True) 
    faculty = models.CharField(choices=faculty_choices, max_length=200)  
    user_image = models.ImageField(upload_to="user_image/",blank=True, null=True)  
    address = models.CharField(max_length=200, blank=True, null=True) 
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Full Name: {self.full_name}"
