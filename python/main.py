'''
Author: Utpal Das
'''
import time
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1>Hello World! Welcome to The Drop.</h1>"

if __name__ == "__main__":
    app.run(debug=True)