from rest_framework.permissions import BasePermission

class ObjetoAstronomicoPermission(BasePermission):
    def has_permission(self, request, view):

        if not request.user or not request.user.is_authenticated:
            return False

        if view.action in ['list','retrieve']:
            return request.user.has_perm('astronomia.view_objetoastronomico')

        if view.action == 'create':
            return request.user.has_perm('astronomia.add_objetoastronomico')

        if view.action in ['update', 'partial_update']:
            return request.user.has_perm('astronomia.change_objetoastronomico')

        if view.action == 'destroy': 
            return request.user.has_perm('astronomia.delete.objetoastronomico')

        return False