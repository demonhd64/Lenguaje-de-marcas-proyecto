const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

async function deleteAllUsers(nextPageToken) {
  try {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    const uids = listUsersResult.users.map((userRecord) => userRecord.uid);

    if (uids.length > 0) {
      await admin.auth().deleteUsers(uids);
      console.log(`Deleted ${uids.length} user(s)`);
    }

    if (listUsersResult.pageToken) {
      await deleteAllUsers(listUsersResult.pageToken);
    } else {
      console.log("All users deleted");
    }
  } catch (error) {
    console.error("Error deleting users:", error);
  }
}

deleteAllUsers();
