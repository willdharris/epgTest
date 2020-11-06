import Schedule from "schedules";
import * as channels from "./channels.js";
export const getTok = async function () {
  try {
  const stuff = {
    username: "unclebillepg",
    password: "526D1A95E3B6B19651774D1F90A68C32D758858F",
  };

  const getIT = {
    method: "POST",
    body: JSON.stringify(stuff),
  };
  const newTok = await fetch(
    "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/token",
    getIT
  );
  const jsonTok = await newTok.json();
  const taken = await jsonTok.token;
  // const strToken = JSON.stringify(token);
  console.log(taken);
  return taken;
} catch {
  console.log(`We're having trouble connecting to the schedules server. Please try again later.`);
}
}
getTok();

// channels.chanArr.forEach(function (e) {
//      e.getSchedule();
// });



