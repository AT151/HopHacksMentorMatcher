from flask import Flask, request, jsonify
from threading import Thread
import bot

thread = Thread(target=bot.run)
thread.start()

app = Flask(__name__)
#app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"


@app.route('/processjson', methods=['POST'])
def processjson():
    #bot.sendDM()
    return jsonify({"hi": "hi"})


if __name__ == '__main__':
    app.run()
