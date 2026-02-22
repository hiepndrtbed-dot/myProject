import gdown
import zipfile
import os

# Link Google Drive chia sẻ dạng file ZIP
drive_url = 'https://drive.google.com/uc?id=1PN_xdJJfCxF81Xvv-nY9EN_bLffUz8K3fgfgfgf'  # Thay YOUR_FILE_ID bằng ID thật
# drive_url = 'https://drive.google.com/drive/folders/12Jwl6oYyzuy6wWNmHJCSnMSN7J3lpquH'
# https://drive.google.com/file/d/1PN_xdJJfCxF81Xvv-nY9EN_bLffUz8K3/view?usp=drive_link


# Tên file ZIP sau khi tải về
zip_file = 'downloaded_folder.zip'

# Tải file ZIP về thư mục hiện tại
gdown.download(drive_url, zip_file, quiet=False)

# Kiểm tra file ZIP có tồn tại không
if os.path.exists(zip_file):
    # Giải nén file ZIP
    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        zip_ref.extractall(os.getcwd())
    print("✅ Đã giải nén vào thư mục:", os.getcwd())

    # Xóa file ZIP nếu không cần giữ
    os.remove(zip_file)
else:
    print("❌ Không tìm thấy file ZIP sau khi tải.")
    
    # abc