const functions = require("firebase-functions");
const { defineWoodScrewSizeEntityType } = require("../lib/wood-screws");

module.exports.woodScrewFunc = conv => {
    functions.logger.log(
        "woodScrewFunc triggered on webhook",
        conv.scene.slots
    );
    conv.add("woodScrewFunc triggered on webhook");
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
};
