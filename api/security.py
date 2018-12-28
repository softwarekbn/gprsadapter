
import jwt
from datetime import datetime, timedelta
from functools import wraps




JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 20


class authorization ():
    def __init__(self, username):
        self.username = username

    def authenticate (self):
        access_token = jwt.encode({"name":self.username}, JWT_SECRET, JWT_ALGORITHM)   

        refresh_token = jwt.encode({"name":"refresh_token"}, JWT_SECRET, JWT_ALGORITHM)             
        return (access_token.decode('utf-8'), refresh_token.decode('utf-8'))



    def _jwt_required(realm):
        token = _jwt.request_callback()

        if token is None:
            raise JWTError('Authorization Required', 'Request does not contain an access token',
                        headers={'WWW-Authenticate': 'JWT realm="%s"' % realm})

        try:
            payload = _jwt.jwt_decode_callback(token)
        except jwt.InvalidTokenError as e:
            raise JWTError('Invalid token', str(e))

        _request_ctx_stack.top.current_identity = identity = _jwt.identity_callback(payload)

        if identity is None:
            raise JWTError('Invalid JWT', 'User does not exist')

    def jwt_required(realm=None):

        def wrapper(fn):
            @wraps(fn)
            def decorator(*args, **kwargs):
                _jwt_required(realm or current_app.config['JWT_DEFAULT_REALM'])
                return fn(*args, **kwargs)
            return decorator
        return wrapper
