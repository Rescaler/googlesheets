function onUpload(e) {
    var sheet = e.source.getActiveSheet();
    var cell = e.range;
    var cellValue = cell.getValue().toLowerCase();
    
    if (cellValue === "upload") {

      var row = cell.getRow();
      var column = cell.getColumn();
      PropertiesService.getScriptProperties().setProperty('editedRow', row);
      PropertiesService.getScriptProperties().setProperty('editedColumn', column);
  
      showUploadDialog(); 
    }
  }
  
  function showUploadDialog() {
    Logger.log("Attempting to show the dialog...");
  
    try {
      var htmlOutput = HtmlService.createHtmlOutputFromFile('uploadForm')
        .setWidth(600)
        .setHeight(400);
      
      Logger.log("Dialog HTML created successfully. Showing the dialog now.");
      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Upload files to G-drive & send an email');
    } catch (error) {
      Logger.log("Error showing HTML dialog: " + error.toString());
      SpreadsheetApp.getUi().alert("Error showing the upload dialog: " + error.toString());
    }
  }
  
  function uploadFiles(folderName, subFolderName, files, sendEmail, emailRecipients, emailSubject, emailBody) {
    try {
      var mainFolder = DriveApp.getFolderById('PARENT_FOLDER_ID'); // Replace with your Drive folder ID
      var existingFolders = mainFolder.getFoldersByName(folderName);
      var newFolder;
  
      if (existingFolders.hasNext()) {
        var existingFolder = existingFolders.next();
        newFolder = existingFolder.createFolder(subFolderName);
      } else {
        var topLevelFolder = mainFolder.createFolder(folderName);
        newFolder = topLevelFolder.createFolder(subFolderName);
      }
  
      // Inherit sharing permissions from the parent folder
      copyFolderPermissions(mainFolder, newFolder);
  
      // Handle file uploads and collect attachments for the email
      var attachments = [];
      for (var i = 0; i < files.length; i++) {
        var fileData = files[i];
        var blob = Utilities.newBlob(Utilities.base64Decode(fileData.base64), fileData.mimeType, fileData.fileName);
        newFolder.createFile(blob);
        attachments.push(blob);
      }
  
      // Get the URL of the newly created folder
      var folderUrl = newFolder.getUrl();
  
      // Retrieve the edited cell's row and column from the script properties
      var row = parseInt(PropertiesService.getScriptProperties().getProperty('editedRow'));
      var column = parseInt(PropertiesService.getScriptProperties().getProperty('editedColumn'));
  
      // Get the active sheet and set the hyperlink in the exact edited cell
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var cell = sheet.getRange(row, column); // Get the previously edited cell
      cell.setFormula('=HYPERLINK("' + folderUrl + '", "' + subFolderName + '")');
  
      // If sendEmail is true, send the email with attachments
      if (sendEmail) {
        MailApp.sendEmail({
          to: emailRecipients.join(','), // Multiple recipients
          subject: emailSubject,
          body: emailBody + "\n\nHere is the link to the folder: " + folderUrl,
          attachments: attachments
        });
  
        Logger.log("Email sent successfully");
      }
  
      return "Files uploaded, folder created, and email sent successfully!";
    } catch (error) {
      Logger.log("Error uploading files or sending email: " + error.toString());
      return "Error uploading files or sending email: " + error.toString();
    }
  }
  
  
  
  // Function to copy sharing permissions from the parent folder to the new folder
  function copyFolderPermissions(parentFolder, newFolder) {
    var parentEditors = parentFolder.getEditors();
    var parentViewers = parentFolder.getViewers();
  
    // Copy each editor from the parent folder to the new folder
    parentEditors.forEach(function(editor) {
      newFolder.addEditor(editor.getEmail());
    });
  
    // Copy each viewer from the parent folder to the new folder
    parentViewers.forEach(function(viewer) {
      newFolder.addViewer(viewer.getEmail());
    });
  }
  
  