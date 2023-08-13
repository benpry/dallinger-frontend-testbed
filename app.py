from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def experiment():
    return render_template("experiment.html")
