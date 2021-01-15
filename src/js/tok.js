import { user, password } from "./creds.js";

export async function getTok() {
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
  } catch {}
}
// export function getTok();

export async function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
// export function waitForElm();
