from config.config import login_manager,db
from flask_login import UserMixin

class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    idsocial = db.Column(db.String(250), unique=True)
    name = db.Column(db.String(250))
    lastname = db.Column(db.String(250))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(250))
    rol = db.Column(db.Integer)
    email_verified_at = db.Column(db.String)
    remember_token = db.Column(db.String(400))
    photo = db.Column(db.String(400)) 
    phone = db.Column(db.String(20))

@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))