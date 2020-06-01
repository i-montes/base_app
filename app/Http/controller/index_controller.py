from config.config import app,Resource, bcrypt,create_access_token, login_manager
from flask import session, request, redirect
from flask_login import login_required, logout_user, current_user, login_user
from database.models.Users_model import Users

class Index_controller(Resource):
    def __init__(self):
        pass
    @login_required
    def get(self):
        if current_user.is_authenticated:
            print('esta vaina esta es ya logueada mk')
        return 'qwe'