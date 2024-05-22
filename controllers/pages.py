from flask import Blueprint,render_template

view = Blueprint('view',__name__)

@view.route('/contact-info1')
def contact():
    return 'its binoj'

@view.route('/contact-info10')
def contactPage():
    return render_template('/views/other.html')

