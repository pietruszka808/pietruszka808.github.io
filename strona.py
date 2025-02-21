from flask import Flask, redirect, url_for

app= Flask(__name__)


@app.route("/")
def home():
    return "<h1>test w h1</h1>"

@app.route("/<zmienna>")
def text(zmienna):
    return f"test {zmienna}"

@app.route("/home")
def homee():
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True)


