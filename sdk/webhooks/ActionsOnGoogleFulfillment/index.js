const { conversation } = require("@assistant/conversation");
const functions = require("firebase-functions");
const { defineWoodScrewSizeEntityType } = require("./lib/wood-screws");

const app = conversation();

app.handle("woodScrewFunc", (conv) => {
  conv.add("woodScrewFunc triggered on webhook");
});

app.handle("woodScrewSizeTypeOverrides", (conv) => {
  conv.session.typeOverrides = [
    {
      node: "wood_screw_size",
      mode: "TYPE_REPLACE",
      ...defineWoodScrewSizeEntityType()
    },
  ];
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
