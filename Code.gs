/**
 * Pharmacy Web Ordering System - Google Apps Script Backend (Code.gs)
 * Handles Google Sheets CRUD database operations, Google Drive image/Rx uploading,
 * and AUTOMATED EMAIL NOTIFICATIONS to Admin upon every customer order.
 */

function doGet(e) {
  return ContentService.createTextOutput("Pharmacy Web-Ordering Backend API is running successfully!\nDeploy as Web App and set access to 'Anyone'.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const result = { success: false, error: "" };

  try {
    let requestData;
    if (e && e.postData && e.postData.contents) {
      requestData = JSON.parse(e.postData.contents);
    } else {
      throw new Error("No data found in request body.");
    }

    const action = requestData.action;
    const data = requestData.data;

    // Try auto-initializing sheets if bound to a spreadsheet
    try { initDatabase(); } catch(e) { Logger.log("Init DB warning: " + e.toString()); }

    switch (action) {
      case "init":
        result.data = {
          medicines: getSheetData("Medicines"),
          categories: getSheetData("Categories"),
          orders: getSheetData("Orders"),
          users: getSheetData("Users"),
          branches: getSheetData("Branches"),
          banners: getSheetData("Banners"),
          settings: getSettingsMap()
        };
        result.success = true;
        break;

      case "getMedicines":
        result.data = getSheetData("Medicines");
        result.success = true;
        break;

      case "getCategories":
        result.data = getSheetData("Categories");
        result.success = true;
        break;

      case "getOrders":
        result.data = getSheetData("Orders");
        result.success = true;
        break;

      case "saveMedicine":
        result.data = saveRowData("Medicines", data);
        result.success = true;
        break;

      case "deleteMedicine":
        deleteRowData("Medicines", data.id);
        result.success = true;
        break;

      case "saveCategory":
        result.data = saveRowData("Categories", data);
        result.success = true;
        break;

      case "deleteCategory":
        deleteRowData("Categories", data.id);
        result.success = true;
        break;

      case "saveOrder":
        // 1. Try saving order to Sheets (if bound to spreadsheet)
        try {
          result.data = saveRowData("Orders", data);
        } catch(errSave) {
          Logger.log("Sheets Save Warning: " + errSave.toString());
        }
        result.success = true;

        // 2. Trigger AUTOMATED EMAIL ALERT to Admin (ALWAYS EXECUTES!)
        const targetAdminEmail = requestData.adminEmail || "vinaylakkakula1701@gmail.com";
        const storeName = requestData.storeName || "Dhanush Medicals";
        sendAdminOrderEmailNotification(data, targetAdminEmail, storeName);
        break;

      case "updateOrderStatus":
        result.data = updateOrderStatusData(data.id, data.status);
        result.success = true;
        break;

      case "uploadImage":
      case "uploadRx":
        const fileUrl = uploadFileToDrive(data.base64Data, data.fileName, data.folderName || "Pharmacy Direct Uploads");
        result.data = { url: fileUrl };
        result.success = true;
        break;

      default:
        result.success = true;
        result.message = "Action received";
        const fallbackEmail = requestData.adminEmail || "vinaylakkakula1701@gmail.com";
        sendAdminOrderEmailNotification(data || { id: "TEST-ALERT", customerName: "Customer Alert", total: 0 }, fallbackEmail, "Dhanush Medicals");
        break;
    }

  } catch (err) {
    result.success = false;
    result.error = err.toString();
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sends a rich HTML Email Notification to the Admin on every new order!
 */
function sendAdminOrderEmailNotification(order, recipientEmail, storeName) {
  try {
    if (!recipientEmail) {
      recipientEmail = Session.getActiveUser().getEmail();
    }
    if (!storeName) {
      storeName = "Dhanush Medicals";
    }

    const subject = "🚨 NEW PHARMACY ORDER #" + order.id + " - " + (order.customerName || "Customer") + " (₹" + (order.total || 0) + ")";

    let itemsTable = "<table border='1' cellpadding='8' cellspacing='0' style='border-collapse:collapse; width:100%; font-family:sans-serif;'>";
    itemsTable += "<tr style='background:#004d40; color:#fff;'><th>Medicine Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>";

    if (order.items && order.items.length > 0) {
      order.items.forEach(function(item) {
        itemsTable += "<tr>" +
          "<td>" + item.title + "</td>" +
          "<td align='center'>" + item.qty + "</td>" +
          "<td align='right'>₹" + item.price + "</td>" +
          "<td align='right'>₹" + (item.price * item.qty).toFixed(2) + "</td>" +
          "</tr>";
      });
    } else {
      itemsTable += "<tr><td colspan='4' align='center'>Prescription Review Order</td></tr>";
    }

    itemsTable += "<tr style='background:#f4f7f6; font-weight:bold;'><td colspan='3' align='right'>Total Payable:</td><td align='right'>₹" + (order.total || 0) + "</td></tr>";
    itemsTable += "</table>";

    let rxSection = "";
    if (order.rxUrl) {
      rxSection = "<div style='margin-top:16px; padding:12px; background:#e0f2f1; border-radius:6px; border:1px solid #00897b;'><strong>📁 Attached Prescription File:</strong> <a href='" + order.rxUrl + "' target='_blank'>Click to View/Download Prescription (" + (order.rxFileName || 'Rx File') + ")</a></div>";
    }

    const htmlBody = `
      <div style="font-family:Arial, sans-serif; max-width:600px; border:1px solid #004d40; border-radius:8px; padding:20px; color:#1f2937;">
        <div style="background:#004d40; color:#ffffff; padding:16px; border-radius:6px; text-align:center;">
          <h2 style="margin:0;">${storeName} - New Order Alert</h2>
          <p style="margin:4px 0 0 0; color:#a7f3d0; font-size:14px;">Order ID: #${order.id}</p>
        </div>

        <h3 style="color:#004d40; margin-top:20px;">Customer Information</h3>
        <p>
          <strong>Name:</strong> ${order.customerName || 'N/A'}<br>
          <strong>Phone:</strong> ${order.phone || 'N/A'}<br>
          <strong>Address:</strong> ${order.address || 'Korutla'}<br>
          <strong>Payment Method:</strong> ${order.paymentMethod || 'Cash on Delivery'}<br>
          <strong>Prescription Required (Rx):</strong> ${order.rxRequired ? '<span style="color:red; font-weight:bold;">YES (Check Pharmacist Queue)</span>' : 'NO (OTC)'}
        </p>

        ${rxSection}

        <h3 style="color:#004d40; margin-top:20px;">Order Details</h3>
        ${itemsTable}

        <p style="margin-top:24px; font-size:12px; color:#6b7280; text-align:center;">
          Automated Email Notification sent to ${recipientEmail} by ${storeName} Google Apps Script Backend.
        </p>
      </div>
    `;

    try {
      MailApp.sendEmail({
        to: recipientEmail,
        subject: subject,
        htmlBody: htmlBody
      });
    } catch(eMailApp) {
      Logger.log("MailApp fallback to GmailApp: " + eMailApp.toString());
      GmailApp.sendEmail(recipientEmail, subject, "", { htmlBody: htmlBody });
    }

  } catch (e) {
    Logger.log("Email Notification Error: " + e.toString());
  }
}

/**
 * Database Auto-Initialization
 */
function initDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return;

  const tables = {
    "Medicines": ["id", "title", "brand", "salt", "category", "price", "mrp", "stock", "rxRequired", "imageUrl", "description"],
    "Categories": ["id", "name", "icon", "description"],
    "Orders": ["id", "date", "customerName", "phone", "address", "paymentMethod", "items", "total", "status", "rxRequired", "assignedRider"],
    "Users": ["username", "password", "role", "name"],
    "Branches": ["id", "name", "address", "phone"],
    "Banners": ["id", "title", "imageUrl"],
    "Settings": ["key", "value"]
  };

  for (let sheetName in tables) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(tables[sheetName]);
      sheet.getRange(1, 1, 1, tables[sheetName].length).setFontWeight("bold").setBackground("#e0f2f1");
    }
  }
}

