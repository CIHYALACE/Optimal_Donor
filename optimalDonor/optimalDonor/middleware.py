"""from django.utils.deprecation import MiddlewareMixin

class ForceDomainMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.META['HTTP_HOST'] = 'localhost:5173'

"""
# adding this middleware causes some static media issues