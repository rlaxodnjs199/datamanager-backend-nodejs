express = require("express");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credential.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  // Create client instance
  const client = await auth.getClient();
  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1lyb6QvforeB-VXYchgnoy5OOf0uncbuI0s3hIZV2hkg";
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });

  res.send(getRows.data.values);
});

app.listen(1337, (req, res) => console.log("running on 1337"));
