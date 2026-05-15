import { Duration } from "./Duration.js";
/**
 * This class handle a single race time for a given particicpant and sport type
 */
export class RaceResult {
  participantId;
  sport;
  duration;

  /**
   * Creates a new RaceResult from either constructor arguments or a raw object.
   * @param {object|string} [participantId]
   * @param {string} [sport]
   * @param {Duration|object|number} [duration]
   */


       //participant id, sport type, duration
     constructor(participantId, sport, duration) {
       if (typeof participantId === "object" && participantId !== null) {
         const obj = participantId;
         this.participantId = obj.participant_id ?? obj.participantId ?? "";
         this.sport = obj.sport ?? obj.sportType ?? "";

         if (obj.duration instanceof Duration) {
           this.duration = obj.duration;
         } else if (obj.time?._totalSeconds != null) {
           this.duration = new Duration(obj.time._totalSeconds);
         } else if (obj.duration?._totalSeconds != null) {
           this.duration = new Duration(obj.duration._totalSeconds);
         } else if (typeof obj.duration === "number") {
           this.duration = new Duration(obj.duration);
         } else {
           this.duration = new Duration(0);
         }

         return;
       }

       this.participantId = participantId;
       this.sport = sport;
       this.duration = duration instanceof Duration ? duration : new Duration(duration);
     }

      /**
   * A
   * @result {returnRaceResult}- The race result.
   */

     returnRaceResult = () => {
          return {
               participantId: this.participantId,
               sportType: this.sportType,
               duration: this.duration.toString()
          }
     }
     
}