from flask import Flask, redirect, url_for, render_template

app= Flask(__name__, static_url_path='', static_folder='', template_folder='')


@app.route("/")
def home():
    return render_template("clicer.html")

@app.route("/test/<zmienna>")
def text(zmienna):
    return f"test {zmienna}"

@app.route("/home")
def homee():
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True, port=9000)
