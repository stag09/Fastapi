from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("login.html")  # Login page

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/book")
def book():
    return render_template("bookings.html")

@app.route("/forgot-password")
def forgot_password():
    return render_template("forgot.html")  # ✅ New route

# Optional: serve static files (already handled if using Flask's default behavior)
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory("static", filename)

if __name__ == "__main__":
    app.run(debug=True)








