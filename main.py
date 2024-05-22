from flask import Flask, render_template
from controllers import endpoints
from controllers import pages

app = Flask(__name__)
app.register_blueprint(endpoints.function)
app.register_blueprint(pages.view)

@app.route('/')
def hello_world():
    return render_template('/views/homepage.html')

if __name__ == '__main__':
    app.run()