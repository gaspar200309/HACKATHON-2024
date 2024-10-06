from flask import Flask
from flask_cors import CORS
from .config import config
#quiero usar lo ultimo que se import 



def create_app():
    app = Flask(__name__)
    app.config.from_object(config)


    CORS(app, resources={r"/*": {"origins": config.CORS_ORIGINS}}, supports_credentials=True)
    
    from app.controllers.main_controller import main_bp 
    app.register_blueprint(main_bp) 
    
    

    return app
