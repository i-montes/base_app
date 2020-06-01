from flask import Flask,session
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
import configparser
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity
)

config = configparser.ConfigParser()
config.read('.env')
configurate = config['CONFIGURATION']

app = Flask(__name__)
app.config['SECRET_KEY'] = configurate.get('APP_KEY')
if configurate.get('APP_DEBUG') == 'false':
    app_debug = False
elif configurate.get('APP_DEBUG') == 'true':
    app_debug = True
app.debug = app_debug

app.config['SECRET_KEY'] = "AqWwxV*.xK3:'3EY)+@F>#/FT/\}pcx}"
SQLALCHEMY_ENGINE_OPTIONS = {'pool_recycle': 280, 'pool_timeout': 100, 'pool_pre_ping': True}
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:qwe1234*@localhost/DomiVentas'
SQLALCHEMY_TRACK_MODIFICATIONS = False
bcrypt = Bcrypt(app)
 
db = SQLAlchemy(app)

db.init_app(app)

api = Api(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login_controller'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
cors = CORS(app, resources={r"/*": {"origins": "*","headers":"X-Custom-Header"}})

