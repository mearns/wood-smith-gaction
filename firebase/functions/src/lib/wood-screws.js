const WOOD_SCREW_DATA = require("../data/wood-screw-data");

function defineWoodScrewSizeEntityType() {
    return {
        synonym: {
            entries: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14]
                .map(number => [number, WOOD_SCREW_DATA[number]])
                .filter(([, woodScrew]) => Boolean(woodScrew))
                .map(([number, woodScrew]) => {
                    const [, num, denom] = woodScrew.headSize;
                    return {
                        name: `number ${number}`,
                        synonyms: [
                            String(number),
                            `number ${number}`,
                            `number-${number}`,
                            `num ${number}`,
                            `num-${number}`,
                            `num. ${number}`,
                            `no ${number}`,
                            `no-${number}`,
                            `no. ${number}`,
                            `#${number}`,
                            `gauge ${number}`,
                            `${num}/${denom}`,
                            `${num}/${denom}"`,
                            `${num}/${denom} inch`
                        ]
                    };
                })
        }
    };
}

module.exports = {
    defineWoodScrewSizeEntityType
};
