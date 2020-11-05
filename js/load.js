// import Schedule from "./schedules.js";
import * as Tolkien from "./tok.js";
export { currToken };  
//check api status with currToken
async function pingAPI() {    
    try {  
      let currToken = "3ce4cae259b51e46185bf7e812254f8f";
      console.log(currToken);
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
     
      if (statusReturn.code === 4003 || 4006) {
        console.log(`We're having trouble retrieving schedules right now. Please try again later. Error: ${statusReturn.code} - ${statusReturn.message}`);
        await Tolkien.getTok();
        console.log(Tolkien.taken);
        currToken = Tolkien.taken;     
      
      } else {
        currToken = currToken;      
        console.log(currToken);
      }
      
    } catch {
    alert(`We're having trouble connecting to the schedules server. Please try again later.`);
    }
    
  }; 
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
