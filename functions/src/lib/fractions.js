const SPOKEN_DENOMINATORS = {
    2: ["half", "halves"],
    4: ["quarter", "quarters"],
    8: ["eighth", "eighths"],
    16: ["sixteenth", "sixteenths"],
    32: ["thiry-seconds", "thirty-seconds"],
    64: ["sixty-fourths", "sixty-fourths"]
};

function fractionPrompt(numerator, denom, unit, pluralUnit) {
    const plural = numerator !== 1;
    const unitText = plural ? pluralUnit : unit;
    if (denom === 1 || !denom) {
        return {
            speech: `${plural ? numerator : "one"} ${unitText}`,
            text: `${numerator} ${unitText}`
        };
    }

    const selectedDenom = SPOKEN_DENOMINATORS[denom];
    if (!selectedDenom) {
        throw new Error(`Unknown denominator: ${denom}`);
    }
    return {
        speech: plural
            ? `${numerator} ${selectedDenom[1]} ${unit}`
            : `one ${selectedDenom[0]} ${unit}`,
        text: `${numerator}/${denom} ${unit}`
    };
}

module.exports = {
    fractionPrompt
};
