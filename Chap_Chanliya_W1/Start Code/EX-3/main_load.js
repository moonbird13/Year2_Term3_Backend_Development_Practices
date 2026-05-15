import { RaceResultsService } from "./service/RaceResultsService.js";

const raceResultService = new RaceResultsService();

const successfulLoad = raceResultService.loadFromFile("./data/raceScores.json");
if (!successfulLoad) {
  console.error("Failed to load race results from ./data/raceScores.json");
  process.exit(1);
}

const participantId = "participant1";
const totalTime = raceResultService.getTotalTimeForParticipant(participantId);

if (totalTime) {
  console.log(`Total time for ${participantId}: ${totalTime.toString()}`);
} else {
  console.log(`No results found for participant ${participantId}.`);
}
