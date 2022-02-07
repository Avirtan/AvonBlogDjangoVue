from django.urls import path, include
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt

from . import views

router = routers.SimpleRouter()
router.register(r'admin', views.PostAdmin)
router.register(r'', views.PostList)
#router.register(r'', views.PostViewSet, basename='post')


urlpatterns = [
    #path('time', views.index, name='index'),
    path(r'email/',views.EmailSend.as_view(), name="email"),
    path('', include(router.urls)),
]