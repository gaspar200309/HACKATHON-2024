from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import config
#from .utils.init_curse import init_courses

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    CORS(app, resources={r"/*": {"origins": config.CORS_ORIGINS}}, supports_credentials=True)
    

    with app.app_context():
        #from app.models.user import User, Permission, UserRole, Role, Teacher, CoordinatorTeacherAssignment
        
        #from .routes.auth_routes import auth_bp
        
        #app.register_blueprint(auth_bp, url_prefix='/auth')
                
        db.create_all()
        #init_roles(app)
        #init_nivel(app)

    return app