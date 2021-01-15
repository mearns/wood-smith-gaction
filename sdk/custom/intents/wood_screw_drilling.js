const seedrandom = require("seedrandom");
const rng = seedrandom("wood-screws");

function param(name, ...values) {
    return () => {
        const selectedValue = values[Math.floor(values.length * rng())];
        return `($${name} '${selectedValue}' auto=false)`;
    };
}

const paramWoodType = param(
    "woodType",
    "hardwood",
    "softwood",
    "hard wood",
    "soft wood"
);
const paramSize = param(
    "size",
    "number 2",
    "number 3",
    "num 3",
    "no 4",
    "#4",
    "5",
    "6",
    "no 5"
);
const paramHoleType = param(
    "holeType",
    "pilot",
    "pilot hole",
    "shank-hole",
    "shank",
    "countersink",
    "counter sink",
    "head-bore",
    "head"
);

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
    const resolvedFirst = typeof first === "function" ? first() : first;
    const firstOptions = Array.isArray(resolvedFirst)
        ? resolvedFirst
        : [resolvedFirst];
    const suffixes = others.length === 0 ? [""] : crossProduct(...others);
    return firstOptions
        .map(f => suffixes.map(s => `${f}${s}`))
        .reduce((all, ari) => {
            return [...all, ...ari];
        }, []);
}
