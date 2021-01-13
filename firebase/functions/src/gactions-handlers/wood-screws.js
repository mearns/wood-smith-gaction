const functions = require("firebase-functions");
const { defineWoodScrewSizeEntityType } = require("../lib/wood-screws");

module.exports.woodScrewHoleFunc = conv => {
    functions.logger.log(
        "woodScrewFunc triggered on webhook",
        conv.intent.params
    );
    conv.add("I'll have to get back to you.");
};

module.exports.woodScrewSizeTypeOverrides = conv => {
    functions.logger.log("Overriding wood screw size type");
    conv.session.typeOverrides = [
        {
            name: "wood_screw_size",
            mode: "TYPE_REPLACE",
            ...defineWoodScrewSizeEntityType()
        }
    ];
    functions.logger.log(
        "New Wood Screw Size Type:",
        conv.session.typeOverrides
    );
};
