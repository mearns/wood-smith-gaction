const WOOD_SCREW_DATA = require("@woodsmith/firebase-functions/src/data/wood-screw-data");

module.exports = {
    synonym: {
        entities: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14]
            .map(number => [number, WOOD_SCREW_DATA[number]])
            .filter(([, woodScrew]) => Boolean(woodScrew))
            .reduce((all, [number, woodScrew]) => {
                const [num, denom] = woodScrew.headSize;
                all[number] = {
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
                return all;
            }, {})
    }
};
