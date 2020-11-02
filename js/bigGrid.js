// const popup = document.querySelector(`.popup`);
// function showPopup() {
//   popup.classList.add('open');

// }
// function hidePopup() {
//   popup.classList.remove('open');
// }



// document.getElementById("ahc--btn").addEventListener("click", openPop);
// // document.getElementById("idd--btn").addEventListener("click", openPop);


// function openPop() {
//   const popup = document.querySelector(`.popup`);
//   popup.classList.add('open');
// }

// document.querySelector(`.blocker`).addEventListener("click", closePop);
// document.querySelector(`.far`).addEventListener("click", closePop);
// function closePop() {
//   const popup = document.querySelector(`.popup`);
//   popup.classList.remove('open');
// }

// window.onload = function () {
//     const jack = document.querySelector("#disc--popup");
//     document.onclick = function(e){
//         if(e.target.id !== 'disc--popup'){
//           //element clicked wasn't the div; hide the div
//           jack.style.display = 'none';
//         }
//       };

//   };
const checkDate = new Date().toLocaleDateString(undefined, {
  weekday: 'short',
  day: '2-digit',
  month: '2-digit',
  // year: 'numeric'
});

function showPopup(clicked_id) { 
  const popup = document.querySelector(`.popup`);
  const blocker = document.querySelector(`.blocker`);
  const chanPop = clicked_id.replace(`btn`, 'popup');
  const noScroll = document.getElementsByTagName('body')[0];
  noScroll.classList.add('noScroll');
  blocker.classList.add('open');
  popup.classList.add('open');
  console.log(`"${chanPop}"`);  
  document.getElementById(`${chanPop}`).style.display = "grid"; 
  if (chanPop === `disc--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Discovery Channel`;
    // document.getElementById(`big--disc--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--disc--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`disc--popup`).scrollTop = bigTopPos + 46;
    
  } else if (chanPop === `ahc--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `American Heroes`;
    // document.getElementById(`big--ahc--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--ahc--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`ahc--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `apl--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Animal Planet`;
    // document.getElementById(`big--apl--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--apl--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`apl--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `dam--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Destination America`;
    // document.getElementById(`big--dam--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--dam--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`dam--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `dfc--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Discovery Family`;
    // document.getElementById(`big--dfc--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--dfc--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`dfc--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `idd--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Investigation Discovery`;
    // document.getElementById(`big--idd--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--idd--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`idd--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `mtd--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `MotorTrend`;
    // document.getElementById(`big--mtd--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--mtd--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`mtd--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `own--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `OWN`;
    // document.getElementById(`big--own--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--own--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`own--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `tlc--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `TLC`;
    // document.getElementById(`big--tlc--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--tlc--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`tlc--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `des--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Discovery Espanol`;
    // document.getElementById(`big--des--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--des--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`des--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `dsf--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Discovery Familia`;
    // document.getElementById(`big--dsf--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--dsf--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`dsf--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `hgtv--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `HGTV`;
    // document.getElementById(`big--hgtv--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--hgtv--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`hgtv--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `cook--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Cooking Channel`;
    // document.getElementById(`big--cook--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--cook--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`cook--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `diy--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `DIY Network`;
    // document.getElementById(`big--diy--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--diy--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`diy--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `food--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Food Network`;
    // document.getElementById(`big--food--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--food--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`food--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `trav--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Travel Channel`;
    // document.getElementById(`big--trav--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(`big--trav--${checkDate}--07:00 PM`);
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`trav--popup`).scrollTop = bigTopPos + 46;
  } else {
    document.getElementById("big--wrap--title").innerHTML = ``;
  }
   
  // todaySchedule.forEach((el) => document.getElementById(`${this.channel}--popup`).scrollTop = bigTopPos);
}

function hidePopup() {
  const popup = document.querySelector(`.popup`);
  popup.classList.remove('open');
  const blocker = document.querySelector(`.blocker`);
  blocker.classList.remove('open');
  const noScroll = document.getElementsByTagName('body')[0];
  noScroll.classList.remove('noScroll');
  const clearBigWrap = document.getElementsByClassName('bigwrapper');
  console.log(clearBigWrap);
  for (var i = 0; i < clearBigWrap.length; i++) {
    clearBigWrap[i].style.display="none";
  }

}



// console.log(`${checkDate}`);

// const primetime = document.getElementById(`${checkDate}--08:00 PM`);
// primetime.scrollIntoView();

// $(document).ready(function () {
//   // Handler for .ready() called.
//   $('.wrapper').animate({
//       scrollTop: $(`#${checkDate}--08:00 PM`).offset().top
//   }, 'slow');
// });
// assign scroll position
// when todaySchedule[i].day = checkDate && todaySchedule[i].time = ('8:00 PM' || '8:01 PM' || '8:02 PM' || '8:03 PM' || '8:04 PM' || '8:05 PM')
// assign to id="date" scroll position

// where id = `${checkDate}--08:00 PM`