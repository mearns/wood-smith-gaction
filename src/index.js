const functions = require("firebase-functions");
const packageData = require("../package.json");
const gactionsApp = require("./gactions-handlers");

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(gactionsApp);

exports.AppInfo = functions.https.onRequest((req, res) => {
    res.json({
        name: packageData.name,
        version: packageData.version
    });
});
