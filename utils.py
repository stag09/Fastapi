# import os
# import smtplib
# import random
# from dotenv import load_dotenv
# from email.mime.text import MIMEText

# load_dotenv()

# def generate_otp():
#     return str(random.randint(100000, 999999))

# def send_otp_email(receiver_email: str, otp: str):
#     sender_email = os.getenv("EMAIL")
#     sender_password = os.getenv("EMAIL_PASSWORD")

#     msg = MIMEText(f"Your OTP is: {otp}")
#     msg["Subject"] = "Password Reset OTP"
#     msg["From"] = sender_email
#     msg["To"] = receiver_email

#     smtp = smtplib.SMTP("smtp.gmail.com", 587)
#     smtp.starttls()
#     smtp.login(sender_email, sender_password)
#     smtp.sendmail(sender_email, receiver_email, msg.as_string())
#     smtp.quit()

# def get_password_hash(password: str):
#     # just placeholder for your password hashing logic
#     return password

# def verify_password(plain_password, hashed_password):
#     return plain_password == hashed_password

'''2025-07-15T22:34:00'''