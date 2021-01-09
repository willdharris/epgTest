// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/creds.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.password = exports.user = void 0;
const user = "unclebillepg";
exports.user = user;
const password = "526D1A95E3B6B19651774D1F90A68C32D758858F";
exports.password = password;
},{}],"js/tok.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _creds = require("./creds.js");

async function getTok() {
  try {
    const stuff = {
      username: _creds.user,
      password: _creds.password
    };
    const getIT = {
      method: "POST",
      body: JSON.stringify(stuff)
    };
    const newTok = await fetch("https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/token", getIT);
    const jsonTok = await newTok.json();
    const taken = await jsonTok.token;
    return taken;
  } catch {}
}

var _default = getTok();

exports.default = _default;
},{"./creds.js":"js/creds.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tok = _interopRequireDefault(require("./tok.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (module.hot) {
  module.hot.accept();
}

class Schedule {
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
      let today = curDate.substring(0, 10); //YESTERDAY//

      const yesterDate = new Date(curDate);
      yesterDate.setDate(yesterDate.getDate() - 1);
      let yesterday = yesterDate.toISOString();
      yesterday = yesterday.substring(0, 10); //TOMORROW//

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
      todayPlusThree = todayPlusThree.substring(0, 10); //Station Data and Date to send to API

      const stationData = [{
        stationID: `${this.stationID}`,
        date: [today, tomorrow, todayPlusTwo, todayPlusThree]
      }]; //options to include with API fetch

      const scheduleOptions = {
        method: "POST",
        body: JSON.stringify(stationData),
        headers: {
          "Content-Type": "application/json",
          token: await currToken
        },
        redirect: "follow"
      }; //Schedule fetch

      const resSched = await fetch("https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/schedules", scheduleOptions);
      const stationSchedule = await resSched.json();
      const todayArr = await stationSchedule[0].programs;
      const tmwArr = await stationSchedule[1].programs;
      const plusTwoArr = await stationSchedule[2].programs;
      const plusThreeArr = await stationSchedule[3].programs; //Combine each day to one array

      const fullArr = todayArr.concat(tmwArr, plusTwoArr, plusThreeArr); //Get program IDs and map to air times

      const todaySchedule = await fullArr.map(function (elem) {
        return {
          id: elem.programID,
          day: new Date(elem.airDateTime).toLocaleDateString(undefined, {
            weekday: "short",
            day: "2-digit",
            month: "2-digit" // year: 'numeric'

          }),
          time: new Date(elem.airDateTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })
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
          token: await currToken
        },
        redirect: "follow"
      };
      const res = await fetch("https://cors-anywhere.herokuapp.com/https://json.schedulesdirect.org/20141201/programs", options);
      const jsonData = await res.json(); //Map Title to digestable array

      const todayTitles = jsonData.map(function (elem) {
        return {
          id: elem.programID,
          series: elem.titles[0].title120,
          episode: elem.episodeTitle150 ? elem.episodeTitle150 : elem.titles[0].title120,
          // if no episode title just use series //
          ssn: elem.hasOwnProperty("metadata") && elem.metadata[0].hasOwnProperty("Gracenote") ? `Season ${elem.metadata[0].Gracenote.season}` : `Season N/A`,
          epNum: elem.hasOwnProperty("metadata") && elem.metadata[0].hasOwnProperty("Gracenote") ? `Ep ${elem.metadata[0].Gracenote.episode}` : `Ep N/A`
        };
      });
      /*** MATCH IDS ***/
      // Combine Schedules (ID, Times) with Corresponding Titles based on same ID

      Object.keys(todaySchedule).forEach(key => {
        let existtodayTitles = todayTitles.find(({
          id
        }) => todaySchedule[key].id === id);

        if (existtodayTitles) {
          todaySchedule[key].series = existtodayTitles.series, todaySchedule[key].episode = existtodayTitles.episode, todaySchedule[key].ssn = existtodayTitles.ssn, todaySchedule[key].epNum = existtodayTitles.epNum;
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
        month: "2-digit"
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

      const primetime = document.getElementById(`${this.channel}--${checkDate}--07:00 PM`); // Make grids align to 7:00PM of current day (8:00PM visually)

      const topPos = primetime.offsetTop;
      todaySchedule.forEach(el => document.getElementById(`${this.channel}--epg`).scrollTop = topPos + 18);
    } catch (error) {
      let alerted = localStorage.getItem("alerted") || "";

      if (alerted != "yes") {
        alert(`We're having trouble retrieving schedules. If schedules fail to load, please try again later.`);
        localStorage.setItem("alerted", "yes");
      }
    }
  }

} //** CHANNELS ***/


exports.default = Schedule;
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
let chanArr = [disc, ahc, apl, dam, dfc, idd, mtd, own, tlc, des, dsf, hgtv, cook, diy, food, trav]; // Get token, test, fetch schedules

let currToken = _tok.default.then(result => {
  currToken = result;

  if (currToken !== undefined) {
    chanArr.forEach(function (e) {
      e.getSchedule();
    });
  } else {
    alert(`Unable to retrieve schedules. Please try again later.`);
  }
}).catch(err => {
  console.log(err);
});
},{"./tok.js":"js/tok.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52329" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map