import fs from "fs";
import { Duration } from "../model/Duration.js";
import { RaceResult } from "../model/RaceResult.js";

/**
 * This class handles the race results management system.
 */
export class RaceResultsService {
  _raceResults = [];

  get raceResults() {
    return this._raceResults;
  }

  addRaceResult(result) {
    return this._raceResults.push(result);
  }

  saveToFile(filePath) {
    const data = JSON.stringify(
      this._raceResults.map((result) => result.returnRaceResult()),
      null,
      2
    );
    fs.writeFileSync(filePath, data, "utf8");
    return true;
  }

  loadFromFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      this._raceResults = JSON.parse(data).map((obj) => new RaceResult(obj));
      return true;
    } catch (error) {
      console.error("Error loading from file:", error);
      return false;
    }
  }

  getTimeForParticipant(participantId, sport) {
    return this._raceResults.find(
      (r) => r.participantId === participantId && r.sport === sport
    )?.duration || null;
  }

  getTotalTimeForParticipant(participantId) {
    const results = this._raceResults.filter(
      (r) => r.participantId === participantId
    );
    if (results.length === 0) return null;
    return results.reduce(
      (sum, result) => sum.plus(result.duration),
      new Duration(0)
    );
  }

  getTimeByParticipant(participantId) {
    return this.getTotalTimeForParticipant(participantId);
  }

  getParticipantTime(participantId) {
    return this.getTotalTimeForParticipant(participantId);
  }

  getResultById(participantId) {
    return this._raceResults.find((r) => r.participantId === participantId) || null;
  }

  findByParticipantId(participantId) {
    return this._raceResults.filter((r) => r.participantId === participantId);
  }

  findResultByParticipantId(participantId) {
    return this.findByParticipantId(participantId);
  }
}