function getSheetData(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const rows = [];

  for (let i = 1; i < data.length; i++) {
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      let val = data[i][j];
      if (headers[j] === "items" && typeof val === "string" && val.startsWith("[")) {
        try { val = JSON.parse(val); } catch(e) {}
      }
      row[headers[j]] = val;
    }
    rows.push(row);
  }
  return rows;
}

function saveRowData(sheetName, rowObj) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == rowObj.id || data[i][0] == rowObj.username) {
      rowIndex = i + 1;
      break;
    }
  }

  const rowValues = headers.map(h => {
    let val = rowObj[h] !== undefined ? rowObj[h] : "";
    if (typeof val === "object") val = JSON.stringify(val);
    return val;
  });

  if (rowIndex > -1) {
    sheet.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }

  return rowObj;
}

function deleteRowData(sheetName, id) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
}

function updateOrderStatusData(orderId, status) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Orders");
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == orderId) {
      sheet.getRange(i + 1, 9).setValue(status);
      return { id: orderId, status: status };
    }
  }
  return null;
}

function getSettingsMap() {
  const settingsRows = getSheetData("Settings");
  const map = {};
  settingsRows.forEach(r => map[r.key] = r.value);
  return map;
}

function getSettingValue(key) {
  const settings = getSettingsMap();
  return settings[key] || null;
}

function uploadFileToDrive(base64Data, fileName, folderName) {
  let folder;
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(folderName);
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  }

  const contentType = base64Data.substring(5, base64Data.indexOf(';'));
  const bytes = Utilities.base64Decode(base64Data.substr(base64Data.indexOf('base64,') + 7));
  const blob = Utilities.newBlob(bytes, contentType, fileName);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return "https://lh3.googleusercontent.com/d/" + file.getId();
}
