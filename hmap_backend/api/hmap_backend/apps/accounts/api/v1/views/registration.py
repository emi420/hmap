from rest_framework import status
from rest_framework.generics import GenericAPIView

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from hmap_backend.apps.accounts.api.v1.serializers.registration import RegistrationSerializer
from hmap_backend.apps.accounts.services.login import LoginService


class RegistrationAPIView(GenericAPIView):
    serializer_class = RegistrationSerializer

    @swagger_auto_schema(responses={status.HTTP_204_NO_CONTENT: openapi.Response("")})
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        response = LoginService.login(request, user)
        return response
