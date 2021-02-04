const { fractionPrompt } = require("../../../src/lib/fractions");

describe("The fractions module", () => {
    describe("the fractionPrompt function", () => {
        it("should return the expected prompt", () => {
            const result = fractionPrompt(3, 16, "duck", "ducks");

            expect(result.text).toBe("3/16 duck");
            expect(result.speech).toBe("3 sixteenths duck");
        });
    });
});
