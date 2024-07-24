from rest_framework import serializers

from .models import Car, ClientCard, Transaction


class CarSerializer(serializers.ModelSerializer):
    """
    Serializes a car object.
    """
    class Meta:
        model = Car
        fields = '__all__'


class ClientCardSerializer(serializers.ModelSerializer):
    """
    Serializes a client card object.
    """
    class Meta:
        model = ClientCard
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    """
    Serializes a transaction object.
    """
    class Meta:
        model = Transaction
        fields = '__all__'
