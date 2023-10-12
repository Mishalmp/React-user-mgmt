
from django.urls import path
from .views import MyTokenObtainPairView, UserDetails, UserRegister,UserList
from rest_framework_simplejwt.views import TokenRefreshView 

urlpatterns = [

    path('user-register/', UserRegister.as_view() ,name="user_register"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('user-detail/<int:id>/',UserDetails.as_view(),name='user_details'),
    path('user-list/',UserList.as_view(),name='user_list'),
    
]

