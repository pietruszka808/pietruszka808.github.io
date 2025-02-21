from flask import Flask

app= Flask(__name__)


@app.route("/")
def home():
    return "<h1>test w h1</h1>"

@app.route("/<zmienna>")
def text(zmienna):
    return "test"



if __name__ == "__main__":
    app.run(debug=True)


