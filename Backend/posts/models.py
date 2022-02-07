from django.db import models
from django.dispatch import receiver

class Post(models.Model):
    name = models.CharField(max_length=100)
    text = models.TextField(default="")
    img = models.ImageField(upload_to="img/%Y_%m_%d", null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

@receiver(models.signals.pre_save, sender=Post)
def auto_delete_file_on_change_Post(sender:Post, instance:Post, **kwargs):
    if not instance.pk:
        return False
    try:
        old_file = sender.objects.get(pk=instance.pk).img
    except sender.DoesNotExist:
        return False
    new_file = instance.img
    if not old_file == new_file:
        old_file.delete(False)

@receiver(models.signals.pre_delete, sender=Post)
def auto_delete_file_on_delete_Post(sender:Post, instance:Post, **kwargs):
    if not instance.pk:
        return False
    try:
        file = sender.objects.get(pk=instance.pk).img
    except sender.DoesNotExist:
        return False
    file.delete(False)
    