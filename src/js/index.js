import getTok from "./tok.js";
if (module.hot) {
  module.hot.accept();
}
export default class Schedule {
  constructor(channel, stationID) {
    this.channel = channel;
    this.stationID = stationID;
  }

  /** GET SCHEDULE */
  async getSchedule() {
    try {
      /** DATES ***/
      //TODAY//
      const curDate = new Date().toISOString();
      let today = curDate.substring(0, 10);

      //YESTERDAY//
      const yesterDate = new Date(curDate);
      yesterDate.setDate(yesterDate.getDate() - 1);
      let yesterday = yesterDate.toISOString();
      yesterday = yesterday.substring(0, 10);

      //TOMORROW//
      const tomDate = new Date(curDate);
      tomDate.setDate(tomDate.getDate() + 1);
      let tomorrow = tomDate.toISOString();
      tomorrow = tomorrow.substring(0, 10);

      const plusTwoDate = new Date(curDate);
      plusTwoDate.setDate(plusTwoDate.getDate() + 2);
      let todayPlusTwo = plusTwoDate.toISOString();
      todayPlusTwo = todayPlusTwo.substring(0, 10);

      const plusThreeDate = new Date(curDate);
      plusThreeDate.setDate(plusThreeDate.getDate() + 3);
      let todayPlusThree = plusThreeDate.toISOString();
      todayPlusThree = todayPlusThree.substring(0, 10);

      //Station Data and Date to send to API
      const stationData = [
        {
          stationID: `${this.stationID}`,
          date: [today, tomorrow, todayPlusTwo, todayPlusThree],
        },
      ];

      //options to include with API fetch
      const scheduleOptions = {
        method: "POST",
        body: JSON.stringify(stationData),
        headers: {
          "Content-Type": "application/json",
          token: await currToken,
        },
        redirect: "follow",
      };

      //Schedule fetch
      const resSched = await fetch(
        "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/schedules",
        scheduleOptions
      );
      const stationSchedule = await resSched.json();
      const todayArr = await stationSchedule[0].programs;
      const tmwArr = await stationSchedule[1].programs;
      const plusTwoArr = await stationSchedule[2].programs;
      const plusThreeArr = await stationSchedule[3].programs;

      //Combine each day to one array
      const fullArr = todayArr.concat(tmwArr, plusTwoArr, plusThreeArr);

      //Get program IDs and map to air times
      const todaySchedule = await fullArr.map(function (elem) {
        return {
          id: elem.programID,
          day: new Date(elem.airDateTime).toLocaleDateString(undefined, {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
            // year: 'numeric'
          }),
          time: new Date(elem.airDateTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });

      /*** GET TITLES ***/
      // Get program IDs and pass to new fetch to get Title info (Series, Ep, Season, Ep Num)
      let todayIDs = await todaySchedule.map(function (id) {
        return id["id"];
      });
      let data = todayIDs;
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          token: await currToken,
        },
        redirect: "follow",
      };
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/programs",
        options
      );

      const jsonData = await res.json();

      //Map Title to digestable array
      const todayTitles = jsonData.map(function (elem) {
        return {
          id: elem.programID,
          series: elem.titles[0].title120,
          episode: elem.episodeTitle150
            ? elem.episodeTitle150
            : elem.titles[0].title120, // if no episode title just use series //
          ssn:
            elem.hasOwnProperty("metadata") &&
            elem.metadata[0].hasOwnProperty("Gracenote")
              ? `Season ${elem.metadata[0].Gracenote.season}`
              : `Season N/A`,
          epNum:
            elem.hasOwnProperty("metadata") &&
            elem.metadata[0].hasOwnProperty("Gracenote")
              ? `Ep ${elem.metadata[0].Gracenote.episode}`
              : `Ep N/A`,
        };
      });

      /*** MATCH IDS ***/

      // Combine Schedules (ID, Times) with Corresponding Titles based on same ID
      Object.keys(todaySchedule).forEach((key) => {
        let existtodayTitles = todayTitles.find(
          ({ id }) => todaySchedule[key].id === id
        );
        if (existtodayTitles) {
          (todaySchedule[key].series = existtodayTitles.series),
            (todaySchedule[key].episode = existtodayTitles.episode),
            (todaySchedule[key].ssn = existtodayTitles.ssn),
            (todaySchedule[key].epNum = existtodayTitles.epNum);
        }
      });

      /*** LOADER ***/

      //Hide loader once schedules are ready
      let loading = document.querySelector(`#${this.channel}--epg .spinner`);
      loading.style.visibility = "hidden";

      /*** RENDER SCHEDULE ***/

      const grid = document.getElementById(`${this.channel}--epg`);
      const checkDate = new Date().toLocaleDateString(undefined, {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      });

      for (var i = 0; i < todaySchedule.length; i++) {
        const markup = `  
                        <div class="cell time"><p>${todaySchedule[i].time}</p>
                        <p class="date" id="${this.channel}--${todaySchedule[i].day}--${todaySchedule[i].time}">${todaySchedule[i].day}</p></div>
                        <div class="cell title"><p class="series">${todaySchedule[i].series}</p>
                        <p class="episode">${todaySchedule[i].episode}</p></div>                         `;

        grid.insertAdjacentHTML("beforeend", markup);
      }
      const popSched = document.getElementById(`${this.channel}--popup`);
      async function getMarkup() {
        for (var i = 0; i < todaySchedule.length; i++) {
          const detailMarkup = `
                        <div class="cell time"><p>${todaySchedule[i].time}</p>
                        <p class="date" id="big--${this.channel}--${todaySchedule[i].day}--${todaySchedule[i].time}">${todaySchedule[i].day}</p></div>
                        <div class="bigCell title"><p class="series">${todaySchedule[i].series}</p>
                        <p class="episode">${todaySchedule[i].episode}</p><p class="tmsid">${todaySchedule[i].ssn} ${todaySchedule[i].epNum} - ${todaySchedule[i].id}</p></div> `;
          popSched.insertAdjacentHTML("beforeend", detailMarkup);
        }
      }
      // Make grids align to 7:00PM of current day (8:00PM visually)
      async function getPrime() {
        await getMarkup();
        let primetime = document.getElementById(
          `${this.channel}--${checkDate}--07:00 PM`
        );
        let topPos = primetime.offsetTop;
        console.log(primetime, topPos);

        todaySchedule.forEach(
          (document.getElementById(`${this.channel}--epg`).scrollTop =
            topPos + 18)
        );
      }
      getPrime();
      // let primetime = document.getElementById(
      //   `${this.channel}--${checkDate}--07:00 PM`
      // );
      // let topPos = primetime.offsetTop;
      // console.log(primetime, topPos);

      // todaySchedule.forEach(
      //   (document.getElementById(`${this.channel}--epg`).scrollTop =
      //     topPos + 18)
      // );
    } catch (error) {
      let alerted = localStorage.getItem("alerted") || "";
      if (alerted != "yes") {
        alert(
          `We're having trouble retrieving schedules. If schedules fail to load, please try again later.`
        );
        localStorage.setItem("alerted", "yes");
      }
    }
  }
}

