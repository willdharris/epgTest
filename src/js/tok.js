// import { user, password } from "./creds.js";

// async function getTok() {
//   try {
//     const stuff = {
//       username: user,
//       password: password,
//     };

//     const getIT = {
//       method: "POST",
//       body: JSON.stringify(stuff),
//     };
//     const newTok = await fetch(
//       "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/token",
//       getIT
//     );
//     const jsonTok = await newTok.json();
//     const taken = await jsonTok.token;
//     return taken;
//   } catch {}
// }
// export default getTok();
export const token = "c92be3d95ee4e87a29349ea6e77d5515";
