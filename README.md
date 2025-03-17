# Google Sheets File Uploader with Email Notification\
\
## Description\
This Google Apps Script allows users to **upload files directly to Google Drive** by typing `"upload"` in a cell. The script will:\
- Prompt a **file upload dialog**.\
- Save files into a **specified parent Drive folder**.\
- **Check or create a subfolder** (named by the user).\
- Rename the cell into a **clickable hyperlink** leading to the uploaded files.\
- **Optionally send an email notification** with:\
  - Folder link\
  - Uploaded file names\
  - Multiple selectable recipients (saved locally)\
  - Custom subject & message\
  - The subfolders inherit their sharing from their parent folders\
\
## Features\
- **Seamless file upload** directly from Google Sheets.\
- **Automatic folder organization** in Google Drive.\
- **Hyperlink generation** to the uploaded folder.\
- **Email notifications** with stored recipient selection.\
- **Efficient workflow** with persistent local storage of email contacts.\
\
## Installation\
1. Open **Google Sheets**.\
2. Navigate to **Extensions > Apps Script**.\
3. Copy & paste the script into the script editor.\
4. Replace the `PARENT_FOLDER_ID` in the script with your desired Drive folder ID.\
5. Save and run the script to grant necessary permissions.\
6. Set the trigger to be on edit so as soon someone types \'93upload\'94 and click enter the script runs.\
\
## Usage\
1. Type **"upload"** in any cell.\
2. A **popup dialog** appears for file selection.\
3. Enter the **subfolder name** or select an existing one.\
4. Optionally, check "Send Email" and:\
   - Select recipients\
   - or add new recipients\
   - Enter subject & message\
   - Click **Submit** to send an email\
5. Once uploaded, the cell turns into a **clickable link** to the subfolder.\
\
## Customization\
You are **free to modify, expand, and improve** this script as needed. Contributions and enhancements are welcome.\
\
## License\
This project is released under the **MIT License**:\
}
