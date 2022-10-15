// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"ShInH":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"8lqZg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _controller = require("./controller");
var _controllerDefault = parcelHelpers.interopDefault(_controller);
var _utilities = require("./modules/utilities");
var _view = require("./view");
var _viewDefault = parcelHelpers.interopDefault(_view);
var _mainScss = require("../sass/main.scss");
function init() {
    (0, _utilities.myCopyright)("Macros by Sara", "K.J. Roelke", "kjroelke.online");
}
init();

},{"./controller":"gCE4p","./view":"ai2uB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./modules/utilities":"5HnRK","../sass/main.scss":"5Izhf"}],"gCE4p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _model = require("./model");
var _modelDefault = parcelHelpers.interopDefault(_model);
var _view = require("./view");
var _viewDefault = parcelHelpers.interopDefault(_view);
class Controller {
    #demo;
    constructor(Model, View){
        this.model = Model;
        this.view = View;
        this.view.addHandlerRender(this.onFormSubmit);
    }
    /** Subscribed to the AddHandlerRender(), this calls in the Maths.
	 * @param ev {object} - the Event
	 */ onFormSubmit(ev) {
        // The Maths by Model
        (0, _modelDefault.default).calculate(ev.target, ev.target.id);
        // The Output by View
        (0, _viewDefault.default).handleOutput(ev.target.id, (0, _modelDefault.default).state);
    }
}
exports.default = new Controller((0, _modelDefault.default), (0, _viewDefault.default));

},{"./model":"dEDha","./view":"ai2uB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dEDha":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Model {
    state = {
        person: {
            gender: "",
            weight: 0,
            heightFt: 0,
            heightIn: 0,
            age: 0
        },
        bmr: 0,
        calorieGoal: 0,
        modifiers: {
            activity: 0,
            deficit: 0,
            protein: 0
        },
        tdee: 0,
        macros: {
            fats: {
                percentage: 30,
                grams: 0,
                calories: 0
            },
            proteins: {
                percentage: 30,
                grams: 0,
                calories: 0
            },
            carbs: {
                percentage: 0,
                grams: 0,
                calories: 0
            }
        }
    };
    calculate(form, id) {
        switch(id){
            case "bmr-calculator":
                this.#calcBMR(form);
                break;
            case "modifiers":
                try {
                    this.#calcTDEE(form);
                } catch (err) {
                    console.error(err);
                }
                break;
            case "protein-calculator":
                try {
                    this.#calcMacros(form);
                } catch (err1) {
                    console.error(err1);
                }
                break;
        }
    }
     #calcHeight(ft, inch) {
        const height = Number(ft.value) * 12 + Number(inch.value);
        return height;
    }
     #getOptionsValue(el) {
        const value = +el.options[el.selectedIndex].value;
        return value;
    }
     #calcBMR(form) {
        // Get Form Values
        const weightVal = form.querySelector("#weight"), heightFtVal = form.querySelector("#height--ft"), heightInVal = form.querySelector("#height--in"), ageVal = form.querySelector("#age"), genderOptions = form.querySelectorAll('#gender input[type="radio"]'), healthOptions = form.querySelectorAll('#health input[type="radio"]'), height1 = this.#calcHeight(heightFtVal, heightInVal);
        // Set State to Form Values
        this.state.person = {
            weight: Number(weightVal.value),
            age: Number(ageVal.value),
            heightFt: Number(heightFtVal.value),
            heightIn: Number(heightInVal.value)
        };
        genderOptions.forEach((el, i)=>{
            if (el.checked) this.state.person.gender = genderOptions[i].value;
        });
        // Destructure State
        const { person: { weight , age , gender  } ,  } = this.state;
        let bmr = 0;
        // Calc BMR
        bmr = gender === "Female" ? 655 + 4.35 * weight + 4.7 * height1 - 4.7 * age : 66 + 6.23 * weight + 12.7 * height1 - 6.8 * age;
        this.state.bmr = Math.round(bmr);
        if (healthOptions) console.log(healthOptions);
    }
     #calcTDEE(form1) {
        // Get Values
        const activityVal = form1.querySelector("#tdee"), deficitVal = form1.querySelector("#deficit");
        // Destructure State
        const { bmr: bmr1  } = this.state;
        let { calorieGoal , tdee , modifiers: { activity , deficit  } ,  } = this.state;
        if (bmr1 === 0) throw "Calculate BMR First!!";
        activity = this.#getOptionsValue(activityVal);
        deficit = this.#getOptionsValue(deficitVal);
        // The Math
        tdee = Math.round(bmr1 * activity);
        if (deficit < 1) calorieGoal = Math.round(tdee - tdee * deficit);
        if (deficit === 1) calorieGoal = tdee;
        if (deficit > 1) calorieGoal = Math.round(tdee * deficit);
        // Update State
        this.state.modifiers = {
            activity: activity,
            deficit: deficit
        };
        this.state.tdee = tdee;
        this.state.calorieGoal = calorieGoal;
    }
     #calcMacros(form2) {
        if (this.state.tdee === 0) throw "Do the rest of the form first!";
        // Get Form
        const proteinMod = form2.querySelector("#protein-modifier");
        // Destructure State
        let { macros , modifiers  } = this.state;
        const { calorieGoal: calorieGoal1  } = this.state;
        // Set Protein Modifier to State
        modifiers.protein = this.#getOptionsValue(proteinMod);
        // Calc Proteins
        this.#calcProteins(macros.proteins, modifiers.protein);
        // Calc Fats
        this.#calcFats(macros.fats);
        // Calc Carbs
        this.#calcCarbs(macros, calorieGoal1);
    }
     #calcProteins(proteins, modifier) {
        let { grams , calories , percentage  } = proteins;
        grams = Math.round(this.state.person.weight * modifier);
        calories = Math.round(grams * 4);
        percentage = Math.round(calories / this.state.calorieGoal * 100);
        this.state.macros.proteins = {
            grams: grams,
            calories: calories,
            percentage: percentage
        };
    }
     #calcFats(fats) {
        let { grams: grams1 , calories: calories1 , percentage: percentage1  } = fats;
        calories1 = Math.round(percentage1 / 100 * this.state.calorieGoal);
        grams1 = Math.round(calories1 / 9);
        this.state.macros.fats = {
            grams: grams1,
            calories: calories1,
            percentage: percentage1
        };
    }
     #calcCarbs(macros1, goal) {
        let { carbs: { grams: cGrams , percentage: cPercent , calories: cCals  } , fats: { calories: fCals  } , proteins: { calories: pCals  } ,  } = macros1;
        cCals = Math.round(goal - fCals - pCals);
        cGrams = Math.round(cCals / 4);
        cPercent = Math.round(cCals / goal * 100);
        this.state.macros.carbs = {
            calories: cCals,
            grams: cGrams,
            percentage: cPercent
        };
    }
}
exports.default = new Model();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"ai2uB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _form = require("./modules/Form");
var _utilities = require("./modules/utilities");
class View {
    forms = document.querySelectorAll("form");
    reset = document.getElementById("reset");
    main = document.querySelector("main");
    coords = this.main.getBoundingClientRect();
    mods = _form.mods;
    calorieGoal = _form.calories;
    bmr = _form.bmr;
    proteins = _form.protein;
    submissionMessage = `<span>Thanks! On to the next step.</span>`;
    finalMessage = `<span>All done! Check the breakdown</span>`;
    constructor(){
        this.simpleProtection();
    }
    simpleProtection = async function() {
        const myIP = "76.253.164.85";
        let home;
        try {
            const res = await fetch("https://api.ipify.org/?format=json");
            if (!res.ok) throw new Error();
            const { ip  } = await res.json();
            home = ip === myIP ? true : false;
            if (home) return;
            const allowed = prompt("Password");
            const denial = `
			<main>
				<h1>You are not allowed to use this calculator.</h1>
				<span>If you have forgotten your password or feel you are being shown this message in error, please contact <a href="mailto:kj.roelke@gmail.com">KJ Roelke</a> and ask for help.</span>
			</main>`;
            if (allowed != "Elliecat29!") {
                document.querySelector("main").innerHTML = denial;
                return;
            }
        } catch (err) {
            console.error(err);
        }
        this.#disabledForms();
        this.#handleSticky(true);
        this.renderConfirmation();
        this.reset.addEventListener("click", ()=>this.resetForm());
    };
    /** disables input inside of forms */  #disabledForms() {
        this.forms.forEach((form, i)=>{
            if (i === 0) return;
            for(i = 0; i < form.length; i++)form[i].setAttribute("disabled", "");
        });
    }
    /** Handles stickyness of `answer` div.
	 * @param {boolean} sticky  whether or not to set the id of the `answer` to sticky.
	 */  #handleSticky(sticky) {
        const output = (0, _utilities.querySelector)(".answer");
        if (sticky) {
            if (output.id != "sticky") document.addEventListener("scroll", ()=>{
                output.id = "sticky";
            }, {
                once: true
            });
        }
        if (!sticky) output.id = "";
    }
    /** Attaches a callback function to each form's 'submit' and passes along the event. Implemented in the `init()` at index.js
	 * @param handler {function} - the callback function
	 */ addHandlerRender(handler) {
        this.forms.forEach((form)=>{
            form.addEventListener("submit", handler);
        });
    }
    /**
	 * Adds `submit` listener to each form that adds a message on submit and toggles active/inactive state of each form.
	 */ renderConfirmation() {
        this.forms.forEach((form, i)=>{
            form.addEventListener("submit", (e)=>{
                e.preventDefault();
                const form = e.target;
                const id = form.dataset.step;
                const submission = form.querySelector(".form__submission");
                submission.insertAdjacentHTML("beforeend", i != 2 ? this.submissionMessage : this.finalMessage);
                if (id != 3) {
                    this.#toggleStyle([
                        form,
                        this.forms[id]
                    ]);
                    this.#enableForm(this.forms[id]);
                }
            });
        });
    }
    /** Resets the app's state to init */ resetForm() {
        window.scrollTo(0, this.coords.y);
        location.reload();
        this.handleSticky(false);
    }
    /** Adds '.inactive' class to each form for more clear UI. */  #toggleStyle(forms) {
        forms.forEach((form)=>form.classList.toggle("inactive"));
    }
    /** Enables form field inputs */  #enableForm(form) {
        for(let i = 0; i < form.length; i++)form[i].disabled = false;
    }
    handleOutput(form, state) {
        if (form === this.bmr.form.id) {
            this.bmr.renderOutput(state.bmr);
            this.proteins.updateOptions(state.person.gender);
        }
        if (form === this.mods.form.id) {
            this.mods.renderOutput(state.tdee);
            this.calorieGoal.renderOutput(state.calorieGoal);
        }
        if (form === this.proteins.form.id) this.proteins.renderMacros(state.macros);
    }
}
exports.default = new View();

},{"./modules/Form":"6DnbK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./modules/utilities":"5HnRK"}],"6DnbK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bmr", ()=>bmr);
parcelHelpers.export(exports, "mods", ()=>mods);
parcelHelpers.export(exports, "calories", ()=>calories);
parcelHelpers.export(exports, "protein", ()=>protein);
class Form {
    #query = ".totals__";
    constructor(id){
        this.form = document.getElementById(id);
        this.output = document.querySelector(this.#query.concat(id));
        this.macros = document.querySelector(".percents");
    }
    /** Takes an HTML string to render to the form's output.
	 * @param markup {string} - the HTML to markup.
	 */ renderOutput(markup) {
        this.output.insertAdjacentHTML("beforeend", `<span>${markup} calories</span>`);
    }
}
const bmr = new Form("bmr-calculator");
const mods = new Form("modifiers");
const calories = new Form("calorie-goal");
class ProteinForm extends Form {
    #formContent = "";
    label = this.form.querySelector("#protein--gender");
    constructor(id){
        super(id);
    }
    updateOptions(gender) {
        if (gender === "Female") this.#formContent = `
			<label for="protein">
				<strong>${gender}</strong> Protein Modifier (grams per lb.)</label>
					<select name="protein" id="protein-modifier">
						<option value="0.6">0.6</option>
						<option value="0.7">.07</option>
						<option value="0.8" selected>0.8</option>
						<option value="0.9">0.9</option>
						<option value="1.0">1.0</option>
					</select>`;
        if (gender === "Male") this.#formContent = `
			<label for="protein">
				<strong>${gender}</strong> Protein Modifier (grams per lb.)</label>
					<select name="protein" id="protein-modifier">
						<option value="0.8">0.8</option>
						<option value="0.9">0.9</option>
						<option value="1.0" selected>1.0</option>
						<option value="1.1">1.1</option>
						<option value="1.2">1.2</option>
					</select>`;
        this.form.querySelector(".form__content").innerHTML = this.#formContent;
    }
    renderMacros(markup) {
        this.macros.innerHTML = `
		<div class="percent__proteins">
			<h2>Protein:</h2>
			<span>${markup.proteins.percentage}% | ${markup.proteins.grams}g</span>
		</div>
		<div class="percent__fats">
			<h2>Fats:</h2>
			<span>${markup.fats.percentage}% | ${markup.fats.grams}g</span>
		</div>
		<div class="percent__carbs">
			<h2>Carbs:</h2>
			<span>${markup.carbs.percentage}% | ${markup.carbs.grams}g</span>
		</div>`;
    }
    customMacros() {
        const markup = `
		<label for="custom-macros">Custom Macro Selectors</label>
			<select name="custom-macros" id="custom-macos">
				<option value="0.6">0.6</option>
				<option value="0.7">.07</option>
				<option value="0.8" selected>0.8</option>
				<option value="0.9">0.9</option>
				<option value="1.0">1.0</option>
			</select>`;
        return markup;
    }
    pregnancyMarkup() {
        const markup = `<div class="radio__options">
								<h3>Pregnant?</h3>
								<div class="radio__options--option" id="pregnant-option-1">
									<input type="radio" name="pregnant" value="true">
									<label for="pregnant">Yes</label>
								</div>
								<div class="radio__options--option" id="pregnant-option-2">
									<input type="radio" name="pregnant" value="false">
									<label for="pregnant">No</label>
								</div>
							</div>`;
        return markup;
    }
}
const protein = new ProteinForm("protein-calculator");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5HnRK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Create copyright text with a dynamic date and URL campaign builder for GA inside a div with the ID of 'copyright.'
 * @param {string} brandName Name of the brand
 * @param {string} builder Name of the person/org building the site
 * @param {string} site Home URL of the builder. HTTP is added automatically.
 */ parcelHelpers.export(exports, "myCopyright", ()=>myCopyright);
/** Shorthand for Query Selector Function.
 * @param selector {string} CSS Selector. Must include class ('.') marker if needed
 * @param  [all] {boolean} optional to call querySelectorAll.
 * @return {Element} HTML Element
 * */ parcelHelpers.export(exports, "querySelector", ()=>querySelector);
function myCopyright(brandName, builder, site) {
    const copyright = document.getElementById("copyright");
    const thisYear = new Date().getFullYear();
    const brand = brandName.replace(/ /g, "");
    const builderLink = `<a href="https://${site}?utm_source=${brand}&utm_medium=website_footer&utm_campaign=copyright" target ="_blank">${builder}</a>`;
    copyright.insertAdjacentHTML("afterbegin", `<p>&copy; ${thisYear} ${brandName} All Rights Reserved.<br/>Site built by ${builderLink}</p>`);
}
function querySelector(selector, all = false) {
    return all === false ? document.querySelector(selector) : document.querySelectorAll(selector);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5Izhf":[function() {},{}]},["ShInH","8lqZg"], "8lqZg", "parcelRequirece37")

//# sourceMappingURL=index.975ef6c8.js.map
