from flask import Flask, render_template

app = Flask(__name__)

# ✅ Home & Login Page
@app.route("/")
@app.route("/login")
def login_page():
    return render_template("login.html")

# ✅ Register Page
@app.route("/register")
def register_page():
    return render_template("register.html")

# ✅ Booking Page (protected in JS using token)
@app.route("/book")
def booking_page():
    return render_template("bookings.html")

if __name__ == "__main__":
    app.run(debug=True)
