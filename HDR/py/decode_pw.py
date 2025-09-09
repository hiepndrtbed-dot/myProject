# decode_pw.py
import sys, base64, os

if len(sys.argv) < 3:
    sys.exit(1)

encoded_pw = sys.argv[1]
out_file = sys.argv[2]  # file tạm để JSX đọc

try:
    decoded_pw = base64.b64decode(encoded_pw).decode("utf-8")
except Exception:
    decoded_pw = ""

# Ghi kết quả ra file
with open(out_file, "w", encoding="utf-8") as f:
    f.write(decoded_pw)
