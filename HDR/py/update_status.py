import subprocess
import sys
from uuid import getnode
from datetime import datetime

# Kiểm tra requests
try:
    import requests
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests

# URL = "https://script.google.com/macros/s/AKfycbzVIlhiKqRCXyG2n4v3HyOgYlXk3vaOjCNdbgKIdo-i_CYKFNOBP9_pIXZrsfk8kyhxEg/exec"
URL = "https://script.google.com/macros/s/AKfycbwKSF9848A3fXps2Zf3_GBq_dDSfoPOrjU8I-Wh9MXRgk4BNWhRZNpN5bwHP4AR6nCd-Q/exec"



def update_status(user: str, status: int):
    computer_id = str(getnode())
    today = datetime.now().date().isoformat()

    # Lấy dữ liệu Sheet
    try:
        r = requests.get(URL)
        r.raise_for_status()
        data = r.json()
        sheet_data = None
        for acc in data.get("accounts", []):
            if acc.get("User") == user:
                sheet_data = acc
                break
        if not sheet_data:
            print(f"❌ Không tìm thấy user {user} trên Sheet.")
            return False
    except Exception as e:
        print(f"❌ Lỗi lấy dữ liệu Sheet: {e}")
        return False

    # Nếu ActivationDate trống → set ngày hôm nay
    if not sheet_data.get("ActivationDate"):
        sheet_data["ActivationDate"] = today
        print(f"✅ Kích hoạt lần đầu cho {user}: {today}")

    # Luôn cập nhật LastLogin, Status, UserComputer
    # sheet_data["LastLogin"] = today
    sheet_data["Status"] = status
    sheet_data["UserComputer"] = computer_id if status == 1 else ""

    try:
        r2 = requests.post(URL, json=sheet_data)
        r2.raise_for_status()
        print("✅ Sheet updated:", r2.text)
        return True
    except Exception as e:
        print(f"❌ Không update được Sheet: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("❌ Vui lòng nhập: python update_status.py <user> <status>")
        sys.exit(1)
    user = sys.argv[1]
    status = int(sys.argv[2])
    update_status(user, status)
