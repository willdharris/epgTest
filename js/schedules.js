console.log(`SCHEDULES MODULE`);
import { getTokProm } from "./tok.js";
// getTok.then(music => {
//   console.log(music);
// }, console.error);
const currToken = getTokProm.then(function(data){
  console.log(data.token);
  return data.token;
});
console.log(currToken);


export default class Schedule {
  constructor(channel, stationID) {
    this.channel = channel;
    this.stationID = stationID;
  }

  /** GET SCHEDULE */
  async getSchedule() {
    console.log(`in the schedules script now`);
    try {
      /** DATES ***/
      //TODAY//
      const curDate = new Date().toISOString();
      let today = curDate.substring(0, 10);
      console.log(today);
      //YESTERDAY//
      const yesterDate = new Date(curDate);
      yesterDate.setDate(yesterDate.getDate() - 1);
      let yesterday = yesterDate.toISOString();
      yesterday = yesterday.substring(0, 10);
      console.log(yesterday);
      //TOMORROW//
      const tomDate = new Date(curDate);
      tomDate.setDate(tomDate.getDate() + 1);
      let tomorrow = tomDate.toISOString();
      tomorrow = tomorrow.substring(0, 10);
      console.log(tomorrow);

      const plusTwoDate = new Date(curDate);
      plusTwoDate.setDate(plusTwoDate.getDate() + 2);
      let todayPlusTwo = plusTwoDate.toISOString();
      todayPlusTwo = todayPlusTwo.substring(0, 10);
      console.log(todayPlusTwo);

      const plusThreeDate = new Date(curDate);
      plusThreeDate.setDate(plusThreeDate.getDate() + 3);
      let todayPlusThree = plusThreeDate.toISOString();
      todayPlusThree = todayPlusThree.substring(0, 10);
      console.log(todayPlusThree);

      const stationData = [
        {
          stationID: `${this.stationID}`,
          date: [today, tomorrow, todayPlusTwo, todayPlusThree],
        },
      ];
      // let token = 'abcde12345'
      console.log(`${this.channel} Station Data`, stationData);
      const scheduleOptions = {
        method: "POST",
        body: JSON.stringify(stationData),
        headers: {
          "Content-Type": "application/json",
          "token": currToken,
        },
        redirect: "follow",
      };

      /*** Loader ***/

      // let loader = `<div class="spinner">
      // <div class="bounce1"></div>
      // <div class="bounce2"></div>
      // <div class="bounce3"></div>
      // </div>`;
      // window.onload = function() {
      //     what();
      //     function what() {
      //         document.getElementById(`food--epg`).innerHTML = loader;
      //     };

      const resSched = await fetch(
        "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/schedules",
        scheduleOptions
      );
      const stationSchedule = await resSched.json();
      console.log(`${this.channel} station schedule`, stationSchedule);
      const todayArr = await stationSchedule[0].programs;
      const tmwArr = await stationSchedule[1].programs;
      const plusTwoArr = await stationSchedule[2].programs;
      const plusThreeArr = await stationSchedule[3].programs;

      // console.log(`${this.channel} newARR`, todayArr);
      const fullArr = todayArr.concat(tmwArr, plusTwoArr, plusThreeArr);
      console.log(`${this.channel} fullArr`, fullArr);
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
      let todayIDs = await todaySchedule.map(function (id) {
        return id["id"];
      });
      let data = todayIDs;
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "token": currToken,
        },
        redirect: "follow",
      };
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/programs",
        options
      );

      const jsonData = await res.json();
      console.log(`${this.channel} jsondata`, jsonData);
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
      console.log(`${this.channel}`, todayTitles);

      /*** MATCH IDS ***/
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
      console.log(this.channel, todaySchedule);
      /*** LOADER ***/
      let loading = document.querySelector(`#${this.channel}--epg .spinner`);
      loading.style.visibility = "hidden";
      // let expander = document.querySelector(`.fas`);
      // expander.style.visibility = "visible";

      /*** RENDER SCHEDULE ***/

      const grid = document.getElementById(`${this.channel}--epg`);
      const checkDate = new Date().toLocaleDateString(undefined, {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        // year: 'numeric'
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
      for (var i = 0; i < todaySchedule.length; i++) {
        const detailMarkup = `
                        <div class="cell time"><p>${todaySchedule[i].time}</p>
                        <p class="date" id="big--${this.channel}--${todaySchedule[i].day}--${todaySchedule[i].time}">${todaySchedule[i].day}</p></div>
                        <div class="bigCell title"><p class="series">${todaySchedule[i].series}</p>
                        <p class="episode">${todaySchedule[i].episode}</p><p class="tmsid">${todaySchedule[i].ssn} ${todaySchedule[i].epNum} - ${todaySchedule[i].id}</p></div> `;
        popSched.insertAdjacentHTML("beforeend", detailMarkup);
      }
      console.log(`popup schedule`, popSched);

      const primetime = document.getElementById(
        `${this.channel}--${checkDate}--07:00 PM`
      );
      const topPos = primetime.offsetTop;
      console.log(primetime);
      todaySchedule.forEach(
        (el) =>
          (document.getElementById(`${this.channel}--epg`).scrollTop =
            topPos + 18)
      );
      // const bigPrimetime = document.getElementById(`big--${this.channel}--${checkDate}--07:00 PM`);
      // const bigTopPos = bigPrimetime.offsetTop;
      // todaySchedule.forEach((elmnt) => document.getElementById(`${this.channel}--popup`).scrollTop = bigTopPos);
    } catch (error) {
      if (error instanceof SyntaxError) {
      console.log(`We're having trouble retrieving schedules. Please try again later`, error);
      }
    }
  }
}
//** CHANNELS ***/
// const disc = new Schedule("disc", "56905");
// const ahc = new Schedule("ahc", "18284");
// const apl = new Schedule("apl", "57394");
// const dam = new Schedule("dam", "60468");
// const dfc = new Schedule("dfc", "16618");
// const idd = new Schedule("idd", "16615");
// const mtd = new Schedule("mtd", "31046");
// const own = new Schedule("own", "70388");
// const tlc = new Schedule("tlc", "57391");
// const des = new Schedule("des", "19247");
// const dsf = new Schedule("dsf", "58428");
// const hgtv = new Schedule("hgtv", "49788");
// const cook = new Schedule("cook", "68065");
// const diy = new Schedule("diy", "67375");
// const food = new Schedule("food", "50747");
// const trav = new Schedule("trav", "59303");

// let chanArr = [
//   disc,
//   ahc,
//   apl,
//   dam,
//   dfc,
//   idd,
//   mtd,
//   own,
//   tlc,
//   des,
//   dsf,
//   hgtv,
//   cook,
//   diy,
//   food,
//   trav,
// ];
// chanArr.forEach(function (e) {
//   e.getSchedule();
// });

// discoveryChannel.getSchedule();
// tlc.getSchedule()
// function collapseSched() {
//     var element = document.getElementById("disc--expanded");
//     element.classList.remove("expanded");
//   }
//   collapseSched();
