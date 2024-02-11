from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Create a superuser'
    

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating a superuser ...')
        username = os.environ.get('DJANGO_SU_NAME')
        email = os.environ.get('DJANGO_SU_EMAIL')
        password = os.environ.get('DJANGO_SU_PASSWORD')
        
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
            self.stdout.write(self.style.SUCCESS(f'Successfully created superuser {username}'))
        else:
            self.stdout.write(f"The user is already exists.")
            
