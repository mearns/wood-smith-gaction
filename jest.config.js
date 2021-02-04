module.exports = {
    roots: ["test/", "src/"],
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js"],
    coverageDirectory: "reports/coverage/",
    coverageReporters: ["json", "lcov", "text", "clover", "cobertura"],
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "reports",
                outputName: "xunit.xml"
            }
        ],
        [
            "jest-stare",
            {
                resultDir: "reports/unit-tests/",
                resultHtml: "index.html",
                resultJson: "data.json",
                report: true,
                reportSummary: true,
                coverageLink: "../coverage/lcov-report/index.html"
            }
        ]
    ]
};
