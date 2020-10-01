from flask import Blueprint

main = Blueprint('main', __name__)

@main.route('/add_move', methods=['POST'])
def add_movie():

    return 'Done', 201

@main.route('/movies')
def movies():

    movies = []

    return jsonify({'movies' : movies})