from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

JOBS_API = "https://bn-hiring-challenge.fly.dev/jobs.json"
MEMBERS_API = "https://bn-hiring-challenge.fly.dev/members.json"


@app.route("/jobs")
def get_jobs() -> dict[str]:
    response = requests.get(JOBS_API)
    return response.json()


@app.route("/users")
def get_users() -> dict[str]:
    response = requests.get(MEMBERS_API)
    return response.json()
