from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ------------------------------------------------------------------- BASIC CONFIGURATION TO CONNECT SQLALCHEMY WITH THE DATABASE
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:D3MO@localhost/workers'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
