from config.config import api,app
from app.Http.controller.index_controller import Index_controller 
from app.Http.controller.auth.loginAuth_controller import Login_controller, Logout_controller

api.add_resource(Index_controller, '/')
api.add_resource(Login_controller, '/login')
api.add_resource(Logout_controller, '/logout')
