import datetime
from django.utils import timezone
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import mixins
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings

from .serializers import PostSerializer
from .models import Post

# now = timezone.localtime(timezone.now())


# class PostViewSet(viewsets.ViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     # queryset = Post.objects.all()
#     # serializer_class = PostSerializer
#     # authentication_classes = [BasicAuthentication]
#     # permission_classes = [permissions.IsAuthenticated]

#     def get_permissions(self):
#         #if self.action == 'list':
#         #    self.permission_classes = [permissions.IsAuthenticated]
#         return super().get_permissions()

#     def get_authenticators(self):
#         #self.authentication_classes = [SessionAuthentication, TokenAuthentication]
#         return super().get_authenticators()

#     def retrieve(self, request:Request, pk=None):
#         queryset = Post.objects.all()
#         user = get_object_or_404(queryset, pk=pk)
#         serializer = PostSerializer(user)
#         return Response(serializer.data)


class PostList(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer


class EmailSend(APIView):
    def post(self, request):
        #print(request.data)
        name = request.data["name"]
        secondName = request.data["secondName"]
        email = request.data["email"]
        phone = request.data["phone"]
        date = request.data["date"]
        index = request.data["index"]
        address = request.data["address"]
        if name == "" or secondName == "" or email == "" or phone == "" or date == "" or index == "" or address == "":
            raise ParseError("Заполните все поля")
        message = """{name} {secondName} желает стать партнёром.
Личные данные:
email: {email}
дата рождения: {date}
телефон: {phone}
индекс: {index}
аддрес: {address}
        """.format(name=name, secondName=secondName, email=email, date=date, phone=phone, index=index, address=address)
        send_mail("Анкета партнёра", message, settings.EMAIL_HOST_USER, ["svinin99@mail.ru"], fail_silently=False)
        return Response("success", 200)


class PostAdmin(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def create(self, request, *args, **kwargs):
        #print(request.data)
        file = request.data['file']
        name = request.data['name']
        text = request.data['text']
        if name == "" or text == "" or hasattr(file, "name") == False:
            raise ParseError("Заполните все поля")
        serializer = PostSerializer(
            data={'name': name, 'text': text, 'img': file})
        if serializer.is_valid():
            post = Post(name=name, text=text)
            folder = "img/"+datetime.datetime.now().strftime("%Y_%m_%d")+"/"
            post.img = folder+datetime.datetime.now().strftime("%H_%M_%S")+"_"+file.name
            default_storage.save(str(post.img), file)
            post.save()
            return Response(status=201)
        else:
            return Response(serializer.errors, status=400)

    # def destroy(self, request, *args, **kwargs):
    #     print(self.kwargs.get('pk'))
    #     post:Post = Post.objects.get(pk=self.kwargs.get('pk'))
    #     default_storage.delete(str(post.img))
    #     post.delete()
    #     return Response(status=200)

    def update(self, request, *args, **kwargs):
        #print(request.data)
        file = request.data['file']
        name = request.data['name']
        text = request.data['text']
        if name == "" or text == "" or (hasattr(file, "name") == False and request.data['file'] == ""):
            raise ParseError("Заполните все поля")
        serializer = PostSerializer(
            data={'name': name, 'text': text})
        if serializer.is_valid():
            post = get_object_or_404(Post, pk=self.kwargs.get('pk'))
            post.text = text
            post.name = name
            if post.img != file:
                folder = "img/"+datetime.datetime.now().strftime("%Y_%m_%d")+"/"
                post.img = folder+datetime.datetime.now().strftime("%H_%M_%S")+"_"+file.name
                default_storage.save(str(post.img), file)
            post.save()
            return Response(status=201)
        else:
            return Response(serializer.errors, status=400)
