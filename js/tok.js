// import Schedule from "./schedules.js";
import { user, password } from "./creds.js";

export function getTok () {
  try {
  const stuff = {
    username: user,
    password: password,
  };

  const getIT = {
    method: "POST",
    body: JSON.stringify(stuff),
  };
  const newTok = fetch(
    "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/token",
    getIT
  );
  const jsonTok = newTok.json();
  const taken =  jsonTok.token;
  // const strToken = JSON.stringify(token);
  console.log(taken);
  // return taken;
} catch {
  console.log(`We're having trouble connecting to the schedules server. Please try again later.`);
}
}

// test


// channels.chanArr.forEach(function (e) {
//      e.getSchedule();
// });