//** CHANNELS ***/
const disc = new Schedule("disc", "56905");
const ahc = new Schedule("ahc", "18284");
const apl = new Schedule("apl", "57394");
const dam = new Schedule("dam", "60468");
const dfc = new Schedule("dfc", "16618");
const idd = new Schedule("idd", "16615");
const mtd = new Schedule("mtd", "31046");
const own = new Schedule("own", "70388");
const tlc = new Schedule("tlc", "57391");
const des = new Schedule("des", "19247");
const dsf = new Schedule("dsf", "58428");
const hgtv = new Schedule("hgtv", "49788");
const cook = new Schedule("cook", "68065");
const diy = new Schedule("diy", "67375");
const food = new Schedule("food", "50747");
const trav = new Schedule("trav", "59303");

let chanArr = [
  disc,
  ahc,
  apl,
  dam,
  dfc,
  idd,
  mtd,
  own,
  tlc,
  des,
  dsf,
  hgtv,
  cook,
  diy,
  food,
  trav,
];

// Get token, test, fetch schedules
let currToken = getTok
  .then((result) => {
    currToken = result;
    if (currToken !== undefined) {
      chanArr.forEach(function (e) {
        e.getSchedule();
      });
    } else {
      alert(`Unable to retrieve schedules. Please try again later.`);
    }
  })
  .catch((err) => {
    console.log(err);
  });

// Polyfilling async functions
import "core-js";
import "regenerator-runtime/runtime";
