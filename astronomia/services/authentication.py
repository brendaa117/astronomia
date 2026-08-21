from rest_framework_simplejwt.tokens import RefreshToken

class AuthenticationService:
    @staticmethod
    def blacklist_fresh_token(refresh_token):
        """"Invalida un refresh token."""
        token = RefreshToken(refresh_token)
        token.blacklist ()
