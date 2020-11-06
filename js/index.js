import { getTok } from "./tok.js";
// import Schedule from "./schedules.js";
// import { getSchedule } from "schedules";
let currToken = getTok();
console.log(`CurrToken = ${currToken}`);

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
console.log(chanArr);
// chanArr.forEach(function (e) {
//   e.getSchedule();
// });
