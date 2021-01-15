const paramWoodType = "($woodType 'hardwood' auto=false)";
const paramSize = "($size 'number 2' auto=false)";
const paramHoleType = "($holeType 'pilot hole' auto=false)";

const situationDescriptions = [
    ...multi`a ${paramHoleType} in ${paramWoodType} for a ${paramSize}`,
    ...multi`a ${paramHoleType} for a ${paramSize} in ${paramWoodType}`,
    ...multi`a hole in ${paramWoodType} for a ${paramSize} ${opt(
        " wood screw"
    )}`,
    ...multi`a hole for a ${paramSize}${opt(
        " wood screw"
    )} in ${paramWoodType}`,
    ...multi`a ${paramHoleType} in ${paramWoodType}`,
    ...multi`a ${paramHoleType} for a ${paramSize}${opt(" wood screw")}`,
    ...multi`a ${paramHoleType}`,
    ...multi`a hole in ${paramWoodType}`,
    ...multi`a hole for a ${paramSize}${opt(" wood screw")}`,
    "a hole for a wood screw",
    "a wood screw"
];

const trainers = [
    ...multi`I want to drill ${situationDescriptions}`,
    ...multi`Help me drill ${situationDescriptions}`,
    ...multi`I need ${situationDescriptions}`,
    ...multi`What bit should I use for ${situationDescriptions}?`,
    ...multi`What size do I need for ${situationDescriptions}?`
];

module.exports = {
    parameters: [
        {
            name: "woodType",
            type: {
                name: "wood_type"
            }
        },
        {
            name: "holeType",
            type: {
                name: "wood_screw_hole_type"
            }
        },
        {
            name: "size",
            type: {
                name: "wood_screw_size"
            }
        },
        {
            name: "number1",
            type: {
                name: "actions.type.Number"
            }
        }
    ],
    trainingPhrases: trainers
};

function multi(strings, ...keys) {
    const zipped = [strings[0]];
    for (let i = 0; i < keys.length; i++) {
        zipped.push(keys[i], strings[i + 1]);
    }
    return crossProduct(...zipped);
}

function opt(x) {
    if (Array.isArray(x)) {
        return ["", ...x];
    }
    return ["", x];
}

function crossProduct(first, ...others) {
    const firstOptions = Array.isArray(first) ? first : [first];
    if (others.length === 0) {
        return firstOptions;
    }
    const suffixes = crossProduct(...others);
    return firstOptions
        .map(f => suffixes.map(s => `${f}${s}`))
        .reduce((all, ari) => {
            return [...all, ...ari];
        }, []);
}
