import { ElevenLabsClient } from "elevenlabs";
import fs from "fs";

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({ apiKey: "YOUR_API_KEY" });

async function play(audio: Buffer) {
    // This function should handle the audio playback
    // For simplicity, we'll assume it's already implemented
    console.log("Playing audio...");
}

async function main() {
    // Task 1: Create a pronunciation dictionary and play "Tomato" with voice "Rachel"
    console.log("Task 1: Creating pronunciation dictionary and playing 'Tomato'");

    const fileStream = fs.createReadStream("path/to/your-dictionary.pls");
    const pronunciationDictionary = await elevenlabs.pronunciationDictionary.createFromFile(fileStream, {
        name: "MyDictionary"
    });

    console.log("Pronunciation Dictionary ID:", pronunciationDictionary.id);

    const audio = await elevenlabs.textToSpeech.convert("Rachel", {
        text: "Tomato",
        model_id: "eleven_multilingual_v2",
        pronunciation_dictionary_locators: [{ pronunciation_dictionary_id: pronunciationDictionary.id, version_id: pronunciationDictionary.version_id }]
    });

    await play(audio);

    // Task 2: Remove the rule from the pronunciation dictionary and play "Tomato" again
    console.log("Task 2: Removing a rule from the pronunciation dictionary and playing 'Tomato'");

    // Assuming `ruleId` is known or obtained from the dictionary details
    await elevenlabs.pronunciationDictionary.removeRulesFromThePronunciationDictionary(pronunciationDictionary.id, {
        rule_strings: ["ruleId"]
    });

    console.log("Rule removed from the pronunciation dictionary.");

    const audioAfterRemoval = await elevenlabs.textToSpeech.convert("Rachel", {
        text: "Tomato",
        model_id: "eleven_multilingual_v2",
        pronunciation_dictionary_locators: [{ pronunciation_dictionary_id: pronunciationDictionary.id, version_id: pronunciationDictionary.version_id }]
    });

    await play(audioAfterRemoval);

    // Task 3: Add new rules to the pronunciation dictionary and play "Tomato" again
    console.log("Task 3: Adding new rules to the pronunciation dictionary and playing 'Tomato'");

    await elevenlabs.pronunciationDictionary.addRulesToThePronunciationDictionary(pronunciationDictionary.id, {
        rules: [
            { string_to_replace: "Tomato", type: "alias", alias: "To-may-toe" }
        ]
    });

    console.log("Rules added to the pronunciation dictionary.");

    const audioWithNewRules = await elevenlabs.textToSpeech.convert("Rachel", {
        text: "Tomato",
        model_id: "eleven_multilingual_v2",
        pronunciation_dictionary_locators: [{ pronunciation_dictionary_id: pronunciationDictionary.id, version_id: pronunciationDictionary.version_id }]
    });

    await play(audioWithNewRules);
}

main().catch(console.error);
