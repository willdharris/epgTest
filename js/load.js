import Schedule from "./schedules.js";

export let currToken = "05c4bf7ad886a9380ce2196d061e4915";

//check api status with currToken
async function pingAPI() {  
  const getInfo = {
    method: "GET",        
    headers: {
      "Content-Type": "application/json",
      "token": currToken,
       },
  };
  const statusCheck = await fetch(
    "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/status",
    getInfo
    );
  const statusReturn = await statusCheck.json();
  console.log(statusReturn);

  if (statusReturn.code === 0) {
    console.log(`Everything looks good. Keep on truckin!`)  
    // run everything
    
    const disc = new Schedule("disc", "56905");
    const ahc = new Schedule("ahc", "18284");
    const apl = new Schedule("apl", "57394");
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

    let chanArr = [
      disc,
      ahc,
      apl
      // dam,
      // dfc,
      // idd,
      // mtd,
      // own,
      // tlc,
      // des,
      // dsf,
      // hgtv,
      // cook,
      // diy,
      // food,
      // trav,
    ];
    chanArr.forEach(function (e) {
      e.getSchedule();
      console.log(`Getting Schedules`);
    });

  } else if (statusReturn.code === 4003){
    console.log(`We're having trouble retrieving schedules right now. Please try again later. Error: ${statusReturn.code} - ${statusReturn.message}`);
// get new token    
  } else {
    console.log(`We're having trouble retrieving schedules right now. Please try again later. Error: ${statusReturn.code} - ${statusReturn.message}`);
// server error try again later
  }
}
pingAPI();


// async function getTok() {
//   const stuff = {
//     username: "unclebillepg",
//     password: "526D1A95E3B6B19651774D1F90A68C32D758858F",
//   };

//   const getIT = {
//     method: "POST",
//     body: JSON.stringify(stuff),
//   };
//   const newTok = await fetch(
//     "https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/token",
//     getIT
//   );
//   const jsonTok = await newTok.json();
//   const taken = await jsonTok.token;
//   // const strToken = JSON.stringify(token);
//   console.log(taken);
//   return taken;
// }

// export { getTok };







// const getIT = {
//             method: 'POST',
//             // body: JSON.stringify(stuff),

//         };
//         const newTok = await fetch("https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/token?username='unclebillepg'&password='526D1A95E3B6B19651774D1F90A68C32D758858F'", getIT)
//         console.log(newTok);
//     };
//     getTok();
