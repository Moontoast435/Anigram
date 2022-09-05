from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('api/post', views.PostListCreate.as_view() ),
    path('api/post/create', views.createPost, name='create-post'),
    path('api/post/<str:pk>/update', views.updatePost, name='update-post'),
    path('api/post/<str:pk>/delete', views.deletePost, name='delete-post'),
    path('api/post/<str:pk>', views.getPost, name='post')

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

