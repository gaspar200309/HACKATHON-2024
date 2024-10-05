from app import create_app
from app.controllers.main_controller import main_bp

app = create_app()


if __name__ == '__main__':
    app.run(debug=True)