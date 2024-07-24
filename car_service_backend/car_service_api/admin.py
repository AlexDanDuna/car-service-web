from django.contrib import admin

from .models import Car, ClientCard, Transaction

# Register your models here.
admin.site.register(Car)
admin.site.register(ClientCard)
admin.site.register(Transaction)
