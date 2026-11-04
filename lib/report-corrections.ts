import corrections from './report-corrections.json';

// Corrections target a single report; preserve the original stored submission.
export function correctReport<T extends {id:string;station:string;design:string;machine:string;notes?:string}>(report:T):T {
 const correction=(corrections as Record<string,{station:string;design:string;originalMachine:string;machine:string}>)[report.id];
 if(correction&&report.station===correction.station&&report.design===correction.design&&report.machine===correction.originalMachine)
  return {...report,machine:correction.machine};
 // Recover only an unambiguous, standalone full FVM number. Prose can mention
 // other machines, uncertain guesses or negative observations; leave it alone.
 const number=report.notes?.trim().match(/^(?:(?:fare\s+)?(?:vending\s+)?machine(?:\s*(?:number|no\.?))?|fvm|tvm)?\s*[:#]?\s*(22\d{4})[.!]?$/i)?.[1];
 return /^(?:unknown|not\s+(?:sure|specified)|n\/?a)?$/i.test(report.machine.trim())&&number
  ? {...report,machine:number}:report;
}
