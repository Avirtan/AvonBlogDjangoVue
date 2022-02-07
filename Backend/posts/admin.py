from django.contrib import admin

from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    fields = ['name', 'text',"img"]
    list_display = ('name','text', 'created')

