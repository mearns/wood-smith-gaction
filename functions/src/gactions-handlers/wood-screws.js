const SCREW_DATA = require("../data/wood-screw-data");
const functions = require("firebase-functions");
const fractions = require("../lib/fractions");
const { simple } = require("../lib/prompts");

module.exports.woodScrewHoleFunc = conv => {
    functions.logger.log("Scene Slots", conv.scene.slots);
    functions.logger.log("Intent Parameters", conv.intent.params);
    functions.logger.log("Session Params", conv.session.params);
    const screwSize = conv.scene.slots.size.value;
    const holeType = conv.scene.slots.holeType.value;
    const woodType = conv.scene.slots.woodType.value;

    const selectedScrew = SCREW_DATA[screwSize];
    if (!selectedScrew) {
        conv.add(
            `Sorry, I don't actually have any information about number ${screwSize} wood screws.`
        );
        throw Object.assign(
            new Error(`Missing screw size: ${screwSize}`),
            conv.scene.slots.size
        );
    }

    switch (holeType) {
        case "countersink":
            conv.add(
                simple`For a number ${screwSize} screw, use a ${fractions.fractionPrompt(
                    ...selectedScrew.headsSize,
                    "inch",
                    "inches"
                )} countersink.`
            );
            break;

        case "head-bore":
            conv.add(
                simple`For a number ${screwSize} screw, bore a ${fractions.fractionPrompt(
                    ...selectedScrew.headsSize,
                    "inch",
                    "inches"
                )} hole for the head.`
            );
            break;

        case "shank-hole":
            conv.add(
                simple`For a number ${screwSize} screw, drill a ${fractions.fractionPrompt(
                    ...selectedScrew.shankHole,
                    "inch",
                    "inches"
                )} shank-hole.`
            );
            break;

        case "pilot-hole":
            switch (woodType) {
                case "hardwood":
                    conv.add(
                        simple`For a number ${screwSize} screw in hardwood, drill a ${fractions.fractionPrompt(
                            ...selectedScrew.pilotHole.hardwood,
                            "inch",
                            "inches"
                        )} pilot-hole.`
                    );
                    break;

                case "softwood":
                    conv.add(
                        simple`For a number ${screwSize} screw in softwood, drill a ${fractions.fractionPrompt(
                            ...selectedScrew.pilotHole.softwood,
                            "inch",
                            "inches"
                        )} pilot-hole.`
                    );
                    break;

                case undefined:
                    conv.add(
                        simple`For a number ${screwSize} screw, drill a ${fractions.fractionPrompt(
                            ...selectedScrew.pilotHole.hardwood,
                            "inch",
                            "inches"
                        )} pilot-hole in hardwood, and a ${fractions.fractionPrompt(
                            ...selectedScrew.pilotHole.softwood,
                            "inch",
                            "inches"
                        )} pilot-hole in softwood.`
                    );
                    break;

                default:
                    conv.add(`Sorry, I don't actually know about ${woodType}`);
                    throw new Error(`Unhandled woodType: ${woodType}`);
            }
            break;

        default:
            conv.add(`Sorry, I don't actually know about ${holeType}`);
            throw new Error(`Unhandled hole-type: ${holeType}`);
    }
};
