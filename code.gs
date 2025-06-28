/**
 * Serves index.html as the web app UI.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Gmail→SMS Relay");
}

/**
 * Persist phone & carrier in user properties.
 */
function storeUserDetails(phone, carrier) {
  PropertiesService.getUserProperties().setProperties({
    phone: phone,
    carrier: carrier
  });
}

/**
 * Retrieve stored user settings.
 * @returns {Object} {phone, carrier}
 */
function getStoredUser() {
  const props = PropertiesService.getUserProperties();
  return {
    phone: props.getProperty("phone") || "",
    carrier: props.getProperty("carrier") || ""
  };
}

/**
 * Clears all user settings (opt-out).
 */
function clearUserData() {
  PropertiesService.getUserProperties().deleteAllProperties();
  return "User data cleared";
}

/**
 * Searches Gmail for unread Google Voice SMS notifications,
 * extracts the text, and forwards via email-to-SMS.
 * @returns {string} status message
 */
function checkNewGVText() {
  const props = PropertiesService.getUserProperties();
  const phone = props.getProperty("phone");
  const carrier = props.getProperty("carrier");
  if (!phone || !carrier) {
    return "⚠️ Enter phone & carrier first";
  }

  const smsAddress = `${phone}@${carrier}`;
  // Customize the label you apply to Google Voice notifications
  const label = GmailApp.getUserLabelByName("GV-SMS");
  if (!label) {
    return "⚠️ Please create Gmail label 'GV-SMS' and apply to incoming GV emails";
  }

  const threads = label.getThreads().filter(t => t.isUnread());
  let forwarded = 0;

  threads.forEach(thread => {
    thread.getMessages().forEach(msg => {
      if (!msg.isUnread()) return;

      const body = msg.getPlainBody();
      const codeMatch = body.match(/New text message from.*?(\d{3}-\d{3}|\d{5,6})/i);
      if (!codeMatch) return;

      // Grab text immediately after "Google Voice"
      const afterGV = body.split("Google Voice")[1] || "";
      const textLine = afterGV.trim().split(/\r?\n/)[0] || "";

      const finalMsg = `Forwarded by C09 by DG8AB:\n${textLine}`;
      GmailApp.sendEmail(smsAddress, "", finalMsg);
      msg.markRead();
      forwarded++;
    });
    thread.markRead();
  });

  return forwarded
    ? `✅ Forwarded ${forwarded} message(s)`
    : "ℹ️ No new GV texts found";
}
