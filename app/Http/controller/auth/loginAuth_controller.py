from config.config import app,Resource, bcrypt,create_access_token
from flask import session, request, redirect
from flask_login import logout_user

class Login_controller(Resource):
    def __init__(self):
        pass
    def get(self):
        return 'login'


class Logout_controller(Resource):
    def get(self):
        logout_user()
        return redirect('/login')