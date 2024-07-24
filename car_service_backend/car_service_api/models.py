from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import DateTimeField
from django.core.validators import MinLengthValidator, MinValueValidator


class Car(models.Model):
    """
    Database model for a Car.
    """
    model_name = models.CharField(max_length=50, blank=False)
    purchase_year = models.DateField()
    mileage_km = models.IntegerField(validators=[MinValueValidator(
                                                 limit_value=1)])
    warranty_active = models.BooleanField()

    def __str__(self):
        return self.model_name


class ClientCard(models.Model):
    """
    Database model for a Client Card.
    """
    client_first_name = models.CharField(max_length=100, blank=False)
    client_last_name = models.CharField(max_length=100, blank=False)
    cnp = models.CharField(max_length=13, validators=[MinLengthValidator(
                                                      limit_value=13)])
    birth_date = models.DateField()
    registration_date = models.DateField()

    def __str__(self):
        return self.client_first_name + ' ' + self.client_last_name


class Transaction(models.Model):
    """
    Database model for a Transaction.
    """
    car_id = models.ForeignKey(Car, on_delete=models.CASCADE)
    client_card_id = models.ForeignKey(ClientCard, on_delete=models.SET_NULL,
                                       blank=True, null=True)
    parts_cost = models.DecimalField(max_digits=10, decimal_places=2,
                                     validators=[MinValueValidator(0)])
    labour_cost = models.DecimalField(max_digits=10, decimal_places=2,
                                      validators=[MinValueValidator(0)])
    time = models.DateTimeField()

    def __str__(self):
        return self.pk + ' ' + self.time
