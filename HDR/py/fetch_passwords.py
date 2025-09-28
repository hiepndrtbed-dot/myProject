import subprocess
import sys
import os
import json
import base64
import tempfile
import requests

# Kiểm tra requests
# try:
#     import requests
# except ImportError:
#     print("❌ Thư viện requests chưa cài. Đang cài đặt...")
#     subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
#     import requests

# URL Web App của bạn
URL = "https://script.google.com/macros/s/AKfycbwKSF9848A3fXps2Zf3_GBq_dDSfoPOrjU8I-Wh9MXRgk4BNWhRZNpN5bwHP4AR6nCd-Q/exec"

try:
    r = requests.get(URL)
    r.raise_for_status()
    data = r.json()

    # Mã hóa password Base64
    if "accounts" in data and isinstance(data["accounts"], list):
        for acc in data["accounts"]:
            pw = str(acc.get("Passwork", ""))
            acc["Passwork"] = base64.b64encode(pw.encode("utf-8")).decode("utf-8")

    # Lưu vào thư mục tạm
    temp_dir = tempfile.gettempdir()
    out_path = os.path.join(temp_dir, "accounts.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print("✅ Fetch thành công, accounts.json đã lưu tại:", out_path)

except Exception as e:
    print("❌ Lỗi khi fetch dữ liệu:", e)
