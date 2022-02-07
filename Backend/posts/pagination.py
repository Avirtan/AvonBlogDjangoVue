import math
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    page_query_param = 'p'

    def get_paginated_response(self, data):
        next =  self.get_next_link().split("api")[1]  if self.get_next_link() is not None else None
        previous = self.get_previous_link().split("api")[1]  if self.get_previous_link() is not None else None
        return Response({
            'links': {
                'next': next,
                'previous': previous
            },
            'current_page': int(self.request.query_params.get('page', 1)),
            'total': self.page.paginator.count,
            'per_page': self.page_size,
            'total_pages': math.ceil(self.page.paginator.count/self.page_size),
            'posts': data,
        })