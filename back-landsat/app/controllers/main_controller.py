# app/controllers/main_controller.py
from flask import Blueprint, jsonify
from app.services.main_service import MainService

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def main():
    return MainService.get_greeting() 

@main_bp.route('/nuevo')
def nuevo():
    data = ['elemento1', 'elemento2', 'elemento3', 'elemento4']
    return jsonify(data)