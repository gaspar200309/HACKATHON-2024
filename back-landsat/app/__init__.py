from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    # Inicializar las extensiones
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Configuración de CORS
    CORS(app, resources={r"/*": {"origins": config.CORS_ORIGINS}}, supports_credentials=True)
    
    # Registrar los blueprints (controladores)
    from app.controllers.main_controller import main_bp  # Importa el blueprint desde el controlador
    app.register_blueprint(main_bp)  # Registra el blueprint principal
    
    with app.app_context():
        # Aquí puedes inicializar la base de datos y otros componentes si lo necesitas
        db.create_all()  # Crear las tablas en la base de datos

    return app
