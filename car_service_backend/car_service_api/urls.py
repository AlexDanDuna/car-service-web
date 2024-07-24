from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.api_root),
    path('cars/', views.CarList.as_view(),
         name='car-list'),
    path('cars/<int:pk>/', views.CarDetail.as_view(),
         name='car-modify'),
    path('client_cards/', views.ClientCardList.as_view(),
         name='client_card-list'),
    path('client_cards/<int:pk>/', views.ClientCardDetail.as_view(),
         name='client_card-modify'),
    path('transactions/', views.TransactionList.as_view(),
         name='transaction-list'),
    path('transactions/<int:pk>/', views.TransactionDetail.as_view(),
         name='transaction-modify'),
]

# Allow suffixes for specifying the format of the responses.
urlpatterns = format_suffix_patterns(urlpatterns)
