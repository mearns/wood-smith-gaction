const { Simple } = require("@assistant/conversation");

function simple(strings, ...values) {
    const generate = mode =>
        values
            .map((value, idx) => {
                if (typeof value === "object") {
                    return `${strings[idx]}${value[mode]}`;
                }
                return `${strings[idx]}${value}`;
            })
            .join("") + strings[values.length];
    return new Simple(
        ["speech", "text"].reduce((obj, mode) => {
            obj[mode] = generate(mode);
            return obj;
        }, {})
    );
}

module.exports = {
    simple
};
