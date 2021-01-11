export const checkDate = new Date().toLocaleDateString(undefined, {
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
});

window.showPopup = function showPopup(clicked_id) {
  const popup = document.querySelector(`.popup`);
  const blocker = document.querySelector(`.blocker`);
  const chanPop = clicked_id.replace(`btn`, "popup");
  const noScroll = document.getElementsByTagName("body")[0];
  noScroll.classList.add("noScroll");
  blocker.classList.add("open");
  popup.classList.add("open");
  document.getElementById(`${chanPop}`).style.display = "grid";
  if (chanPop === `disc--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Discovery Channel`;
    // document.getElementById(`big--disc--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--disc--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`disc--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `ahc--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `American Heroes`;
    // document.getElementById(`big--ahc--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--ahc--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`ahc--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `apl--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Animal Planet`;
    // document.getElementById(`big--apl--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--apl--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`apl--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `dam--popup`) {
    document.getElementById(
      "big--wrap--title"
    ).innerHTML = `Destination America`;
    // document.getElementById(`big--dam--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--dam--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`dam--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `dfc--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Discovery Family`;
    // document.getElementById(`big--dfc--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--dfc--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`dfc--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `idd--popup`) {
    document.getElementById(
      "big--wrap--title"
    ).innerHTML = `Investigation Discovery`;
    // document.getElementById(`big--idd--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--idd--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`idd--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `mtd--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `MotorTrend`;
    // document.getElementById(`big--mtd--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--mtd--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`mtd--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `own--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `OWN`;
    // document.getElementById(`big--own--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--own--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`own--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `tlc--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `TLC`;
    // document.getElementById(`big--tlc--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--tlc--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`tlc--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `des--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Discovery Espanol`;
    // document.getElementById(`big--des--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--des--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`des--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `dsf--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Discovery Familia`;
    // document.getElementById(`big--dsf--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--dsf--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`dsf--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `hgtv--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `HGTV`;
    // document.getElementById(`big--hgtv--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--hgtv--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`hgtv--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `cook--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Cooking Channel`;
    // document.getElementById(`big--cook--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--cook--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`cook--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `diy--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `DIY Network`;
    // document.getElementById(`big--diy--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--diy--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`diy--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `food--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Food Network`;
    // document.getElementById(`big--food--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--food--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`food--popup`).scrollTop = bigTopPos + 46;
  } else if (chanPop === `trav--popup`) {
    document.getElementById("big--wrap--title").innerHTML = `Travel Channel`;
    // document.getElementById(`big--trav--${checkDate}--07:00 PM`).scrollIntoView();
    const bigprimetime = document.getElementById(
      `big--trav--${checkDate}--07:00 PM`
    );
    const bigTopPos = bigprimetime.offsetTop;
    document.getElementById(`trav--popup`).scrollTop = bigTopPos + 46;
  } else {
    document.getElementById("big--wrap--title").innerHTML = ``;
  }
};

window.hidePopup = function hidePopup() {
  const popup = document.querySelector(`.popup`);
  popup.classList.remove("open");
  const blocker = document.querySelector(`.blocker`);
  blocker.classList.remove("open");
  const noScroll = document.getElementsByTagName("body")[0];
  noScroll.classList.remove("noScroll");
  const clearBigWrap = document.getElementsByClassName("bigwrapper");

  for (var i = 0; i < clearBigWrap.length; i++) {
    clearBigWrap[i].style.display = "none";
  }
};
