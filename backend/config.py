from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

# ------------------------------------------------------------------- BASIC CONFIGURATION TO CONNECT SQLALCHEMY WITH THE DATABASE
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://' + os.getenv('MYSQL_USER') + \
    ':' + os.getenv('MYSQL_PASSWORD') + '@' + os.getenv('MYSQL_HOST') + '/' + os.getenv('MYSQL_DB')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
