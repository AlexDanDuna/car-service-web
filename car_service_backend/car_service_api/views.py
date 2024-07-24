from django.shortcuts import render

from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response

from .serializers import CarSerializer, \
    ClientCardSerializer, TransactionSerializer
from .models import Car, ClientCard, Transaction


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'cars': reverse('car-list', request=request,
                        format=format),
        'client_cards': reverse('client_card-list', request=request,
                                format=format),
        'transactions': reverse('transaction-list', request=request,
                                format=format),
        'car-modify': reverse('car-modify', request=request, format=format,
                              kwargs={'pk': 1}),
        'client_card-modify': reverse('client_card-modify', request=request,
                                      format=format, kwargs={'pk': 1}),
        'transaction-modify': reverse('transaction-modify', request=request,
                                      format=format, kwargs={'pk': 1}),
    })


class CarList(generics.ListCreateAPIView):
    """
    List all cars, or create a new car.
    """
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class CarDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a car instance.
    """
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class ClientCardList(generics.ListCreateAPIView):
    """
    List all client cards, or create a new client card.
    """
    queryset = ClientCard.objects.all()
    serializer_class = ClientCardSerializer


class ClientCardDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a client card instance.
    """
    queryset = ClientCard.objects.all()
    serializer_class = ClientCardSerializer


class TransactionList(generics.ListCreateAPIView):
    """
    List all transactions, or create a new transaction.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a transaction instance.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
