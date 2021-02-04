const {
    ActionsOnGoogleTestManager
} = require("@assistant/conversation-testing");
const { resolve } = require("path");
const fs = require("fs");
const YAML = require("js-yaml");

const DEFAULT_LOCALE = "en-US";
const DEFAULT_SURFACE = "PHONE";
const CONTINUE_CONVO_PROMPT =
    "I can show you basic cards, lists, and more on your phone and smart display. What would you like to see?";

let PROJECT_ID;
let TRIGGER_PHRASE;

describe("The wood-screw scene", () => {
    jest.setTimeout(60000);

    let testManager;

    async function startConversation() {
        await testManager.sendQuery(TRIGGER_PHRASE);
        testManager.assertSpeech(CONTINUE_CONVO_PROMPT);
        testManager.assertText(CONTINUE_CONVO_PROMPT);
        testManager.assertIntent("actions.intent.MAIN");
        testManager.assertScene("Prompts");
    }

    async function loadProjectSettings() {
        const fileContents = await fs.promises.readFile(
            resolve(__dirname, "../../sdk/settings/settings.yaml"),
            "utf8"
        );
        const data = YAML.safeLoad(fileContents);
        PROJECT_ID = data.projectId;
        TRIGGER_PHRASE = `Talk to ${data.localizedSettings.displayName}`;
    }

    beforeAll(async () => {
        await loadProjectSettings();
        testManager = new ActionsOnGoogleTestManager({ projectId: PROJECT_ID });
        await testManager.writePreviewFromDraft();
        testManager.setSuiteLocale("en-US");
        testManager.setSuiteSurface("PHONE");
    });

    afterEach(async () => {
        await testManager.cleanUpAfterTest();
    });

    it("trigger only", async function() {
        testManager.setTestSurface("SMART_DISPLAY");
        await startConversation();
        await testManager.sendStop();
        testManager.assertConversationEnded();
    });
});
