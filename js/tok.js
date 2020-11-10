import { user, password } from "./creds.js";

async function getTok() {
  try {
  const stuff = {
    username: user,
    password: password,
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
  return taken;
} catch {
  console.log(`We're having trouble connecting to the schedules server. Please try again later.`);
}
}
export default getTok();

