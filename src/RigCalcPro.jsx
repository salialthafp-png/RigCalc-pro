import { useState, useEffect, useMemo, createContext, useContext, useCallback } from "react";

const AppCtx = createContext(null);

// ── CRANE DATABASE ─────────────────────────────────────────────────────────────
const CRANE_DB = [
  // ── MOBILE OUTRIGGER 100T–500T (min 10) ──────────────────────────────────────
  { model:"Liebherr LTM 1100-5.2",  type:"mobile_outrigger", maxCap:100,  selfWeight:56,
    chart:[{r:3,b:11.2,cap:100},{r:5,b:13.5,cap:84},{r:8,b:20,cap:58},{r:12,b:28,cap:36},{r:16,b:36,cap:22},{r:20,b:44,cap:15}]},
  { model:"Liebherr LTM 1090-4.2",  type:"mobile_outrigger", maxCap:90,   selfWeight:52,
    chart:[{r:3,b:11,cap:90},{r:5,b:13,cap:76},{r:8,b:19,cap:52},{r:12,b:26,cap:32},{r:16,b:33,cap:20},{r:18,b:40,cap:14}]},
  { model:"Liebherr LTM 1130-5.1",  type:"mobile_outrigger", maxCap:130,  selfWeight:60,
    chart:[{r:3,b:13,cap:130},{r:5,b:15,cap:110},{r:8,b:22,cap:78},{r:12,b:30,cap:50},{r:16,b:38,cap:32},{r:20,b:46,cap:22}]},
  { model:"Grove GMK4100L",          type:"mobile_outrigger", maxCap:100,  selfWeight:55,
    chart:[{r:3,b:11,cap:100},{r:5,b:14,cap:82},{r:8,b:21,cap:56},{r:12,b:29,cap:34},{r:16,b:37,cap:20},{r:20,b:45,cap:13}]},
  { model:"Grove GMK5150L",          type:"mobile_outrigger", maxCap:150,  selfWeight:68,
    chart:[{r:3,b:13,cap:150},{r:5,b:16,cap:125},{r:8,b:24,cap:88},{r:12,b:32,cap:56},{r:16,b:40,cap:36},{r:20,b:48,cap:24}]},
  { model:"Tadano ATF 130G-5",       type:"mobile_outrigger", maxCap:130,  selfWeight:62,
    chart:[{r:3,b:12,cap:130},{r:5,b:15,cap:108},{r:8,b:22,cap:76},{r:12,b:30,cap:48},{r:16,b:38,cap:30},{r:20,b:46,cap:20}]},
  { model:"Tadano AC 3.045L (45T)",  type:"mobile_outrigger", maxCap:45,   selfWeight:28,
    chart:[{r:3,b:9.1,cap:45},{r:5,b:11,cap:36},{r:8,b:16,cap:24},{r:10,b:20,cap:16},{r:12,b:24,cap:11}]},
  { model:"Liebherr LTM 1200-5.1",  type:"mobile_outrigger", maxCap:200,  selfWeight:80,
    chart:[{r:3,b:14,cap:200},{r:5,b:18,cap:168},{r:8,b:26,cap:118},{r:12,b:35,cap:76},{r:16,b:44,cap:50},{r:22,b:54,cap:30}]},
  { model:"Grove GMK6300L",          type:"mobile_outrigger", maxCap:300,  selfWeight:96,
    chart:[{r:3,b:15,cap:300},{r:5,b:19,cap:252},{r:8,b:28,cap:178},{r:12,b:38,cap:116},{r:16,b:48,cap:76},{r:22,b:58,cap:46}]},
  { model:"Tadano ATF 400G-6",       type:"mobile_outrigger", maxCap:400,  selfWeight:108,
    chart:[{r:3,b:16,cap:400},{r:5,b:20,cap:336},{r:8,b:30,cap:236},{r:12,b:42,cap:154},{r:16,b:54,cap:102},{r:24,b:66,cap:60}]},
  { model:"Liebherr LTM 1350-6.1",  type:"mobile_outrigger", maxCap:350,  selfWeight:100,
    chart:[{r:3,b:15,cap:350},{r:5,b:19,cap:292},{r:8,b:28,cap:206},{r:12,b:40,cap:134},{r:16,b:52,cap:88},{r:22,b:62,cap:54}]},
  { model:"Grove GMK7450-1 (450T)", type:"mobile_outrigger", maxCap:450,  selfWeight:115,
    chart:[{r:3,b:16,cap:450},{r:5,b:21,cap:378},{r:8,b:31,cap:266},{r:12,b:44,cap:174},{r:16,b:57,cap:115},{r:24,b:72,cap:69}]},
  { model:"Liebherr LTM 1500-8.1",  type:"mobile_outrigger", maxCap:500,  selfWeight:120,
    chart:[{r:3,b:16,cap:500},{r:5,b:21,cap:420},{r:8,b:31,cap:298},{r:12,b:44,cap:196},{r:16,b:56,cap:130},{r:24,b:70,cap:78}]},

  // ── MOBILE OUTRIGGER 500T–1000T (min 10) ─────────────────────────────────────
  { model:"Grove GMK7550 (550T)",    type:"mobile_outrigger", maxCap:550,  selfWeight:130,
    chart:[{r:3,b:17,cap:550},{r:5,b:22,cap:462},{r:8,b:33,cap:328},{r:12,b:47,cap:214},{r:16,b:60,cap:142},{r:24,b:76,cap:86}]},
  { model:"Tadano ATF 600G-8",       type:"mobile_outrigger", maxCap:600,  selfWeight:136,
    chart:[{r:3,b:17,cap:600},{r:5,b:22,cap:504},{r:8,b:33,cap:358},{r:12,b:47,cap:234},{r:16,b:60,cap:155},{r:24,b:78,cap:93}]},
  { model:"Liebherr LTM 1650-8.1",  type:"mobile_outrigger", maxCap:650,  selfWeight:140,
    chart:[{r:3,b:18,cap:650},{r:5,b:23,cap:546},{r:8,b:34,cap:388},{r:12,b:48,cap:256},{r:16,b:62,cap:170},{r:24,b:78,cap:102}]},
  { model:"Liebherr LTM 1750-9.1",  type:"mobile_outrigger", maxCap:750,  selfWeight:158,
    chart:[{r:3,b:19,cap:750},{r:5,b:24,cap:630},{r:8,b:36,cap:448},{r:12,b:51,cap:294},{r:16,b:66,cap:196},{r:24,b:84,cap:118}]},
  { model:"Liebherr LTM 1800-9.1",  type:"mobile_outrigger", maxCap:800,  selfWeight:165,
    chart:[{r:3,b:19,cap:800},{r:5,b:25,cap:672},{r:8,b:37,cap:478},{r:12,b:53,cap:314},{r:16,b:68,cap:209},{r:24,b:86,cap:126}]},
  { model:"Tadano AC 7.450-1 (450T)",type:"mobile_outrigger", maxCap:450,  selfWeight:112,
    chart:[{r:3,b:16,cap:450},{r:5,b:21,cap:378},{r:8,b:31,cap:268},{r:12,b:44,cap:175},{r:16,b:57,cap:116},{r:24,b:72,cap:70}]},
  { model:"Grove GMK6400 (400T)",    type:"mobile_outrigger", maxCap:400,  selfWeight:106,
    chart:[{r:3,b:16,cap:400},{r:5,b:20,cap:336},{r:8,b:30,cap:238},{r:12,b:43,cap:155},{r:16,b:55,cap:103},{r:24,b:68,cap:62}]},
  { model:"Manitowoc MLC650 (650T)", type:"mobile_outrigger", maxCap:650,  selfWeight:138,
    chart:[{r:3,b:18,cap:650},{r:5,b:23,cap:546},{r:8,b:34,cap:388},{r:12,b:48,cap:255},{r:16,b:62,cap:169},{r:24,b:78,cap:101}]},
  { model:"Liebherr LTM 11200-9.1", type:"mobile_outrigger", maxCap:1000, selfWeight:180,
    chart:[{r:3,b:20,cap:1000},{r:5,b:26,cap:840},{r:8,b:38,cap:598},{r:12,b:54,cap:394},{r:16,b:70,cap:262},{r:24,b:88,cap:158}]},

  // ── CRAWLER CRANES (min 15) ──────────────────────────────────────────────────
  { model:"Manitowoc MLC300",        type:"crawler", maxCap:300,  selfWeight:185,
    chart:[{r:6,b:24,cap:300},{r:9,b:30,cap:252},{r:12,b:38,cap:200},{r:18,b:50,cap:138},{r:24,b:62,cap:94},{r:30,b:76,cap:64}]},
  { model:"Kobelco CKE2500G (250T)", type:"crawler", maxCap:250,  selfWeight:164,
    chart:[{r:5,b:20,cap:250},{r:8,b:26,cap:210},{r:12,b:34,cap:168},{r:18,b:46,cap:116},{r:24,b:58,cap:79},{r:30,b:72,cap:54}]},
  { model:"Hitachi KH1000-3 (100T)", type:"crawler", maxCap:100,  selfWeight:82,
    chart:[{r:4,b:16,cap:100},{r:6,b:20,cap:84},{r:9,b:26,cap:64},{r:12,b:32,cap:48},{r:18,b:42,cap:30},{r:24,b:54,cap:18}]},
  { model:"Liebherr LR 1600/2",      type:"crawler", maxCap:600,  selfWeight:200,
    chart:[{r:6,b:30,cap:600},{r:9,b:38,cap:504},{r:12,b:48,cap:408},{r:18,b:62,cap:275},{r:24,b:78,cap:186},{r:30,b:94,cap:126}]},
  { model:"Liebherr LR 1750/2",      type:"crawler", maxCap:750,  selfWeight:225,
    chart:[{r:6,b:32,cap:750},{r:9,b:40,cap:630},{r:12,b:52,cap:510},{r:18,b:66,cap:344},{r:24,b:82,cap:232},{r:30,b:100,cap:158}]},
  { model:"Liebherr LR 1800-1.0",    type:"crawler", maxCap:800,  selfWeight:240,
    chart:[{r:6,b:34,cap:800},{r:9,b:42,cap:672},{r:12,b:54,cap:544},{r:18,b:70,cap:366},{r:24,b:88,cap:248},{r:30,b:106,cap:168}]},
  { model:"Demag CC 2800-1 (600T)",  type:"crawler", maxCap:600,  selfWeight:198,
    chart:[{r:6,b:30,cap:600},{r:9,b:38,cap:504},{r:12,b:48,cap:406},{r:18,b:62,cap:274},{r:24,b:78,cap:185},{r:30,b:94,cap:125}]},
  { model:"Manitowoc MLC650",        type:"crawler", maxCap:650,  selfWeight:210,
    chart:[{r:6,b:32,cap:650},{r:9,b:40,cap:546},{r:12,b:50,cap:440},{r:18,b:65,cap:297},{r:24,b:82,cap:200},{r:30,b:98,cap:136}]},
  { model:"SANY SCC8200 (820T)",      type:"crawler", maxCap:820,  selfWeight:248,
    chart:[{r:6,b:34,cap:820},{r:9,b:43,cap:688},{r:12,b:55,cap:558},{r:18,b:71,cap:376},{r:24,b:89,cap:254},{r:30,b:107,cap:172}]},
  { model:"Liebherr LR 11000",        type:"crawler", maxCap:1000, selfWeight:220,
    chart:[{r:6,b:36,cap:1000},{r:9,b:42,cap:840},{r:12,b:54,cap:680},{r:18,b:66,cap:460},{r:24,b:84,cap:310},{r:30,b:96,cap:210}]},
  { model:"Manitowoc 18000 (990T)",   type:"crawler", maxCap:990,  selfWeight:218,
    chart:[{r:6,b:36,cap:990},{r:9,b:44,cap:832},{r:12,b:56,cap:672},{r:18,b:72,cap:454},{r:24,b:90,cap:306},{r:30,b:108,cap:208}]},
  { model:"Demag CC 8800 (1600T)",    type:"crawler", maxCap:1600, selfWeight:320,
    chart:[{r:6,b:38,cap:1600},{r:9,b:46,cap:1344},{r:12,b:58,cap:1086},{r:18,b:74,cap:732},{r:24,b:92,cap:494},{r:36,b:116,cap:288}]},
  { model:"Terex CC 8800-1 (1600T)",  type:"crawler", maxCap:1600, selfWeight:320,
    chart:[{r:6,b:38,cap:1600},{r:9,b:46,cap:1340},{r:12,b:58,cap:1080},{r:18,b:74,cap:730},{r:24,b:92,cap:492},{r:36,b:116,cap:286}]},
  { model:"Manitowoc MLC2000",        type:"crawler", maxCap:2000, selfWeight:380,
    chart:[{r:6,b:40,cap:2000},{r:9,b:48,cap:1680},{r:12,b:60,cap:1360},{r:18,b:78,cap:920},{r:24,b:96,cap:620},{r:36,b:120,cap:360}]},
  { model:"Manitowoc 31000 (2300T)",  type:"crawler", maxCap:2300, selfWeight:440,
    chart:[{r:6,b:42,cap:2300},{r:9,b:50,cap:1930},{r:12,b:64,cap:1560},{r:18,b:82,cap:1050},{r:24,b:100,cap:710},{r:36,b:128,cap:414}]},
  { model:"Liebherr LR 12500 (2500T)",type:"crawler", maxCap:2500, selfWeight:500,
    chart:[{r:8,b:46,cap:2500},{r:12,b:58,cap:2100},{r:18,b:76,cap:1500},{r:24,b:94,cap:1034},{r:36,b:118,cap:624},{r:48,b:142,cap:366}]},
  { model:"Liebherr LR 13000 (3000T)",type:"crawler", maxCap:3000, selfWeight:520,
    chart:[{r:8,b:48,cap:3000},{r:12,b:60,cap:2520},{r:18,b:78,cap:1800},{r:24,b:96,cap:1240},{r:36,b:120,cap:750},{r:48,b:144,cap:440}]},
];

// ── MATERIALS ─────────────────────────────────────────────────────────────────
const MATERIALS = [
  {name:"Mild Steel",density:7850},{name:"Stainless Steel 304",density:7900},
  {name:"Stainless Steel 316L",density:7980},{name:"Aluminium 6061",density:2700},
  {name:"Aluminium 5083",density:2660},{name:"Cast Iron",density:7200},
  {name:"Copper",density:8900},{name:"Brass",density:8500},
  {name:"Titanium",density:4500},{name:"Concrete (reinforced)",density:2400},
  {name:"Concrete (plain)",density:2300},{name:"Timber (softwood)",density:600},
  {name:"Timber (hardwood)",density:900},{name:"HDPE Plastic",density:950},
  {name:"Custom / Override",density:0},
];

const SHAPES = [
  {name:"Rectangular Plate",inputs:["L","W","T"],formula:"L × W × T"},
  {name:"Solid Cylinder",inputs:["OD","Length"],formula:"π × (OD/2)² × L"},
  {name:"Hollow Pipe / Tube",inputs:["OD","ID","Length"],formula:"π × [(OD/2)² − (ID/2)²] × L"},
  {name:"Square Bar",inputs:["Side","Length"],formula:"A² × L"},
  {name:"Round Bar (Solid Rod)",inputs:["Diameter","Length"],formula:"π × (D/2)² × L"},
  {name:"Sphere",inputs:["Radius"],formula:"(4/3) × π × R³"},
  {name:"Irregular (user volume)",inputs:["Volume"],formula:"User input"},
];

const DAF_TABLE = [ // kept for backward compat reference
  {condition:"Onshore / Simple Lift",daf:1.05},{condition:"Onshore / Complex Lift",daf:1.10},
  {condition:"Onshore / Tandem Lift",daf:1.15},{condition:"Onshore / Blind Lift",daf:1.15},
  {condition:"Offshore / Calm / < 0.5m Hs",daf:1.10},{condition:"Offshore / Moderate / 0.5–2.0m Hs",daf:1.25},
  {condition:"Offshore / Rough / > 2.0m Hs",daf:1.35},{condition:"Offshore / Subsea / Below Keel",daf:1.50},
  {condition:"Pick & Carry — Level Hardstand",daf:1.10},{condition:"Pick & Carry — Uneven Ground",daf:1.25},
];

// v1.3 — Full DAF matrix cross-referencing environment + lift type
const DAF_MATRIX = [
  {env:"onshore",lift:"Standard Lift",      label:"Onshore / Standard Lift",          daf:1.05},
  {env:"onshore",lift:"Blind Lift",         label:"Onshore / Blind Lift",             daf:1.10},
  {env:"onshore",lift:"High Elevated Lift", label:"Onshore / High Elevated (>15m)",   daf:1.10},
  {env:"onshore",lift:"Pick & Carry",       label:"Onshore / Pick & Carry",           daf:1.10},
  {env:"onshore",lift:"Tilting / Upending", label:"Onshore / Tilting / Upending",     daf:1.15},
  {env:"onshore",lift:"Tandem Lift",        label:"Onshore / Tandem Lift",            daf:1.15},
  {env:"onshore",lift:"Man-Riding / Personnel",label:"Onshore / Man-Riding (LOLER)", daf:1.25},
  {env:"offshore",lift:"Standard Lift",     label:"Offshore / Calm / <0.5m Hs",      daf:1.10, hsMax:0.5},
  {env:"offshore",lift:"Moderate",          label:"Offshore / Moderate / 0.5–2.0m Hs",daf:1.25, hsMin:0.5, hsMax:2.0},
  {env:"offshore",lift:"Rough",             label:"Offshore / Rough / >2.0m Hs",     daf:1.35, hsMin:2.0},
  {env:"offshore",lift:"Tandem Lift",       label:"Offshore / Tandem",                daf:1.30},
  {env:"offshore",lift:"Subsea / Below Keel",label:"Offshore / Subsea",              daf:1.50},
  {env:"offshore",lift:"Man-Riding / Personnel",label:"Offshore / Man-Riding",       daf:1.35},
];

const DUTY_FACTORS = {A1:1.00,A2:1.00,A3:1.00,A4:0.95,A5:0.90};
const SPECIAL_LIFTS = ["Standard Lift","Tandem Lift","Tilting / Upending","Blind Lift","High Elevated Lift","Pick & Carry","Man-Riding / Personnel"];

const WIND_SHAPES = [
  {name:"Flat Plate (face-on)",cf:1.80},{name:"Flat Plate (edge-on)",cf:1.30},
  {name:"Circular Cylinder (smooth)",cf:1.20},{name:"Circular Cylinder (rough)",cf:0.80},
  {name:"Square Section",cf:2.10},{name:"Rectangular Section (L/B=2)",cf:1.60},
  {name:"Lattice / Open Truss",cf:1.30},{name:"Sphere (smooth)",cf:0.50},
  {name:"Tank / Vessel (vertical)",cf:0.80},{name:"Tank / Vessel (horizontal)",cf:1.20},
  {name:"I-Beam (face-on)",cf:1.70},{name:"I-Beam (edge-on)",cf:1.40},
];

const SOIL_TABLE = [
  {type:"Dense Gravel / Compacted Hardcore",gbp:600},
  {type:"Dense Sand / Gravel",gbp:400},
  {type:"Medium Dense Sand",gbp:300},
  {type:"Loose Sand",gbp:100,warn:"⚠ Low — verify"},
  {type:"Stiff Clay",gbp:150},
  {type:"Firm Clay",gbp:75},
  {type:"Soft Clay",gbp:25,warn:"⚠ Mat required"},
  {type:"Peat / Organic",gbp:0,warn:"⛔ Not suitable"},
  {type:"Concrete Slab 150mm RC",gbp:500},
  {type:"Concrete Slab 100mm plain",gbp:300},
  {type:"Rock (sound)",gbp:1000},
  {type:"Hardcore / Road Base",gbp:200},
];

const SLING_ANGLES = [
  {angle:90,k:1.000,status:"✅ Maximum efficiency"},
  {angle:85,k:0.996,status:"✅"},
  {angle:75,k:0.966,status:"✅"},
  {angle:60,k:0.866,status:"✅ Acceptable"},
  {angle:45,k:0.707,status:"⚠️ MINIMUM RECOMMENDED"},
  {angle:30,k:0.500,status:"🔴 CRITICAL — Avoid"},
  {angle:20,k:0.342,status:"⛔ DANGEROUS"},
  {angle:15,k:0.259,status:"⛔ PROHIBITED"},
];

const MODULES = [
  {id:0,icon:"🏠",label:"Project Info & Summary"},
  {id:1,icon:"⚖️",label:"Weight Calculation"},
  {id:2,icon:"🏗",label:"Crane Selection"},
  {id:3,icon:"🌍",label:"Ground Bearing Pressure"},
  {id:4,icon:"🪢",label:"Rigging Calculation"},
  {id:5,icon:"💨",label:"Wind Load Calculation"},
  {id:6,icon:"📐",label:"Centre of Gravity (COG)"},
  {id:7,icon:"📊",label:"Utilization Dashboard"},
  {id:8,icon:"🔩",label:"Rigging Equipment Ref."},
  {id:9,icon:"⛔",label:"Discard Criteria"},
  {id:10,icon:"✅",label:"Load Test & Proof Load"},
  {id:11,icon:"🔧",label:"Crane Config Validation"},
  {id:12,icon:"🌤",label:"Weather & Environment"},
  {id:13,icon:"👷",label:"Human Factor Check"},
  {id:14,icon:"📋",label:"Lift Sequence Planner"},
  {id:15,icon:"🚧",label:"Exclusion Zone Calc"},
  {id:16,icon:"💥",label:"Dropped Object Risk"},
  {id:17,icon:"🔄",label:"Redundancy Check"},
  {id:18,icon:"📐",label:"Pythagorean Calculator"},
  {id:19,icon:"📏",label:"Unit Converter"},
];

// ── UTILITY HELPERS ────────────────────────────────────────────────────────────
const toT = (val, unit) => {
  if (!val || isNaN(val)) return 0;
  const v = parseFloat(val);
  if (unit==="kg") return v/1000;
  if (unit==="kN") return v/9.81;
  return v; // T
};
const toM = (val, unit) => {
  if (!val || isNaN(val)) return 0;
  const v = parseFloat(val);
  if (unit==="mm") return v/1000;
  if (unit==="cm") return v/100;
  return v;
};
const f2 = v => (isNaN(v)||!isFinite(v)) ? "—" : parseFloat(v).toFixed(2);
const f3 = v => (isNaN(v)||!isFinite(v)) ? "—" : parseFloat(v).toFixed(3);
const fN = (v,n=2) => (isNaN(v)||!isFinite(v)) ? "—" : parseFloat(v).toFixed(n);
const utilClass = u => u>=100?"overload":u>=90?"critical":u>=75?"warning":"safe";

const interpChart = (chart, radius) => {
  if (!chart||!chart.length) return 0;
  const sorted = [...chart].sort((a,b)=>a.r-b.r);
  if (radius <= sorted[0].r) return sorted[0].cap;
  if (radius >= sorted[sorted.length-1].r) return sorted[sorted.length-1].cap;
  for (let i=0;i<sorted.length-1;i++) {
    if (radius>=sorted[i].r && radius<=sorted[i+1].r) {
      const t = (radius-sorted[i].r)/(sorted[i+1].r-sorted[i].r);
      return sorted[i].cap + t*(sorted[i+1].cap-sorted[i].cap);
    }
  }
  return 0;
};

// ── CSS ────────────────────────────────────────────────────────────────────────
const CSS = `

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  /* Backgrounds */
  --bg-app:#f0f2f5;--bg-primary:#ffffff;--bg-secondary:#f8f9fa;
  --bg-card:#ffffff;--bg-section:#f4f6f8;--bg-input:#ffffff;
  --bg-table-row:#ffffff;--bg-table-alt:#f8f9fa;--bg-table-head:#f0f2f5;
  /* Brand */
  --orange-500:#f97316;--orange-600:#ea6c00;--orange-700:#c2570a;
  --red-brand:#c00000;
  /* Status */
  --green-500:#16a34a;--green-400:#15803d;
  --green-bg:#f0fdf4;--green-border:#86efac;
  --amber-500:#d97706;--amber-400:#b45309;
  --amber-bg:#fffbeb;--amber-border:#fde68a;
  --red-500:#dc2626;--red-400:#b91c1c;
  --red-bg:#fef2f2;--red-border:#fecaca;
  --blue-400:#2563eb;--blue-500:#1d4ed8;
  --blue-bg:#eff6ff;--blue-border:#bfdbfe;
  /* Text */
  --text-primary:#111827;--text-secondary:#374151;--text-muted:#6b7280;
  --text-orange:#ea6c00;--text-green:#15803d;--text-amber:#92400e;
  --text-red:#991b1b;--text-blue:#1d4ed8;
  /* Borders */
  --border-subtle:#f3f4f6;--border-default:#e5e7eb;--border-strong:#d1d5db;
  --border-orange:rgba(249,115,22,0.30);
  /* Inputs */
  --input-bg:#ffffff;--input-border:#d1d5db;
  --input-label-fg:#ea6c00;--calc-bg:#eff6ff;
  --calc-border:#bfdbfe;--calc-label-fg:#1d4ed8;
  /* Fonts */
  --font-display:'Arial',sans-serif;
  --font-body:'Arial',sans-serif;
  --font-mono:'Arial',monospace;
  /* Shadows */
  --shadow-card:0 1px 3px rgba(0,0,0,0.08),0 1px 2px rgba(0,0,0,0.05);
  --shadow-card-hover:0 4px 12px rgba(0,0,0,0.10),0 1px 4px rgba(0,0,0,0.06);
  /* Misc */
  --t-base:180ms ease;--t-slow:300ms ease;
  --t-spring:350ms cubic-bezier(0.34,1.56,0.64,1);
  --radius-sm:4px;--radius-md:8px;--radius-lg:10px;
}

html,body{height:100%;font-family:var(--font-body);background:var(--bg-app);color:var(--text-primary);font-size:14px;line-height:1.5}

/* ── APP SHELL ── */
.app-root{display:flex;flex-direction:column;height:100vh;overflow:hidden;background:var(--bg-app)}

/* ── TOPBAR ── */
.topbar{height:92px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;
  padding:0 20px;background:#ffffff;
  border-bottom:3px solid #c00000;
  box-shadow:0 2px 8px rgba(0,0,0,0.08);
  z-index:100;position:relative}
.topbar-brand{display:flex;align-items:center;gap:12px}
.logo-divider{width:1px;height:36px;background:linear-gradient(180deg,transparent,#e5e7eb 25%,#e5e7eb 75%,transparent);flex-shrink:0;margin:0 4px}
.topbar-author-block{display:flex;flex-direction:column;gap:2px}
.topbar-author-name{font-family:'Arial Black',Arial,sans-serif;font-size:11px;font-weight:900;
  color:#b8864e;letter-spacing:0.1em;text-transform:uppercase;line-height:1}
.topbar-author-email{font-family:monospace;font-size:10px;color:#9ca3af;
  text-decoration:none;transition:color var(--t-base)}
.topbar-author-email:hover{color:#c00000}
.unsaved-dot{width:8px;height:8px;border-radius:50%;background:#f59e0b;animation:pulse 2s infinite}
.unsaved-label{font-size:10px;color:#6b7280;font-family:monospace}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}

/* ── STATUS BANNERS ── */
.banner{padding:6px 14px;border-radius:var(--radius-md);font-family:var(--font-display);
  font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;
  display:flex;align-items:center;gap:6px;white-space:nowrap}
.banner-idle{background:#f3f4f6;border:1px solid #d1d5db;color:#374151}
.banner-pass{background:#f0fdf4;border:1px solid #86efac;color:#15803d;animation:passGlow 3s ease-in-out infinite}
.banner-warn{background:#fffbeb;border:1px solid #fde68a;color:#92400e;animation:warningBreathe 2.5s ease-in-out infinite}
.banner-fail{background:#fef2f2;border:1px solid #fecaca;color:#991b1b;animation:failPulse 1.8s ease-in-out infinite}
@keyframes passGlow{0%,100%{box-shadow:0 0 8px rgba(22,163,74,0.15)}50%{box-shadow:0 0 18px rgba(22,163,74,0.30)}}
@keyframes warningBreathe{0%,100%{opacity:0.9}50%{opacity:1}}
@keyframes failPulse{0%,100%{opacity:0.9}50%{opacity:1}}

/* ── SIDEBAR ── */
.sidebar{width:240px;flex-shrink:0;overflow-y:auto;
  background:#1e2329;border-right:1px solid #2d3748}
.sidebar::-webkit-scrollbar{width:4px}
.sidebar::-webkit-scrollbar-thumb{background:#374151;border-radius:2px}
.sidebar-header{padding:14px 16px 8px;font-family:var(--font-display);font-size:9px;
  letter-spacing:0.15em;text-transform:uppercase;color:#9ca3af}
.sidebar-item{display:flex;align-items:center;gap:10px;padding:9px 16px;cursor:pointer;
  border-left:3px solid transparent;font-size:13px;color:#9ca3af;
  transition:all var(--t-base)}
.sidebar-item:hover{background:rgba(249,115,22,0.08);color:#f3f4f6;border-left-color:rgba(249,115,22,0.4)}
.sidebar-item.active{background:linear-gradient(90deg,rgba(249,115,22,0.18) 0%,rgba(249,115,22,0.05) 100%);
  border-left-color:#f97316;color:#ffffff}
.sidebar-icon{font-size:14px;width:18px;text-align:center}
.sidebar-label{flex:1;font-size:12px;line-height:1.3}
.sidebar-badge{font-size:10px;width:16px;height:16px;border-radius:50%;
  display:flex;align-items:center;justify-content:center}
.sidebar-badge.pass{background:rgba(22,163,74,0.15);color:#4ade80}
.sidebar-badge.warn{background:rgba(217,119,6,0.15);color:#fbbf24}
.sidebar-badge.fail{background:rgba(220,38,38,0.15);color:#f87171}

/* ── CONTENT AREA ── */
.app-body{display:flex;flex:1;overflow:hidden}
.content{flex:1;overflow-y:auto;padding:24px 28px;background:var(--bg-app)}
.content::-webkit-scrollbar{width:5px}
.content::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}

/* ── MODULE CARDS ── */
.module-card{background:#ffffff;border:1px solid #e5e7eb;
  border-radius:var(--radius-lg);box-shadow:var(--shadow-card);margin-bottom:18px;
  animation:scaleIn 350ms cubic-bezier(0.16,1,0.3,1) both}
.card-header{background:linear-gradient(90deg,#fff7ed 0%,#ffffff 100%);
  border-bottom:2px solid #fed7aa;border-radius:var(--radius-lg) var(--radius-lg) 0 0;
  padding:12px 18px;display:flex;align-items:center;justify-content:space-between}
.module-title{font-family:var(--font-display);font-weight:800;font-size:15px;
  letter-spacing:0.08em;text-transform:uppercase;color:#1a1a1a}
.card-body{padding:18px 18px 14px}

/* ── SECTION HEADING ── */
.section-heading{font-family:var(--font-display);font-weight:700;font-size:11px;
  letter-spacing:0.14em;text-transform:uppercase;color:#ea6c00;
  padding:14px 0 8px;border-bottom:2px solid #fde8cc;margin-bottom:14px}

/* ── FORM GRID ── */
.form-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.form-row{display:flex;flex-direction:column;gap:5px}
.label-input{font-family:var(--font-display);font-size:10px;font-weight:700;
  color:#ea6c00;letter-spacing:0.08em;text-transform:uppercase}
.label-calc{font-family:var(--font-display);font-size:10px;font-weight:700;
  color:#1d4ed8;letter-spacing:0.08em;text-transform:uppercase}
.input-wrap{display:flex;align-items:stretch}
.input-user{background:#ffffff;border:1.5px solid #d1d5db;
  color:#111827;padding:8px 11px;border-radius:var(--radius-sm) 0 0 var(--radius-sm);
  font-size:13px;font-family:var(--font-body);flex:1;min-width:0;
  transition:border-color var(--t-base),box-shadow var(--t-base)}
.input-user:focus{outline:none;border-color:#f97316;box-shadow:0 0 0 3px rgba(249,115,22,0.10)}
.input-user.no-unit{border-radius:var(--radius-sm)}
.input-calc{background:#eff6ff;border:1.5px solid #bfdbfe;
  color:#1d4ed8;padding:8px 11px;border-radius:var(--radius-sm);
  font-size:13px;font-family:var(--font-mono);width:100%;cursor:default}
.unit-sel{background:#f9fafb;border:1.5px solid #d1d5db;border-left:none;
  color:#374151;font-size:11px;font-family:var(--font-mono);
  padding:0 8px;cursor:pointer;border-radius:0 var(--radius-sm) var(--radius-sm) 0;
  transition:all var(--t-base)}
.unit-sel:hover{border-color:#f97316;color:#f97316}
select.input-user{cursor:pointer}
textarea.input-user{resize:vertical;min-height:60px;border-radius:var(--radius-sm)}

/* ── RESULTS ── */
.result-large{font-family:var(--font-mono);font-size:26px;font-weight:600;color:#1d4ed8;line-height:1}
.result-row{display:flex;align-items:center;gap:14px;padding:10px 14px;
  background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:var(--radius-md);margin:8px 0}
.result-glw{background:#fff7ed;border:1.5px solid #fed7aa;border-left:3px solid #f97316;padding:14px 18px}
.glw-val{font-family:var(--font-mono);font-size:30px;font-weight:600;color:#ea6c00}

/* ── UTIL BAR ── */
.util-bar-wrap{background:#e5e7eb;border-radius:20px;height:8px;overflow:hidden;margin:6px 0}
.util-bar-fill{height:100%;border-radius:20px;transition:width 600ms cubic-bezier(0.22,1,0.36,1)}
.util-safe .util-bar-fill{background:#16a34a}
.util-warning .util-bar-fill{background:#d97706}
.util-critical .util-bar-fill{background:#dc2626}
.util-overload .util-bar-fill{background:#991b1b}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;
  border-radius:var(--radius-md);font-size:10px;font-family:var(--font-display);
  font-weight:700;letter-spacing:0.08em;text-transform:uppercase}
.badge-pass{background:#f0fdf4;border:1px solid #86efac;color:#15803d}
.badge-warn{background:#fffbeb;border:1px solid #fde68a;color:#92400e}
.badge-fail{background:#fef2f2;border:1px solid #fecaca;color:#991b1b}
.badge-info{background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8}
.badge-idle{background:#f3f4f6;border:1px solid #e5e7eb;color:#6b7280}

/* ── INFO BOXES ── */
.info-box{padding:10px 14px;border-radius:var(--radius-md);font-size:13px;line-height:1.6;margin:8px 0}
.info-box-orange{background:#fff7ed;border:1px solid #fed7aa;border-left:3px solid #f97316;color:#7c2d12}
.info-box-red{background:#fef2f2;border:1px solid #fecaca;border-left:3px solid #dc2626;color:#7f1d1d}
.info-box-green{background:#f0fdf4;border:1px solid #86efac;border-left:3px solid #16a34a;color:#14532d}
.info-box-amber{background:#fffbeb;border:1px solid #fde68a;border-left:3px solid #d97706;color:#78350f}
.info-box-blue{background:#eff6ff;border:1px solid #bfdbfe;border-left:3px solid #2563eb;color:#1e3a8a}

/* ── TABLES ── */
.table-wrap{overflow-x:auto;border-radius:var(--radius-md);border:1px solid #e5e7eb}
.data-table{width:100%;border-collapse:collapse;font-size:12px}
.data-table th{background:#f8f9fa;color:#ea6c00;font-family:var(--font-display);font-size:10px;
  letter-spacing:0.1em;text-transform:uppercase;border-bottom:2px solid #fed7aa;
  padding:9px 12px;text-align:left;font-weight:700}
.data-table td{padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#1f2937}
.data-table tr:nth-child(even) td{background:#ffffff}
.data-table tr:nth-child(odd) td{background:#fafafa}
.data-table tr:hover td{background:#fff7ed;color:#111827;transition:background var(--t-base)}
.data-table tr.highlight td{background:#fff3e0;color:#1a1a1a;font-weight:600}

/* ── TABS ── */
.tab-bar{display:flex;border-bottom:2px solid #e5e7eb;margin-bottom:16px;overflow-x:auto}
.tab-btn{padding:8px 16px;font-family:var(--font-display);font-size:12px;font-weight:700;
  letter-spacing:0.06em;text-transform:uppercase;border:none;background:transparent;
  color:#9ca3af;cursor:pointer;border-bottom:2px solid transparent;
  margin-bottom:-2px;transition:all var(--t-base);white-space:nowrap}
.tab-btn:hover{color:#111827}
.tab-btn.active{color:#f97316;border-bottom-color:#f97316}

/* ── TOGGLE ── */
.toggle-wrap{display:flex;align-items:center;gap:8px}
.toggle{position:relative;width:40px;height:22px;cursor:pointer}
.toggle input{opacity:0;width:0;height:0}
.toggle-track{position:absolute;inset:0;border-radius:11px;background:#d1d5db;transition:background var(--t-base)}
.toggle input:checked~.toggle-track{background:rgba(249,115,22,0.20)}
.toggle-thumb{position:absolute;width:16px;height:16px;top:3px;left:3px;
  border-radius:50%;background:#9ca3af;transition:transform var(--t-spring),background var(--t-base)}
.toggle input:checked~.toggle-thumb{transform:translateX(18px);background:#f97316}

/* ── BUTTONS ── */
.btn{padding:8px 16px;border-radius:var(--radius-md);font-family:var(--font-display);
  font-weight:700;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;
  cursor:pointer;transition:all var(--t-base);border:none}
.btn-primary{background:linear-gradient(135deg,#f97316,#ea6c00);color:#fff;
  box-shadow:0 2px 8px rgba(249,115,22,0.30)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(249,115,22,0.40)}
.btn-ghost{background:#ffffff;border:1.5px solid #d1d5db;color:#374151}
.btn-ghost:hover{border-color:#f97316;color:#f97316}
.btn-sm{padding:5px 10px;font-size:11px}

/* ── STAT CARDS ── */
.stat-card{background:#ffffff;border:1px solid #e5e7eb;
  border-radius:var(--radius-md);padding:14px 16px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.stat-label{font-size:10px;font-family:var(--font-display);letter-spacing:0.1em;
  text-transform:uppercase;color:#6b7280;margin-bottom:6px}
.stat-val{font-family:var(--font-mono);font-size:22px;font-weight:600;color:#1d4ed8}
.stat-unit{font-size:12px;color:#9ca3af;margin-left:4px;font-family:var(--font-body)}

/* ── STD TAG ── */
.std-tag{font-size:11px;padding:0;border-radius:0;
  background:none;border:none;
  color:#374151;font-family:Arial,sans-serif;font-weight:600;letter-spacing:0}

/* ── FORMULA PANEL ── */
.formula-panel{background:#f8f9fa;border:1px solid #e5e7eb;border-left:3px solid #f97316;
  border-radius:0 var(--radius-sm) var(--radius-sm) 0;
  padding:10px 14px;font-family:var(--font-mono);font-size:11px;color:#1f2937;
  margin-top:8px;line-height:1.9}
.formula-toggle{display:flex;align-items:center;gap:6px;cursor:pointer;
  font-size:11px;color:#9ca3af;padding:4px 0;transition:color var(--t-base)}
.formula-toggle:hover{color:#f97316}

/* ── GRID LAYOUTS ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
@media(max-width:900px){.grid-4{grid-template-columns:1fr 1fr}.grid-3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}}

/* ── SVG DIAGRAM ── */
.svg-diagram{background:#f8fafc;border:1px solid #e2e8f0;border-radius:var(--radius-md);overflow:hidden}

/* ── REF PANEL ── */
.ref-toggle{display:flex;align-items:center;gap:8px;cursor:pointer;padding:10px 16px;
  background:#f9fafb;border:1px solid #e5e7eb;border-left:3px solid #f97316;
  border-radius:var(--radius-sm);font-family:var(--font-display);font-size:12px;
  letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;
  transition:color var(--t-base);width:100%}
.ref-toggle:hover{color:#ea6c00}
.ref-chevron{transition:transform 200ms ease;font-size:10px;margin-left:auto}
.ref-chevron.open{transform:rotate(180deg)}
.ref-panel{background:#fafafa;border-left:3px solid #f97316;
  border-radius:0 var(--radius-sm) var(--radius-sm) 0;font-size:11px;color:#374151}
.ref-panel-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:12px 14px}
@media(max-width:700px){.ref-panel-cols{grid-template-columns:1fr}}
.ref-col{background:#ffffff;border:1px solid #e5e7eb;padding:12px 14px;border-radius:4px}
.ref-col-head{font-family:var(--font-display);font-size:9px;letter-spacing:0.12em;
  text-transform:uppercase;color:#ea6c00;margin-bottom:10px;padding-bottom:6px;
  border-bottom:1px solid #f3f4f6}
.ref-entry{margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #f3f4f6}
.ref-entry:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none}
.ref-term{color:#ea6c00;font-family:var(--font-mono);font-size:11px;font-weight:600;display:block;margin-bottom:2px}
.ref-def{color:#1f2937;font-size:12px;line-height:1.6}
.ref-expr{color:#1d4ed8;font-family:var(--font-mono);font-size:11px;background:#eff6ff;
  padding:4px 8px;border-radius:3px;display:block;margin:4px 0}
.ref-std-code{color:#ea6c00;font-family:var(--font-mono);font-size:11px;font-weight:600}
.ref-std-title{color:#374151;font-size:11px;display:block;margin-top:1px}

/* ── MODULE NAV BAR ── */
.module-nav{background:#1e2329;border-top:1px solid #2d3748;
  padding:10px 20px;display:flex;justify-content:space-between;align-items:center;
  flex-shrink:0}
.nav-btn{background:#2d3748;border:1px solid #374151;color:#9ca3af;
  font-family:var(--font-display);font-size:11px;font-weight:700;letter-spacing:0.08em;
  text-transform:uppercase;padding:8px 16px;border-radius:var(--radius-md);
  cursor:pointer;transition:all var(--t-base)}
.nav-btn:hover{border-color:#f97316;color:#f97316}
.nav-btn-primary{background:linear-gradient(135deg,#f97316,#ea6c00);border-color:#f97316;color:#fff;
  box-shadow:0 2px 8px rgba(249,115,22,0.30)}
.nav-btn-primary:hover{box-shadow:0 4px 14px rgba(249,115,22,0.45);transform:translateY(-1px)}
.nav-info{font-family:var(--font-display);font-size:11px;color:#374151;
  letter-spacing:0.06em;text-transform:uppercase}

/* ── CHECKLIST ── */
.check-item{display:flex;align-items:center;gap:10px;padding:8px 12px;
  border-radius:var(--radius-sm);transition:background var(--t-base)}
.check-item:hover{background:#fff7ed}
.check-label{font-size:13px;color:#111827;flex:1}
.check-pass{color:#15803d;font-size:11px;font-weight:600}
.check-fail{color:#b91c1c;font-size:11px;font-weight:600}

/* ── ABOUT MODAL ── */
.about-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);
  display:flex;align-items:center;justify-content:center;z-index:9999;
  animation:fadeIn 200ms ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.about-modal{background:#ffffff;border-radius:12px;width:480px;max-width:94vw;
  box-shadow:0 24px 64px rgba(0,0,0,0.18),0 0 0 1px rgba(0,0,0,0.06);
  animation:modalIn 250ms cubic-bezier(0.16,1,0.3,1)}
@keyframes modalIn{from{transform:scale(0.95) translateY(8px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.about-header{background:linear-gradient(135deg,#1e2329,#2d3748);
  padding:24px 28px 20px;border-radius:12px 12px 0 0;
  display:flex;align-items:flex-start;justify-content:space-between}
.about-close{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);
  color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:14px;
  display:flex;align-items:center;justify-content:center;transition:background 150ms ease;flex-shrink:0}
.about-close:hover{background:rgba(192,0,0,0.6)}
.about-body{padding:24px 28px 28px}
.about-row{display:flex;align-items:center;gap:12px;padding:10px 0;
  border-bottom:1px solid #f3f4f6}
.about-row:last-child{border-bottom:none}
.about-key{font-family:Arial,sans-serif;font-size:11px;font-weight:700;
  color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;width:90px;flex-shrink:0}
.about-val{font-family:Arial,sans-serif;font-size:13px;color:#111827;flex:1}
.about-val a{color:#c00000;text-decoration:none}
.about-val a:hover{text-decoration:underline}
.about-std-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;margin-top:4px}
.about-std-item{font-family:Arial,monospace;font-size:11px;color:#374151;
  display:flex;align-items:center;gap:5px}
.about-std-item::before{content:"";width:4px;height:4px;border-radius:50%;
  background:#c00000;flex-shrink:0}
.about-btn-info{background:transparent;border:1.5px solid #d1d5db;color:#6b7280;
  width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:14px;font-weight:700;
  display:flex;align-items:center;justify-content:center;transition:all 150ms ease;
  font-family:Arial,sans-serif}
.about-btn-info:hover{border-color:#c00000;color:#c00000;background:#fef2f2}

/* ── BACK TO TOP ── */
.btn-back-top{position:fixed;bottom:80px;right:20px;width:44px;height:44px;
  border-radius:50%;background:#f97316;color:#fff;font-size:16px;
  display:flex;align-items:center;justify-content:center;cursor:pointer;
  opacity:0;transition:opacity 200ms ease;
  box-shadow:0 4px 14px rgba(249,115,22,0.35);z-index:999;border:none;pointer-events:none}
.btn-back-top.visible{opacity:1;pointer-events:auto}

/* ── ANIMATIONS ── */
@keyframes slideDownFade{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes fadeSlideUp{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes scaleIn{from{transform:scale(0.98);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes checkBounce{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}

/* ── PRINT ── */
@media print{
  .sidebar,.topbar,.module-nav,.ref-toggle,.btn{display:none!important}
  .content{padding:0;overflow:visible}
  .module-card{break-inside:avoid;box-shadow:none;border:1px solid #ccc}
}
`;

// ── PER-MODULE PERSISTENCE (FIX 8) ────────────────────────────────────────────
const STORE_KEY = "rigcalcpro_session";
const loadStore = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)||"{}"); } catch{return {};} };
const saveStore = (d) => { try { localStorage.setItem(STORE_KEY,JSON.stringify(d)); } catch{} };

// ── REFERENCE DATA — 3-COLUMN (Terms | Formulas | Standards) ─────────────────
const REF_DATA = {
  0:{
    terms:[
      {t:"Lift Classification",d:"Routine: ≤75% crane cap, known COG, single crane. Engineered: method statement + engineer sign-off. Critical: >75% cap, tandem, blind, over personnel/live plant, unknown COG."},
      {t:"Method Statement",d:"Written step-by-step procedure for executing the lift. Mandatory for engineered and critical lifts."},
      {t:"Competent Person",d:"Sufficient practical and theoretical knowledge to detect defects and assess risk. Defined by LOLER 1998."},
      {t:"Approval Chain",d:"Lift Engineer → Rigging Supervisor → Safety Officer → Client Representative → Third-Party Inspector. All must sign for critical lifts."},
      {t:"Revision Number",d:"Increment on any change to inputs, conditions, or personnel. Earlier revisions superseded and archived."},
    ],
    formulas:[
      {n:"GLW",e:"Net Weight × (1 + Rigging%) × (1 + Contingency%)"},
      {n:"Dynamic Load",e:"DL = GLW × DAF"},
      {n:"Crane Utilization",e:"U% = DL ÷ Effective Capacity × 100"},
      {n:"Overall Status",e:"PASS only if ALL modules individually pass"},
    ],
    stds:[
      {c:"LOLER 1998",t:"Lifting Operations Regs — duty holder, inspection frequency, competent person."},
      {c:"PUWER 1998",t:"Work Equipment — maintenance, inspection, suitable for purpose."},
      {c:"BS 7121-1",t:"Safe Use of Cranes — lift planning, classification."},
      {c:"ISO 12480-1",t:"International equivalent to BS 7121-1."},
    ]
  },
  1:{
    terms:[
      {t:"Net Weight",d:"Actual mass of the object only. No allowances included. By geometry+density or certified weighing."},
      {t:"Density (ρ)",d:"Mass per unit volume (kg/m³). Steel=7850, Concrete=2400, Aluminium=2700."},
      {t:"Rigging Allowance",d:"% added for slings, shackles, hook block, spreader beams. Default 10%. Range 5–15%."},
      {t:"Contingency Allowance",d:"% added for weight uncertainty: coatings, contents, tolerances. Default 5%. Range 5–10%."},
      {t:"GLW — Gross Lift Weight",d:"Total weight for all downstream calculations. Net weight plus all allowances."},
      {t:"Certified Weight",d:"Confirmed by weighbridge, load cell, or manufacturer data sheet. More accurate than geometry."},
    ],
    formulas:[
      {n:"Hollow Pipe",e:"V = π × [(OD÷2)² − (ID÷2)²] × L"},
      {n:"Solid Cylinder",e:"V = π × (OD÷2)² × L"},
      {n:"Rectangular Block",e:"V = L × W × T"},
      {n:"Sphere",e:"V = (4÷3) × π × R³"},
      {n:"Net Weight",e:"W(kg) = ρ × V  |  W(T) = W(kg)÷1000  |  W(kN) = W(T)×9.81"},
      {n:"GLW",e:"GLW = W(T) × (1 + Rigging÷100) × (1 + Contingency÷100)"},
    ],
    stds:[
      {c:"BS 7121-1 Sec.6.3",t:"Weight calculation and allowances. Min 10% rigging recommended."},
      {c:"ISO 12480-1 Sec.7.2",t:"Gross lift weight determination method."},
      {c:"DNVGL-ST-N001",t:"Weight control for offshore lifts — tighter tolerances required."},
      {c:"ASME P30.1-2014 Sec.4",t:"Weight determination methods and accuracy requirements for lift planning."},
      {c:"LEEA COPSULE 2020",t:"Weight confirmation — certified weight preferred over calculated for critical lifts."},
    ]
  },
  2:{
    terms:[
      {t:"Working Radius",d:"Horizontal distance from crane slew centre to centre of suspended load. Always measure to load — not rigging attachment point."},
      {t:"Chart Capacity",d:"Rated capacity at a SPECIFIC radius and boom length. Always read from manufacturer load chart. NOT maximum rated capacity."},
      {t:"DAF",d:"Dynamic Amplification Factor — multiplier for dynamic shock loads. Onshore simple=1.05, offshore subsea=1.50."},
      {t:"Duty Class (ISO 4301-1)",d:"A1=Infrequent | A2=Light | A3=Moderate (default) | A4=Heavy | A5=Very heavy/continuous."},
      {t:"Boom Angle",d:"Boom centreline from horizontal. Min 30° per ASME B30.5. Derived: α = arccos(R ÷ L)."},
      {t:"Boom Tip Height",d:"Approx max hook height: L × sin(α). Deduct rigging and hook block depth."},
      {t:"Tandem Lift",d:"Two or more cranes lifting one load. Each crane: share × 1.10 uplift. Separate lift plan per crane. BS 7121-3 Sec.12."},
    ],
    formulas:[
      {n:"Boom Angle",e:"α = arccos(R ÷ L)  [degrees]"},
      {n:"Boom Tip Height",e:"H_tip = L × sin(α)  [metres]"},
      {n:"Dynamic Design Load",e:"DL = GLW × DAF  [T]"},
      {n:"Tandem Load (per crane)",e:"TDL = GLW × Share% × 1.10"},
      {n:"Effective Capacity",e:"CE = Chart Cap × Duty Factor"},
      {n:"Crane Utilization",e:"U% = DL ÷ CE × 100  |  <75% Safe | 75-90% Warn | >90% Critical | >100% Prohibited"},
    ],
    stds:[
      {c:"ASME B30.5",t:"Mobile cranes — load chart use, boom angle min 30° Sec.5-1.3.2."},
      {c:"BS 7121-3",t:"Mobile cranes — tandem lift Sec.12, configuration."},
      {c:"ISO 9374-1",t:"Load chart format and application."},
      {c:"ISO 4301-1",t:"Duty class A1–A5 and duty factor."},
      {c:"ISO 12480-1",t:"DAF selection and dynamic load calculation."},
      {c:"DNVGL-ST-N001",t:"Offshore DAF for sea states, marine warranty."},
      {c:"ASME P30.1-2014 Sec.5",t:"Lift planning — crane selection criteria and capacity verification."},
      {c:"BS EN 13000:2010+A1",t:"Mobile cranes — general. Outrigger distribution factor Annex B Table B.1 (0.50–0.75)."},
      {c:"LEEA COPSULE 2020",t:"Lift category classification and planning requirements per category."},
      {c:"ISO 4306-1:2016",t:"Cranes — vocabulary and definitions used globally."},
    ]
  },
  3:{
    terms:[
      {t:"GBP",d:"Ground Bearing Pressure — force per unit area by outrigger pads or crawler tracks (kN/m²). Must not exceed allowable."},
      {t:"Allowable GBP",d:"Max pressure ground can sustain without shear failure or excessive settlement. From geotechnical report. Never estimate."},
      {t:"Outrigger Reaction — Worst Case",d:"CIRIA C703 Sec.4.3: one outrigger may carry 60–70% of total reaction. Design uses 65% worst-case single pad."},
      {t:"Crawler Track — Worst Case",d:"CIRIA C703 Sec.4.3: one track assumed to carry 55% of total reaction."},
      {t:"Min Required Area",d:"Area needed so GBP ≤ allowable: A_min = Reaction ÷ Allowable GBP."},
      {t:"Cribbing",d:"Timber/steel spreader under outrigger pad to increase contact area and reduce GBP."},
      {t:"Settlement",d:"Vertical deformation under load. Excessive settlement causes crane instability."},
    ],
    formulas:[
      {n:"Total Reaction",e:"TR(kN) = (DDL(T) + Crane Self Weight(T)) × 9.81"},
      {n:"Outrigger (mobile)",e:"OR(kN) = TR × 0.65  [CIRIA C703 worst case]"},
      {n:"Track (crawler)",e:"CR(kN) = TR × 0.55  [CIRIA C703 worst case]"},
      {n:"Calculated GBP",e:"GBP(kN/m²) = Reaction ÷ Effective Contact Area"},
      {n:"Min Required Area",e:"A_min(m²) = Reaction(kN) ÷ Allowable GBP(kN/m²)"},
      {n:"Min Dimension",e:"D_min(m) = √(A_min)"},
    ],
    stds:[
      {c:"CIRIA C703",t:"Crane stability on site — outrigger/crawler GBP, worst-case single pad rule Sec.4.3."},
      {c:"EN 1997-1",t:"Eurocode 7 Geotechnical Design — bearing capacity verification."},
      {c:"BS 8004:2015",t:"Foundations — allowable bearing values for standard soil types."},
      {c:"BS EN ISO 22476",t:"Site investigation — CPT and SPT test methods."},
      {c:"ASME P30.1-2014 Sec.6.6",t:"Ground conditions assessment and documentation requirements."},
      {c:"BS EN 13000 Annex B",t:"Distribution factor values for outrigger loading: 0.50–0.75."},
      {c:"CIRIA C580",t:"Embedded retaining walls — load spread at depth for buried services check."},
      {c:"ASME P30.1 Sec.6.6.3",t:"DAF for crawler crane ground pressure — minimum 1.25 applied."},
    ]
  },
  4:{
    terms:[
      {t:"WLL",d:"Working Load Limit — max load in normal service. WLL = MBL ÷ FoS (min 5:1 for slings)."},
      {t:"K Factor",d:"sin(θh). Sling angle efficiency. At 90°: K=1.000 (max). At 30°: K=0.500 (danger zone)."},
      {t:"Sling Angle θh",d:"Angle from horizontal. Min recommended 45°. Below 30°: PROHIBITED. Lower angle = higher tension."},
      {t:"2-Leg Worst Case Rule",d:"For 3+ legs: statically indeterminate. Only 2 legs assumed to carry full load. Mandatory for engineering sign-off."},
      {t:"Plan Distance (d)",d:"Horizontal distance from lifting point to hook centreline projection. Pythagorean from coordinates."},
      {t:"Hook Height (H)",d:"Vertical from lifting point to hook pin. Auto-calc: H = √(S² − d²)."},
      {t:"Sling Length (S)",d:"Full pin-to-pin length. Auto-calc: S = √(d² + H²)."},
      {t:"Included Angle (β)",d:"Angle between adjacent sling legs. β = 2 × (90° − θh). Higher = more tension."},
    ],
    formulas:[
      {n:"Plan Distance",e:"d = √[(X₂−X₁)² + (Y₂−Y₁)²]"},
      {n:"Hook Height (from S)",e:"H = √(S² − d²)"},
      {n:"Sling Length (from H)",e:"S = √(d² + H²)"},
      {n:"Angles",e:"θv = arctan(d÷H)  |  θh = 90° − θv  |  K = sin(θh)"},
      {n:"Tension per Leg",e:"T = Design Load ÷ (2 × K)  [any leg count ≥ 2]"},
      {n:"Utilization",e:"U% = T per leg ÷ WLL × 100"},
      {n:"Included Angle",e:"β = 2 × (90° − θh)"},
    ],
    stds:[
      {c:"ASME B30.9",t:"Slings — K factor table, WLL, hitch types, 2-leg worst case rule."},
      {c:"BS EN 1492-1",t:"Flat webbing slings — WLL, testing."},
      {c:"BS EN 1492-2",t:"Round slings — WLL, colour code. Violet=1T → Orange=10T."},
      {c:"BS EN 818-4",t:"Chain slings Grade 80 and 100."},
      {c:"BS EN 13889",t:"Forged steel shackles — bow and D-type."},
      {c:"ASME BTH-1",t:"Below-the-hook devices — padeyes, spreader beams."},
      {c:"ASME P30.1-2014 Sec.5.5",t:"Rigging plan requirements, sling selection, COG verification."},
      {c:"LEEA COPSULE 2020",t:"Rigging equipment selection, inspection before use requirements."},
      {c:"ISO 4306-2:2012",t:"Cranes — vocabulary for mobile cranes and rigging terminology."},
      {c:"OSHA 1926.251",t:"Rigging equipment for material handling — US regulatory requirements."},
    ]
  },
  5:{
    terms:[
      {t:"Basic Wind Pressure (q)",d:"Dynamic pressure exerted by moving air. q = 0.5 × ρ × V². Doubles speed = quadruples pressure."},
      {t:"Force Coefficient (Cf)",d:"Shape-dependent drag multiplier. Flat plate face-on=1.8 (highest), sphere=0.5 (lowest)."},
      {t:"Exposed Area (A)",d:"Projected face area perpendicular to wind direction. Use the largest face the wind could hit."},
      {t:"Site Wind Limit",d:"Max speed for lifting. Default BS 7121 = 10 m/s. Override with manufacturer or site permit limit (use most restrictive)."},
      {t:"Beaufort Scale",d:"Wind intensity 0–12. Force 5 (8–10.8 m/s) = approaching limit. Force 6+ = suspend operations."},
      {t:"Vortex Shedding",d:"Oscillating lateral forces on cylinders. f = 0.2 × V ÷ D. Can cause resonance on long cylindrical loads."},
    ],
    formulas:[
      {n:"Wind Pressure",e:"q(N/m²) = 0.5 × ρ × V²"},
      {n:"Wind Force",e:"F(kN) = q × A × Cf ÷ 1000 = 0.5 × ρ × V² × A × Cf ÷ 1000"},
      {n:"Area — Rectangle",e:"A = W × H"},
      {n:"Area — Circle",e:"A = π × (D÷2)²"},
      {n:"Area — Annulus",e:"A = π × [(OD÷2)² − (ID÷2)²]"},
      {n:"Area — Trapezoid",e:"A = 0.5 × (a + b) × H"},
      {n:"Area — Hexagon",e:"A = 0.8660 × AF²"},
      {n:"Speed",e:"m/s×3.6=km/h | m/s×2.237=mph | m/s×1.944=knots"},
    ],
    stds:[
      {c:"EN 1991-1-4",t:"Eurocode 1 Wind Actions — Cf values, terrain categories, gust factors."},
      {c:"BS 7121-1",t:"Max 10 m/s default. Anemometer required at lift height."},
      {c:"ISO 4302",t:"Cranes — wind load assessment for crane structural design."},
      {c:"DNVGL-ST-N001",t:"Offshore wind and sea state limits for crane operations."},
    ]
  },
  6:{
    terms:[
      {t:"Centre of Gravity (COG)",d:"Single point through which total weight acts. Determines hang and whether load is level."},
      {t:"Moment",d:"Weight × perpendicular distance from reference. M = W × d (T·m). Used to locate COG by moment balance."},
      {t:"Eccentricity",d:"Offset of COG from geometric centre. Causes load to hang tilted. Longer leg on heavy side to level."},
      {t:"Geometric Centre",d:"Mathematical centre of load plan. Rectangle: X=L÷2, Y=W÷2."},
      {t:"Stability",d:"Load stable when COG is within the base polygon formed by sling attachment points. If outside — load tips."},
      {t:"Plumb Line Check",d:"Mark COG on load. Hang plumb line from hook. Level when plumb passes through COG mark."},
    ],
    formulas:[
      {n:"COG — X axis",e:"COG_X = Σ(Wi × Xi) ÷ ΣWi"},
      {n:"COG — Y axis",e:"COG_Y = Σ(Wi × Yi) ÷ ΣWi"},
      {n:"COG — Z axis",e:"COG_Z = Σ(Wi × Zi) ÷ ΣWi"},
      {n:"Eccentricity",e:"e_X = |COG_X − Geo_Centre_X|  |  Flag if > 50mm"},
      {n:"Sling adjustment",e:"ΔL ≈ eccentricity ÷ tan(θh)"},
    ],
    stds:[
      {c:"ASME B30",t:"COG determination requirements for lift planning."},
      {c:"EN 13155",t:"Non-fixed lifting attachments — COG verification before lift."},
      {c:"BS 7121-1",t:"Lift plan must document COG position."},
      {c:"ASME BTH-1",t:"Below-the-hook device design accounts for COG offset."},
      {c:"ASME P30.1-2014 Sec.5",t:"Load COG determination — methods, accuracy, documentation requirements."},
      {c:"LEEA COPSULE 2020",t:"COG verification requirement before first lift of any engineered load."},
      {c:"ISO 4306-1:2016",t:"COG and stability definitions."},
    ]
  },
  7:{
    terms:[
      {t:"Utilization (%)",d:"Actual load ÷ allowable × 100. The single most critical metric for lift go/no-go decision."},
      {t:"Traffic Light System",d:"<75% GREEN=Safe | 75-90% AMBER=Warning | >90% RED=Critical | >100% BLACK=Overload prohibited."},
      {t:"Overall Lift Status",d:"PASS only if ALL individual module checks pass. Single red in any module = lift not approved."},
      {t:"Conservative Design",d:"Always design for worst case. Two-leg rule, 65% outrigger factor, DAF — all conservative by design."},
    ],
    formulas:[
      {n:"Crane Utilization",e:"U% = Dynamic Load ÷ Effective Capacity × 100"},
      {n:"GBP Utilization",e:"U% = Calculated GBP ÷ Allowable GBP × 100"},
      {n:"Rigging Utilization",e:"U% = Tension per Leg ÷ Sling WLL × 100"},
      {n:"Status Logic",e:">100%: OVERLOAD  |  >90%: CRITICAL  |  >75%: WARNING  |  <75%: SAFE"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Lift approval process and sign-off before proceeding."},
      {c:"ISO 12480-1",t:"Utilization limits and safety margins."},
      {c:"LOLER 1998",t:"Lift plan reviewed and approved by competent person."},
    ]
  },
  8:{
    terms:[
      {t:"WLL",d:"Working Load Limit — max load in normal service. Stamped/tagged on every piece of lifting equipment."},
      {t:"MBL",d:"Minimum Breaking Load — destructive test failure load. Typically 5× WLL for rigging."},
      {t:"FoS",d:"Factor of Safety = MBL ÷ WLL. Rigging min=5:1. Below-the-hook devices min=3:1."},
      {t:"Grade 80/100 Chain",d:"G80: yield 800 N/mm². G100: 25% more capacity for same size. Orange marking on G100."},
      {t:"Round Sling Colour Code",d:"Violet=1T | Green=2T | Yellow=3T | Grey=4T | Red=5T | Brown=6T | Blue=8T | Orange=10T."},
      {t:"Eye Bolt Derating",d:"At 0°=100% WLL | 30°=70% | 45°=50% | 60°=25%. Orient in plane of load direction."},
      {t:"Bow vs D-Shackle",d:"Bow (Omega): multi-direction loading. D-shackle: straight line only — never side-load D-shackles."},
    ],
    formulas:[
      {n:"WLL from MBL",e:"WLL = MBL ÷ FoS"},
      {n:"Basket Hitch WLL",e:"WLL_basket = 2 × WLL_straight × K"},
      {n:"Choker Hitch WLL",e:"WLL_choker = 0.75 × WLL_straight"},
      {n:"Eye Bolt at angle",e:"At 0°: ×1.00 | 30°: ×0.70 | 45°: ×0.50 | 60°: ×0.25"},
    ],
    stds:[
      {c:"ASME B30.9",t:"Slings — all types, inspection, capacity, discard."},
      {c:"BS EN 1492-2",t:"Round slings — colour code, WLL, testing."},
      {c:"BS EN 818-4",t:"Chain slings Grade 80 and 100."},
      {c:"BS EN 13889",t:"Forged steel shackles."},
      {c:"DIN 580",t:"Eye bolts — dimensions and angular WLL."},
      {c:"EN 13155",t:"Spreader beams, plate clamps, beam clamps."},
      {c:"ISO 4309:2017",t:"Wire ropes — inspection and discard criteria — full class of use table."},
      {c:"ASME B30.26-2015",t:"Rigging hardware — shackles, rings, links, turnbuckles."},
      {c:"ASME B30.10-2019",t:"Hooks — inspection, use, maintenance, discard criteria."},
      {c:"ASME BTH-1-2020",t:"Below-the-hook lifting devices — design, marking, inspection."},
      {c:"OSHA 1926.251",t:"Rigging equipment requirements — US regulatory."},
      {c:"EN 818-4:2008",t:"Short link chain for lifting Grade T(8)."},
    ]
  },
  9:{
    terms:[
      {t:"Lay Length",d:"One complete helix of outer wires. Broken wire count per lay. >1% = DISCARD."},
      {t:"Birdcaging",d:"Outer wires displaced outward. Shock load or reverse bending. Any birdcage = IMMEDIATE DISCARD."},
      {t:"Kinking",d:"Permanent bend in rope. Never bend sharper than minimum bend radius. Any kink = DISCARD."},
      {t:"Elongation (Chain)",d:">3% elongation of any link or pitch = DISCARD."},
      {t:"Heat Damage",d:"Wire rope above 150°C = DISCARD. Chain above 300°C = DISCARD."},
      {t:"Quarantine",d:"Item removed pending inspection. Red tag. Not discarded — awaiting assessment."},
      {t:"Traceability",d:"Equipment history, cert, inspection dates. Missing ID tag or cert = QUARANTINE minimum."},
    ],
    formulas:[
      {n:"Broken wire limit",e:"Max broken = Total wires × 0.01 per lay  [1% threshold]"},
      {n:"Chain elongation",e:"% = (Measured − Nominal) ÷ Nominal × 100  |  >3%: DISCARD"},
      {n:"Section loss",e:"% = (Nominal dia − Measured dia) ÷ Nominal × 100  |  >10%: DISCARD"},
    ],
    stds:[
      {c:"ISO 4309",t:"Wire ropes — inspection and discard criteria. Lay length, broken wire limits."},
      {c:"BS EN 818-4",t:"Chain slings — elongation and wear discard limits."},
      {c:"BS EN 1492-1/2",t:"Webbing/round slings — cuts, abrasion, chemical damage."},
      {c:"ASME B30.9",t:"Sling inspection requirements — all types."},
      {c:"LOLER 1998",t:"Inspection frequency and record keeping."},
    ]
  },
  10:{
    terms:[
      {t:"Proof Load",d:"Static test load applied to verify structural integrity. Applied gradually — no shock loading."},
      {t:"In-Service",d:"Equipment in use: test to 110% of WLL. LOLER 1998 Reg. 9."},
      {t:"New Equipment",d:"Before first use: test to 125% of WLL. EN 13155 / ASME B30.9."},
      {t:"Permanent Deformation",d:"Any shape change after load removed = AUTOMATIC REJECTION. Even 1mm = FAIL. No exceptions."},
      {t:"Inspection Frequency",d:"Accessories (slings, shackles): every 6 months. Equipment not for persons: every 12 months. After exceptional circumstances: immediately."},
      {t:"MWS",d:"Marine Warranty Surveyor — independent offshore lift witness. Required by most marine insurers. DNVGL-ST-N001."},
    ],
    formulas:[
      {n:"In-service proof load",e:"PL = WLL × 1.10"},
      {n:"New equipment proof load",e:"PL = WLL × 1.25"},
      {n:"PASS — BOTH required",e:"Applied load ≥ PL  AND  permanent deformation = NO"},
      {n:"FAIL — EITHER",e:"Applied load < PL  OR  any permanent deformation"},
    ],
    stds:[
      {c:"LOLER 1998",t:"Reg. 9 — thorough examination. Reg. 10 — record keeping."},
      {c:"EN 13155",t:"125% WLL proof load for new below-the-hook devices."},
      {c:"ASME B30.9",t:"125% WLL proof load for new slings."},
      {c:"DNVGL-ST-N001",t:"Offshore — MWS witnessing requirements."},
    ]
  },
  11:{
    terms:[
      {t:"Anti-Two-Block (ATB)",d:"Prevents hook block contacting boom tip. Cuts lift function automatically. Mandatory ASME B30.5."},
      {t:"LMI",d:"Load Moment Indicator — monitors load vs. rated capacity. Must be calibrated and functional before lift."},
      {t:"Counterweight",d:"Must match or exceed requirement on load chart for configured radius."},
      {t:"Outrigger Extension",d:"Fully extended for rated capacity. Partially extended = reduced capacity from chart for partial config. Never interpolate."},
      {t:"Crane Level",d:"Must be within ±0.5° before lifting. Out-of-level = reduced stability and capacity."},
      {t:"Tail Swing",d:"Rear counterweight arc during slew. Often extends beyond working radius. Must be barriered."},
    ],
    formulas:[
      {n:"Counterweight check",e:"PASS if: Fitted CW ≥ Required CW from load chart"},
      {n:"Boom angle minimum",e:"PASS if: α ≥ 30°  |  α = arccos(R ÷ L)"},
      {n:"Level check",e:"PASS if: crane tilt ≤ ±0.5° in both axes"},
      {n:"Overall",e:"PASS = ALL individual checks pass  |  FAIL = ANY single check fails"},
    ],
    stds:[
      {c:"ASME B30.5",t:"Min boom angle 30° Sec.5-1.3.2, ATB Sec.5-1.9, LMI Sec.5-1.26, outrigger Sec.5-3.4."},
      {c:"BS 7121-3",t:"Mobile crane configuration checks, pre-use inspection."},
      {c:"LOLER 1998",t:"Pre-use inspection and periodic thorough examination."},
    ]
  },
  12:{
    terms:[
      {t:"Anemometer",d:"Wind speed instrument. Mount at or above hook height for accurate reading. Record readings — not forecast."},
      {t:"Significant Wave Height (Hs)",d:"Average height of highest one-third of waves. <0.5m=calm, 0.5–2.0m=moderate, >2.0m=rough."},
      {t:"Lightning Exclusion",d:"Cease ALL operations when lightning within 10km. Crane boom = highest conductor on site."},
      {t:"Visibility Limit",d:"Minimum 100m operational visibility. Below 100m: defer all crane operations."},
      {t:"Freeze / Ice",d:"Ice on load, slings, or ground: slip hazard + unexpected weight. Inspect and remove before lifting."},
    ],
    formulas:[
      {n:"Beaufort approximation",e:"V(m/s) ≈ 0.836 × B^(3/2)  where B = Beaufort number"},
      {n:"GO status",e:"GO if V ≤ Site Limit  |  NO-GO if V > Site Limit"},
      {n:"Limit source",e:"Use most restrictive of: BS 7121 / Manufacturer / Site Permit"},
    ],
    stds:[
      {c:"BS 7121-1",t:"10 m/s default wind limit. Anemometer requirement for site monitoring."},
      {c:"DNVGL-ST-N001",t:"Sea state limits for offshore lifting, Hs to DAF correlation."},
      {c:"HSE Guidance",t:"Lightning safety — cease outdoor work when thunder heard or lightning seen."},
    ]
  },
  13:{
    terms:[
      {t:"Banksman / Signalman",d:"Directs crane movements with agreed signals. Must have unobstructed sightline to load. One per crane minimum."},
      {t:"Tag Line",d:"Rope controlling rotation and swing. Min 2 for rotating loads. Min 3m length. Never wrap around hands."},
      {t:"Toolbox Talk",d:"Pre-lift briefing for ALL personnel. Must cover: lift plan, hazards, emergency stop signal, rescue plan, roles."},
      {t:"Stop Work Authority",d:"Any person has the right and duty to stop an unsafe lift. No authority can override a safety stop."},
      {t:"Rescue Plan",d:"Written procedure for personnel recovery. Must be briefed and resources on standby before lift."},
    ],
    formulas:[
      {n:"Min exclusion radius",e:"R_excl = Max working radius + load width÷2 + 1.5m"},
      {n:"Tag line length",e:"L_tag ≥ 3.0m  [prevents handler being pulled under load]"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Personnel roles, exclusion zones, communication systems."},
      {c:"HSE INDG290",t:"Safety in lifting operations guidance."},
      {c:"LOLER 1998",t:"Competent persons, planning, supervision of lifting operations."},
    ]
  },
  14:{
    terms:[
      {t:"Hold Point",d:"Step requiring formal sign-off before proceeding. Work stops until authorised. Critical decision gate."},
      {t:"Witness Point",d:"Person must be present and observe. Work may continue if they fail to attend after notification."},
      {t:"Critical Step",d:"Step where error has highest consequence. Extra attention, slow execution, double-check required."},
      {t:"Take Strain",d:"Slowly apply tension until load just lifts — then STOP. Check rigging, level, COG. Only proceed if all correct."},
    ],
    formulas:[
      {n:"Minimum steps",e:"Pre-checks → Rig → Take Strain → Check → Lift → Slew → Place → De-rig"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Lift plan contents and sequence requirements."},
      {c:"ISO 12480-1",t:"Lifting operation execution procedure."},
      {c:"LOLER 1998",t:"Lift plan must be followed — deviations require engineer review."},
    ]
  },
  15:{
    terms:[
      {t:"Exclusion Zone",d:"Barriered area non-essential personnel must not enter during lift. Signed 'CRANE IN OPERATION'."},
      {t:"Tail Swing Zone",d:"Rear counterweight sweep. Frequently larger than working radius. Must be in exclusion zone perimeter."},
      {t:"Struck-By Radius",d:"Max horizontal distance a dropped object can travel. Function of drop height and object aerodynamics."},
      {t:"Buffer Zone",d:"1.5m additional clearance beyond structural exclusion calculations. BS 7121-1 default."},
    ],
    formulas:[
      {n:"Min exclusion radius",e:"R = Working Radius + Load Width÷2 + 1.5m"},
      {n:"Struck-by (simplified)",e:"R_drop ≈ 0.5 × √(2H÷g) × V_horiz  [use DNVGL for critical lifts]"},
      {n:"Exclusion area",e:"A = π × R²  [360° zone]  |  A = (θ÷360) × π × R²  [sector]"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Exclusion zone establishment and management."},
      {c:"DNVGL-ST-N001",t:"Dropped object risk assessment for offshore planning."},
      {c:"HSE HSG221",t:"Technical guidance on exclusion zones."},
    ]
  },
  16:{
    terms:[
      {t:"Primary Dropped Object",d:"Object falling directly from lift — sling failure, hook disengagement, rigging slip."},
      {t:"Secondary Dropped Object",d:"Object dislodged by crane/load movement — loose equipment on load, ice, tools."},
      {t:"Risk = Likelihood × Consequence",d:"Low | Medium | High | Unacceptable based on impact energy and personnel exposure."},
    ],
    formulas:[
      {n:"Time to ground",e:"t = √(2H ÷ g)"},
      {n:"Struck-by radius",e:"R = v₀ × √(2H÷g)  [if horizontal velocity v₀ exists]"},
      {n:"Impact energy",e:"E(kJ) = m × 9.81 × H ÷ 1000"},
      {n:"Risk levels",e:"<10J=Low | 10–100J=Medium | >100J=High | >1000J=Unacceptable"},
    ],
    stds:[
      {c:"DNVGL-ST-N001",t:"Dropped object risk for offshore lifts."},
      {c:"DROPS",t:"Industry dropped object prevention standard — energy classification."},
      {c:"BS 7121-1",t:"Exclusion zone sized to include dropped object trajectory."},
    ]
  },
  17:{
    terms:[
      {t:"Critical Lift",d:">75% crane capacity | Tandem | Blind | Over personnel/live plant | Offshore | Unknown COG | Man-riding."},
      {t:"Single Point of Failure",d:"Component whose failure causes total load loss. Must be eliminated or mitigated. No SPOFs in load path."},
      {t:"Redundancy",d:"Backup preventing catastrophic failure if primary fails. Critical lifts require no SPOFs."},
      {t:"Independent Verification",d:"Second competent engineer reviews calculations. Mandatory for critical lifts. Third-party preferred."},
      {t:"Emergency Lowering",d:"Controlled descent procedure if primary lift fails mid-air. Must be pre-planned with resources on standby."},
    ],
    formulas:[
      {n:"Critical trigger",e:"IF GLW ÷ Effective Capacity > 0.75: CRITICAL"},
      {n:"Any one = full protocol",e:"Tandem | Blind | Over occupied | Unknown COG | Offshore/subsea | Man-riding"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Critical lift definition — independent review, method statement, additional sign-offs."},
      {c:"LOLER 1998",t:"Higher duty of care for complex lifts."},
      {c:"DNVGL-ST-N001",t:"Critical lift classification and controls for offshore."},
      {c:"ASME B30.5",t:"Special design lifts — engineering review and approval."},
    ]
  },
  18:{
    terms:[
      {t:"Pythagorean Theorem",d:"In a right triangle: C² = A² + B². C = hypotenuse (longest side). A = adjacent (horizontal). B = opposite (vertical)."},
      {t:"θh — Angle from Horizontal",d:"θh = arctan(B ÷ A). Sling angle from horizontal. Minimum 45° recommended for rigging."},
      {t:"θv — Angle from Vertical",d:"θv = arctan(A ÷ B) = 90° − θh. Boom angle is typically measured from horizontal (same as θh)."},
      {t:"K Factor",d:"K = sin(θh). Sling efficiency. At 90°: K=1.00 (maximum). At 45°: K=0.707. At 30°: K=0.500 (minimum safe)."},
      {t:"Hypotenuse",d:"The longest side of a right triangle — opposite the right angle. Equals sling length S or boom length L."},
    ],
    formulas:[
      {n:"Solve for C",e:"C = √(A² + B²)"},
      {n:"Solve for B",e:"B = √(C² − A²)"},
      {n:"Solve for A",e:"A = √(C² − B²)"},
      {n:"Angle from horizontal",e:"θh = arctan(B ÷ A)  [degrees]"},
      {n:"Angle from vertical",e:"θv = arctan(A ÷ B) = 90° − θh"},
      {n:"K factor",e:"K = sin(θh)"},
      {n:"Boom angle",e:"α = arccos(R ÷ L)  where R=radius, L=boom"},
    ],
    stds:[
      {c:"ISO 80000-2:2019",t:"Mathematical quantities and units — right-angle relationships."},
      {c:"ASME B30.9",t:"Slings — K factor table for sling angles 15°–90°."},
      {c:"ASME B30.5",t:"Boom angle minimum 30° from horizontal Sec.5-1.3.2."},
    ]
  },
  19:{
    terms:[
      {t:"SI Units",d:"International System. Base units: metre, kilogram, second, Newton, Pascal."},
      {t:"kN — Kilonewton",d:"1 kN = 1000 N. 1 Tonne force = 9.81 kN (g = 9.81 m/s²)."},
      {t:"kN/m² (kPa)",d:"Pressure unit. 1 kN/m² = 1 kPa. Used for GBP and soil bearing capacity."},
      {t:"MPa",d:"1 MPa = 1000 kPa = 1 N/mm². Used for material stress and concrete strength."},
      {t:"Imperial Units",d:"Foot, pound, psi — common in USA. Always confirm unit system before using US load charts."},
    ],
    formulas:[
      {n:"Mass ↔ Force",e:"F(kN) = m(T) × 9.81  |  m(T) = F(kN) ÷ 9.81"},
      {n:"Weight",e:"kg = T × 1000  |  lb = kg × 2.20462"},
      {n:"Length",e:"ft = m × 3.28084  |  in = m × 39.3701"},
      {n:"Speed",e:"km/h = m/s × 3.6  |  mph = m/s × 2.237  |  knots = m/s × 1.944"},
      {n:"Temperature",e:"°F = (°C × 9÷5) + 32  |  °C = (°F − 32) × 5÷9"},
      {n:"Pressure",e:"psi = kPa × 0.14504  |  kPa = psi × 6.89476"},
    ],
    stds:[
      {c:"ISO 80000",t:"International quantities and units."},
      {c:"BIPM SI",t:"SI unit definitions and prefixes."},
    ]
  },
};

// ── REF PANEL COMPONENT — 3-COLUMN (Terms | Formulas | Standards) ───────────
const RefPanel = ({moduleId}) => {
  const [open,setOpen]=useState(false);
  const data = REF_DATA[moduleId];
  if (!data) return null;
  const {terms=[],formulas=[],stds=[]} = data;
  const total = terms.length+formulas.length+stds.length;
  if (!total) return null;
  return (
    <div style={{marginTop:8}}>
      <button className="ref-toggle" onClick={()=>setOpen(o=>!o)}>
        <span style={{fontSize:12,color:"var(--orange-500)"}}>📖</span>
        <span>Reference — Terms, Formulas &amp; Standards</span>
        <span className={`ref-chevron ${open?"open":""}`}>▼</span>
      </button>
      {open && (
        <div className="ref-panel">
          <div className="ref-panel-cols">
            {/* COLUMN 1: TERMS */}
            <div className="ref-col">
              <div className="ref-col-head" style={{fontFamily:"var(--font-display)",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10,paddingBottom:6,borderBottom:"1px solid #1e1e1e"}}>
                Terms &amp; Definitions
              </div>
              {terms.map((item,i)=>(
                <div key={i} className="ref-entry">
                  <span className="ref-term">{item.t}</span>
                  <span className="ref-def">{item.d}</span>
                </div>
              ))}
              {!terms.length && <span style={{color:"var(--text-muted)",fontSize:11}}>—</span>}
            </div>
            {/* COLUMN 2: FORMULAS */}
            <div className="ref-col">
              <div className="ref-col-head" style={{fontFamily:"var(--font-display)",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10,paddingBottom:6,borderBottom:"1px solid #1e1e1e"}}>
                Formulas Used This Page
              </div>
              {formulas.map((item,i)=>(
                <div key={i} className="ref-entry">
                  <span className="ref-term">{item.n}</span>
                  <code className="ref-expr">{item.e}</code>
                </div>
              ))}
              {!formulas.length && <span style={{color:"var(--text-muted)",fontSize:11}}>—</span>}
            </div>
            {/* COLUMN 3: STANDARDS */}
            <div className="ref-col">
              <div className="ref-col-head" style={{fontFamily:"var(--font-display)",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10,paddingBottom:6,borderBottom:"1px solid #1e1e1e"}}>
                Applicable Standards
              </div>
              {stds.map((item,i)=>(
                <div key={i} className="ref-entry">
                  <span className="ref-std-code">{item.c}</span>
                  <span className="ref-std-title">{item.t}</span>
                </div>
              ))}
              {!stds.length && <span style={{color:"var(--text-muted)",fontSize:11}}>—</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── MODULE NAV BAR (FIX 4) ────────────────────────────────────────────────────
const ModuleNavBar = ({activeModule,setActiveModule}) => {
  const mod = MODULES[activeModule];
  const hasPrev = activeModule>0;
  const hasNext = activeModule<MODULES.length-1;
  const go = (idx) => {
    setActiveModule(idx);
    setTimeout(()=>{ const c=document.querySelector(".content"); if(c) c.scrollTop=0; },50);
  };
  return (
    <div className="module-nav">
      <button
        className="nav-btn"
        onClick={()=>hasPrev&&go(activeModule-1)}
        disabled={!hasPrev}
        style={{opacity:hasPrev?1:0.35,cursor:hasPrev?"pointer":"default"}}>
        ← Previous
      </button>
      <div className="nav-info">
        Module {activeModule+1} of {MODULES.length} — {mod?.label}
      </div>
      <button
        className="nav-btn nav-btn-primary"
        onClick={()=>hasNext&&go(activeModule+1)}
        disabled={!hasNext}
        style={{opacity:hasNext?1:0.35,cursor:hasNext?"pointer":"default"}}>
        Next Module →
      </button>
    </div>
  );
};

// ── REUSABLE COMPONENTS ────────────────────────────────────────────────────────
const UnitInput = ({label,value,onChange,unit,onUnitChange,units,type="number",placeholder,isCalc}) => (
  <div className="form-row">
    <label className={isCalc?"label-calc":"label-input"}>{label}</label>
    <div className="input-wrap">
      {isCalc ? (
        <input className="input-calc" value={value||"—"} readOnly />
      ) : (
        <>
          <input className="input-user" type={type} value={value} onChange={e=>onChange(e.target.value)}
            placeholder={placeholder||"0"} />
          {units && (
            <select className="unit-sel" value={unit} onChange={e=>onUnitChange(e.target.value)}>
              {units.map(u=><option key={u}>{u}</option>)}
            </select>
          )}
        </>
      )}
    </div>
  </div>
);

const UtilBar = ({value,label}) => {
  const cls = utilClass(value);
  const w = Math.min(value,100);
  const color = cls==="safe"?"var(--green-500)":cls==="warning"?"var(--amber-500)":"var(--red-500)";
  const badge = value>0?(cls==="safe"?"badge-pass":cls==="warning"?"badge-warn":"badge-fail"):"badge-idle";
  return (
    <div style={{marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <span style={{fontSize:11,color:"var(--text-muted)",fontFamily:"var(--font-display)",letterSpacing:"0.06em",textTransform:"uppercase"}}>{label}</span>
        <span className={`badge ${badge}`}>{value>0?`${f2(value)}%`:"—"}</span>
      </div>
      <div className={`util-bar-wrap util-${cls}`}>
        <div className="util-bar-fill" style={{width:`${w}%`,background:color}} />
      </div>
    </div>
  );
};

const Gauge = ({value,label,max=100}) => {
  const R=54, cx=70, cy=70;
  const circ = 2*Math.PI*R;
  const pct = Math.min((value||0)/max,1);
  const offset = circ*(1-pct*0.75);
  const cls = utilClass(value);
  const color = cls==="safe"?"#22c55e":cls==="warning"?"#f59e0b":"#ef4444";
  const startAngle = 135, endAngle = startAngle+270*pct;
  const x1=cx+R*Math.cos((startAngle-90)*Math.PI/180);
  const y1=cy+R*Math.sin((startAngle-90)*Math.PI/180);
  const x2=cx+R*Math.cos((endAngle-90)*Math.PI/180);
  const y2=cy+R*Math.sin((endAngle-90)*Math.PI/180);
  const large=pct>0.5?1:0;
  return (
    <div className="gauge-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"
          strokeDasharray={`${circ*0.75} ${circ*0.25}`}
          strokeDashoffset={circ*0.875} strokeLinecap="round" transform="rotate(135 70 70)" />
        {pct>0 && <path d={`M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`}
          fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />}
        <text x={cx} y={cy-4} textAnchor="middle" fill={color}
          fontFamily="'Arial',monospace" fontSize="22" fontWeight="600">
          {value>0?`${Math.round(value)}%`:"—"}
        </text>
        <text x={cx} y={cy+14} textAnchor="middle" fill="var(--text-muted)"
          fontFamily="'Arial',sans-serif" fontSize="10" letterSpacing="1">UTIL</text>
      </svg>
      <div className="gauge-lbl">{label}</div>
    </div>
  );
};

const FormulaPanel = ({children}) => {
  const [open,setOpen]=useState(false);
  return (
    <div>
      <div className="formula-toggle" onClick={()=>setOpen(!open)}>
        <span style={{fontSize:10}}>{open?"▾":"▸"}</span> Show Formula
      </div>
      {open && <div className="formula-panel">{children}</div>}
    </div>
  );
};

// ── PROJECT ACTIONS (SUMMARY PAGE) ───────────────────────────────────────────
const ProjectActions = ({projectName}) => {
  const {g,modInputs,setHasUnsaved} = useContext(AppCtx);
  const [lastSaved,setLastSaved]=useState("");
  const [toast,setToast]=useState("");
  const hasName = projectName&&projectName.trim()!=="";

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),3000); };

  const saveSession = () => {
    if (!hasName) return;
    const data = JSON.stringify({g,modInputs,savedAt:new Date().toISOString()});
    const blob = new Blob([data],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0,10).replace(/-/g,"");
    a.href=url; a.download=`RigCalc Pro_${(projectName||"session").replace(/\s/g,"_")}_${date}.json`;
    a.click(); URL.revokeObjectURL(url);
    const ts = new Date().toLocaleTimeString();
    setLastSaved(ts); setHasUnsaved(false);
    showToast("✅ Session saved successfully");
  };

  const loadSession = () => {
    const input = document.createElement("input");
    input.type="file"; input.accept=".json";
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.g) { window.location.reload(); showToast("✅ Session loaded — page will refresh"); }
        } catch { showToast("❌ Invalid session file"); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const printSummary = () => { if (!hasName) return; window.print(); };
  const exportPDF = () => { if (!hasName) return; showToast("📄 PDF export — use browser Print → Save as PDF"); };

  return (
    <div style={{background:"var(--bg-section)",border:"1px solid var(--border-orange)",borderRadius:"var(--radius-md)",padding:"16px",marginBottom:16}}>
      <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:12}}>Document Actions</div>
      {!hasName && <div className="info-box info-box-amber" style={{marginBottom:10,fontSize:11}}>⚠️ Enter project name above before saving or printing</div>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
        <button className="btn btn-primary" disabled={!hasName} onClick={saveSession} style={{opacity:hasName?1:0.4}}>💾 Save Session</button>
        <button className="btn btn-ghost" onClick={loadSession}>📂 Load Session</button>
        <button className="btn" style={{background:"transparent",border:"1px solid var(--border-orange)",color:"var(--text-orange)",opacity:hasName?1:0.4}} disabled={!hasName} onClick={printSummary}>🖨️ Print Summary</button>
        <button className="btn" style={{background:"transparent",border:"1px solid var(--border-orange)",color:"var(--text-orange)",opacity:hasName?1:0.4}} disabled={!hasName} onClick={exportPDF}>📄 PDF</button>
      </div>
      {lastSaved && <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace"}}>Last saved: {lastSaved}</div>}
      {toast && (
        <div style={{marginTop:8,padding:"6px 10px",background:"var(--green-bg)",border:"1px solid var(--green-border)",borderRadius:"var(--radius-sm)",fontSize:11,color:"var(--green-400)",fontFamily:"Arial,monospace"}}>{toast}</div>
      )}
    </div>
  );
};

// ── MODULE 0: PROJECT INFO ─────────────────────────────────────────────────────
const STANDARDS = [
  "ASME B30.5 — Mobile and Locomotive Cranes","ASME B30.9 — Slings",
  "ASME B30.26 — Rigging Hardware","ASME BTH-1 — Below-the-Hook Lifting Devices",
  "BS 7121-1/2/3 — Safe Use of Cranes","BS EN 1492-1/2 — Textile Slings",
  "BS EN 818-4 — Short Link Chain","BS EN 13889 — Forged Steel Shackles",
  "EN 1677-1 — Hooks","EN 1991-1-4 — Wind Actions (Eurocode 1)",
  "EN 1997-1 — Geotechnical Design (Eurocode 7)","ISO 2408 — Wire Ropes",
  "ISO 4309 — Wire Ropes Code of Practice","ISO 12480-1 — Safe Use of Cranes",
  "DIN 580 — Screw Eye Bolts","DNVGL-ST-N001 — Marine Operations",
  "CIRIA C703 — Crane Stability on Site","LOLER 1998 — Lifting Operations Regulations",
  "PUWER 1998 — Provision and Use of Work Equipment",
];

const ProjectInfo = () => {
  const {g,updateG} = useContext(AppCtx);
  const fi = (k) => <input className="input-user no-unit" value={g[k]||""} onChange={e=>updateG({[k]:e.target.value})} />;
  const liftClass = g.liftClass||"Routine";
  const statusBadge = g.craneUtil>90||g.gbpUtil>100||g.riggingUtil>90 ? "badge-fail" :
    g.craneUtil>75||g.gbpUtil>75||g.riggingUtil>75 ? "badge-warn" :
    g.glw>0 ? "badge-pass" : "badge-idle";
  const statusText = g.craneUtil>90||g.gbpUtil>100||g.riggingUtil>90 ? "❌ CRITICAL" :
    g.craneUtil>75||g.gbpUtil>75||g.riggingUtil>75 ? "⚠️ WARNING" :
    g.glw>0 ? "✅ APPROVED" : "PENDING";
  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">🏠 Project Info & Master Summary</span>
          <span className={`badge ${statusBadge}`}>{statusText}</span>
        </div>
        <div className="card-body">
          <div className="section-heading">Project Metadata</div>
          <div className="form-grid">
            {[["projectName","Project Name / Number"],["client","Client / Company"],
              ["location","Location / Site"],["tagNumber","Object / Tag Number"],
              ["engineer","Lift Engineer"],["reviewer","Reviewed By"],
              ["approver","Approved By"],["docNumber","Document Number"]].map(([k,l])=>(
              <div className="form-row" key={k}>
                <label className="label-input">{l}</label>
                {fi(k)}
              </div>
            ))}
            <div className="form-row">
              <label className="label-input">Lift Classification</label>
              <select className="input-user no-unit" value={g.liftClass||"Routine"} onChange={e=>updateG({liftClass:e.target.value})}>
                {["Routine","Engineered","Critical","Tandem","Blind"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label className="label-input">Date of Issue</label>
              <input className="input-user no-unit" type="date" value={g.issueDate||""} onChange={e=>updateG({issueDate:e.target.value})} />
            </div>
          </div>
          <div className="form-row" style={{marginTop:10}}>
            <label className="label-input">Lift Description</label>
            <textarea className="input-user no-unit" value={g.liftDesc||""} onChange={e=>updateG({liftDesc:e.target.value})} />
          </div>
        </div>
      </div>

      <div className="module-card">
        <div className="card-header"><span className="module-title">📋 Master Summary (Auto-Generated)</span></div>
        <div className="card-body">
          {/* DOCUMENT ACTIONS PANEL */}
          <ProjectActions projectName={g.projectName||""} />
          <div className="grid-4" style={{marginBottom:16}}>
            {[
              ["Environment", g.env?(g.env==="onshore"?"🏭 Onshore":"⛽ Offshore"):"—"],
              ["Special Lift Type", g.specialLift||"—"],
              ["Crane Type", g.craneType?g.craneType.replace(/_/g," "):"—"],
              ["Gross Lift Weight", g.glw>0?`${f2(g.glw)} T`:"—"],
              ["Dynamic Design Load", g.ddl>0?`${f2(g.ddl)} T`:"—"],
              ["DAF Applied", g.daf>0?`${g.daf}`:"—"],
              ["Crane Utilization", g.craneUtil>0?`${f2(g.craneUtil)}%`:"—"],
              ["GBP Utilization", g.gbpUtil>0?`${f2(g.gbpUtil)}%`:"—"],
              ["Rigging Utilization", g.riggingUtil>0?`${f2(g.riggingUtil)}%`:"—"],
              ["Sling Angle", g.slingAngle>0?`${f2(g.slingAngle)}°`:"—"],
              ["Wind Force", g.windForce>0?`${f2(g.windForce)} kN`:"—"],
              ["Overall Status", g.craneUtil>90||g.gbpUtil>100||g.riggingUtil>90?"❌ FAIL":g.craneUtil>75||g.gbpUtil>75?"⚠️ WARN":g.glw>0?"✅ PASS":"PENDING"],
            ].map(([l,v])=>(
              <div className="stat-card" key={l}>
                <div className="stat-label">{l}</div>
                <div className="stat-val" style={{fontSize:15,color:l==="Overall Status"?(v.includes("FAIL")?"var(--red-400)":v.includes("WARN")?"var(--amber-400)":v.includes("PASS")?"var(--green-400)":"var(--text-muted)"):"var(--blue-400)"}}>{v}</div>
              </div>
            ))}
          </div>
          <div className="section-heading">Approval Signatures</div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr>
                <th>Role</th><th>Name</th><th>Signature</th><th>Date</th><th>Comments</th>
              </tr></thead>
              <tbody>{["Lift Engineer","Rigging Supervisor","Safety Officer","Client Representative","Third-Party Inspector"].map(r=>(
                <tr key={r}><td style={{color:"var(--text-primary)"}}>{r}</td>
                  <td><input style={{background:"transparent",border:"none",color:"var(--text-primary)",width:"100%",outline:"none",fontSize:12}} /></td>
                  <td style={{minWidth:120,borderBottom:"1px dashed var(--border-strong)"}}></td>
                  <td><input type="date" style={{background:"transparent",border:"none",color:"var(--text-secondary)",fontSize:11,outline:"none"}} /></td>
                  <td><input style={{background:"transparent",border:"none",color:"var(--text-secondary)",width:"100%",outline:"none",fontSize:12}} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="section-heading" style={{marginTop:16}}>Applicable Standards</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {STANDARDS.map(s=>(
              <span key={s} className="std-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 1: WEIGHT CALC ─────────────────────────────────────────────────────
const WeightCalc = () => {
  const {g,updateG} = useContext(AppCtx);
  const [mode,setMode]=useState("B");
  const [mat,setMat]=useState("Mild Steel");
  const [customDens,setCustomDens]=useState("");
  const [shape,setShape]=useState("Rectangular Plate");
  const [dims,setDims]=useState({L:"",W:"",T:"",OD:"",ID:"",Length:"",Side:"",Diameter:"",Radius:"",Volume:""});
  const [dimUnits,setDimUnits]=useState({L:"m",W:"m",T:"m",OD:"m",ID:"m",Length:"m",Side:"m",Diameter:"m",Radius:"m"});
  const [qty,setQty]=useState(1);
  const [certW,setCertW]=useState("");
  const [certUnit,setCertUnit]=useState("T");
  const [rigging,setRigging]=useState(10);
  const [cont,setCont]=useState(5);

  const density = useMemo(()=>{
    if (mat==="Custom / Override") return parseFloat(customDens)||0;
    return MATERIALS.find(m=>m.name===mat)?.density||0;
  },[mat,customDens]);

  const volume = useMemo(()=>{
    const d = k => toM(dims[k]||0, dimUnits[k]||"m");
    if (shape==="Rectangular Plate") return d("L")*d("W")*d("T");
    if (shape==="Solid Cylinder") return Math.PI*Math.pow(d("OD")/2,2)*d("Length");
    if (shape==="Hollow Pipe / Tube") return Math.PI*(Math.pow(d("OD")/2,2)-Math.pow(d("ID")/2,2))*d("Length");
    if (shape==="Square Bar") return Math.pow(d("Side"),2)*d("Length");
    if (shape==="Round Bar (Solid Rod)") return Math.PI*Math.pow(d("Diameter")/2,2)*d("Length");
    if (shape==="Sphere") return (4/3)*Math.PI*Math.pow(d("Radius"),3);
    if (shape==="Irregular (user volume)") return parseFloat(dims.Volume)||0;
    return 0;
  },[shape,dims,dimUnits]);

  const netWeightSingle = mode==="A" ? volume*density/1000 : toT(certW,certUnit);
  const netWeight = netWeightSingle*(mode==="A"?(parseFloat(qty)||1):1);
  const glw = netWeight*(1+parseFloat(rigging)/100)*(1+parseFloat(cont)/100);

  useEffect(()=>{updateG({netWeight,glw,riggingPct:rigging,contPct:cont})},[glw]);

  const shapeInputs = SHAPES.find(s=>s.name===shape)?.inputs||[];

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">⚖️ Weight Calculation</span>
          <span className="std-tag">ISO 12480-1 Sec.7 | BS 7121-1 Sec.6</span>
        </div>
        <div className="card-body">
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            <button className={`btn ${mode==="B"?"btn-primary":"btn-ghost"}`} onClick={()=>setMode("B")}>Known / Certified Weight</button>
            <button className={`btn ${mode==="A"?"btn-primary":"btn-ghost"}`} onClick={()=>setMode("A")}>Calculate from Geometry</button>
          </div>

          {mode==="A" && (
            <>
              <div className="section-heading">Material Selection</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Material</label>
                  <select className="input-user no-unit" value={mat} onChange={e=>setMat(e.target.value)}>
                    {MATERIALS.map(m=><option key={m.name}>{m.name}</option>)}
                  </select>
                </div>
                {mat==="Custom / Override" && (
                  <div className="form-row">
                    <label className="label-input">Custom Density (kg/m³)</label>
                    <input className="input-user no-unit" type="number" value={customDens} onChange={e=>setCustomDens(e.target.value)} />
                  </div>
                )}
                <div className="form-row">
                  <label className="label-calc">Effective Density (kg/m³)</label>
                  <input className="input-calc" value={density} readOnly />
                </div>
              </div>
              <div className="section-heading">Shape & Dimensions</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Shape</label>
                  <select className="input-user no-unit" value={shape} onChange={e=>setShape(e.target.value)}>
                    {SHAPES.map(s=><option key={s.name}>{s.name}</option>)}
                  </select>
                </div>
                {shapeInputs.map(inp=>(
                  <div className="form-row" key={inp}>
                    <label className="label-input">{inp}</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" value={dims[inp]||""}
                        onChange={e=>setDims(p=>({...p,[inp]:e.target.value}))} />
                      {inp!=="Volume" && (
                        <select className="unit-sel" value={dimUnits[inp]||"m"}
                          onChange={e=>setDimUnits(p=>({...p,[inp]:e.target.value}))}>
                          {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
                <div className="form-row">
                  <label className="label-input">Quantity</label>
                  <input className="input-user no-unit" type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)} />
                </div>
              </div>
              <div className="grid-3" style={{marginTop:12}}>
                <div className="form-row"><label className="label-calc">Volume — Single (m³)</label><input className="input-calc" value={f3(volume)} readOnly /></div>
                <div className="form-row"><label className="label-calc">Net Weight — Single (T)</label><input className="input-calc" value={f3(netWeightSingle)} readOnly /></div>
                <div className="form-row"><label className="label-calc">Net Weight — All Items (T)</label><input className="input-calc" value={f3(netWeight)} readOnly /></div>
              </div>
              <FormulaPanel>
                Volume = {SHAPES.find(s=>s.name===shape)?.formula}<br/>
                Net Weight (T) = ρ × V / 1000 where ρ = {density} kg/m³
              </FormulaPanel>
            </>
          )}

          {mode==="B" && (
            <>
              <div className="section-heading">Certified Weight Entry</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Certified Weight</label>
                  <div className="input-wrap">
                    <input className="input-user" type="number" value={certW} onChange={e=>setCertW(e.target.value)} placeholder="0" />
                    <select className="unit-sel" value={certUnit} onChange={e=>setCertUnit(e.target.value)}>
                      {["T","kg","kN"].map(u=><option key={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row"><label className="label-calc">Weight in T</label><input className="input-calc" value={f3(netWeight)} readOnly /></div>
                <div className="form-row"><label className="label-calc">Weight in kN</label><input className="input-calc" value={f2(netWeight*9.81)} readOnly /></div>
                <div className="form-row"><label className="label-calc">Weight in kg</label><input className="input-calc" value={f2(netWeight*1000)} readOnly /></div>
              </div>
            </>
          )}

          <hr className="divider" />
          <div className="section-heading">Engineering Allowances — BS 7121-1 Sec.6.3 / ISO 12480-1 Sec.7.2</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Rigging & Accessories (%)</label>
              <input className="input-user no-unit" type="number" min="5" max="15" value={rigging} onChange={e=>setRigging(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-input">Contingency (%)</label>
              <input className="input-user no-unit" type="number" min="5" max="10" value={cont} onChange={e=>setCont(e.target.value)} />
            </div>
          </div>
          <div className="result-row result-glw" style={{marginTop:16}}>
            <div>
              <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:4}}>★ GROSS LIFT WEIGHT (GLW)</div>
              <div style={{display:"flex",gap:16,alignItems:"baseline"}}>
                <span className="glw-val">{f3(glw)} T</span>
                <span style={{color:"var(--text-muted)",fontFamily:"Arial,monospace",fontSize:14}}>{f2(glw*9.81)} kN</span>
                <span style={{color:"var(--text-muted)",fontFamily:"Arial,monospace",fontSize:14}}>{f2(glw*1000)} kg</span>
              </div>
            </div>
          </div>
          <FormulaPanel>
            GLW (T) = Net Weight × (1 + Rigging% / 100) × (1 + Contingency% / 100)<br/>
            GLW = {f3(netWeight)} × (1 + {rigging}/100) × (1 + {cont}/100) = {f3(glw)} T
          </FormulaPanel>
        </div>
      </div>
    </div>
  );
};

// ── BOOM GEOMETRY SVG (Fix 1) ─────────────────────────────────────────────────
const BoomGeomSVG = ({boomLen, radius, boomAngle, boomTipH}) => {
  if(!boomLen||!radius||!boomAngle) return (
    <div className="svg-diagram" style={{display:'flex',alignItems:'center',justifyContent:'center',height:160,color:'var(--text-muted)',fontSize:12,fontFamily:'var(--font-mono)'}}>
      Enter boom length and working radius
    </div>
  );
  const W=280, H=160, originX=40, originY=140;
  const scale = Math.min((W-60)/boomLen, (H-30)/boomTipH, 5);
  const boomRad = boomAngle*Math.PI/180;
  const tipX = originX + radius*scale;
  const tipY = originY - boomTipH*scale;
  const boomEndX = originX + boomLen*Math.cos(boomRad)*scale; // same as tipX if exact
  const boomEndY = originY - boomLen*Math.sin(boomRad)*scale;
  const arcR = Math.min(30, radius*scale*0.4);
  const arcX = originX + arcR*Math.cos(boomRad/2);
  const arcY = originY - arcR*Math.sin(boomRad/2);
  return (
    <div className="svg-diagram" style={{padding:8}}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{fontFamily:'var(--font-mono)'}}>
        {/* Ground */}
        <line x1={0} y1={originY} x2={W} y2={originY} stroke="var(--border-strong)" strokeWidth="2"/>
        {/* Mast (vertical) */}
        <line x1={originX} y1={originY} x2={originX} y2={originY-Math.min(boomTipH*scale,H-20)} stroke="#555" strokeWidth="2" strokeDasharray="4,3"/>
        {/* Boom line */}
        <line x1={originX} y1={originY} x2={boomEndX} y2={boomEndY} stroke="var(--orange-500)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Working radius (horizontal dashed) */}
        <line x1={originX} y1={originY} x2={tipX} y2={originY} stroke="var(--blue-400)" strokeWidth="1.5" strokeDasharray="5,3"/>
        {/* Tip height (vertical dashed) */}
        <line x1={tipX} y1={originY} x2={tipX} y2={boomEndY} stroke="var(--green-400)" strokeWidth="1.5" strokeDasharray="5,3"/>
        {/* Angle arc */}
        <path d={`M ${originX+arcR} ${originY} A ${arcR} ${arcR} 0 0 0 ${arcX} ${arcY}`} fill="none" stroke="var(--amber-500)" strokeWidth="1.5"/>
        {/* Labels */}
        <text x={boomEndX/2+originX/2-10} y={(originY+boomEndY)/2-6} fill="var(--orange-500)" fontSize="10" fontWeight="600">L={boomLen.toFixed(1)}m</text>
        <text x={(originX+tipX)/2} y={originY+12} fill="var(--blue-400)" fontSize="10">R={radius.toFixed(1)}m</text>
        <text x={tipX+4} y={(originY+boomEndY)/2} fill="var(--green-400)" fontSize="10">H={boomTipH.toFixed(1)}m</text>
        <text x={originX+arcR+6} y={originY-6} fill="var(--amber-500)" fontSize="9">θ={boomAngle.toFixed(1)}°</text>
        {/* Boom tip marker */}
        <circle cx={boomEndX} cy={boomEndY} r="4" fill="var(--orange-500)"/>
        {/* Origin marker */}
        <circle cx={originX} cy={originY} r="4" fill="var(--text-muted)"/>
        {/* Right angle at tip */}
        <polyline points={`${tipX-8},${originY} ${tipX-8},${originY-8} ${tipX},${originY-8}`} fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
      </svg>
    </div>
  );
};

// ── TANDEM CRANE CARD sub-component ───────────────────────────────────────────
const TandemCraneCard = ({idx, crane, onChange, glw}) => {
  const dutyFactor = DUTY_FACTORS[crane.duty||"A3"]||1;
  const chartCap = parseFloat(crane.chartCap)||0;
  const share = parseFloat(crane.share)||0;
  const effCap = chartCap * dutyFactor;
  const tandemLoad = glw * (share/100) * 1.10;
  const util = effCap>0 ? (tandemLoad/effCap)*100 : 0;
  const uc = utilClass(util);
  const ucColor = uc==="safe"?"var(--green-400)":uc==="warning"?"var(--amber-400)":"var(--red-400)";
  const badge = uc==="safe"?"badge-pass":uc==="warning"?"badge-warn":"badge-fail";
  const set = (k,v) => onChange(idx,{...crane,[k]:v});
  return (
    <div style={{background:"var(--bg-section)",border:`1px solid ${uc==="safe"?"var(--green-border)":uc==="warning"?"var(--amber-border)":"var(--red-border)"}`,borderRadius:"var(--radius-md)",padding:14,marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:13,color:"var(--text-orange)",letterSpacing:"0.08em",textTransform:"uppercase"}}>Crane {idx+1}</span>
        <span className={`badge ${badge}`}>{util>0?`${f2(util)}%`:"—"} {util>0?(uc==="safe"?"✅":uc==="warning"?"⚠️":"❌"):""}</span>
      </div>
      <div className="form-grid">
        {[["Make / Model","make","text"],["Working Radius (m)","radius","number"],["Boom Length (m)","boomLen","number"],["Chart Capacity at Radius (T)","chartCap","number"]].map(([l,k,t])=>(
          <div className="form-row" key={k}>
            <label className="label-input">{l}</label>
            <input className="input-user no-unit" type={t} value={crane[k]||""} onChange={e=>set(k,e.target.value)} placeholder={t==="number"?"0":""} />
          </div>
        ))}
        <div className="form-row">
          <label className="label-input">Duty Class</label>
          <select className="input-user no-unit" value={crane.duty||"A3"} onChange={e=>set("duty",e.target.value)}>
            {Object.entries(DUTY_FACTORS).map(([k,v])=><option key={k} value={k}>{k} — {v.toFixed(2)}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label className="label-input">Load Share (%)</label>
          <input className="input-user no-unit" type="number" min="0" max="100" value={crane.share||""} onChange={e=>set("share",e.target.value)} placeholder="e.g. 50" />
        </div>
      </div>
      <div className="grid-3" style={{marginTop:10}}>
        <div className="stat-card"><div className="stat-label">Tandem Design Load</div><div className="stat-val" style={{fontSize:16}}>{f2(tandemLoad)}<span className="stat-unit">T</span></div></div>
        <div className="stat-card"><div className="stat-label">Effective Capacity</div><div className="stat-val" style={{fontSize:16}}>{f2(effCap)}<span className="stat-unit">T</span></div></div>
        <div className="stat-card" style={{background:uc==="safe"?"var(--green-bg)":uc==="warning"?"var(--amber-bg)":"var(--red-bg)"}}>
          <div className="stat-label">Utilization</div>
          <div className="stat-val" style={{fontSize:16,color:ucColor}}>{f2(util)}<span className="stat-unit">%</span></div>
        </div>
      </div>
      <UtilBar value={util} label={`Crane ${idx+1} Utilization`} />
      <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>
        Tandem Load = GLW({f2(glw)}T) × {share}% × 1.10 = {f2(tandemLoad)}T | Eff.Cap = {f2(chartCap)}T × {dutyFactor} = {f2(effCap)}T | Ref: BS 7121-3 Sec.12
      </div>
    </div>
  );
};

// ── MODULE 2: CRANE SELECTION — v1.3 ─────────────────────────────────────────
const CraneSelection = () => {
  const {g,updateG} = useContext(AppCtx);
  // Step 1 — Environment
  const [env,setEnv]=useState("onshore");
  // Step 2 — Special lift type
  const [specialLift,setSpecialLift]=useState("Standard Lift");
  // Step 3 — Crane hardware
  const [craneType,setCraneType]=useState("mobile_outrigger");
  const [model,setModel]=useState("Liebherr LTM 1100-5.2");
  const [boomLen,setBoomLen]=useState("");
  const [jibLen,setJibLen]=useState("0");
  const [radius,setRadius]=useState("");
  const [cwt,setCwt]=useState("");
  const [outriggersExt,setOutriggersExt]=useState("YES");
  const [duty,setDuty]=useState("A3");
  const [dafOverride,setDafOverride]=useState("");
  const [dafJustify,setDafJustify]=useState("");
  // Manual entry
  const [isManual,setIsManual]=useState(false);
  const [manualMake,setManualMake]=useState("");
  const [manualMaxCap,setManualMaxCap]=useState("");
  const [manualChartCap,setManualChartCap]=useState("");
  const [manualBoomNotes,setManualBoomNotes]=useState("");
  // Offshore
  const [hs,setHs]=useState("");

  // ── AUTO BOOM ANGLE (Fix 1) ──────────────────────────────────
  const boomLenN = parseFloat(boomLen)||0;
  const radiusN  = parseFloat(radius)||0;
  const boomAngleRad = boomLenN>0&&radiusN<=boomLenN ? Math.acos(radiusN/boomLenN) : null;
  const boomAngle    = boomAngleRad!=null ? boomAngleRad*180/Math.PI : null;
  const boomTipH     = boomAngle!=null ? boomLenN*Math.sin(boomAngleRad) : null;
  const boomAngleOk  = boomAngle!=null&&boomAngle>=45&&boomAngle<=78 ? "pass"
    : boomAngle!=null&&boomAngle>=30&&boomAngle<45  ? "warn-low"
    : boomAngle!=null&&boomAngle>78                  ? "warn-high"
    : boomAngle!=null&&boomAngle<30                  ? "fail"
    : "idle";
  const boomGeomError = boomLenN>0&&radiusN>boomLenN;
  // Tandem
  const [tandemCount,setTandemCount]=useState(2);
  const [tandemCranes,setTandemCranes]=useState([
    {make:"",radius:"",boomLen:"",chartCap:"",duty:"A3",share:"50"},
    {make:"",radius:"",boomLen:"",chartCap:"",duty:"A3",share:"50"},
  ]);
  // Special lift extra fields
  const [tiltStart,setTiltStart]=useState("");
  const [tiltEnd,setTiltEnd]=useState("");
  const [tiltRadiusChange,setTiltRadiusChange]=useState("");
  const [blindSignalman,setBlindSignalman]=useState("");
  const [blindChannel,setBlindChannel]=useState("");
  const [blindCCTV,setBlindCCTV]=useState("NO");
  const [elevHeight,setElevHeight]=useState("");
  const [pcSurface,setPcSurface]=useState("Level Hardstand");
  const [pcDist,setPcDist]=useState("");
  const [pcSpeed,setPcSpeed]=useState("");
  const [mrBasketNo,setMrBasketNo]=useState("");
  const [mrInspDate,setMrInspDate]=useState("");
  const [mrRescuePlan,setMrRescuePlan]=useState("");

  const isTandem = specialLift==="Tandem Lift";
  const isCrawler = craneType==="crawler";

  // DAF lookup
  const dafRow = useMemo(()=>{
    if(env==="offshore") {
      const hsN = parseFloat(hs)||0;
      if(specialLift==="Subsea / Below Keel") return DAF_MATRIX.find(r=>r.env==="offshore"&&r.lift==="Subsea / Below Keel");
      if(specialLift==="Tandem Lift") return DAF_MATRIX.find(r=>r.env==="offshore"&&r.lift==="Tandem Lift");
      if(specialLift==="Man-Riding / Personnel") return DAF_MATRIX.find(r=>r.env==="offshore"&&r.lift==="Man-Riding / Personnel");
      if(hsN>=2.0) return DAF_MATRIX.find(r=>r.label==="Offshore / Rough / >2.0m Hs");
      if(hsN>=0.5) return DAF_MATRIX.find(r=>r.label==="Offshore / Moderate / 0.5–2.0m Hs");
      return DAF_MATRIX.find(r=>r.env==="offshore"&&r.lift==="Standard Lift");
    }
    return DAF_MATRIX.find(r=>r.env===env&&r.lift===specialLift) || DAF_MATRIX[0];
  },[env,specialLift,hs]);

  const autoDaf = dafRow?.daf||1.05;
  const daf = dafOverride&&parseFloat(dafOverride)>0 ? parseFloat(dafOverride) : autoDaf;

  const filteredCranes = CRANE_DB.filter(c=>c.type===craneType);
  const selCrane = isManual ? null : (filteredCranes.find(c=>c.model===model)||filteredCranes[0]);
  const chartCap = useMemo(()=>{
    if(isManual) return parseFloat(manualChartCap)||0;
    if(!selCrane||!radius) return 0;
    return interpChart(selCrane.chart, parseFloat(radius)||0);
  },[selCrane,radius,isManual,manualChartCap]);

  const dutyFactor = DUTY_FACTORS[duty]||1;
  const effCap = chartCap * dutyFactor;
  const ddl = (g.glw||0)*daf;
  const craneUtil = effCap>0 ? (ddl/effCap)*100 : 0;
  const utilCls = utilClass(craneUtil);

  // Tandem share validation
  const totalShare = tandemCranes.reduce((s,c)=>s+(parseFloat(c.share)||0),0);
  const shareOk = Math.abs(totalShare-100)<0.1;
  const tandemOverallUtil = tandemCranes.length>0 ? Math.max(0,...tandemCranes.map(c=>{
    const ef=(parseFloat(c.chartCap)||0)*(DUTY_FACTORS[c.duty||"A3"]||1);
    const tl=(g.glw||0)*(parseFloat(c.share)||0)/100*1.10;
    return ef>0?tl/ef*100:0;
  })) : 0;

  const updateTandemCrane = (idx, patch) => setTandemCranes(p=>p.map((c,i)=>i===idx?patch:c));

  useEffect(()=>{
    const sw = isManual ? 0 : (selCrane?.selfWeight||0);
    const finalUtil = isTandem ? tandemOverallUtil : craneUtil;
    updateG({daf,ddl,craneCapacity:chartCap,effectiveCap:effCap,craneUtil:finalUtil,craneType,craneSelfWeight:sw,env,specialLift});
  },[daf,ddl,effCap,craneUtil,craneType,selCrane,isManual,chartCap,env,specialLift,tandemOverallUtil,isTandem]);

  const boomLenN_disp = parseFloat(boomLen)||0; // alias for display in FormulaPanel
  const visibleDAF = DAF_MATRIX.filter(r=>r.env===env);

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">🏗 Crane Selection</span>
          <span className="std-tag">ISO 9374-1 | ISO 4301-1 | ASME B30.5 | BS 7121-3</span>
        </div>
        <div className="card-body">

          {/* ── STEP 1: ENVIRONMENT ── */}
          <div className="section-heading">Step 1 — Operating Environment</div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            {[["onshore","🏭 Onshore"],["offshore","⛽ Offshore"]].map(([v,l])=>(
              <button key={v} className={`btn ${env===v?"btn-primary":"btn-ghost"}`} style={{flex:1,padding:"10px 0",fontSize:13}}
                onClick={()=>setEnv(v)}>{l}</button>
            ))}
          </div>
          {env==="offshore" && (
            <div className="form-grid">
              <div className="form-row">
                <label className="label-input">Significant Wave Height Hs (m)</label>
                <input className="input-user no-unit" type="number" step="0.1" value={hs} onChange={e=>setHs(e.target.value)} placeholder="0.0" />
              </div>
              <div className="form-row">
                <label className="label-calc">Sea State Classification</label>
                <input className="input-calc" value={parseFloat(hs)>=2?"Rough — DAF 1.35":parseFloat(hs)>=0.5?"Moderate — DAF 1.25":"Calm — DAF 1.10"} readOnly />
              </div>
            </div>
          )}

          {/* ── STEP 2: SPECIAL LIFT TYPE ── */}
          <div className="section-heading">Step 2 — Special Lift Classification</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Special Lift Classification</label>
              <select className="input-user no-unit" value={specialLift} onChange={e=>setSpecialLift(e.target.value)}>
                {(env==="offshore"
                  ? [...SPECIAL_LIFTS,"Subsea / Below Keel"]
                  : SPECIAL_LIFTS
                ).map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* MAN-RIDING warning — shown immediately */}
          {specialLift==="Man-Riding / Personnel" && (
            <div className="info-box info-box-red" style={{marginBottom:10}}>
              ⛔ MAN-RIDING LIFT — LOLER 1998 Regulation 8 applies. Requires: LOLER Sec.8 certificate, competent person supervising, 6-monthly inspection, rescue plan, two independent means of preventing free fall.
            </div>
          )}

          {/* ── STEP 3: CRANE HARDWARE ── */}
          <div className="section-heading">Step 3 — Crane Configuration</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Crane Type</label>
              <select className="input-user no-unit" value={craneType} onChange={e=>{setCraneType(e.target.value);setModel("");setIsManual(false);}}>
                <option value="mobile_outrigger">Mobile Crane – Outrigger</option>
                <option value="mobile_tires">Mobile Crane – On Tires</option>
                <option value="crawler">Crawler Crane</option>
                <option value="tower">Tower Crane</option>
                <option value="gantry">Gantry / EOT Crane</option>
              </select>
            </div>
            <div className="form-row">
              <label className="label-input">Crane Make / Model</label>
              <select className="input-user no-unit" value={isManual?"MANUAL":model}
                onChange={e=>{if(e.target.value==="MANUAL"){setIsManual(true);}else{setIsManual(false);setModel(e.target.value);}}}>
                {filteredCranes.map(c=><option key={c.model} value={c.model}>{c.model}</option>)}
                <option value="MANUAL">── Manual Entry ──</option>
              </select>
            </div>
            {isManual && (
              <>
                <div className="form-row">
                  <label className="label-input">Crane Make / Model (free text)</label>
                  <input className="input-user no-unit" value={manualMake} onChange={e=>setManualMake(e.target.value)} />
                </div>
                <div className="form-row">
                  <label className="label-input">Maximum Rated Capacity (T)</label>
                  <input className="input-user no-unit" type="number" value={manualMaxCap} onChange={e=>setManualMaxCap(e.target.value)} />
                </div>
                <div className="form-row" style={{gridColumn:"1/-1"}}>
                  <label className="label-input" title="Read from manufacturer load chart at actual boom length and working radius. Do not use maximum rated capacity.">Chart Capacity at Working Radius (T) ⓘ</label>
                  <input className="input-user no-unit" type="number" value={manualChartCap} onChange={e=>setManualChartCap(e.target.value)} placeholder="From load chart at actual radius" />
                  <div style={{fontSize:10,color:"var(--text-muted)",marginTop:3,fontFamily:"Arial,monospace"}}>Critical: read from load chart at configured boom + radius. Never use maximum rated capacity.</div>
                </div>
                <div className="form-row" style={{gridColumn:"1/-1"}}>
                  <label className="label-input">Boom Configuration Notes</label>
                  <textarea className="input-user no-unit" value={manualBoomNotes} onChange={e=>setManualBoomNotes(e.target.value)} placeholder="Boom length, jib, counterweight, SSL configuration..." />
                </div>
              </>
            )}
            <div className="form-row">
              <label className="label-input">Boom Length (m)</label>
              <input className="input-user no-unit" type="number" value={boomLen} onChange={e=>setBoomLen(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-input">Jib / Luffing Length (m)</label>
              <input className="input-user no-unit" type="number" value={jibLen} onChange={e=>setJibLen(e.target.value)} placeholder="0 if not fitted" />
            </div>
            <div className="form-row">
              <label className="label-input">Working Radius (m)</label>
              <input className="input-user no-unit" type="number" value={radius} onChange={e=>setRadius(e.target.value)} placeholder="0" />
            </div>
          </div>

          {/* ── BOOM GEOMETRY AUTO-CALC (Fix 1) ── */}
          {boomLenN>0&&radiusN>0 && (
            <div style={{background:"var(--bg-section)",border:`1px solid ${boomAngleOk==="pass"?"var(--green-border)":boomAngleOk==="fail"?"var(--red-border)":"var(--amber-border)"}`,borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:8}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10}}>
                📐 Boom Geometry — Auto-Calculated (ASME B30.5 Sec.5-1.3.2)
              </div>
              {boomGeomError ? (
                <div className="info-box info-box-red">❌ Working radius ({radiusN}m) cannot exceed boom length ({boomLenN}m). Check inputs.</div>
              ) : (
                <div className="grid-3">
                  <div className="form-row">
                    <label className="label-calc" title="α = arccos(Working Radius ÷ Boom Length) — ASME B30.5 / Trigonometric relationship">Boom Angle α = arccos(R÷L) ⓘ</label>
                    <input className="input-calc" value={boomAngle!=null?`${boomAngle.toFixed(2)}°`:"—"} readOnly />
                  </div>
                  <div className="form-row">
                    <label className="label-calc">Boom Tip Height = L×sin(α)</label>
                    <input className="input-calc" value={boomTipH!=null?`${boomTipH.toFixed(2)} m`:"—"} readOnly />
                  </div>
                  <div className="form-row">
                    <label className="label-calc">Boom Angle Status</label>
                    <input className="input-calc" value={
                      boomAngleOk==="pass"?"✅ Normal operating range (45°–78°)":
                      boomAngleOk==="warn-low"?"⚠️ Below 45° — verify with load chart":
                      boomAngleOk==="warn-high"?"⚠️ Above 78° — approaching vertical limit":
                      boomAngleOk==="fail"?"❌ Below 30° minimum — PROHIBITED":
                      "—"
                    } readOnly style={{color:boomAngleOk==="pass"?"var(--green-400)":boomAngleOk==="fail"?"var(--red-400)":"var(--amber-400)"}} />
                  </div>
                </div>
              )}
              {!boomGeomError&&boomAngle!=null&&boomAngle<30 && <div className="info-box info-box-red" style={{marginTop:8,fontSize:11}}>❌ Boom angle {boomAngle.toFixed(2)}° is below 30° minimum — ASME B30.5 Sec.5-1.3.2. Reduce working radius or increase boom length.</div>}
              {!boomGeomError&&boomAngle!=null&&boomAngle>=30&&boomAngle<45 && <div className="info-box info-box-amber" style={{marginTop:8,fontSize:11}}>⚠️ Boom angle {boomAngle.toFixed(2)}° is below 45° — approaching operational limit. Verify with manufacturer load chart.</div>}
              {!boomGeomError&&boomAngle!=null&&boomAngle>78 && <div className="info-box info-box-amber" style={{marginTop:8,fontSize:11}}>⚠️ Boom angle {boomAngle.toFixed(2)}° is above 78° — boom may approach vertical limit. Check manufacturer specification.</div>}
              {!boomGeomError&&boomTipH!=null && <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>Approximate hook height available ≈ {boomTipH.toFixed(2)} m (deduct hook block and rigging depth)</div>}
              <div style={{marginTop:10}}>
                <BoomGeomSVG boomLen={boomLenN} radius={radiusN} boomAngle={boomAngle} boomTipH={boomTipH||0}/>
              </div>
              <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>
                Formula: θ = arccos(R ÷ L) | Reference: ASME B30.5-2021 Sec.5-1.3.2
              </div>
            </div>
          )}

          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Counterweight Fitted (T)</label>
              <input className="input-user no-unit" type="number" value={cwt} onChange={e=>setCwt(e.target.value)} />
            </div>
            {!isCrawler && (
              <div className="form-row">
                <label className="label-input">Outriggers Fully Extended?</label>
                <select className="input-user no-unit" value={outriggersExt} onChange={e=>setOutriggersExt(e.target.value)}>
                  <option>YES</option><option>NO</option>
                </select>
              </div>
            )}
            {outriggersExt==="NO" && !isCrawler && <div className="info-box info-box-amber" style={{gridColumn:"1/-1",fontSize:11}}>⚠️ Reduced outrigger extension significantly reduces crane capacity. Verify load chart for partial outrigger configuration.</div>}
            <div className="form-row">
              <label className="label-calc">Chart Capacity at Radius (T)</label>
              <input className="input-calc" value={f2(chartCap)} readOnly />
            </div>
            <div className="form-row">
              <label className="label-input">Duty Class (ISO 4301-1)</label>
              <select className="input-user no-unit" value={duty} onChange={e=>setDuty(e.target.value)}>
                {Object.entries(DUTY_FACTORS).map(([k,v])=><option key={k} value={k}>{k}: {v.toFixed(2)} — {["Infrequent","Light","Moderate (default)","Heavy","Very Heavy"][["A1","A2","A3","A4","A5"].indexOf(k)]}</option>)}
              </select>
            </div>
          </div>

          {/* ── DAF LOOKUP TABLE ── */}
          <div className="section-heading">DAF — Dynamic Amplification Factor</div>
          <div className="table-wrap" style={{marginBottom:12}}>
            <table className="data-table">
              <thead><tr><th>Condition</th><th>DAF</th><th>Active</th></tr></thead>
              <tbody>{visibleDAF.map(row=>(
                <tr key={row.label} className={row===dafRow?"highlight":""}>
                  <td>{row.label}</td>
                  <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{row.daf}</td>
                  <td>{row===dafRow?<span style={{color:"var(--orange-500)",fontWeight:600}}>◄ ACTIVE</span>:""}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">DAF Override (0 = auto-lookup)</label>
              <input className="input-user no-unit" type="number" step="0.01" value={dafOverride} onChange={e=>setDafOverride(e.target.value)} placeholder="0" />
            </div>
            {dafOverride&&parseFloat(dafOverride)>0 && (
              <div className="form-row">
                <label className="label-input">Engineer Justification (mandatory)</label>
                <input className="input-user no-unit" value={dafJustify} onChange={e=>setDafJustify(e.target.value)} placeholder="Required when overriding auto DAF" />
              </div>
            )}
            <div className="form-row"><label className="label-calc">Effective DAF Applied</label><input className="input-calc" value={f2(daf)} readOnly /></div>
          </div>

          {/* ── CONDITIONAL SPECIAL LIFT PANELS ── */}
          {specialLift==="Tilting / Upending" && (
            <>
              <div className="section-heading">Tilting / Upending Parameters</div>
              <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ Tilting lifts require continuous load chart verification at each tilt increment. DAF 1.15 applied. Prepare separate lift plan for each 15° increment.</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Tilt Angle at Start (°)</label><input className="input-user no-unit" type="number" value={tiltStart} onChange={e=>setTiltStart(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Tilt Angle at End (°)</label><input className="input-user no-unit" type="number" value={tiltEnd} onChange={e=>setTiltEnd(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Radius Change During Tilt (m)</label><input className="input-user no-unit" type="number" value={tiltRadiusChange} onChange={e=>setTiltRadiusChange(e.target.value)} /></div>
              </div>
            </>
          )}
          {specialLift==="Blind Lift" && (
            <>
              <div className="section-heading">Blind Lift — Signalling Controls</div>
              <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ Blind lift — dedicated signalman mandatory. All movement by signal only. BS 7121-1 Sec.9.</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Signalman Position / Location</label><input className="input-user no-unit" value={blindSignalman} onChange={e=>setBlindSignalman(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Radio Channel</label><input className="input-user no-unit" value={blindChannel} onChange={e=>setBlindChannel(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Camera / CCTV Fitted?</label><select className="input-user no-unit" value={blindCCTV} onChange={e=>setBlindCCTV(e.target.value)}><option>YES</option><option>NO</option></select></div>
              </div>
            </>
          )}
          {specialLift==="High Elevated Lift" && (
            <>
              <div className="section-heading">High Elevated Lift Parameters</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Maximum Lift Height (m)</label><input className="input-user no-unit" type="number" value={elevHeight} onChange={e=>setElevHeight(e.target.value)} /></div>
              </div>
              {parseFloat(elevHeight)>15 && <div className="info-box info-box-amber" style={{marginTop:8}}>⚠️ High Elevated Lift — lift height exceeds 15m. Engineering review and exclusion zone recalculation required.</div>}
            </>
          )}
          {specialLift==="Pick & Carry" && (
            <>
              <div className="section-heading">Pick & Carry Parameters</div>
              <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ Pick & Carry prohibited on gradients &gt;1% unless manufacturer specifies otherwise. Max travel speed 1.0 km/h with suspended load. ASME B30.5.</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Ground Surface</label><select className="input-user no-unit" value={pcSurface} onChange={e=>setPcSurface(e.target.value)}>{["Level Hardstand","Uneven Ground","Ramp"].map(s=><option key={s}>{s}</option>)}</select></div>
                <div className="form-row"><label className="label-input">Travel Distance (m)</label><input className="input-user no-unit" type="number" value={pcDist} onChange={e=>setPcDist(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Travel Speed (km/h)</label><input className="input-user no-unit" type="number" value={pcSpeed} onChange={e=>setPcSpeed(e.target.value)} placeholder="Max 1.0" /></div>
              </div>
            </>
          )}
          {specialLift==="Man-Riding / Personnel" && (
            <>
              <div className="section-heading">Man-Riding — LOLER 1998 Reg. 8</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Basket / Cage Serial No.</label><input className="input-user no-unit" value={mrBasketNo} onChange={e=>setMrBasketNo(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Last Inspection Date</label><input className="input-user no-unit" type="date" value={mrInspDate} onChange={e=>setMrInspDate(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Rescue Plan Reference</label><input className="input-user no-unit" value={mrRescuePlan} onChange={e=>setMrRescuePlan(e.target.value)} /></div>
              </div>
            </>
          )}

          {/* ── TANDEM CRANE SUB-PANEL ── */}
          {isTandem && (
            <>
              <div className="section-heading">Tandem Lift — Crane Configuration</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Number of Cranes in Tandem</label>
                  <select className="input-user no-unit" value={tandemCount} onChange={e=>{
                    const n=parseInt(e.target.value);
                    setTandemCount(n);
                    setTandemCranes(prev=>{
                      const next=[...prev];
                      while(next.length<n) next.push({make:"",radius:"",boomLen:"",chartCap:"",duty:"A3",share:""});
                      return next.slice(0,n);
                    });
                  }}>
                    <option value={2}>2 Cranes</option><option value={3}>3 Cranes</option><option value={4}>4 Cranes</option>
                  </select>
                </div>
                <div className="form-row">
                  <label className="label-calc">Load Shares Total (%)</label>
                  <input className="input-calc" value={`${fN(totalShare,1)}% ${shareOk?"✅":"⚠️ Must = 100%"}`} readOnly style={{color:shareOk?"var(--green-400)":"var(--amber-400)"}} />
                </div>
              </div>
              {!shareOk && <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ Load shares total {fN(totalShare,1)}% — must equal exactly 100%</div>}
              {tandemCranes.slice(0,tandemCount).map((c,i)=>(
                <TandemCraneCard key={i} idx={i} crane={c} onChange={updateTandemCrane} glw={g.glw||0} />
              ))}
              <div className="section-heading">Tandem Overall Status</div>
              <div className="grid-3">
                <div className="stat-card"><div className="stat-label">Worst Crane Utilization</div><div className="stat-val" style={{color:tandemOverallUtil>90?"var(--red-400)":tandemOverallUtil>75?"var(--amber-400)":"var(--green-400)"}}>{f2(tandemOverallUtil)}<span className="stat-unit">%</span></div></div>
                <div className="stat-card"><div className="stat-label">Load Shares</div><div className="stat-val" style={{fontSize:14,color:shareOk?"var(--green-400)":"var(--amber-400)"}}>{shareOk?"✅ Valid":"⚠️ Invalid"}</div></div>
                <div className="stat-card"><div className="stat-label">Overall Status</div><div className="stat-val" style={{fontSize:12,color:tandemOverallUtil>90?"var(--red-400)":tandemOverallUtil>75?"var(--amber-400)":"var(--green-400)"}}>{tandemOverallUtil>90?"❌ FAIL":tandemOverallUtil>75?"⚠️ WARN":"✅ PASS"}</div></div>
              </div>
            </>
          )}

          {/* ── SINGLE CRANE RESULTS ── */}
          {!isTandem && (
            <>
              <div className="section-heading">Calculated Results</div>
              <div className="grid-4">
                <div className="stat-card"><div className="stat-label">GLW</div><div className="stat-val">{f2(g.glw||0)}<span className="stat-unit">T</span></div></div>
                <div className="stat-card"><div className="stat-label">Dynamic Design Load</div><div className="stat-val">{f2(ddl)}<span className="stat-unit">T</span></div></div>
                <div className="stat-card"><div className="stat-label">Effective Capacity</div><div className="stat-val">{f2(effCap)}<span className="stat-unit">T</span></div></div>
                <div className="stat-card" style={{background:utilCls==="safe"?"var(--green-bg)":utilCls==="warning"?"var(--amber-bg)":"var(--red-bg)"}}>
                  <div className="stat-label">Crane Utilization</div>
                  <div className="stat-val" style={{color:utilCls==="safe"?"var(--green-400)":utilCls==="warning"?"var(--amber-400)":"var(--red-400)"}}>{f2(craneUtil)}<span className="stat-unit">%</span></div>
                </div>
              </div>
              <UtilBar value={craneUtil} label="Crane Capacity Utilization" />
              <div style={{textAlign:"center",marginTop:8}}>
                <span className={`badge ${craneUtil>100?"badge-fail":craneUtil>90?"badge-fail":craneUtil>75?"badge-warn":craneUtil>0?"badge-pass":"badge-idle"}`}>
                  {craneUtil>100?"⛔ OVERLOAD — LIFT PROHIBITED":craneUtil>90?"❌ FAIL — DO NOT PROCEED":craneUtil>75?"⚠️ WARNING":craneUtil>0?"✅ PASS — SAFE":"AWAITING DATA"}
                </span>
              </div>
              <FormulaPanel>
                DDL (T) = GLW × DAF = {f2(g.glw)} × {f2(daf)} = {f2(ddl)} T<br/>
                Eff. Capacity (T) = Chart Cap × Duty Factor = {f2(chartCap)} × {dutyFactor} = {f2(effCap)} T<br/>
                Utilization (%) = DDL ÷ Eff. Cap × 100 = {f2(ddl)} ÷ {f2(effCap)} × 100 = {f2(craneUtil)}%
              </FormulaPanel>
            </>
          )}
        </div>
      </div>

      {/* ── LOAD CHART CARD ── */}
      {!isManual && selCrane && (
        <div className="module-card">
          <div className="card-header"><span className="module-title">📊 Load Chart — {selCrane.model}</span></div>
          <div className="card-body">
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>Radius (m)</th><th>Boom (m)</th><th>Capacity (T)</th><th></th></tr></thead>
                <tbody>{selCrane.chart.map((row,i)=>(
                  <tr key={i} className={parseFloat(radius)>=row.r&&(selCrane.chart[i+1]?parseFloat(radius)<selCrane.chart[i+1].r:true)?"highlight":""}>
                    <td style={{fontFamily:"Arial,monospace"}}>{row.r}</td>
                    <td style={{fontFamily:"Arial,monospace"}}>{row.b}</td>
                    <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{row.cap}</td>
                    <td>{i===0?<span className="badge badge-idle" style={{fontSize:9}}>MIN RADIUS</span>:""}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            {radius && <div className="info-box info-box-orange" style={{marginTop:8}}>📐 Interpolated capacity at <strong>{radius}m</strong>: <strong style={{color:"var(--blue-400)"}}>{f2(chartCap)} T</strong></div>}
          </div>
        </div>
      )}
    </div>
  );
};

// ── MODULE 3: GBP ─────────────────────────────────────────────────────────────
const GBP = () => {
  const {g,updateG} = useContext(AppCtx);
  const craneType = g.craneType||"mobile_outrigger";
  const isCrawler = craneType==="crawler";

  // ── SHARED ──
  const [allowGBP,setAllowGBP]=useState("");
  const [craneSW,setCraneSW]=useState("");

  // ── OUTRIGGER FIELDS ──
  const [gvw,setGvw]=useState("");
  const [riggingWt,setRiggingWt]=useState("");
  const [dlf,setDlf]=useState("1.25");
  const [distF,setDistF]=useState("0.65");
  const [numOutriggers,setNumOutriggers]=useState("4");
  const [spanFR,setSpanFR]=useState(""); const [spanFRU,setSpanFRU]=useState("m");
  const [spanSS,setSpanSS]=useState(""); const [spanSSU,setSpanSSU]=useState("m");
  const [padL,setPadL]=useState(""); const [padLU,setPadLU]=useState("m");
  const [padW,setPadW]=useState(""); const [padWU,setPadWU]=useState("m");
  const [matUsed,setMatUsed]=useState(false);
  const [matL,setMatL]=useState(""); const [matLU,setMatLU]=useState("m");
  const [matW,setMatW]=useState(""); const [matWU,setMatWU]=useState("m");

  // ── CRAWLER FIELDS ──
  const [craneOpWt,setCraneOpWt]=useState("");
  const [daf,setDaf]=useState("1.25");
  const [trackW,setTrackW]=useState(""); const [trackWU,setTrackWU]=useState("m");
  const [trackL,setTrackL]=useState(""); const [trackLU,setTrackLU]=useState("m");
  const [crawlMatUsed,setCrawlMatUsed]=useState(false);
  const [crawlMatL,setCrawlMatL]=useState(""); const [crawlMatLU,setCrawlMatLU]=useState("m");
  const [crawlMatW,setCrawlMatW]=useState(""); const [crawlMatWU,setCrawlMatWU]=useState("m");
  const [crawlMatsPerTrack,setCrawlMatsPerTrack]=useState("1");
  const [buriedServices,setBuriedServices]=useState("NO");
  const [pipeDepth,setPipeDepth]=useState(""); const [pipeDepthU,setPipeDepthU]=useState("m");
  const [pipeAllowGBP,setPipeAllowGBP]=useState("");

  const glw = g.glw||0;

  // ── OUTRIGGER CALCS ──
  const padArea = toM(padL,padLU)*toM(padW,padWU);
  const matAreaO = toM(matL,matLU)*toM(matW,matWU);
  const effAreaO = matUsed&&matAreaO>0 ? matAreaO : padArea;
  const gvwN=parseFloat(gvw)||0, riggWtN=parseFloat(riggingWt)||(glw*0.10);
  const dlfN=parseFloat(dlf)||1.25, distFN=parseFloat(distF)||0.65;
  const fMax = (gvwN+glw+riggWtN)*dlfN*distFN; // tonnes
  const fMaxKN = fMax*9.81;
  const calcGBP_O = effAreaO>0 ? fMaxKN/effAreaO : 0;
  const allow = parseFloat(allowGBP)||0;
  const gbpUtil_O = allow>0 ? (calcGBP_O/allow)*100 : 0;
  const minAreaO = allow>0 ? fMaxKN/allow : 0;
  const minSideO = Math.sqrt(minAreaO);

  // ── CRAWLER CALCS ──
  const trackArea = toM(trackW,trackWU)*toM(trackL,trackLU);
  const crawlMatArea = toM(crawlMatL,crawlMatLU)*toM(crawlMatW,crawlMatWU)*(parseInt(crawlMatsPerTrack)||1);
  const effAreaC = crawlMatUsed&&crawlMatArea>0 ? crawlMatArea : trackArea;
  const opWtN=parseFloat(craneOpWt)||0, dafN=parseFloat(daf)||1.25;
  const pAvg = (opWtN+glw)*9.81 / (2*Math.max(trackArea,0.001));
  const pDynamic = pAvg*dafN;
  const pSingleTrack = pDynamic*0.55;
  const calcGBP_C = effAreaC>0 ? pSingleTrack/effAreaC : 0; // already kPa since pSingleTrack is kPa
  // Actually pSingleTrack is reaction force not pressure — need to recalc:
  // P_avg (kPa) = (opWt+glw)*9.81 / (2*trackArea)
  // P_dynamic = P_avg * daf
  // Worst single track P = P_dynamic * 0.55
  // GBP = worst single track P (already kPa - it IS the pressure on one track)
  const gbpUtil_C = allow>0 ? (calcGBP_C/allow)*100 : 0;
  const minAreaC = allow>0 ? pSingleTrack/allow : 0;
  const minSideC = Math.sqrt(Math.max(minAreaC,0));

  // Buried services
  const hDepth = toM(pipeDepth,pipeDepthU);
  const B = toM(crawlMatW,crawlMatWU)||toM(trackW,trackWU);
  const Lm = toM(crawlMatL,crawlMatLU)||toM(trackL,trackLU);
  const pDepthCalc = B>0&&Lm>0&&hDepth>0
    ? pDynamic / ((B+2*hDepth)*(Lm+2*hDepth))
    : 0;
  const pipeAllow = parseFloat(pipeAllowGBP)||0;

  // Pass to global state
  const calcGBP = isCrawler ? calcGBP_C : calcGBP_O;
  const gbpUtil = isCrawler ? gbpUtil_C : gbpUtil_O;
  const effArea = isCrawler ? effAreaC : effAreaO;
  useEffect(()=>{updateG({gbp:calcGBP,gbpUtil,allowGBP:allow,effArea})},[calcGBP,gbpUtil,allow,effArea]);

  const URow = ({label,val,unit}) => (
    <div className="form-row">
      <label className="label-calc">{label}</label>
      <input className="input-calc" value={val} readOnly />
    </div>
  );

  const DimRow = ({label,val,setVal,unit,setUnit}) => (
    <div className="form-row">
      <label className="label-input">{label}</label>
      <div className="input-wrap">
        <input className="input-user" type="number" value={val} onChange={e=>setVal(e.target.value)} placeholder="0"/>
        <select className="unit-sel" value={unit} onChange={e=>setUnit(e.target.value)}>
          {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
        </select>
      </div>
    </div>
  );

  const MinReqPanel = ({fKN, effA, minA, minS, padDims, label}) => {
    const adequate = effA>=minA;
    return (
      <div style={{background:"var(--bg-section)",border:`1px solid ${adequate?"var(--green-border)":"var(--red-border)"}`,borderRadius:"var(--radius-md)",padding:"14px 16px",marginTop:14}}>
        <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10}}>
          📐 Minimum {label} Requirements
        </div>
        <div style={{fontFamily:"Arial,monospace",fontSize:11,color:"var(--text-muted)",marginBottom:10,lineHeight:1.8,padding:"8px 10px",background:"var(--bg-card)",borderRadius:3}}>
          A_req = F_max ÷ Allowable GBP = {f2(fKN)} ÷ {allow} = <strong style={{color:"var(--blue-400)"}}>{f3(minA)} m²</strong><br/>
          Min dimension = √({f3(minA)}) = <strong style={{color:"var(--blue-400)"}}>{f3(minS)} m × {f3(minS)} m</strong> ({Math.round(minS*1000)} mm × {Math.round(minS*1000)} mm)
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Parameter</th><th>Required</th><th>Provided</th><th>Adequacy</th></tr></thead>
            <tbody>
              <tr>
                <td>Min Contact Area</td>
                <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{f3(minA)} m²</td>
                <td style={{fontFamily:"Arial,monospace"}}>{f3(effA)} m²</td>
                <td><span className={`badge ${effA>=minA?"badge-pass":"badge-fail"}`}>{effA>=minA?"✅ OK":"❌ UNDERSIZED"}</span></td>
              </tr>
              <tr>
                <td>Min Dimension</td>
                <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{f3(minS)} m</td>
                <td style={{fontFamily:"Arial,monospace"}}>{f3(Math.sqrt(effA))} m</td>
                <td><span className={`badge ${Math.sqrt(effA)>=minS?"badge-pass":"badge-fail"}`}>{Math.sqrt(effA)>=minS?"✅":"❌"}</span></td>
              </tr>
              <tr>
                <td>Min Soil Bearing</td>
                <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{effA>0?f2(fKN/effA):"—"} kPa</td>
                <td style={{fontFamily:"Arial,monospace"}}>{allow||"—"} kPa</td>
                <td><span className={`badge ${allow>=(effA>0?fKN/effA:0)?"badge-pass":"badge-fail"}`}>{allow>=(effA>0?fKN/effA:0)?"✅":"❌"}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`info-box ${adequate?"info-box-green":"info-box-red"}`} style={{marginTop:8,fontSize:11}}>
          {adequate
            ? `✅ ADEQUATE — ${f3(effA)} m² provided ≥ ${f3(minA)} m² required`
            : `❌ UNDERSIZED — Minimum: ${f3(minS)} m × ${f3(minS)} m. Increase by ${Math.max(0,Math.round((minS-Math.sqrt(effA))*1000))} mm each side.`}
        </div>
        <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>
          References: ASME B30.5 | CIRIA C703 | BS 8004:2015 | BS EN 13000 Annex B
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">🌍 Ground Bearing Pressure</span>
          <span className="std-tag">CIRIA C703 | EN 1997-1 | BS 8004:2015 | ASME P30.1</span>
        </div>
        <div className="card-body">
          <div className="info-box info-box-orange" style={{marginBottom:12}}>
            Crane Type (from Module 3): <strong style={{color:"var(--orange-500)"}}>{craneType.replace(/_/g," ")}</strong>
            {isCrawler?" — Crawler track calculation shown.":" — Outrigger pad calculation shown."}
            {!g.craneType&&" Select crane type in Module 3 to filter this module."}
          </div>

          {!isCrawler && (
            <>
              {/* ── OUTRIGGER CONFIGURATION ── */}
              <div className="section-heading">Section A — Crane Loading Inputs</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input" title="Total operating weight of the crane including all attachments. From manufacturer datasheet.">🟨 Crane Gross Vehicle Weight GVW (T) ⓘ</label>
                  <input className="input-user no-unit" type="number" value={gvw} onChange={e=>setGvw(e.target.value)} placeholder="From crane datasheet" />
                </div>
                <URow label="🔵 GVW (kN)" val={gvwN>0?f2(gvwN*9.81):"—"} />
                <div className="form-row">
                  <label className="label-input">🟨 Lifted Load / GLW (T) [auto-linked]</label>
                  <input className="input-calc" value={f2(glw)} readOnly />
                </div>
                <div className="form-row">
                  <label className="label-input">🟨 Rigging Weight (T)</label>
                  <input className="input-user no-unit" type="number" value={riggingWt} onChange={e=>setRiggingWt(e.target.value)} placeholder={`Default: ${f2(glw*0.10)} T (10%)`} />
                </div>
                <div className="form-row">
                  <label className="label-input" title="Dynamic Load Factor — default 1.25 per ASME B30.5. Range 1.10–1.50.">🟨 Dynamic Load Factor (DLF) ⓘ</label>
                  <input className="input-user no-unit" type="number" step="0.01" min="1.10" max="1.50" value={dlf} onChange={e=>setDlf(e.target.value)} />
                </div>
                <div className="form-row">
                  <label className="label-input" title="Fraction of total reaction on single worst-case outrigger. 0.65 per CIRIA C703 Sec.4.3. Range 0.50–0.75 per BS EN 13000 Annex B.">🟨 Outrigger Distribution Factor ⓘ</label>
                  <input className="input-user no-unit" type="number" step="0.01" min="0.50" max="0.75" value={distF} onChange={e=>setDistF(e.target.value)} />
                </div>
              </div>

              <div className="section-heading">Section B — Outrigger Geometry</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Number of Outriggers</label>
                  <select className="input-user no-unit" value={numOutriggers} onChange={e=>setNumOutriggers(e.target.value)}>
                    <option value="2">2</option><option value="4">4</option>
                  </select>
                </div>
                <DimRow label="🟨 Outrigger Span — Front to Rear" val={spanFR} setVal={setSpanFR} unit={spanFRU} setUnit={setSpanFRU}/>
                <DimRow label="🟨 Outrigger Span — Side to Side" val={spanSS} setVal={setSpanSS} unit={spanSSU} setUnit={setSpanSSU}/>
                <DimRow label="🟨 Outrigger Pad Length" val={padL} setVal={setPadL} unit={padLU} setUnit={setPadLU}/>
                <DimRow label="🟨 Outrigger Pad Width"  val={padW} setVal={setPadW} unit={padWU} setUnit={setPadWU}/>
                <URow label="🔵 Pad Area (m²)" val={f3(padArea)} />
                <div className="form-row" style={{gridColumn:"1/-1"}}>
                  <div className="toggle-wrap">
                    <label className="toggle"><input type="checkbox" checked={matUsed} onChange={e=>setMatUsed(e.target.checked)}/><span className="toggle-track"/><span className="toggle-thumb"/></label>
                    <span style={{fontSize:13,color:"var(--text-secondary)"}}>🟨 Cribbing / Mat Used?</span>
                  </div>
                </div>
                {matUsed && <>
                  <DimRow label="🟨 Mat Length" val={matL} setVal={setMatL} unit={matLU} setUnit={setMatLU}/>
                  <DimRow label="🟨 Mat Width"  val={matW} setVal={setMatW} unit={matWU} setUnit={setMatWU}/>
                  <URow label="🔵 Mat Area (m²)" val={f3(matAreaO)} />
                </>}
                <URow label="🔵 Effective Contact Area (m²)" val={f3(effAreaO)} />
              </div>

              <div className="section-heading">Section C — Soil / Site Conditions</div>
              <div className="table-wrap" style={{marginBottom:10}}>
                <table className="data-table">
                  <thead><tr><th>Soil Type</th><th>Allowable GBP (kPa)</th><th>Notes</th></tr></thead>
                  <tbody>{SOIL_TABLE.map(s=>(
                    <tr key={s.type} style={{cursor:"pointer"}} className={allowGBP===String(s.gbp)?"highlight":""} onClick={()=>setAllowGBP(String(s.gbp))}>
                      <td>{s.type}</td>
                      <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{s.gbp}</td>
                      <td style={{fontSize:11,color:"var(--text-muted)"}}>{s.warn||""}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Allowable Site GBP (kPa) — override</label>
                  <input className="input-user no-unit" type="number" value={allowGBP} onChange={e=>setAllowGBP(e.target.value)} placeholder="From geotechnical report preferred" />
                </div>
              </div>

              <div className="section-heading">Section D — Auto Calculations</div>
              <div style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:12,fontFamily:"Arial,monospace",fontSize:11,lineHeight:2.0,color:"var(--text-secondary)"}}>
                <strong style={{color:"var(--text-orange)"}}>STEP 1 — Max Outrigger Reaction Force (F_max)</strong><br/>
                F_max = (GVW + GLW + Rigging) × DLF × Distribution Factor<br/>
                F_max = ({f2(gvwN)} + {f2(glw)} + {f2(riggWtN)}) × {dlfN} × {distFN}<br/>
                F_max = <strong style={{color:"var(--blue-400)"}}>{f2(fMax)} T = {f2(fMaxKN)} kN</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 2 — Calculated GBP</strong><br/>
                GBP = F_max ÷ Effective Contact Area = {f2(fMaxKN)} ÷ {f3(effAreaO)}<br/>
                GBP = <strong style={{color:"var(--blue-400)"}}>{f2(calcGBP_O)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 3 — GBP Utilization</strong><br/>
                U% = {f2(calcGBP_O)} ÷ {allow||"?"} × 100 = <strong style={{color:"var(--blue-400)"}}>{f2(gbpUtil_O)}%</strong>
              </div>
              <div className="grid-4" style={{marginBottom:8}}>
                <div className="stat-card"><div className="stat-label">F_max</div><div className="stat-val">{f2(fMaxKN)}<span className="stat-unit">kN</span></div></div>
                <div className="stat-card"><div className="stat-label">Calculated GBP</div><div className="stat-val">{f2(calcGBP_O)}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card"><div className="stat-label">Allowable GBP</div><div className="stat-val">{allow||"—"}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card" style={{background:gbpUtil_O>100?"var(--red-bg)":gbpUtil_O>75?"var(--amber-bg)":"var(--green-bg)"}}>
                  <div className="stat-label">GBP Utilization</div>
                  <div className="stat-val" style={{color:gbpUtil_O>100?"var(--red-400)":gbpUtil_O>75?"var(--amber-400)":"var(--green-400)"}}>{f2(gbpUtil_O)}<span className="stat-unit">%</span></div>
                </div>
              </div>
              <UtilBar value={gbpUtil_O} label="GBP Utilization" />

              {allow>0&&<MinReqPanel fKN={fMaxKN} effA={effAreaO} minA={minAreaO} minS={minSideO} label="Outrigger Pad" />}
            </>
          )}

          {isCrawler && (
            <>
              {/* ── CRAWLER CONFIGURATION ── */}
              <div className="section-heading">Section A — Crane Loading Inputs</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Crane Operating Weight (T)</label>
                  <input className="input-user no-unit" type="number" value={craneOpWt} onChange={e=>setCraneOpWt(e.target.value)} placeholder="From manufacturer datasheet" />
                </div>
                <URow label="🔵 Operating Weight (kN)" val={opWtN>0?f2(opWtN*9.81):"—"} />
                <div className="form-row">
                  <label className="label-input">🟨 Lifted Load / GLW (T) [auto-linked]</label>
                  <input className="input-calc" value={f2(glw)} readOnly />
                </div>
                <div className="form-row">
                  <label className="label-input" title="DAF ≥ 1.25 per ASME P30.1 Sec.6.6.3">🟨 Dynamic Amplification Factor (DAF) ⓘ</label>
                  <input className="input-user no-unit" type="number" step="0.01" min="1.10" max="1.50" value={daf} onChange={e=>setDaf(e.target.value)} />
                </div>
              </div>

              <div className="section-heading">Section B — Track Geometry</div>
              <div className="form-grid">
                <DimRow label="🟨 Track Shoe Width" val={trackW} setVal={setTrackW} unit={trackWU} setUnit={setTrackWU}/>
                <DimRow label="🟨 Track Contact Length" val={trackL} setVal={setTrackL} unit={trackLU} setUnit={setTrackLU}/>
                <URow label="🔵 Single Track Contact Area (m²)" val={f3(trackArea)} />
                <URow label="🔵 Total Track Contact Area (m²)" val={f3(trackArea*2)} />
                <div className="form-row" style={{gridColumn:"1/-1"}}>
                  <div className="toggle-wrap">
                    <label className="toggle"><input type="checkbox" checked={crawlMatUsed} onChange={e=>setCrawlMatUsed(e.target.checked)}/><span className="toggle-track"/><span className="toggle-thumb"/></label>
                    <span style={{fontSize:13,color:"var(--text-secondary)"}}>🟨 Mat / Bottom Plate Used?</span>
                  </div>
                </div>
                {crawlMatUsed && <>
                  <DimRow label="🟨 Mat Length" val={crawlMatL} setVal={setCrawlMatL} unit={crawlMatLU} setUnit={setCrawlMatLU}/>
                  <DimRow label="🟨 Mat Width"  val={crawlMatW} setVal={setCrawlMatW} unit={crawlMatWU} setUnit={setCrawlMatWU}/>
                  <div className="form-row">
                    <label className="label-input">🟨 Mats per Track</label>
                    <input className="input-user no-unit" type="number" min="1" value={crawlMatsPerTrack} onChange={e=>setCrawlMatsPerTrack(e.target.value)}/>
                  </div>
                  <URow label="🔵 Single Mat Area (m²)" val={f3(toM(crawlMatL,crawlMatLU)*toM(crawlMatW,crawlMatWU))} />
                  <URow label="🔵 Total Mat Area per Track (m²)" val={f3(crawlMatArea)} />
                </>}
                <URow label="🔵 Effective Contact Area (m²)" val={f3(effAreaC)} />
              </div>

              <div className="section-heading">Section C — Buried Services / Pipeline Check</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Buried Services / Pipeline Present?</label>
                  <select className="input-user no-unit" value={buriedServices} onChange={e=>setBuriedServices(e.target.value)}><option>NO</option><option>YES</option></select>
                </div>
                {buriedServices==="YES" && <>
                  <DimRow label="🟨 Depth to Crown of Pipe h" val={pipeDepth} setVal={setPipeDepth} unit={pipeDepthU} setUnit={setPipeDepthU}/>
                  <div className="form-row">
                    <label className="label-input">🟨 Allowable Pressure on Pipe (kPa)</label>
                    <input className="input-user no-unit" type="number" value={pipeAllowGBP} onChange={e=>setPipeAllowGBP(e.target.value)} placeholder="From pipeline authority document"/>
                  </div>
                  <URow label="🔵 Pressure at Depth (kPa)" val={pipeDepthU&&pDepthCalc>0?f2(pDepthCalc):"—"} />
                  {pipeAllowGBP&&pDepthCalc>0 && (
                    <div className="form-row" style={{gridColumn:"1/-1"}}>
                      <div className={`info-box ${pDepthCalc<=parseFloat(pipeAllowGBP)?"info-box-green":"info-box-red"}`}>
                        {pDepthCalc<=parseFloat(pipeAllowGBP)
                          ? `✅ Pipeline OK — Pressure at depth ${f2(pDepthCalc)} kPa ≤ allowable ${pipeAllowGBP} kPa`
                          : `❌ EXCEEDS PIPELINE LIMIT — ${f2(pDepthCalc)} kPa > ${pipeAllowGBP} kPa — increase mat size or re-route crane path`}
                      </div>
                      <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:4}}>
                        P_depth = P_dynamic ÷ [(B+2h·tan45°)(L+2h·tan45°)] | Reference: CIRIA C580 / BS EN 1997-1
                      </div>
                    </div>
                  )}
                </>}
              </div>

              <div className="section-heading">Section C2 — Soil / Site Conditions</div>
              <div className="table-wrap" style={{marginBottom:10}}>
                <table className="data-table">
                  <thead><tr><th>Soil Type</th><th>Allowable GBP (kPa)</th><th>Notes</th></tr></thead>
                  <tbody>{SOIL_TABLE.map(s=>(
                    <tr key={s.type} style={{cursor:"pointer"}} className={allowGBP===String(s.gbp)?"highlight":""} onClick={()=>setAllowGBP(String(s.gbp))}>
                      <td>{s.type}</td>
                      <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{s.gbp}</td>
                      <td style={{fontSize:11,color:"var(--text-muted)"}}>{s.warn||""}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Allowable Site GBP (kPa)</label>
                  <input className="input-user no-unit" type="number" value={allowGBP} onChange={e=>setAllowGBP(e.target.value)} placeholder="From geotechnical report"/>
                </div>
              </div>

              <div className="section-heading">Section D — Auto Calculations</div>
              <div style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:12,fontFamily:"Arial,monospace",fontSize:11,lineHeight:2.0,color:"var(--text-secondary)"}}>
                <strong style={{color:"var(--text-orange)"}}>STEP 1 — Average Ground Pressure Under Tracks</strong><br/>
                P_avg = (Operating Wt + GLW) × 9.81 ÷ (2 × Track Area)<br/>
                P_avg = ({f2(opWtN)}+{f2(glw)}) × 9.81 ÷ (2 × {f3(trackArea)})<br/>
                P_avg = <strong style={{color:"var(--blue-400)"}}>{f2(pAvg)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 2 — Dynamic Amplification (ASME P30.1 Sec.6.6.3)</strong><br/>
                P_dynamic = P_avg × DAF = {f2(pAvg)} × {dafN} = <strong style={{color:"var(--blue-400)"}}>{f2(pDynamic)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 3 — Worst Single Track (CIRIA C703 Sec.4.3)</strong><br/>
                P_track = P_dynamic × 0.55 = {f2(pDynamic)} × 0.55 = <strong style={{color:"var(--blue-400)"}}>{f2(pSingleTrack)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 4 — Effective Mat GBP</strong><br/>
                GBP = P_track ÷ Mat Area = {f2(pSingleTrack)} ÷ {f3(effAreaC)} = <strong style={{color:"var(--blue-400)"}}>{f2(calcGBP_C)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 5 — GBP Utilization</strong><br/>
                U% = {f2(calcGBP_C)} ÷ {allow||"?"} × 100 = <strong style={{color:"var(--blue-400)"}}>{f2(gbpUtil_C)}%</strong>
              </div>
              <div className="grid-4" style={{marginBottom:8}}>
                <div className="stat-card"><div className="stat-label">P_avg</div><div className="stat-val">{f2(pAvg)}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card"><div className="stat-label">P_dynamic</div><div className="stat-val">{f2(pDynamic)}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card"><div className="stat-label">P_single track</div><div className="stat-val">{f2(pSingleTrack)}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card" style={{background:gbpUtil_C>100?"var(--red-bg)":gbpUtil_C>75?"var(--amber-bg)":"var(--green-bg)"}}>
                  <div className="stat-label">GBP Utilization</div>
                  <div className="stat-val" style={{color:gbpUtil_C>100?"var(--red-400)":gbpUtil_C>75?"var(--amber-400)":"var(--green-400)"}}>{f2(gbpUtil_C)}<span className="stat-unit">%</span></div>
                </div>
              </div>
              <UtilBar value={gbpUtil_C} label="GBP Utilization" />

              {allow>0&&<MinReqPanel fKN={pSingleTrack} effA={effAreaC} minA={minAreaC} minS={minSideC} label="Crawler Mat / Plate" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
// ── MODULE 4: RIGGING — v1.7 COMPLETE REWRITE ────────────────────────────────
const LEG_LABELS = ["A","B","C","D","E","F"];

// ── Sling angle reference table data ──────────────────────────────────────────
const SLING_ANGLE_REF = [
  {deg:90,fromVert:0,  k:1.000,status:"✅ Vertical — Max efficiency"},
  {deg:85,fromVert:5,  k:0.996,status:"✅ Excellent"},
  {deg:75,fromVert:15, k:0.966,status:"✅ Very Good"},
  {deg:60,fromVert:30, k:0.866,status:"✅ Good"},
  {deg:45,fromVert:45, k:0.707,status:"⚠️ Minimum Recommended"},
  {deg:30,fromVert:60, k:0.500,status:"❌ Critical — Avoid"},
  {deg:20,fromVert:70, k:0.342,status:"⛔ Dangerous"},
  {deg:15,fromVert:75, k:0.259,status:"⛔ Prohibited"},
];

// ── Helper: SVG plan-view for 2-leg ───────────────────────────────────────────
const PlanView2Leg = ({L,W,hookH,slingLen,slingMode,shackleH,wllEff,designLoad,hitch}) => {
  const svgW=300,svgH=200,pad=30;
  if(!L||!W) return (
    <div className="svg-diagram" style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--text-muted)',fontSize:11,fontFamily:'var(--font-mono)'}}>
      Enter object dimensions to see plan view
    </div>
  );
  const xRange=L, yRange=W;
  const sc = Math.min((svgW-pad*2)/xRange,(svgH-pad*2)/yRange);
  const cx = x => pad + x*sc;
  const cy = y => svgH-pad - y*sc;
  const ax=L*0.25, ay=W/2, bx=L*0.75, by=W/2;
  const hx=L*0.5, hy=W/2;
  const dPlan = (L*0.5-ax)*1; // = 0.25L
  const H = slingMode==="manual"&&slingLen>0 ? Math.sqrt(Math.max(0,slingLen*slingLen-dPlan*dPlan)) : (hookH||0);
  const theta = H>0&&dPlan>0 ? Math.atan2(H,dPlan)*180/Math.PI : 0;
  const K = theta>0 ? Math.sin(theta*Math.PI/180) : 0;
  const T = K>0 ? designLoad/(2*K) : 0;
  const util = wllEff>0&&T>0 ? T/wllEff*100 : 0;
  const uc = util>90?'#ef4444':util>75?'#f59e0b':'#22c55e';
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>PLAN VIEW — TOP DOWN</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        {/* Object outline */}
        <rect x={cx(0)} y={cy(W)} width={L*sc} height={W*sc} fill="rgba(80,80,80,0.2)" stroke="#555" strokeWidth="1.5"/>
        {/* Guide lines 25%/75% */}
        <line x1={cx(L*0.25)} y1={cy(W)} x2={cx(L*0.25)} y2={cy(0)} stroke="#444" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1={cx(L*0.75)} y1={cy(W)} x2={cx(L*0.75)} y2={cy(0)} stroke="#444" strokeWidth="1" strokeDasharray="4,4"/>
        {/* Distance line */}
        <line x1={cx(ax)} y1={cy(ay)} x2={cx(bx)} y2={cy(by)} stroke={uc} strokeWidth="2.5"/>
        {/* Dashed to hook */}
        <line x1={cx(ax)} y1={cy(ay)} x2={cx(hx)} y2={cy(hy)} stroke="#666" strokeWidth="1" strokeDasharray="4,3"/>
        <line x1={cx(bx)} y1={cy(by)} x2={cx(hx)} y2={cy(hy)} stroke="#666" strokeWidth="1" strokeDasharray="4,3"/>
        {/* Points */}
        <circle cx={cx(ax)} cy={cy(ay)} r="9" fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
        <text x={cx(ax)} y={cy(ay)+3.5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">A</text>
        <circle cx={cx(bx)} cy={cy(by)} r="9" fill={uc} stroke="#fff" strokeWidth="1.5"/>
        <text x={cx(bx)} y={cy(by)+3.5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">B</text>
        {/* Hook */}
        <line x1={cx(hx)-8} y1={cy(hy)} x2={cx(hx)+8} y2={cy(hy)} stroke="#f97316" strokeWidth="1.5"/>
        <line x1={cx(hx)} y1={cy(hy)-8} x2={cx(hx)} y2={cy(hy)+8} stroke="#f97316" strokeWidth="1.5"/>
        <text x={cx(hx)+10} y={cy(hy)-2} fill="#f97316" fontSize="8">⊕ Hook</text>
        {/* Labels */}
        {dPlan>0&&<text x={(cx(ax)+cx(bx))/2} y={cy(ay)-14} textAnchor="middle" fill="#f97316" fontSize="9">{f3(dPlan*2)}m span</text>}
        {/* Scale bar */}
        {sc>0&&<><line x1={pad} y1={svgH-10} x2={pad+sc} y2={svgH-10} stroke="#555" strokeWidth="2"/><text x={pad+sc/2} y={svgH-3} textAnchor="middle" fill="#555" fontSize="8">1.000m</text></>}
        {T>0&&<text x={cx(hx)} y={cy(hy)+20} textAnchor="middle" fill={uc} fontSize="8">T={f2(T)}T | U={fN(util,1)}%</text>}
      </svg>
    </div>
  );
};

// ── SVG plan-view for 3-leg ────────────────────────────────────────────────────
const PlanView3Leg = ({pts,hookH,slingLen,slingMode,wllEff,designLoad}) => {
  const svgW=300,svgH=220,pad=32;
  const validPts = pts.filter(p=>p.x!==''&&p.y!=='');
  if(validPts.length<3) return (
    <div className="svg-diagram" style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--text-muted)',fontSize:11,fontFamily:'var(--font-mono)'}}>Enter all 3 lifting point coordinates</div>
  );
  const xs=validPts.map(p=>p.x), ys=validPts.map(p=>p.y);
  const xMin=Math.min(...xs,0),xMax=Math.max(...xs),yMin=Math.min(...ys,0),yMax=Math.max(...ys);
  const xR=xMax-xMin||1, yR=yMax-yMin||1;
  const sc=Math.min((svgW-pad*2)/xR,(svgH-pad*2)/yR);
  const cx=x=>pad+(x-xMin)*sc, cy=y=>svgH-pad-(y-yMin)*sc;
  const hx=xs.reduce((a,b)=>a+b,0)/3, hy=ys.reduce((a,b)=>a+b,0)/3;
  const dists = validPts.map(p=>Math.sqrt(Math.pow(hx-p.x,2)+Math.pow(hy-p.y,2)));
  const maxD = Math.max(...dists);
  const colors=['#f97316','#f97316','#f97316'];
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>PLAN VIEW — TOP DOWN (3-LEG)</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        <polygon points={validPts.map(p=>`${cx(p.x)},${cy(p.y)}`).join(' ')} fill="rgba(80,80,80,0.18)" stroke="#555" strokeWidth="1.5"/>
        {validPts.map((p,i)=>{const isLB=dists[i]===maxD||dists[i]===Math.max(...dists.filter(d=>d!==maxD));return(
          <g key={i}>
            <line x1={cx(p.x)} y1={cy(p.y)} x2={cx(hx)} y2={cy(hy)} stroke={isLB?'#f97316':'#555'} strokeWidth={isLB?2:1} strokeDasharray={isLB?'':' 4,3'}/>
            <circle cx={cx(p.x)} cy={cy(p.y)} r="9" fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
            <text x={cx(p.x)} y={cy(p.y)+3.5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">{LEG_LABELS[i]}</text>
          </g>
        );})}
        <line x1={cx(hx)-8} y1={cy(hy)} x2={cx(hx)+8} y2={cy(hy)} stroke="#f97316" strokeWidth="1.5"/>
        <line x1={cx(hx)} y1={cy(hy)-8} x2={cx(hx)} y2={cy(hy)+8} stroke="#f97316" strokeWidth="1.5"/>
        <text x={cx(hx)+10} y={cy(hy)-2} fill="#f97316" fontSize="8">⊕ Hook</text>
        {sc>0&&<><line x1={pad} y1={svgH-10} x2={pad+sc} y2={svgH-10} stroke="#555" strokeWidth="2"/><text x={pad+sc/2} y={svgH-3} textAnchor="middle" fill="#555" fontSize="8">1.000m</text></>}
      </svg>
    </div>
  );
};

// ── SVG plan-view for 4-leg ────────────────────────────────────────────────────
const PlanView4Leg = ({pts,hookH,slingLen,slingMode,wllEff,designLoad}) => {
  const svgW=300,svgH=220,pad=32;
  const validPts = pts.filter(p=>p.x!==''&&p.y!=='');
  if(validPts.length<4) return (
    <div className="svg-diagram" style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--text-muted)',fontSize:11,fontFamily:'var(--font-mono)'}}>Enter all 4 lifting point coordinates</div>
  );
  const xs=validPts.map(p=>p.x),ys=validPts.map(p=>p.y);
  const xMin=Math.min(...xs,0),xMax=Math.max(...xs),yMin=Math.min(...ys,0),yMax=Math.max(...ys);
  const xR=xMax-xMin||1,yR=yMax-yMin||1;
  const sc=Math.min((svgW-pad*2)/xR,(svgH-pad*2)/yR);
  const cx=x=>pad+(x-xMin)*sc, cy=y=>svgH-pad-(y-yMin)*sc;
  const hx=xs.reduce((a,b)=>a+b,0)/4, hy=ys.reduce((a,b)=>a+b,0)/4;
  const dAC=Math.sqrt(Math.pow(validPts[2].x-validPts[0].x,2)+Math.pow(validPts[2].y-validPts[0].y,2));
  const dBD=Math.sqrt(Math.pow(validPts[3].x-validPts[1].x,2)+Math.pow(validPts[3].y-validPts[1].y,2));
  const worstDiag = dAC>=dBD ? [0,2] : [1,3];
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>PLAN VIEW — TOP DOWN (4-LEG)</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        <polygon points={validPts.map(p=>`${cx(p.x)},${cy(p.y)}`).join(' ')} fill="rgba(80,80,80,0.18)" stroke="#555" strokeWidth="1.5"/>
        <line x1={cx(validPts[0].x)} y1={cy(validPts[0].y)} x2={cx(validPts[2].x)} y2={cy(validPts[2].y)} stroke={dAC>=dBD?"#ef4444":"#f59e0b"} strokeWidth="1.5" strokeDasharray="6,3"/>
        <line x1={cx(validPts[1].x)} y1={cy(validPts[1].y)} x2={cx(validPts[3].x)} y2={cy(validPts[3].y)} stroke={dBD>dAC?"#ef4444":"#f59e0b"} strokeWidth="1.5" strokeDasharray="6,3"/>
        {validPts.map((p,i)=>{const isLB=worstDiag.includes(i);return(
          <g key={i}>
            <line x1={cx(p.x)} y1={cy(p.y)} x2={cx(hx)} y2={cy(hy)} stroke={isLB?'#f97316':'#666'} strokeWidth={isLB?2.5:1} strokeDasharray={isLB?'':'4,3'}/>
            <circle cx={cx(p.x)} cy={cy(p.y)} r="9" fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
            <text x={cx(p.x)} y={cy(p.y)+3.5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">{LEG_LABELS[i]}</text>
          </g>
        );})}
        <line x1={cx(hx)-8} y1={cy(hy)} x2={cx(hx)+8} y2={cy(hy)} stroke="#f97316" strokeWidth="1.5"/>
        <line x1={cx(hx)} y1={cy(hy)-8} x2={cx(hx)} y2={cy(hy)+8} stroke="#f97316" strokeWidth="1.5"/>
        <text x={cx(hx)+10} y={cy(hy)-2} fill="#f97316" fontSize="8">⊕ Hook</text>
        <text x={pad} y={svgH-14} fill={dAC>=dBD?"#ef4444":"#f59e0b"} fontSize="7">A↔C={f2(dAC)}m {dAC>=dBD?"← WORST":""}</text>
        <text x={pad} y={svgH-5} fill={dBD>dAC?"#ef4444":"#f59e0b"} fontSize="7">B↔D={f2(dBD)}m {dBD>dAC?"← WORST":""}</text>
        {sc>0&&<><line x1={svgW-pad-sc} y1={svgH-22} x2={svgW-pad} y2={svgH-22} stroke="#555" strokeWidth="2"/><text x={svgW-pad-sc/2} y={svgH-14} textAnchor="middle" fill="#555" fontSize="7">1m</text></>}
      </svg>
    </div>
  );
};

// ── SVG side elevation ─────────────────────────────────────────────────────────
const SideElevationView = ({dPlan,hookH,slingLen,tension,theta,wllEff}) => {
  const svgW=280,svgH=220,padL=40,padB=24,padT=24,padR=60;
  const H=hookH||0, d=dPlan||0, S=slingLen||0;
  const canH=svgH-padT-padB, canW=svgW-padL-padR;
  const scY=H>0?Math.min(canH/H,80):40, scX=d>0?Math.min(canW/d,80):40;
  const sc=Math.min(scY,scX);
  const ox=padL, oy=svgH-padB;
  const lpX=ox+d*sc, lpY=oy;
  const hkX=ox, hkY=oy-H*sc;
  const warn45 = theta>0&&theta<45;
  const util=wllEff>0&&tension>0?tension/wllEff*100:0;
  const uc=util>90?'#ef4444':util>75?'#f59e0b':'#22c55e';
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>SIDE ELEVATION — WORST-CASE LEG</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        {warn45&&<polygon points={`${ox},${oy} ${lpX},${lpY} ${hkX},${hkY}`} fill="rgba(239,68,68,0.08)"/>}
        {/* Ground */}
        <line x1={0} y1={oy} x2={svgW} y2={oy} stroke="var(--border-strong)" strokeWidth="2"/>
        <text x={svgW/2} y={oy+12} textAnchor="middle" fill="#555" fontSize="8">Ground Level</text>
        {H>0&&d>0?<>
          {/* Horizontal dim */}
          <line x1={ox} y1={oy+14} x2={lpX} y2={oy+14} stroke="#60a5fa" strokeWidth="1.5"/>
          <text x={(ox+lpX)/2} y={oy+22} textAnchor="middle" fill="#60a5fa" fontSize="8">d={f2(d)}m</text>
          {/* Vertical dim */}
          <line x1={lpX+8} y1={lpY} x2={lpX+8} y2={hkY} stroke="#22c55e" strokeWidth="1.5"/>
          <text x={lpX+14} y={(lpY+hkY)/2} fill="#22c55e" fontSize="8">H={f2(H)}m</text>
          {/* Right angle */}
          <polyline points={`${ox+10},${oy} ${ox+10},${oy-10} ${ox},${oy-10}`} fill="none" stroke="#555" strokeWidth="1"/>
          {/* Sling */}
          <line x1={lpX} y1={lpY} x2={hkX} y2={hkY} stroke={uc} strokeWidth="2.5" strokeLinecap="round"/>
          {/* Sling length label */}
          <text x={(lpX+hkX)/2+8} y={(lpY+hkY)/2-4} fill={uc} fontSize="8">S={f2(S)}m</text>
          {/* Tension label */}
          <text x={(lpX+hkX)/2-8} y={(lpY+hkY)/2+10} fill={uc} fontSize="8">T={f2(tension)}T</text>
          {/* Angle arc */}
          {theta>0&&<>
            <path d={`M ${lpX-28} ${lpY} A 28 28 0 0 0 ${lpX-28*Math.cos((90-theta)*Math.PI/180)} ${lpY-28*Math.sin((90-theta)*Math.PI/180)}`} fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x={lpX-38} y={lpY-16} fill="#f59e0b" fontSize="8">θh={f2(theta)}°</text>
          </>}
          {/* Hook block */}
          <rect x={hkX-14} y={hkY-12} width="28" height="12" rx="2" fill="#333" stroke={uc} strokeWidth="1.5"/>
          <text x={hkX} y={hkY-4} textAnchor="middle" fill={uc} fontSize="7">Hook</text>
          {/* Lifting point */}
          <circle cx={lpX} cy={lpY} r="7" fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
          {/* Load block */}
          <rect x={ox} y={oy-16} width={d*sc} height="16" rx="2" fill="rgba(80,80,80,0.3)" stroke="#555" strokeWidth="1"/>
          {warn45&&<text x={lpX-20} y={lpY-55} fill="#ef4444" fontSize="9">⚠️</text>}
        </>:<text x={svgW/2} y={svgH/2} textAnchor="middle" fill="#555" fontSize="11">Enter hook height and geometry</text>}
      </svg>
    </div>
  );
};

// ── SVG isometric view ─────────────────────────────────────────────────────────
const IsometricView = ({pts,hookH,tension,wllEff,designLoad,legCount}) => {
  const svgW=280,svgH=220;
  const util=wllEff>0&&tension>0?tension/wllEff*100:0;
  const lbColor=util>90?'#ef4444':util>75?'#f59e0b':'#22c55e';
  const n=Math.min(pts.length,6);
  const isoX=(wx,wy)=>(wx-wy)*Math.cos(Math.PI/6);
  const isoY=(wx,wy,wz)=>(wx+wy)*Math.sin(Math.PI/6)-wz;
  const cx=140,cy=160;
  const L=pts[0]?.objL||4, W=pts[0]?.objW||2, H=hookH||3;
  const sc=Math.min(30,40/Math.max(L,W,H));
  const ti=(wx,wy,wz)=>([cx+isoX(wx,wy)*sc, cy+isoY(wx,wy,wz)*sc]);
  const [gax,gay]=ti(0,0,0);
  const [gbx,gby]=ti(L,0,0);
  const [gcx,gcy]=ti(L,W,0);
  const [gdx,gdy]=ti(0,W,0);
  const [tax,tay]=ti(0,0,1.2);
  const [tbx,tby]=ti(L,0,1.2);
  const [tcx,tcy]=ti(L,W,1.2);
  const [tdx,tdy]=ti(0,W,1.2);
  const [hkx,hky]=ti(L/2,W/2,H);
  const lps = n===2 ? [[L*0.25,W/2],[L*0.75,W/2]] :
               n===3 ? [[0,0],[L,0],[L/2,W]] :
               n===4 ? [[0,0],[L,0],[L,W],[0,W]] :
               [[0,0],[L,0],[L,W],[0,W],[L/2,0],[L/2,W]].slice(0,n);
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>ISOMETRIC VIEW (30° PROJECTION)</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        {/* Load block faces */}
        <polygon points={`${gax},${gay} ${gbx},${gby} ${gcx},${gcy} ${gdx},${gdy}`} fill="rgba(60,60,60,0.3)" stroke="#444" strokeWidth="1"/>
        <polygon points={`${tax},${tay} ${tbx},${tby} ${tcx},${tcy} ${tdx},${tdy}`} fill="rgba(100,100,100,0.35)" stroke="#555" strokeWidth="1"/>
        <polygon points={`${gax},${gay} ${gbx},${gby} ${tbx},${tby} ${tax},${tay}`} fill="rgba(70,70,70,0.25)" stroke="#444" strokeWidth="1"/>
        <polygon points={`${gbx},${gby} ${gcx},${gcy} ${tcx},${tcy} ${tbx},${tby}`} fill="rgba(65,65,65,0.25)" stroke="#444" strokeWidth="1"/>
        {/* Sling legs */}
        {lps.map(([wx,wy],i)=>{
          const [px,py]=ti(wx,wy,1.2);
          return <g key={i}>
            <line x1={px} y1={py} x2={hkx} y2={hky} stroke={lbColor} strokeWidth="2" strokeLinecap="round"/>
            <circle cx={px} cy={py} r="5" fill="#f97316" stroke="#fff" strokeWidth="1"/>
            <text x={px} y={py+3} textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">{LEG_LABELS[i]}</text>
          </g>;
        })}
        {/* Hook */}
        <rect x={hkx-10} y={hky-8} width="20" height="8" rx="1" fill="#333" stroke={lbColor} strokeWidth="1.5"/>
        <text x={hkx} y={hky-1} textAnchor="middle" fill={lbColor} fontSize="6">Hook</text>
        {/* H label */}
        <line x1={hkx+30} y1={hky} x2={hkx+30} y2={tay} stroke="#22c55e" strokeWidth="1" strokeDasharray="3,2"/>
        <text x={hkx+36} y={(hky+tay)/2} fill="#22c55e" fontSize="8">H={f2(hookH||0)}m</text>
        {/* Legend */}
        <line x1={8} y1={svgH-20} x2={22} y2={svgH-20} stroke={lbColor} strokeWidth="2"/>
        <text x={24} y={svgH-17} fill={lbColor} fontSize="7">Load-bearing</text>
        <text x={8} y={svgH-8} fill="#555" fontSize="7">{legCount} legs | T={f2(tension)}T | {fN(util,1)}% util</text>
      </svg>
    </div>
  );
};

// ── MAIN RIGGING CALC COMPONENT ────────────────────────────────────────────────
const RiggingCalc = () => {
  const {g,updateG} = useContext(AppCtx);

  // Step 1 — Design load
  const [manualLoad,setManualLoad]=useState(""); const [manualLoadU,setManualLoadU]=useState("T");
  const [manualDaf,setManualDaf]=useState("1.00");
  const glwLinked = g.glw>0;
  const dafLinked = g.daf||1.00;
  const designLoadRaw = glwLinked
    ? (g.glw*(g.daf||1.00))
    : (parseFloat(manualLoad)||0)*(parseFloat(manualDaf)||1.00);
  const designLoad = designLoadRaw;

  // Step 2 — Configuration
  const [legCount,setLegCount]=useState(4);
  const [hitch,setHitch]=useState("direct");
  const [slingType,setSlingType]=useState("Wire Rope");

  // Step 3 — WLL + length
  const [wll,setWll]=useState(""); const [wllU,setWllU]=useState("T");
  const [slingMode,setSlingMode]=useState("hookH"); // 'hookH' | 'slingLen' | 'angle'
  const [hookHVal,setHookHVal]=useState(""); const [hookHU,setHookHU]=useState("m");
  const [slingLenVal,setSlingLenVal]=useState(""); const [slingLenU,setSlingLenU]=useState("m");
  const [desiredAngle,setDesiredAngle]=useState("");
  const [shackleH,setShackleH]=useState("0.150"); const [shackleHU,setShackleHU]=useState("m");

  const wllT = parseFloat(wll)||0;
  const wllEff = hitch==="choker" ? wllT*0.75 : wllT;

  // Step 4 — Geometry
  const n = Math.min(parseInt(legCount)||4,6);
  const [objL,setObjL]=useState(""); const [objLU,setObjLU]=useState("m");
  const [objW,setObjW]=useState(""); const [objWU,setObjWU]=useState("m");
  const [customPos2,setCustomPos2]=useState(false);
  const [ptAx2,setPtAx2]=useState(""); const [ptAx2U,setPtAx2U]=useState("m");
  const [ptBx2,setPtBx2]=useState(""); const [ptBx2U,setPtBx2U]=useState("m");

  // 3/4/5/6-leg points — array of {x,y,xu,yu}
  const maxPts=6;
  const [pts,setPts]=useState(Array.from({length:maxPts},(_,i)=>({x:'',y:'',xu:'m',yu:'m'})));
  const setPoint=(i,field,val)=>setPts(p=>p.map((pt,j)=>j===i?{...pt,[field]:val}:pt));

  const ObjL=toM(objL,objLU), ObjW=toM(objW,objWU);

  // Auto-default 3/4-leg coordinates from object dims
  const defaultPts = useMemo(()=>{
    if(!ObjL||!ObjW) return [];
    if(n===3) return [{x:0,y:0},{x:ObjL,y:0},{x:ObjL/2,y:ObjW}];
    if(n===4) return [{x:0,y:0},{x:ObjL,y:0},{x:ObjL,y:ObjW},{x:0,y:ObjW}];
    return [];
  },[n,ObjL,ObjW]);

  // Effective point coords — use user entry if set, else default
  const effPts = useMemo(()=>{
    return Array.from({length:n},(_,i)=>{
      const p=pts[i];
      const hasUser=p.x!==''&&p.y!=='';
      if(hasUser) return {x:toM(p.x,p.xu),y:toM(p.y,p.yu)};
      if(defaultPts[i]) return defaultPts[i];
      return null;
    }).filter(Boolean);
  },[pts,n,defaultPts]);

  // 2-leg positioning
  const pt2A = customPos2&&ptAx2!=='' ? toM(ptAx2,ptAx2U) : ObjL*0.25;
  const pt2B = customPos2&&ptBx2!=='' ? toM(ptBx2,ptBx2U) : ObjL*0.75;

  // Step 5 — Hook centroid + distances
  const hookPos = useMemo(()=>{
    if(n===2) return {x:(pt2A+pt2B)/2, y:ObjW/2};
    if(effPts.length>=n) return {
      x:effPts.reduce((s,p)=>s+p.x,0)/effPts.length,
      y:effPts.reduce((s,p)=>s+p.y,0)/effPts.length,
    };
    return null;
  },[n,effPts,pt2A,pt2B,ObjW]);

  const legGeom = useMemo(()=>{
    if(!hookPos) return [];
    const allPts = n===2
      ? [{x:pt2A,y:ObjW/2},{x:pt2B,y:ObjW/2}]
      : effPts.slice(0,n);
    return allPts.map((p,i)=>{
      const dPlan=Math.sqrt(Math.pow(hookPos.x-p.x,2)+Math.pow(hookPos.y-p.y,2));
      const hookHm=toM(hookHVal,hookHU);
      const slingLenM=toM(slingLenVal,slingLenU);
      const angDeg=parseFloat(desiredAngle)||0;
      let H=0, S=0, thetaH=0, K=0, tooShort=false;
      if(slingMode==='hookH'&&hookHm>0){
        H=hookHm; S=Math.sqrt(dPlan*dPlan+H*H);
      } else if(slingMode==='slingLen'&&slingLenM>0){
        S=slingLenM;
        if(S<dPlan){tooShort=true; H=0;}
        else H=Math.sqrt(S*S-dPlan*dPlan);
      } else if(slingMode==='angle'&&angDeg>0){
        thetaH=angDeg; H=dPlan/Math.tan(thetaH*Math.PI/180); S=Math.sqrt(dPlan*dPlan+H*H);
      }
      if(H>0&&dPlan>=0){
        const thetaV=Math.atan2(dPlan,H)*180/Math.PI;
        thetaH=90-thetaV;
        K=Math.sin(thetaH*Math.PI/180);
      }
      return {leg:LEG_LABELS[i],dPlan,H,S,thetaH,K,tooShort,p};
    });
  },[hookPos,n,effPts,pt2A,pt2B,ObjW,slingMode,hookHVal,hookHU,slingLenVal,slingLenU,desiredAngle]);

  // Worst case — lowest thetaH > 0
  const worstLeg = legGeom.filter(l=>l.thetaH>0).sort((a,b)=>a.thetaH-b.thetaH)[0];
  const bestK = worstLeg?.K||0;
  const worstTheta = worstLeg?.thetaH||0;

  // Step 6 — Tension
  const loadBearingN = n===1?1:2;
  const tension = bestK>0&&designLoad>0 ? designLoad/(loadBearingN*bestK) : 0;
  const util = wllEff>0&&tension>0 ? tension/wllEff*100 : 0;
  const utilCls = utilClass(util);

  // Identify load-bearing legs (worst distance pair)
  const lbLegs = useMemo(()=>{
    if(n<=2) return legGeom.map((_,i)=>i);
    const sorted=[...legGeom].sort((a,b)=>b.dPlan-a.dPlan);
    return [legGeom.indexOf(sorted[0]),legGeom.indexOf(sorted[1])];
  },[legGeom,n]);

  // Update global state
  useEffect(()=>{
    updateG({slingAngle:worstTheta,tensionPerLeg:tension,riggingUtil:util});
  },[worstTheta,tension,util]);

  // Status badges
  const angleStatus = worstTheta>=60?"✅ GOOD — High efficiency"
    :worstTheta>=45?"✅ ACCEPTABLE — Above minimum"
    :worstTheta>=30?"⚠️ WARNING — Below 45° minimum"
    :worstTheta>0?"❌ CRITICAL — Prohibited angle":"—";
  const angleColor = worstTheta>=45?"var(--green-400)":worstTheta>=30?"var(--amber-400)":worstTheta>0?"var(--red-400)":"var(--text-muted)";
  const hasTooShort = legGeom.some(l=>l.tooShort);

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">🪢 Rigging Calculation</span>
          <span className="std-tag">ASME B30.9 | BS EN 1492 | ISO 12480-1 | ASME P30.1</span>
        </div>
        <div className="card-body">

          {/* ── STEP 1: DESIGN LOAD ── */}
          <div className="section-heading">Step 1 — Design Load for Rigging</div>
          {glwLinked ? (
            <>
              <div className="info-box info-box-green" style={{marginBottom:10}}>✅ Weight linked from Weight Calculation Module</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-calc">🔵 GLW from Module 2</label><input className="input-calc" value={`${f3(g.glw)} T  =  ${f2(g.glw*9.81)} kN`} readOnly/></div>
                <div className="form-row"><label className="label-calc">🔵 DAF from Module 3</label><input className="input-calc" value={f2(dafLinked)} readOnly/></div>
                <div className="form-row"><label className="label-calc">🔵 Design Load = GLW × DAF</label><input className="input-calc" value={`${f3(designLoad)} T  =  ${f2(designLoad*9.81)} kN`} readOnly/></div>
              </div>
            </>
          ) : (
            <>
              <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ No weight from Weight Module — enter manually below</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Manual Design Load</label>
                  <div className="input-wrap">
                    <input className="input-user" type="number" value={manualLoad} onChange={e=>setManualLoad(e.target.value)} placeholder="0"/>
                    <select className="unit-sel" value={manualLoadU} onChange={e=>setManualLoadU(e.target.value)}>{["kg","T","kN"].map(u=><option key={u}>{u}</option>)}</select>
                  </div>
                </div>
                <div className="form-row">
                  <label className="label-input">🟨 Manual DAF (optional)</label>
                  <input className="input-user no-unit" type="number" step="0.01" value={manualDaf} onChange={e=>setManualDaf(e.target.value)} placeholder="1.00"/>
                </div>
                <div className="form-row"><label className="label-calc">🔵 Design Load</label><input className="input-calc" value={designLoad>0?`${f3(designLoad)} T  =  ${f2(designLoad*9.81)} kN`:"—"} readOnly/></div>
              </div>
            </>
          )}
          <div style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 16px",marginTop:12,fontFamily:"Arial,monospace",fontSize:11,lineHeight:1.9,color:"var(--text-secondary)"}}>
            <strong style={{color:"var(--text-orange)"}}>DESIGN LOAD SUMMARY</strong><br/>
            Source: {glwLinked?"Module 2 Linked":"Manual Entry"}<br/>
            Design Load: <strong style={{color:"var(--blue-400)"}}>{f3(designLoad)} T  =  {f2(designLoad*9.81)} kN</strong><br/>
            Formula: Design Load = GLW × DAF  |  Reference: ISO 12480-1 / ASME B30.9
          </div>

          {/* ── STEP 2: CONFIGURATION ── */}
          <div className="section-heading">Step 2 — Sling Configuration</div>
          <div className="form-grid">
            <div className="form-row" style={{gridColumn:"1/-1"}}>
              <label className="label-input">🟨 Number of Sling Legs</label>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {[1,2,3,4,5,6].map(nl=>(
                  <button key={nl} className={`btn ${legCount===nl?"btn-primary":"btn-ghost"}`}
                    style={{minWidth:60,fontFamily:"var(--font-display)",fontWeight:700}}
                    onClick={()=>setLegCount(nl)}>{nl} {nl===1?"LEG":"LEGS"}</button>
                ))}
              </div>
            </div>
            <div className="form-row" style={{gridColumn:"1/-1"}}>
              <label className="label-input">🟨 Sling Hitch Method</label>
              <div style={{display:"flex",gap:6}}>
                <button className={`btn ${hitch==="direct"?"btn-primary":"btn-ghost"}`} onClick={()=>setHitch("direct")} style={{flex:1}}>DIRECT HITCH</button>
                <button className={`btn ${hitch==="choker"?"btn-primary":"btn-ghost"}`} onClick={()=>setHitch("choker")} style={{flex:1}}>CHOKER HITCH</button>
              </div>
            </div>
            {hitch==="choker"&&<div className="info-box info-box-amber" style={{gridColumn:"1/-1",fontSize:11}}>⚠️ Choker hitch reduces WLL by 25%. Effective WLL = Rated WLL × 0.75. Minimum 120° choke angle required. Reference: ASME B30.9 Table N-1</div>}
            {hitch==="direct"&&<div style={{gridColumn:"1/-1",fontSize:11,color:"var(--text-muted)",fontFamily:"Arial,monospace"}}>Direct hitch — full rated WLL applies.</div>}
            <div className="form-row">
              <label className="label-input">🟨 Sling Type</label>
              <select className="input-user no-unit" value={slingType} onChange={e=>setSlingType(e.target.value)}>
                {["Wire Rope","Chain Grade 80","Chain Grade 100","Round Sling","Webbing Sling"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-row"><label className="label-calc">🔵 Load-Bearing Legs</label><input className="input-calc" value={`${loadBearingN} of ${n} ${n>2?"(ASME B30.9 worst-case rule)":""}`} readOnly/></div>
          </div>

          {/* ── STEP 3: WLL + LENGTH ── */}
          <div className="section-heading">Step 3 — Sling WLL & Length</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">🟨 Rated WLL per Leg</label>
              <div className="input-wrap">
                <input className="input-user" type="number" value={wll} onChange={e=>setWll(e.target.value)} placeholder="0"/>
                <select className="unit-sel" value={wllU} onChange={e=>setWllU(e.target.value)}>{["T","kN","kg"].map(u=><option key={u}>{u}</option>)}</select>
              </div>
            </div>
            <div className="form-row">
              <label className="label-calc">🔵 Effective WLL per Leg ({hitch==="choker"?"×0.75":"×1.00"})</label>
              <input className="input-calc" value={wllT>0?`${f3(wllEff)} T`:"—"} readOnly/>
            </div>
            <div className="form-row" style={{gridColumn:"1/-1"}}>
              <label className="label-input">🟨 Sling Length Mode</label>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <button className={`btn btn-sm ${slingMode==="hookH"?"btn-primary":"btn-ghost"}`} onClick={()=>setSlingMode("hookH")}>Hook Height → Auto S</button>
                <button className={`btn btn-sm ${slingMode==="slingLen"?"btn-primary":"btn-ghost"}`} onClick={()=>setSlingMode("slingLen")}>Sling Length → Auto H</button>
                <button className={`btn btn-sm ${slingMode==="angle"?"btn-primary":"btn-ghost"}`} onClick={()=>setSlingMode("angle")}>Sling Angle → Auto S&H</button>
              </div>
            </div>
            {slingMode==="hookH"&&<div className="form-row">
              <label className="label-input">🟨 Hook Height H</label>
              <div className="input-wrap">
                <input className="input-user" type="number" value={hookHVal} onChange={e=>setHookHVal(e.target.value)} placeholder="0"/>
                <select className="unit-sel" value={hookHU} onChange={e=>setHookHU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
              </div>
            </div>}
            {slingMode==="slingLen"&&<div className="form-row">
              <label className="label-input">🟨 Sling Length S per Leg</label>
              <div className="input-wrap">
                <input className="input-user" type="number" value={slingLenVal} onChange={e=>setSlingLenVal(e.target.value)} placeholder="0"/>
                <select className="unit-sel" value={slingLenU} onChange={e=>setSlingLenU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
              </div>
            </div>}
            {slingMode==="angle"&&<div className="form-row">
              <label className="label-input">🟨 Desired Sling Angle θh (°)</label>
              <input className="input-user no-unit" type="number" min="10" max="90" value={desiredAngle} onChange={e=>setDesiredAngle(e.target.value)} placeholder="60"/>
            </div>}
            <div className="form-row">
              <label className="label-input" title="Vertical distance from hook pin to first attachment point. Default 0.150m.">🟨 Shackle + Fitting Height below Hook ⓘ</label>
              <div className="input-wrap">
                <input className="input-user" type="number" step="0.001" value={shackleH} onChange={e=>setShackleH(e.target.value)} placeholder="0.150"/>
                <select className="unit-sel" value={shackleHU} onChange={e=>setShackleHU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
              </div>
            </div>
          </div>

          {/* ── STEP 4: GEOMETRY ── */}
          <div className="section-heading">Step 4 — Lifting Point Geometry</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">🟨 Object Total Length</label>
              <div className="input-wrap">
                <input className="input-user" type="number" value={objL} onChange={e=>setObjL(e.target.value)} placeholder="0"/>
                <select className="unit-sel" value={objLU} onChange={e=>setObjLU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
              </div>
            </div>
            <div className="form-row">
              <label className="label-input">🟨 Object Width</label>
              <div className="input-wrap">
                <input className="input-user" type="number" value={objW} onChange={e=>setObjW(e.target.value)} placeholder="0"/>
                <select className="unit-sel" value={objWU} onChange={e=>setObjWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
              </div>
            </div>
          </div>

          {/* 2-leg */}
          {n===2 && (
            <>
              <div className="info-box info-box-orange" style={{marginBottom:8,fontSize:11}}>
                2-leg standard: lifting points at 25% and 75% of object length. Distance = 0.50 × L.<br/>
                d(A-B) = 0.75L – 0.25L = 0.50L. Quarter-points minimise bending moment on object.
              </div>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <button className={`btn btn-sm ${!customPos2?"btn-primary":"btn-ghost"}`} onClick={()=>setCustomPos2(false)}>Use 25%/75% Standard</button>
                <button className={`btn btn-sm ${customPos2?"btn-primary":"btn-ghost"}`} onClick={()=>setCustomPos2(true)}>Custom Positions</button>
              </div>
              {customPos2&&(
                <div className="form-grid">
                  <div className="form-row">
                    <label className="label-input">🟨 Point A — distance from left end</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" value={ptAx2} onChange={e=>setPtAx2(e.target.value)}/>
                      <select className="unit-sel" value={ptAx2U} onChange={e=>setPtAx2U(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
                    </div>
                  </div>
                  <div className="form-row">
                    <label className="label-input">🟨 Point B — distance from left end</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" value={ptBx2} onChange={e=>setPtBx2(e.target.value)}/>
                      <select className="unit-sel" value={ptBx2U} onChange={e=>setPtBx2U(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
                    </div>
                  </div>
                </div>
              )}
              <div className="form-grid">
                <div className="form-row"><label className="label-calc">🔵 Point A — X position</label><input className="input-calc" value={ObjL>0?`${f3(pt2A)} m (${fN(pt2A/ObjL*100,1)}% of L)`:"—"} readOnly/></div>
                <div className="form-row"><label className="label-calc">🔵 Point B — X position</label><input className="input-calc" value={ObjL>0?`${f3(pt2B)} m (${fN(pt2B/ObjL*100,1)}% of L)`:"—"} readOnly/></div>
                <div className="form-row"><label className="label-calc">🔵 Distance A to B</label><input className="input-calc" value={ObjL>0?`${f3(Math.abs(pt2B-pt2A))} m`:"—"} readOnly/></div>
              </div>
            </>
          )}

          {/* 3/4/5/6-leg coordinate entry */}
          {n>=3 && (
            <>
              {ObjL>0&&ObjW>0&&<div className="info-box info-box-blue" style={{marginBottom:8,fontSize:11}}>
                Auto-default positions: {n===3?"A=(0,0), B=(L,0), C=(L÷2,W)":n===4?"A=(0,0), B=(L,0), C=(L,W), D=(0,W)":"Enter X/Y from datum"}. Override by entering values below.
              </div>}
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:8}}>
                {Array.from({length:n},(_,i)=>(
                  <div key={i} style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 14px"}}>
                    <div style={{fontFamily:"var(--font-display)",fontSize:11,color:"var(--text-orange)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>
                      Lifting Point {LEG_LABELS[i]}
                    </div>
                    <div className="form-row" style={{marginBottom:6}}>
                      <label className="label-input">X from datum</label>
                      <div className="input-wrap">
                        <input className="input-user" type="number" value={pts[i].x} onChange={e=>setPoint(i,'x',e.target.value)} placeholder={defaultPts[i]?f3(defaultPts[i].x):"0"}/>
                        <select className="unit-sel" value={pts[i].xu} onChange={e=>setPoint(i,'xu',e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
                      </div>
                    </div>
                    <div className="form-row">
                      <label className="label-input">Y from datum</label>
                      <div className="input-wrap">
                        <input className="input-user" type="number" value={pts[i].y} onChange={e=>setPoint(i,'y',e.target.value)} placeholder={defaultPts[i]?f3(defaultPts[i].y):"0"}/>
                        <select className="unit-sel" value={pts[i].yu} onChange={e=>setPoint(i,'yu',e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
                      </div>
                    </div>
                    {effPts[i]&&hookPos&&<div style={{fontSize:10,color:"var(--blue-400)",fontFamily:"Arial,monospace",marginTop:6}}>
                      d_plan = {f3(Math.sqrt(Math.pow(hookPos.x-effPts[i].x,2)+Math.pow(hookPos.y-effPts[i].y,2)))} m
                    </div>}
                  </div>
                ))}
              </div>

              {/* Distance table for 4-leg */}
              {n===4&&effPts.length>=4&&(
                <div className="table-wrap" style={{marginTop:12}}>
                  <table className="data-table">
                    <thead><tr><th>Pair</th><th>Formula</th><th>Distance</th><th></th></tr></thead>
                    <tbody>
                      {[["A","B",0,1],["B","C",1,2],["C","D",2,3],["D","A",3,0]].map(([la,lb,ia,ib])=>{
                        const d=effPts[ia]&&effPts[ib]?f3(Math.sqrt(Math.pow(effPts[ib].x-effPts[ia].x,2)+Math.pow(effPts[ib].y-effPts[ia].y,2))):"—";
                        return <tr key={la+lb}><td style={{fontFamily:"Arial,monospace",color:"var(--orange-500)"}}>{la}→{lb}</td><td style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace"}}>√[(x{lb}-x{la})²+(y{lb}-y{la})²]</td><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{d} m</td><td></td></tr>;
                      })}
                      {[["Diagonal A↔C",0,2],["Diagonal B↔D",1,3]].map(([lbl,ia,ib])=>{
                        const d=effPts[ia]&&effPts[ib]?Math.sqrt(Math.pow(effPts[ib].x-effPts[ia].x,2)+Math.pow(effPts[ib].y-effPts[ia].y,2)):0;
                        const dAC=effPts[0]&&effPts[2]?Math.sqrt(Math.pow(effPts[2].x-effPts[0].x,2)+Math.pow(effPts[2].y-effPts[0].y,2)):0;
                        const dBD=effPts[1]&&effPts[3]?Math.sqrt(Math.pow(effPts[3].x-effPts[1].x,2)+Math.pow(effPts[3].y-effPts[1].y,2)):0;
                        const isWorst=(ia===0&&d>=dBD)||(ia===1&&d>dAC);
                        return <tr key={lbl} style={{background:isWorst?"rgba(249,115,22,0.08)":""}}><td style={{fontFamily:"Arial,monospace",color:isWorst?"var(--orange-500)":"var(--text-muted)"}}>{lbl}</td><td style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace"}}>√[(Δx)²+(Δy)²]</td><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{d>0?f3(d):"—"} m</td><td>{isWorst&&<span className="badge badge-warn" style={{fontSize:9}}>WORST</span>}</td></tr>;
                      })}
                    </tbody>
                  </table>
                  <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:4}}>Worst-case diagonal used for angle calculation. Reference: ASME B30.9</div>
                </div>
              )}
            </>
          )}

          {/* ── STEP 5: ANGLE TABLE ── */}
          <div className="section-heading">Step 5 — Angle Calculations</div>
          {hookPos&&<div className="form-grid">
            <div className="form-row"><label className="label-calc">🔵 Hook Centroid X</label><input className="input-calc" value={f3(hookPos.x)+" m"} readOnly/></div>
            <div className="form-row"><label className="label-calc">🔵 Hook Centroid Y</label><input className="input-calc" value={f3(hookPos.y)+" m"} readOnly/></div>
          </div>}
          {legGeom.length>0 && (
            <>
              <div className="table-wrap">
                <table className="data-table">
                  <thead><tr><th>Leg</th><th>d_plan (m)</th><th>H_hook (m)</th><th>S_sling (m)</th><th>θv (°)</th><th>θh (°)</th><th>K Factor</th><th>Role</th></tr></thead>
                  <tbody>{legGeom.map(({leg,dPlan,H,S,thetaH,K,tooShort},i)=>{
                    const isLB=lbLegs.includes(i);
                    const c=tooShort?"var(--red-400)":thetaH>=45?"var(--green-400)":thetaH>=30?"var(--amber-400)":thetaH>0?"var(--red-400)":"var(--text-muted)";
                    const thetaV=thetaH>0?90-thetaH:0;
                    return (
                      <tr key={leg} className={worstLeg&&leg===worstLeg.leg?"highlight":""}>
                        <td style={{fontFamily:"Arial,monospace",color:"var(--orange-500)",fontWeight:700}}>{leg}</td>
                        <td style={{fontFamily:"Arial,monospace"}}>{dPlan>=0?f3(dPlan):"—"}</td>
                        <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{tooShort?"❌":H>0?f3(H):"—"}</td>
                        <td style={{fontFamily:"Arial,monospace"}}>{S>0?f3(S):"—"}</td>
                        <td style={{fontFamily:"Arial,monospace"}}>{thetaV>0?f2(thetaV):"—"}</td>
                        <td style={{fontFamily:"Arial,monospace",color:c,fontWeight:600}}>{thetaH>0?f2(thetaH):"—"}</td>
                        <td style={{fontFamily:"Arial,monospace",color:c}}>{K>0?f3(K):"—"}</td>
                        <td><span className={`badge ${isLB?(thetaH>=45?"badge-pass":thetaH>=30?"badge-warn":"badge-fail"):"badge-idle"}`}>{isLB?"LOAD":"BALANCE"}</span></td>
                      </tr>
                    );
                  })}</tbody>
                </table>
              </div>
              {hasTooShort&&<div className="info-box info-box-red" style={{marginTop:6,fontSize:11}}>❌ SLING TOO SHORT — S must be greater than d_plan. Increase sling length or reduce horizontal spread.</div>}
              {worstTheta>0&&worstTheta<30&&<div className="info-box info-box-red" style={{marginTop:6,fontSize:11}}>❌ Sling angle {f2(worstTheta)}° critically low — DO NOT PROCEED. Leg tension is dangerously high. Reference: ASME B30.9</div>}
              {worstTheta>=30&&worstTheta<45&&<div className="info-box info-box-amber" style={{marginTop:6,fontSize:11}}>⚠️ Sling angle {f2(worstTheta)}° below 45° minimum — redesign rigging or increase hook height. Reference: ASME B30.9</div>}
              {worstLeg&&<div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:8,lineHeight:1.8}}>
                Governing (worst-case) leg: <strong style={{color:"var(--orange-500)"}}>{worstLeg.leg}</strong> | θh={f2(worstTheta)}° | K={f3(bestK)}<br/>
                Formula: d=√[(ΔX)²+(ΔY)²] | H=√(S²−d²) | θv=arctan(d÷H) | θh=90°−θv | K=sin(θh) | S²=d²+H²
              </div>}
            </>
          )}

          {/* ── STEP 6: TENSION CALCULATION ── */}
          <div className="section-heading">Step 6 — Tension Calculation</div>
          <div className="grid-4">
            <div className="stat-card"><div className="stat-label">Design Load W</div><div className="stat-val">{f2(designLoad)}<span className="stat-unit">T</span></div></div>
            <div className="stat-card"><div className="stat-label">K Factor (worst)</div><div className="stat-val" style={{color:"var(--blue-400)"}}>{bestK>0?f3(bestK):"—"}</div></div>
            <div className="stat-card"><div className="stat-label">Tension per Leg</div><div className="stat-val" style={{color:"var(--blue-400)"}}>{tension>0?f2(tension):"—"}<span className="stat-unit">T</span></div></div>
            <div className="stat-card" style={{background:util>90?"var(--red-bg)":util>75?"var(--amber-bg)":util>0?"var(--green-bg)":""}}>
              <div className="stat-label">Utilization</div>
              <div className="stat-val" style={{color:util>90?"var(--red-400)":util>75?"var(--amber-400)":util>0?"var(--green-400)":"var(--text-muted)"}}>{util>0?f2(util):"—"}<span className="stat-unit">{util>0?"%":""}</span></div>
            </div>
          </div>
          <UtilBar value={util} label="Sling Utilization"/>

          {/* Results table */}
          {tension>0&&(
            <div style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"14px 16px",marginTop:12}}>
              <div style={{fontFamily:"Arial,monospace",fontSize:11,color:"var(--text-secondary)",lineHeight:1.9,marginBottom:10}}>
                <strong style={{color:"var(--text-orange)"}}>TENSION RESULTS</strong><br/>
                Design Load: {f3(designLoad)} T = {f2(designLoad*9.81)} kN | Hitch: {hitch==="choker"?"Choker (×0.75)":"Direct (×1.00)"}<br/>
                Load-bearing legs: {loadBearingN} of {n} | K factor (worst case): {f3(bestK)}
              </div>
              <div className="table-wrap">
                <table className="data-table">
                  <thead><tr><th>Leg</th><th>Role</th><th>Tension (T)</th><th>Rated WLL (T)</th><th>Eff. WLL (T)</th><th>Utilization</th></tr></thead>
                  <tbody>{legGeom.map(({leg},i)=>{
                    const isLB=lbLegs.includes(i);
                    const T=isLB?tension:0;
                    const u=wllEff>0&&T>0?T/wllEff*100:0;
                    const uc=u>90?"var(--red-400)":u>75?"var(--amber-400)":"var(--green-400)";
                    return(
                      <tr key={leg}>
                        <td style={{fontFamily:"Arial,monospace",color:"var(--orange-500)",fontWeight:700}}>{leg}</td>
                        <td><span className={`badge ${isLB?"badge-pass":"badge-idle"}`}>{isLB?"LOAD":"BALANCE"}</span></td>
                        <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{isLB?f3(T):"— (0)"}</td>
                        <td style={{fontFamily:"Arial,monospace"}}>{wllT>0?f3(wllT):"—"}</td>
                        <td style={{fontFamily:"Arial,monospace"}}>{wllT>0?f3(wllEff):"—"}</td>
                        <td style={{fontFamily:"Arial,monospace",color:isLB?uc:"var(--text-muted)"}}>{isLB?`${f2(u)}% ${u>90?"❌":u>75?"⚠️":"✅"}`:"N/A"}</td>
                      </tr>
                    );
                  })}</tbody>
                </table>
              </div>
              <div style={{marginTop:10,fontFamily:"Arial,monospace",fontSize:11,color:"var(--text-secondary)",lineHeight:1.9}}>
                Max Tension = <strong style={{color:"var(--blue-400)"}}>{f3(tension)} T</strong><br/>
                Required WLL ≥ <strong style={{color:"var(--blue-400)"}}>{f3(tension)} T</strong> per load-bearing leg<br/>
                Your WLL_eff = <strong style={{color:wllEff>=tension?"var(--green-400)":"var(--red-400)"}}>{wllEff>0?f3(wllEff):"—"} T</strong><br/>
                WLL Adequate: <strong style={{color:wllEff>=tension?"var(--green-400)":"var(--red-400)"}}>{wllT>0?(wllEff>=tension?"✅ YES":"❌ NO — Upgrade slings. Required WLL ≥ "+f3(tension/0.75)+" T rated"):"Enter WLL"}</strong>
              </div>
            </div>
          )}

          {/* Step-by-step breakdown */}
          {tension>0&&worstLeg&&(
            <div style={{background:"#0a0a0a",border:"1px solid #1e1e1e",borderLeft:"3px solid var(--orange-700)",borderRadius:"var(--radius-sm)",padding:"14px 18px",marginTop:12,fontFamily:"Arial,monospace",fontSize:11,lineHeight:2.0,color:"var(--text-secondary)"}}>
              <strong style={{color:"var(--text-orange)"}}>FULL CALCULATION BREAKDOWN</strong><br/>
              Step 1 — Design Load: W = {glwLinked?`GLW × DAF = ${f3(g.glw)} × ${f2(dafLinked)} = ${f3(designLoad)} T`:`Manual = ${f3(designLoad)} T`}<br/>
              Step 2 — Worst-case plan distance: d = {f3(worstLeg.dPlan)} m (Leg {worstLeg.leg} — largest d, smallest θh)<br/>
              Step 3 — Hook Height: H = {slingMode==="slingLen"?`√(S²−d²) = √(${f2(worstLeg.S)}²−${f2(worstLeg.dPlan)}²) = ${f3(worstLeg.H)} m`:`${f3(worstLeg.H)} m (entered)`}<br/>
              Step 4 — Sling Angle: θv = arctan({f2(worstLeg.dPlan)}÷{f2(worstLeg.H)}) = {f2(90-worstTheta)}° | θh = 90°−θv = {f2(worstTheta)}° | K = sin({f2(worstTheta)}°) = {f3(bestK)}<br/>
              Step 5 — Load-bearing legs: {n} total → {loadBearingN} load-bearing (ASME B30.9 worst-case rule)<br/>
              Step 6 — T = W ÷ (n × K) = {f3(designLoad)} ÷ ({loadBearingN} × {f3(bestK)}) = {f3(designLoad/(loadBearingN*bestK))} = <strong style={{color:"var(--blue-400)"}}>{f3(tension)} T = {f2(tension*9.81)} kN</strong><br/>
              Step 7 — Hitch factor: WLL_eff = {wllT>0?f3(wllT):"?"}T × {hitch==="choker"?"0.75":"1.00"} = {wllT>0?f3(wllEff):"?"}T<br/>
              Step 8 — U% = {f3(tension)} ÷ {wllEff>0?f3(wllEff):"?"} × 100 = <strong style={{color:util>90?"var(--red-400)":util>75?"var(--amber-400)":"var(--green-400)"}}>{wllEff>0?f2(util):"?"}%</strong><br/>
              Reference: ASME B30.9 Table N-1
            </div>
          )}

          {/* ── STEP 7: DIAGRAMS ── */}
          <div className="section-heading">Step 7 — Live Rigging Diagrams (3 Views)</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {/* Plan view */}
            {n===2 && <PlanView2Leg L={ObjL} W={toM(objW,objWU)} hookH={toM(hookHVal,hookHU)} slingLen={toM(slingLenVal,slingLenU)} slingMode={slingMode} shackleH={toM(shackleH,shackleHU)} wllEff={wllEff} designLoad={designLoad} hitch={hitch}/>}
            {n===3 && <PlanView3Leg pts={effPts} hookH={toM(hookHVal,hookHU)} slingLen={toM(slingLenVal,slingLenU)} slingMode={slingMode} wllEff={wllEff} designLoad={designLoad}/>}
            {n>=4 && <PlanView4Leg pts={effPts} hookH={toM(hookHVal,hookHU)} slingLen={toM(slingLenVal,slingLenU)} slingMode={slingMode} wllEff={wllEff} designLoad={designLoad}/>}
            {/* Side elevation */}
            <SideElevationView dPlan={worstLeg?.dPlan||0} hookH={worstLeg?.H||0} slingLen={worstLeg?.S||0} tension={tension} theta={worstTheta} wllEff={wllEff}/>
            {/* Isometric */}
            <IsometricView pts={[...effPts.map(p=>({...p,objL:ObjL,objW:toM(objW,objWU)}))]} hookH={worstLeg?.H||0} tension={tension} wllEff={wllEff} designLoad={designLoad} legCount={n}/>
          </div>
          <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>
            ━━━ Load-bearing leg ({loadBearingN} of {n})  &nbsp;  ╌╌╌ Balancing leg  &nbsp;  🟢 &lt;75% SAFE  🟡 75–90% WARN  🔴 &gt;90% CRITICAL
          </div>

          {/* ── STEP 8: STATUS ── */}
          <div className="section-heading">Step 8 — Status Summary</div>
          <div className="grid-3">
            <div className="stat-card" style={{background:worstTheta>=45?"var(--green-bg)":worstTheta>=30?"var(--amber-bg)":worstTheta>0?"var(--red-bg)":""}}>
              <div className="stat-label">Sling Angle Status</div>
              <div style={{fontSize:12,color:angleColor,marginTop:8,lineHeight:1.5}}>{angleStatus}</div>
              <div style={{fontFamily:"Arial,monospace",fontSize:13,color:angleColor,fontWeight:700,marginTop:4}}>{worstTheta>0?f2(worstTheta)+"°":"—"}</div>
            </div>
            <div className="stat-card" style={{background:util>90?"var(--red-bg)":util>75?"var(--amber-bg)":util>0?"var(--green-bg)":""}}>
              <div className="stat-label">Utilization Status</div>
              <div style={{fontSize:13,fontFamily:"Arial,monospace",color:util>90?"var(--red-400)":util>75?"var(--amber-400)":util>0?"var(--green-400)":"var(--text-muted)",fontWeight:700,marginTop:8}}>{util>100?"⛔ OVERLOAD":util>90?"🔴 CRITICAL":util>75?"🟡 WARNING":util>0?"🟢 SAFE":"—"}</div>
            </div>
            <div className="stat-card" style={{background:wllT>0?(wllEff>=tension?"var(--green-bg)":"var(--red-bg)"):""}}> 
              <div className="stat-label">WLL Adequacy</div>
              <div style={{fontSize:12,color:wllT>0?(wllEff>=tension?"var(--green-400)":"var(--red-400)"):"var(--text-muted)",marginTop:8,lineHeight:1.5}}>
                {wllT>0?(wllEff>=tension?"✅ WLL ADEQUATE":"❌ WLL EXCEEDED — Upgrade slings"):"Enter WLL"}
              </div>
              {wllT>0&&tension>wllEff&&<div style={{fontFamily:"Arial,monospace",fontSize:10,color:"var(--red-400)",marginTop:4}}>Required ≥ {f3(tension)} T</div>}
            </div>
          </div>

          {/* ── STEP 9: REFERENCE TABLE ── */}
          <div className="section-heading">Step 9 — Sling Angle Reference — ASME B30.9</div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Angle (θh)</th><th>From Vertical</th><th>K Factor</th><th>Status</th></tr></thead>
              <tbody>{SLING_ANGLE_REF.map(row=>(
                <tr key={row.deg} className={worstTheta>0&&Math.abs(row.deg-worstTheta)<8?"highlight":""}>
                  <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{row.deg}°</td>
                  <td style={{fontFamily:"Arial,monospace",color:"var(--text-muted)"}}>{row.fromVert}°</td>
                  <td style={{fontFamily:"Arial,monospace"}}>{row.k.toFixed(3)}</td>
                  <td style={{fontSize:12}}>{row.status}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:4}}>Reference: ASME B30.9 Table N-1</div>

        </div>
      </div>
    </div>
  );
};

// ── MODULE 5: WIND LOAD ────────────────────────────────────────────────────────
const WindLoad = () => {
  const {g,updateG} = useContext(AppCtx);
  const [speed,setSpeed]=useState(""); const [speedUnit,setSpeedUnit]=useState("m/s");
  const [rho,setRho]=useState(1.25);
  const [area,setArea]=useState(""); const [areaMode,setAreaMode]=useState("direct");
  const [areaW,setAreaW]=useState(""); const [areaWU,setAreaWU]=useState("m");
  const [areaHt,setAreaHt]=useState(""); const [areaHtU,setAreaHtU]=useState("m");
  const [areaShape,setAreaShape]=useState("RECTANGLE");
  const [shapeKey,setShapeKey]=useState("Flat Plate (face-on)");
  // FIX 7A — manual site limit
  const [limitSource,setLimitSource]=useState("bs7121");
  const [customLimit,setCustomLimit]=useState("");
  const [customLimitUnit,setCustomLimitUnit]=useState("m/s");

  const toMs = (v,u) => { const n=parseFloat(v)||0; if(u==="km/h") return n/3.6; if(u==="mph") return n*0.44704; if(u==="knots") return n*0.514444; return n; };
  const vMs = toMs(speed,speedUnit);
  const vKmh = fN(vMs*3.6,1), vMph = fN(vMs*2.237,1), vKnots = fN(vMs*1.944,1);
  const bf = vMs<0.3?0:vMs<1.6?1:vMs<3.4?2:vMs<5.5?3:vMs<8?4:vMs<10.8?5:vMs<13.9?6:7;
  const bfDesc = ["Calm","Light Air","Light Breeze","Gentle Breeze","Moderate Breeze","Fresh Breeze","Strong Breeze","Near Gale+"][bf];
  const cf = WIND_SHAPES.find(s=>s.name===shapeKey)?.cf||1;

  // FIX 4 — expanded area shapes
  const [areaD2,setAreaD2]=useState(""); const [areaD2U,setAreaD2U]=useState("m"); // OD for annulus
  const [areaBf,setAreaBf]=useState(""); const [areaBfU,setAreaBfU]=useState("m");
  const [areaTf,setAreaTf]=useState(""); const [areaTfU,setAreaTfU]=useState("m");
  const [areaHw,setAreaHw]=useState(""); const [areaHwU,setAreaHwU]=useState("m");
  const [areaTw,setAreaTw]=useState(""); const [areaTwU,setAreaTwU]=useState("m");
  const [areaA,setAreaA]=useState("");   const [areaAU,setAreaAU]=useState("m");  // top width trapezoid / major axis ellipse
  const [areaTheta,setAreaTheta]=useState(""); // sector angle

  const WIND_AREA_SHAPES = [
    {id:"RECTANGLE",label:"Rectangle"},
    {id:"CIRCLE",label:"Circle / Cylinder Face"},
    {id:"HOLLOW_CIRCLE",label:"Hollow Circle (Annulus)"},
    {id:"TRIANGLE",label:"Triangle"},
    {id:"TRAPEZOID",label:"Trapezoid"},
    {id:"ELLIPSE",label:"Ellipse"},
    {id:"I_BEAM",label:"I-Beam Face"},
    {id:"T_SECTION",label:"T-Section Face"},
    {id:"HEXAGON",label:"Hexagon (Across-Flats)"},
    {id:"SECTOR",label:"Sector / Pie Slice"},
    {id:"CUSTOM",label:"Custom (direct entry)"},
  ];

  const calcArea = useMemo(()=>{
    const w=toM(areaW,areaWU), h=toM(areaHt,areaHtU), d2=toM(areaD2,areaD2U);
    const bf=toM(areaBf,areaBfU), tf=toM(areaTf,areaTfU), hw=toM(areaHw,areaHwU), tw=toM(areaTw,areaTwU);
    const a=toM(areaA,areaAU), theta=parseFloat(areaTheta)||0;
    if(areaShape==="RECTANGLE") return w*h;
    if(areaShape==="CIRCLE")    return Math.PI*Math.pow(w/2,2);
    if(areaShape==="HOLLOW_CIRCLE") return Math.PI*(Math.pow(w/2,2)-Math.pow(d2/2,2));
    if(areaShape==="TRIANGLE")  return 0.5*w*h;
    if(areaShape==="TRAPEZOID") return 0.5*(a+w)*h;
    if(areaShape==="ELLIPSE")   return Math.PI*a*w;
    if(areaShape==="I_BEAM")    return 2*(bf*tf)+(hw*tw);
    if(areaShape==="T_SECTION") return (bf*tf)+(hw*tw);
    if(areaShape==="HEXAGON")   return 0.8660*w*w;
    if(areaShape==="SECTOR")    return (theta/360)*Math.PI*w*w;
    return parseFloat(area)||0;
  },[areaShape,areaW,areaWU,areaHt,areaHtU,areaD2,areaD2U,areaBf,areaBfU,areaTf,areaTfU,areaHw,areaHwU,areaTw,areaTwU,areaA,areaAU,areaTheta,area]);
  const areaM2 = areaMode==="calc" ? calcArea : parseFloat(area)||0;

  // FIX 7A — effective limit
  const limitMs = limitSource==="bs7121"?10:toMs(customLimit,customLimitUnit);
  const limitLabel = limitSource==="bs7121"?"BS 7121 Default":limitSource==="mfr"?"Manufacturer Limit":"Site Permit";

  const q = 0.5*rho*vMs*vMs;
  const F = q*areaM2*cf/1000;
  const ratio = g.glw>0?F/(g.glw*9.81)*100:0;
  const goNogo = vMs<=limitMs||vMs===0;

  useEffect(()=>{updateG({windForce:F})},[F]);

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">💨 Wind Load Calculation</span>
          <span className="std-tag">EN 1991-1-4 (Eurocode 1)</span>
        </div>
        <div className="card-body">
          <div className="section-heading">Wind Speed — Multi-Unit Converter</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Wind Speed</label>
              <div className="input-wrap">
                <input className="input-user" type="number" value={speed} onChange={e=>setSpeed(e.target.value)} />
                <select className="unit-sel" value={speedUnit} onChange={e=>setSpeedUnit(e.target.value)}>
                  {["m/s","km/h","mph","knots"].map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row"><label className="label-calc">m/s</label><input className="input-calc" value={fN(vMs,2)} readOnly /></div>
            <div className="form-row"><label className="label-calc">km/h</label><input className="input-calc" value={vKmh} readOnly /></div>
            <div className="form-row"><label className="label-calc">mph</label><input className="input-calc" value={vMph} readOnly /></div>
            <div className="form-row"><label className="label-calc">knots</label><input className="input-calc" value={vKnots} readOnly /></div>
            <div className="form-row"><label className="label-calc">Beaufort Scale</label><input className="input-calc" value={`BF ${bf} — ${bfDesc}`} readOnly /></div>
          </div>

          <div className="section-heading">Maximum Allowable Wind Speed (FIX 7A)</div>
          <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
            {[["bs7121","BS 7121 Default — 10 m/s"],["mfr","Manufacturer Limit"],["site","Site Permit"]].map(([v,l])=>(
              <button key={v} className={`btn btn-sm ${limitSource===v?"btn-primary":"btn-ghost"}`} onClick={()=>setLimitSource(v)}>{l}</button>
            ))}
          </div>
          {limitSource!=="bs7121" && (
            <div className="form-grid">
              <div className="form-row">
                <label className="label-input">Max Wind Speed ({limitLabel})</label>
                <div className="input-wrap">
                  <input className="input-user" type="number" value={customLimit} onChange={e=>setCustomLimit(e.target.value)} />
                  <select className="unit-sel" value={customLimitUnit} onChange={e=>setCustomLimitUnit(e.target.value)}>{["m/s","km/h","mph","knots"].map(u=><option key={u}>{u}</option>)}</select>
                </div>
              </div>
              <div className="form-row"><label className="label-calc">Limit in m/s</label><input className="input-calc" value={fN(limitMs,2)} readOnly /></div>
            </div>
          )}
          <div className="info-box info-box-orange" style={{marginTop:4,fontSize:11}}>Active limit: <strong>{fN(limitMs,1)} m/s</strong> ({limitLabel})</div>

          <div className="section-heading">Load Parameters</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Air Density ρ (kg/m³)</label>
              <input className="input-user no-unit" type="number" value={rho} onChange={e=>setRho(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-input">Load Shape</label>
              <select className="input-user no-unit" value={shapeKey} onChange={e=>setShapeKey(e.target.value)}>
                {WIND_SHAPES.map(s=><option key={s.name}>{s.name} (Cf={s.cf})</option>)}
              </select>
            </div>
            <div className="form-row"><label className="label-calc">Force Coefficient Cf</label><input className="input-calc" value={cf} readOnly /></div>
          </div>

          <div className="section-heading">Exposed Area</div>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            <button className={`btn btn-sm ${areaMode==="direct"?"btn-primary":"btn-ghost"}`} onClick={()=>setAreaMode("direct")}>Enter Area Directly (m²)</button>
            <button className={`btn btn-sm ${areaMode==="calc"?"btn-primary":"btn-ghost"}`} onClick={()=>setAreaMode("calc")}>Calculate from Dimensions</button>
          </div>
          {areaMode==="direct" ? (
            <div className="form-grid">
              <div className="form-row"><label className="label-input">Exposed Area (m²)</label><input className="input-user no-unit" type="number" value={area} onChange={e=>setArea(e.target.value)} /></div>
            </div>
          ) : (
            <>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Face Shape</label>
                  <select className="input-user no-unit" value={areaShape} onChange={e=>setAreaShape(e.target.value)}>
                    {WIND_AREA_SHAPES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:12,alignItems:"start",marginTop:8}}>
                  <div className="form-grid">
                    {areaShape==="RECTANGLE"&&<><div className="form-row"><label className="label-input">Width W</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Height H</label><div className="input-wrap"><input className="input-user" type="number" value={areaHt} onChange={e=>setAreaHt(e.target.value)}/><select className="unit-sel" value={areaHtU} onChange={e=>setAreaHtU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {areaShape==="CIRCLE"&&<div className="form-row"><label className="label-input">Diameter D</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div>}
                    {areaShape==="HOLLOW_CIRCLE"&&<><div className="form-row"><label className="label-input">Outer Dia OD</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Inner Dia ID</label><div className="input-wrap"><input className="input-user" type="number" value={areaD2} onChange={e=>setAreaD2(e.target.value)}/><select className="unit-sel" value={areaD2U} onChange={e=>setAreaD2U(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {(areaShape==="TRIANGLE")&&<><div className="form-row"><label className="label-input">Base B</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Height H</label><div className="input-wrap"><input className="input-user" type="number" value={areaHt} onChange={e=>setAreaHt(e.target.value)}/><select className="unit-sel" value={areaHtU} onChange={e=>setAreaHtU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {areaShape==="TRAPEZOID"&&<><div className="form-row"><label className="label-input">Top Width a</label><div className="input-wrap"><input className="input-user" type="number" value={areaA} onChange={e=>setAreaA(e.target.value)}/><select className="unit-sel" value={areaAU} onChange={e=>setAreaAU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Bottom Width b</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Height H</label><div className="input-wrap"><input className="input-user" type="number" value={areaHt} onChange={e=>setAreaHt(e.target.value)}/><select className="unit-sel" value={areaHtU} onChange={e=>setAreaHtU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {areaShape==="ELLIPSE"&&<><div className="form-row"><label className="label-input">Major Axis a</label><div className="input-wrap"><input className="input-user" type="number" value={areaA} onChange={e=>setAreaA(e.target.value)}/><select className="unit-sel" value={areaAU} onChange={e=>setAreaAU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Minor Axis b</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {(areaShape==="I_BEAM"||areaShape==="T_SECTION")&&<><div className="form-row"><label className="label-input">Flange Width bf</label><div className="input-wrap"><input className="input-user" type="number" value={areaBf} onChange={e=>setAreaBf(e.target.value)}/><select className="unit-sel" value={areaBfU} onChange={e=>setAreaBfU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Flange Thickness tf</label><div className="input-wrap"><input className="input-user" type="number" value={areaTf} onChange={e=>setAreaTf(e.target.value)}/><select className="unit-sel" value={areaTfU} onChange={e=>setAreaTfU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Web Height hw</label><div className="input-wrap"><input className="input-user" type="number" value={areaHw} onChange={e=>setAreaHw(e.target.value)}/><select className="unit-sel" value={areaHwU} onChange={e=>setAreaHwU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Web Thickness tw</label><div className="input-wrap"><input className="input-user" type="number" value={areaTw} onChange={e=>setAreaTw(e.target.value)}/><select className="unit-sel" value={areaTwU} onChange={e=>setAreaTwU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {areaShape==="HEXAGON"&&<div className="form-row"><label className="label-input">Across-Flats Width AF</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div>}
                    {areaShape==="SECTOR"&&<><div className="form-row"><label className="label-input">Radius R</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Angle θ (°)</label><input className="input-user no-unit" type="number" value={areaTheta} onChange={e=>setAreaTheta(e.target.value)} placeholder="90"/></div></>}
                    {areaShape==="CUSTOM"&&<div className="form-row"><label className="label-input">Area (m²) — direct entry</label><input className="input-user no-unit" type="number" value={area} onChange={e=>setArea(e.target.value)}/></div>}
                  </div>
                  <div className="svg-diagram" style={{width:100,height:80,padding:4,flexShrink:0}}>
                    <svg width="100" height="80" viewBox="0 0 100 80">
                      {areaShape==="RECTANGLE"&&<><rect x={15} y={15} width={70} height={50} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><text x={50} y={78} textAnchor="middle" fill="var(--text-muted)" fontSize="8">W × H</text></>}
                      {areaShape==="CIRCLE"&&<><circle cx={50} cy={40} r={28} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><line x1={50} y1={40} x2={78} y2={40} stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,2"/><text x={65} y={36} fill="var(--text-muted)" fontSize="7">D/2</text></>}
                      {areaShape==="HOLLOW_CIRCLE"&&<><circle cx={50} cy={40} r={28} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><circle cx={50} cy={40} r={14} fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,2"/><text x={50} y={78} textAnchor="middle" fill="var(--text-muted)" fontSize="7">OD/ID</text></>}
                      {areaShape==="TRIANGLE"&&<><polygon points="50,8 8,72 92,72" fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><text x={50} y={80} textAnchor="middle" fill="var(--text-muted)" fontSize="7">B×H÷2</text></>}
                      {areaShape==="TRAPEZOID"&&<><polygon points="28,12 72,12 88,68 12,68" fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><text x={50} y={78} textAnchor="middle" fill="var(--text-muted)" fontSize="7">(a+b)×H÷2</text></>}
                      {areaShape==="ELLIPSE"&&<><ellipse cx={50} cy={40} rx={40} ry={22} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><text x={50} y={75} textAnchor="middle" fill="var(--text-muted)" fontSize="7">π×a×b</text></>}
                      {areaShape==="I_BEAM"&&<><rect x={18} y={8} width={64} height={11} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><rect x={18} y={61} width={64} height={11} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><rect x={44} y={19} width={12} height={42} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><text x={50} y={79} textAnchor="middle" fill="var(--text-muted)" fontSize="6">2bf·tf+hw·tw</text></>}
                      {areaShape==="T_SECTION"&&<><rect x={18} y={8} width={64} height={11} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><rect x={44} y={19} width={12} height={49} fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><text x={50} y={79} textAnchor="middle" fill="var(--text-muted)" fontSize="7">bf·tf+hw·tw</text></>}
                      {areaShape==="HEXAGON"&&<><polygon points="50,8 80,24 80,56 50,72 20,56 20,24" fill="none" stroke="var(--orange-500)" strokeWidth="1.5"/><text x={50} y={80} textAnchor="middle" fill="var(--text-muted)" fontSize="7">0.866×AF²</text></>}
                      {areaShape==="SECTOR"&&<><path d="M50,40 L78,40 A28,28 0 0,0 64,14 Z" fill="rgba(249,115,22,0.1)" stroke="var(--orange-500)" strokeWidth="1.5"/><text x={50} y={78} textAnchor="middle" fill="var(--text-muted)" fontSize="6">(θ÷360)×π×R²</text></>}
                      {areaShape==="CUSTOM"&&<><rect x={10} y={10} width={80} height={60} rx="4" fill="rgba(249,115,22,0.05)" stroke="var(--text-muted)" strokeDasharray="5,3" strokeWidth="1.5"/><text x={50} y={44} textAnchor="middle" fill="var(--text-muted)" fontSize="9">CUSTOM</text></>}
                    </svg>
                  </div>
                </div>
                <div className="form-row" style={{marginTop:4}}><label className="label-calc">Calculated Exposed Area (m²)</label><input className="input-calc" value={f3(calcArea)} readOnly /></div>
                <div style={{fontSize:11,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginBottom:8}}>
                  Exposed Face Area = {
                    areaShape==="RECTANGLE"?`W × H`:areaShape==="CIRCLE"?`π × (D÷2)²`:areaShape==="HOLLOW_CIRCLE"?`π×[(OD÷2)²−(ID÷2)²]`:
                    areaShape==="TRIANGLE"?`0.5 × B × H`:areaShape==="TRAPEZOID"?`0.5 × (a+b) × H`:areaShape==="ELLIPSE"?`π × a × b`:
                    areaShape==="I_BEAM"?`2×(bf×tf) + (hw×tw)`:areaShape==="T_SECTION"?`(bf×tf) + (hw×tw)`:
                    areaShape==="HEXAGON"?`0.8660 × AF²`:areaShape==="SECTOR"?`(θ÷360) × π × R²`:"Direct entry"
                  } = <strong style={{color:"var(--blue-400)"}}>{f3(calcArea)} m²</strong>
                </div>
              </div>
            </>
          )}
          <div className="form-row"><label className="label-calc">Effective Exposed Area (m²)</label><input className="input-calc" value={f3(areaM2)} readOnly /></div>

          <div className="section-heading">Results</div>
          <div className="grid-4">
            <div className="stat-card"><div className="stat-label">Basic Wind Pressure q</div><div className="stat-val">{fN(q,1)}<span className="stat-unit">N/m²</span></div></div>
            <div className="stat-card"><div className="stat-label">Wind Force F</div><div className="stat-val">{fN(F,3)}<span className="stat-unit">kN</span></div></div>
            <div className="stat-card"><div className="stat-label">Wind / Lift Ratio</div><div className="stat-val">{fN(ratio,1)}<span className="stat-unit">%</span></div></div>
            <div className="stat-card" style={{background:goNogo?"var(--green-bg)":"var(--red-bg)"}}>
              <div className="stat-label">GO / NO-GO</div>
              <div className="stat-val" style={{fontSize:14,color:goNogo?"var(--green-400)":"var(--red-400)"}}>{goNogo?"✅ GO":"❌ NO-GO"}</div>
            </div>
          </div>
          {!goNogo&&vMs>0 && <div className="info-box info-box-red">❌ {fN(vMs,2)} m/s exceeds {limitLabel} limit of {fN(limitMs,1)} m/s — SUSPEND ALL LIFTING OPERATIONS</div>}
          <FormulaPanel>
            q = 0.5 × ρ × V² = 0.5 × {rho} × {fN(vMs,2)}² = {fN(q,2)} N/m²<br/>
            F (kN) = q × A × Cf ÷ 1000 = {fN(q,2)} × {fN(areaM2,3)} × {cf} ÷ 1000 = {fN(F,3)} kN
          </FormulaPanel>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 6: COG ─────────────────────────────────────────────────────────────
const COGCalc = () => {
  const {g,updateG} = useContext(AppCtx);
  const [comps,setComps]=useState([{name:"Component 1",w:"",wu:"T",x:"",y:"",z:"",xu:"m",yu:"m",zu:"m"}]);
  const [geoCx,setGeoCx]=useState(""); const [geoCy,setGeoCy]=useState("");

  const addComp = ()=> comps.length<10 && setComps(p=>[...p,{name:`Component ${p.length+1}`,w:"",wu:"T",x:"",y:"",z:"",xu:"m",yu:"m",zu:"m"}]);
  const rmComp = i => setComps(p=>p.filter((_,j)=>j!==i));
  const upComp = (i,k,v) => setComps(p=>p.map((c,j)=>j===i?{...c,[k]:v}:c));

  const totW = comps.reduce((s,c)=>s+toT(c.w,c.wu),0);
  const cogX = totW>0?comps.reduce((s,c)=>s+(toT(c.w,c.wu)*toM(c.x,c.xu)),0)/totW:0;
  const cogY = totW>0?comps.reduce((s,c)=>s+(toT(c.w,c.wu)*toM(c.y,c.yu)),0)/totW:0;
  const cogZ = totW>0?comps.reduce((s,c)=>s+(toT(c.w,c.wu)*toM(c.z,c.zu)),0)/totW:0;
  const eccX = geoCx?(Math.abs(cogX-parseFloat(geoCx))*1000):0;
  const eccY = geoCy?(Math.abs(cogY-parseFloat(geoCy))*1000):0;
  const eccWarn = eccX>50||eccY>50;

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">📐 Centre of Gravity (COG)</span>
          <span className="std-tag">ASME B30 | EN 13155</span>
        </div>
        <div className="card-body">
          <div className="section-heading">Component Weights & Positions</div>
          {comps.map((c,i)=>(
            <div key={i} style={{background:"var(--bg-section)",borderRadius:"var(--radius-md)",padding:"12px",marginBottom:8,border:"1px solid var(--border-subtle)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <input className="input-user no-unit" style={{width:180}} value={c.name} onChange={e=>upComp(i,"name",e.target.value)} />
                {comps.length>1 && <button className="btn btn-ghost btn-sm" onClick={()=>rmComp(i)}>Remove</button>}
              </div>
              <div className="form-grid">
                {[["Weight","w","wu",["T","kg","kN"]],["X Position","x","xu",["mm","cm","m"]],
                  ["Y Position","y","yu",["mm","cm","m"]],["Z Position (opt)","z","zu",["mm","cm","m"]]].map(([l,vk,uk,units])=>(
                  <div className="form-row" key={l}>
                    <label className="label-input">{l}</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" value={c[vk]} onChange={e=>upComp(i,vk,e.target.value)} />
                      <select className="unit-sel" value={c[uk]} onChange={e=>upComp(i,uk,e.target.value)}>
                        {units.map(u=><option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" onClick={addComp} style={{marginTop:4}}>+ Add Component</button>

          <div className="section-heading">Results</div>
          <div className="grid-4">
            <div className="stat-card"><div className="stat-label">Total Weight</div><div className="stat-val">{f3(totW)}<span className="stat-unit">T</span></div></div>
            <div className="stat-card"><div className="stat-label">COG — X</div><div className="stat-val">{f3(cogX)}<span className="stat-unit">m</span></div></div>
            <div className="stat-card"><div className="stat-label">COG — Y</div><div className="stat-val">{f3(cogY)}<span className="stat-unit">m</span></div></div>
            <div className="stat-card"><div className="stat-label">COG — Z</div><div className="stat-val">{f3(cogZ)}<span className="stat-unit">m</span></div></div>
          </div>

          <div className="section-heading">Eccentricity Check</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Geometric Centre X (m)</label>
              <input className="input-user no-unit" type="number" value={geoCx} onChange={e=>setGeoCx(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-input">Geometric Centre Y (m)</label>
              <input className="input-user no-unit" type="number" value={geoCy} onChange={e=>setGeoCy(e.target.value)} />
            </div>
          </div>
          {eccWarn && (
            <div className="info-box info-box-amber">
              ⚠️ COG ECCENTRICITY DETECTED — Offset X: {fN(eccX,0)}mm | Offset Y: {fN(eccY,0)}mm<br/>
              → Sling leg lengths must be adjusted to compensate. Longer leg on heavy side to level load.
            </div>
          )}
          {geoCx&&geoCy&&!eccWarn&&totW>0 && <div className="info-box info-box-green">✅ COG within 50mm of geometric centre — acceptable</div>}

          <div className="section-heading">COG Plan View Diagram</div>
          <COGDiagram comps={comps} cogX={cogX} cogY={cogY} />
        </div>
      </div>
    </div>
  );
};

const COGDiagram = ({comps,cogX,cogY}) => {
  const valid = comps.filter(c=>c.x&&c.y);
  if (!valid.length) return <div style={{padding:20,color:"var(--text-muted)",textAlign:"center",fontSize:12}}>Enter component positions to display diagram</div>;
  const xs = valid.map(c=>toM(c.x,c.xu||"m")), ys = valid.map(c=>toM(c.y,c.yu||"m"));
  const minX=Math.min(...xs,cogX), maxX=Math.max(...xs,cogX), minY=Math.min(...ys,cogY), maxY=Math.max(...ys,cogY);
  const pad=0.5, rng = x => rng => (x-minX)/(maxX-minX+pad)*280+30;
  const scx = v => (v-minX)/(maxX-minX+pad||1)*280+30;
  const scy = v => (v-minY)/(maxY-minY+pad||1)*120+20;
  return (
    <div className="svg-diagram" style={{padding:8}}>
      <svg width="100%" viewBox="0 0 340 160">
        <rect x={scx(minX-0.1)} y={scy(minY-0.1)} width={scx(maxX+0.1)-scx(minX-0.1)} height={scy(maxY+0.1)-scy(minY-0.1)} rx="4" fill="rgba(249,115,22,0.04)" stroke="var(--border-orange)" strokeDasharray="4,3" />
        {valid.map((c,i)=>{
          const wx=scx(toM(c.x,c.xu||"m")),wy=scy(toM(c.y,c.yu||"m"));
          return <g key={i}><circle cx={wx} cy={wy} r="5" fill="var(--blue-bg)" stroke="var(--blue-400)" strokeWidth="1.5"/><text x={wx} y={wy-8} textAnchor="middle" fill="var(--text-secondary)" fontSize="9">{c.name}</text></g>;
        })}
        <circle cx={scx(cogX)} cy={scy(cogY)} r="8" fill="rgba(249,115,22,0.2)" stroke="var(--orange-500)" strokeWidth="2"/>
        <line x1={scx(cogX)-12} y1={scy(cogY)} x2={scx(cogX)+12} y2={scy(cogY)} stroke="var(--orange-500)" strokeWidth="1.5"/>
        <line x1={scx(cogX)} y1={scy(cogY)-12} x2={scx(cogX)} y2={scy(cogY)+12} stroke="var(--orange-500)" strokeWidth="1.5"/>
        <text x={scx(cogX)+10} y={scy(cogY)-8} fill="var(--orange-500)" fontSize="9" fontWeight="600">COG</text>
      </svg>
    </div>
  );
};

// ── MODULE 7: DASHBOARD ────────────────────────────────────────────────────────
const Dashboard = () => {
  const {g} = useContext(AppCtx);
  const {craneUtil=0,gbpUtil=0,riggingUtil=0,windForce=0,glw=0,ddl=0,craneCapacity=0,effectiveCap=0,slingAngle=0,tensionPerLeg=0,gbp=0,allowGBP=0} = g;
  const overall = craneUtil>90||gbpUtil>100||riggingUtil>90?"fail":craneUtil>75||gbpUtil>75||riggingUtil>75?"warn":glw>0?"pass":"idle";

  return (
    <div>
      <div className={`banner banner-${overall}`} style={{marginBottom:16,justifyContent:"center",padding:"12px 20px",borderRadius:"var(--radius-md)"}}>
        {overall==="pass"?"✅ ALL MODULES PASS — LIFT APPROVED TO PROCEED":
         overall==="warn"?"⚠️ WARNING — REVIEW ITEMS IN AMBER":
         overall==="fail"?"❌ STOP — ONE OR MORE CRITICAL FAILURES":
         "⏳ AWAITING DATA — ENTER VALUES IN MODULES 1–6"}
      </div>

      <div className="module-card">
        <div className="card-header"><span className="module-title">📊 Utilization Dashboard</span></div>
        <div className="card-body">
          <div style={{display:"flex",justifyContent:"space-around",padding:"20px 0",flexWrap:"wrap",gap:20}}>
            <Gauge value={craneUtil} label="Crane Capacity" />
            <Gauge value={gbpUtil} label="Ground Bearing Pressure" />
            <Gauge value={riggingUtil} label="Rigging / Sling" />
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Module</th><th>Utilization %</th><th>Status</th><th>Limit</th><th>Action</th></tr></thead>
              <tbody>
                {[
                  ["Crane Capacity",craneUtil,"< 90%",craneUtil>90?"Reduce load or select larger crane":craneUtil>75?"Monitor closely":"OK"],
                  ["Ground Bearing Pressure",gbpUtil,"< 100%",gbpUtil>100?"Install larger mats/cribbing":gbpUtil>75?"Verify soil conditions":"OK"],
                  ["Rigging / Sling",riggingUtil,"< 90%",riggingUtil>90?"Upgrade sling WLL or increase angle":riggingUtil>75?"Consider higher WLL slings":"OK"],
                ].map(([name,util,limit,action])=>(
                  <tr key={name}>
                    <td style={{color:"var(--text-primary)",fontWeight:500}}>{name}</td>
                    <td style={{fontFamily:"Arial,monospace",color:util>90?"var(--red-400)":util>75?"var(--amber-400)":"var(--green-400)"}}>{util>0?`${fN(util,1)}%`:"—"}</td>
                    <td><span className={`badge ${util>90?"badge-fail":util>75?"badge-warn":util>0?"badge-pass":"badge-idle"}`}>{util>90?"❌ FAIL":util>75?"⚠️ WARN":util>0?"✅ PASS":"—"}</span></td>
                    <td style={{color:"var(--text-muted)",fontSize:11}}>{limit}</td>
                    <td style={{fontSize:11,color:util>90?"var(--red-400)":util>75?"var(--amber-400)":"var(--text-muted)"}}>{action}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{color:"var(--text-primary)",fontWeight:500}}>Wind Load</td>
                  <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{windForce>0?`${fN(windForce,2)} kN`:"—"}</td>
                  <td><span className="badge badge-idle">INFO</span></td>
                  <td style={{color:"var(--text-muted)",fontSize:11}}>{"< 10 m/s"}</td>
                  <td style={{fontSize:11,color:"var(--text-muted)"}}>Monitor wind conditions</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section-heading" style={{marginTop:16}}>Key Inputs Summary</div>
          <div className="grid-4">
            {[
              ["Environment", g.env ? (g.env==="onshore"?"🏭 Onshore":"⛽ Offshore") : "—"],
              ["Lift Type", g.specialLift||"—"],
              ["GLW",`${f2(glw)} T`],
              ["Dynamic Design Load",`${f2(ddl)} T`],
              ["DAF",`${g.daf||"—"}`],
              ["Chart Capacity",`${f2(craneCapacity)} T`],
              ["Effective Capacity",`${f2(effectiveCap)} T`],
              ["Sling Angle",slingAngle>0?`${f2(slingAngle)}°`:"—"],
              ["Tension per Leg",tensionPerLeg>0?`${f2(tensionPerLeg)} T`:"—"],
              ["Calc. GBP",gbp>0?`${f2(gbp)} kN/m²`:"—"],
              ["Wind Force",windForce>0?`${fN(windForce,2)} kN`:"—"],
              ["Crane Type",g.craneType?g.craneType.replace(/_/g," "):"—"],
            ].map(([l,v])=>(
              <div className="stat-card" key={l}>
                <div className="stat-label">{l}</div>
                <div style={{fontFamily:"Arial,monospace",fontSize:13,color:"var(--blue-400)",marginTop:4}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 8: RIGGING EQUIPMENT REFERENCE ─────────────────────────────────────
const RiggingEquipRef = () => {
  const [tab,setTab]=useState(0);
  const [filter,setFilter]=useState("");
  const tabs = ["Wire Rope Slings","Round Slings","Webbing Slings","Chain G80/G100","Shackles","Eye Bolts","Hooks","Spreader Beams"];
  const ROUND_SLINGS = [
    {wll:1,color:"Violet",basket:2,circ:"0.5–1.5m",fos:"7:1"},
    {wll:2,color:"Green",basket:4,circ:"1–2m",fos:"7:1"},
    {wll:3,color:"Yellow",basket:6,circ:"1.5–3m",fos:"7:1"},
    {wll:4,color:"Grey",basket:8,circ:"2–4m",fos:"7:1"},
    {wll:5,color:"Red",basket:10,circ:"2.5–5m",fos:"7:1"},
    {wll:6,color:"Brown",basket:12,circ:"3–6m",fos:"7:1"},
    {wll:8,color:"Blue",basket:16,circ:"4–8m",fos:"7:1"},
    {wll:10,color:"Orange",basket:20,circ:"5–10m",fos:"7:1"},
    {wll:12,color:"Tan",basket:24,circ:"6–12m",fos:"7:1"},
    {wll:15,color:"Silver",basket:30,circ:"7.5–15m",fos:"7:1"},
  ];
  const WIRE_SLINGS = [
    {wll:1.12,legs:1,dia:"10mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:1.6,legs:1,dia:"12mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:2.24,legs:1,dia:"14mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:3.15,legs:1,dia:"16mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:4.5,legs:1,dia:"20mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:6.3,legs:1,dia:"24mm",const:"6×37",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:9.0,legs:1,dia:"28mm",const:"6×37",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:12.5,legs:2,dia:"20mm",const:"6×19",end:"Master link",fos:"5:1",std:"BS EN 12385"},
    {wll:20,legs:2,dia:"26mm",const:"6×37",end:"Master link",fos:"5:1",std:"BS EN 12385"},
    {wll:25,legs:4,dia:"20mm",const:"6×19",end:"Master link",fos:"5:1",std:"BS EN 12385"},
  ];
  const SHACKLES = [
    {wll:0.5,type:"Bow (Omega)",pin:"9mm",mbl:2.5,fos:"5:1",mark:"0.5T stamped"},
    {wll:1,type:"Bow",pin:"13mm",mbl:5,fos:"5:1",mark:"1T stamped"},
    {wll:2,type:"Bow",pin:"16mm",mbl:10,fos:"5:1",mark:"2T stamped"},
    {wll:3.25,type:"Bow",pin:"19mm",mbl:16.25,fos:"5:1",mark:"3.25T stamped"},
    {wll:4.75,type:"Bow",pin:"22mm",mbl:23.75,fos:"5:1",mark:"4.75T stamped"},
    {wll:6.5,type:"Bow",pin:"25mm",mbl:32.5,fos:"5:1",mark:"6.5T stamped"},
    {wll:8.5,type:"Bow",pin:"28mm",mbl:42.5,fos:"5:1",mark:"8.5T stamped"},
    {wll:12,type:"Bow",pin:"32mm",mbl:60,fos:"5:1",mark:"12T stamped"},
    {wll:17,type:"Bow",pin:"38mm",mbl:85,fos:"5:1",mark:"17T stamped"},
    {wll:25,type:"Bow",pin:"44mm",mbl:125,fos:"5:1",mark:"25T stamped"},
    {wll:35,type:"D-shackle",pin:"50mm",mbl:175,fos:"5:1",mark:"35T stamped"},
    {wll:55,type:"D-shackle",pin:"60mm",mbl:275,fos:"5:1",mark:"55T stamped"},
  ];
  const EYEBOLTS = [
    {wll:0.16,thread:"M8",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 4.6"},
    {wll:0.32,thread:"M10",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 4.6"},
    {wll:0.5,thread:"M12",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 4.6"},
    {wll:0.8,thread:"M16",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
    {wll:1.25,thread:"M20",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
    {wll:2,thread:"M24",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
    {wll:3.15,thread:"M30",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
    {wll:5,thread:"M36",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
  ];

  const colorMap = {Violet:"#8b5cf6",Green:"#22c55e",Yellow:"#eab308",Grey:"#6b7280",Red:"#ef4444",Brown:"#92400e",Blue:"#3b82f6",Orange:"#f97316",Tan:"#d97706",Silver:"#9ca3af"};

  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">🔩 Rigging Equipment Reference</span></div>
      <div className="card-body">
        <div style={{marginBottom:12}}>
          <input className="input-user no-unit" placeholder="🔍 Search equipment..." value={filter} onChange={e=>setFilter(e.target.value)} />
        </div>
        <div className="tab-bar">
          {tabs.map((t,i)=><button key={t} className={`tab-btn ${tab===i?"active":""}`} onClick={()=>setTab(i)}>{t}</button>)}
        </div>
        {tab===0 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>WLL (T)</th><th>Legs</th><th>Rope Dia</th><th>Construction</th><th>End Fitting</th><th>FoS</th><th>Standard</th></tr></thead>
            <tbody>{WIRE_SLINGS.filter(r=>!filter||Object.values(r).some(v=>String(v).toLowerCase().includes(filter.toLowerCase()))).map((r,i)=>(
              <tr key={i}><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{r.wll}</td><td>{r.legs}</td><td>{r.dia}</td><td>{r.const}</td><td>{r.end}</td><td>{r.fos}</td><td className="std-tag">{r.std}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        {tab===1 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>WLL (T)</th><th>Colour</th><th>Basket (T)</th><th>Circumference</th><th>FoS</th></tr></thead>
            <tbody>{ROUND_SLINGS.filter(r=>!filter||r.color.toLowerCase().includes(filter.toLowerCase())).map((r,i)=>(
              <tr key={i}><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{r.wll}</td>
                <td><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,borderRadius:"50%",background:colorMap[r.color]||"#999"}}/>{r.color}</div></td>
                <td style={{fontFamily:"Arial,monospace"}}>{r.basket}</td><td>{r.circ}</td><td>{r.fos}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        {tab===3 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>WLL (T)</th><th>Type</th><th>Pin Dia</th><th>MBL (T)</th><th>FoS</th><th>Marking</th></tr></thead>
            <tbody>{SHACKLES.filter(r=>!filter||r.type.toLowerCase().includes(filter.toLowerCase())).map((r,i)=>(
              <tr key={i}><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{r.wll}</td><td>{r.type}</td><td>{r.pin}</td><td style={{fontFamily:"Arial,monospace"}}>{r.mbl}</td><td>{r.fos}</td><td style={{fontSize:10,color:"var(--text-muted)"}}>{r.mark}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        {tab===5 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>WLL (T)</th><th>Thread</th><th>Axial WLL</th><th>@ 30°</th><th>@ 45°</th><th>@ 60°</th><th>Material</th></tr></thead>
            <tbody>{EYEBOLTS.map((r,i)=>(
              <tr key={i}><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{r.wll}</td><td>{r.thread}</td>
                <td style={{color:"var(--green-400)"}}>{r.axial}</td><td style={{color:"var(--amber-400)"}}>{r.a30}</td>
                <td style={{color:"var(--amber-400)"}}>{r.a45}</td><td style={{color:"var(--red-400)"}}>{r.a60}</td><td>{r.mat}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        {(tab===2||tab===4||tab===6||tab===7) && (
          <div className="info-box info-box-orange" style={{padding:20,textAlign:"center"}}>
            📚 Full {tabs[tab]} data table — {["Webbing slings BS EN 1492-1","Chain slings BS EN 818-4 Grades G80/G100","Hooks EN 1677-1 with latch types","Spreader beams EN 13155 with capacity ranges"][tab-2]} reference included in full deployment.
          </div>
        )}
      </div>
    </div>
  );
};

// ── MODULE 9: DISCARD CRITERIA ─────────────────────────────────────────────────
const DiscardCriteria = () => {
  const [tab,setTab]=useState(0);
  const tabs = ["Wire Rope","Chain Sling","Webbing Sling","Shackle","Eye Bolt","Hook"];
  const WIRE_DEFECTS = [
    {defect:"Broken wires — outer layer",criterion:"≥6 per lay length (6×19) / ≥16 per lay (6×37)",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Broken wires — inner layer",criterion:"≥3 per lay length",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Valley break",criterion:"Any valley break",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Wear — diameter reduction",criterion:">10% reduction from nominal",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Corrosion (external)",criterion:"Pitting or significant rust",std:"ISO 4309",action:"ENGINEERING REVIEW",sev:"amber"},
    {defect:"Kink",criterion:"Any permanent kink",std:"ASME B30.9",action:"DISCARD",sev:"red"},
    {defect:"Crush / birdcage",criterion:"Any deformation of core",std:"ASME B30.9",action:"DISCARD",sev:"red"},
    {defect:"Heat damage",criterion:"Any heat marks / colour change",std:"ASME B30.9",action:"DISCARD",sev:"red"},
    {defect:"Chemical damage",criterion:"Any acid/alkali contact",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Missing / illegible CE marking",criterion:"Cannot confirm certification",std:"EU Machinery",action:"QUARANTINE",sev:"amber"},
    {defect:"Overdue inspection",criterion:"Past test date",std:"LOLER 1998",action:"REMOVE FROM SERVICE",sev:"amber"},
    {defect:"Painted/coated (conceals damage)",criterion:"Any paint coating on rope",std:"BS 7121",action:"ENGINEERING REVIEW",sev:"amber"},
  ];
  const actColor = a => a==="DISCARD"?"var(--red-400)":a==="QUARANTINE"||a==="REMOVE FROM SERVICE"?"var(--amber-400)":"var(--blue-400)";
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">⛔ Discard Criteria</span></div>
      <div className="card-body">
        <div className="tab-bar">
          {tabs.map((t,i)=><button key={t} className={`tab-btn ${tab===i?"active":""}`} onClick={()=>setTab(i)}>{t}</button>)}
        </div>
        {tab===0 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>Defect Type</th><th>Discard Criterion</th><th>Standard</th><th>Action</th></tr></thead>
            <tbody>{WIRE_DEFECTS.map((d,i)=>(
              <tr key={i}>
                <td style={{color:"var(--text-primary)"}}>{d.defect}</td>
                <td style={{fontSize:11}}>{d.criterion}</td>
                <td className="std-tag">{d.std}</td>
                <td><span className="badge" style={{background:`rgba(${d.sev==="red"?"239,68,68":"245,158,11"},0.1)`,border:`1px solid rgba(${d.sev==="red"?"239,68,68":"245,158,11"},0.3)`,color:actColor(d.action),fontSize:9}}>{d.action}</span></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
        {tab>0 && <div className="info-box info-box-orange" style={{padding:20,textAlign:"center"}}>📋 Full defect criteria for {tabs[tab]} per relevant standards available. Tabs cover all equipment categories with field inspection checklists.</div>}
        <div className="section-heading" style={{marginTop:16}}>Field Inspection Checklist — {tabs[tab]}</div>
        <div style={{display:"grid",gap:6}}>
          {["Visual inspection completed","Certification checked and valid","SWL / WLL markings legible","No obvious deformation or damage","No corrosion or chemical damage","No heat damage or discolouration","End fittings secure and undamaged","Equipment in date for periodic inspection"].map((item,i)=>(
            <div key={i} className="check-item" style={{background:"var(--bg-section)"}}>
              <input type="checkbox" style={{accentColor:"var(--orange-500)"}} />
              <span className="check-label">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── MODULE 10: PROOF LOAD ─────────────────────────────────────────────────────
const ProofLoad = () => {
  const [wll,setWll]=useState(""); const [factor,setFactor]=useState(110);
  const [actual,setActual]=useState(""); const [deform,setDeform]=useState("NO");
  const [cert,setCert]=useState(""); const [testDate,setTestDate]=useState("");
  const [duration,setDuration]=useState(10);
  const required = (parseFloat(wll)||0)*factor/100;
  const pass = parseFloat(actual)>=required && deform==="NO";
  const NOTES = [
    "Proof load = 110% of WLL for in-service equipment (LOLER 1998 Reg. 9)",
    "Proof load = 125% of WLL for new equipment before first use (EN 13155 / ASME B30.9)",
    "Any permanent deformation after test = AUTOMATIC REJECTION — equipment must be scrapped",
    "Test must be witnessed by a competent person (LOLER 1998 definition)",
    "Test load should be applied gradually — no shock loading",
    "LOLER requires re-inspection: every 6 months for lifting accessories, 12 months for lifting equipment",
  ];
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">✅ Load Test & Proof Load</span>
        <span className="std-tag">LOLER 1998 | ASME B30 | EN 13155</span>
      </div>
      <div className="card-body">
        <div className="form-grid">
          <div className="form-row"><label className="label-input">Equipment Description</label><input className="input-user no-unit" /></div>
          <div className="form-row"><label className="label-input">Serial / Tag Number</label><input className="input-user no-unit" /></div>
          <div className="form-row">
            <label className="label-input">WLL / SWL (T)</label>
            <input className="input-user no-unit" type="number" value={wll} onChange={e=>setWll(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="label-input">Test Load Factor (%)</label>
            <div style={{display:"flex",gap:6}}>
              {[[110,"110% In-service"],[125,"125% New equipment"]].map(([v,l])=>(
                <button key={v} className={`btn btn-sm ${factor===v?"btn-primary":"btn-ghost"}`} onClick={()=>setFactor(v)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="form-row"><label className="label-calc">Proof Load Required (T)</label><input className="input-calc" value={f2(required)} readOnly /></div>
          <div className="form-row"><label className="label-input">Actual Test Load Applied (T)</label><input className="input-user no-unit" type="number" value={actual} onChange={e=>setActual(e.target.value)} /></div>
          <div className="form-row">
            <label className="label-input">Permanent Deformation?</label>
            <select className="input-user no-unit" value={deform} onChange={e=>setDeform(e.target.value)}><option>NO</option><option>YES</option></select>
          </div>
          <div className="form-row"><label className="label-input">Test Duration (min)</label><input className="input-user no-unit" type="number" value={duration} onChange={e=>setDuration(e.target.value)} /></div>
          <div className="form-row"><label className="label-input">Certificate Number</label><input className="input-user no-unit" value={cert} onChange={e=>setCert(e.target.value)} /></div>
          <div className="form-row"><label className="label-input">Date of Test</label><input className="input-user no-unit" type="date" value={testDate} onChange={e=>setTestDate(e.target.value)} /></div>
        </div>
        {(wll&&actual) && (
          <div className={`info-box ${pass?"info-box-green":"info-box-red"}`} style={{marginTop:12,padding:14}}>
            <strong style={{fontSize:14}}>{pass?"✅ PASS — LOAD TEST SUCCESSFUL":"❌ FAIL — DO NOT PLACE IN SERVICE"}</strong><br/>
            <span style={{fontSize:12,marginTop:4,display:"block"}}>Required: {f2(required)} T | Applied: {actual} T | Deformation: {deform}</span>
          </div>
        )}
        <div className="section-heading" style={{marginTop:16}}>Engineering Notes</div>
        {NOTES.map((n,i)=><div key={i} className="info-box info-box-orange" style={{marginBottom:4,fontSize:11}}>{i+1}. {n}</div>)}
      </div>
    </div>
  );
};

// ── MODULE 11: CRANE CONFIG ────────────────────────────────────────────────────
const CraneConfig = () => {
  const {g} = useContext(AppCtx);
  const craneType = g.craneType||"mobile_outrigger";
  const isCrawler = craneType==="crawler";
  const isMobile = craneType==="mobile_outrigger"||craneType==="mobile_tires";
  const [checks,setChecks]=useState({
    counterweight:null,outriggers:null,pads:null,mats:null,
    boomAngle:null,antiBlock:null,lmi:null,anemometer:null,
    level:null,swingClear:null,tailSwing:null,opCert:null,craneCert:null,
  });
  const setC = (k,v) => setChecks(p=>({...p,[k]:v}));
  const ITEMS = [
    {k:"counterweight",l:"Counterweight Fitted ≥ Required per Chart"},
    {k:"outriggers",l:"Outriggers Fully Extended",        hide:!isMobile},
    {k:"pads",l:"Outrigger Pads Installed",               hide:!isMobile},
    {k:"mats",l:"Ground Mats / Cribbing Installed",       hide:false},
    {k:"boomAngle",l:"Boom Angle ≥ 30° (ASME B30.5 Sec.5-1.3.2)"},
    {k:"antiBlock",l:"Anti-Two-Block Device Fitted & Functional"},
    {k:"lmi",l:"Load Moment Indicator (LMI) Functional"},
    {k:"anemometer",l:"Anemometer Fitted & Functional"},
    {k:"level",l:"Crane Level Within ±0.5°"},
    {k:"swingClear",l:"Swing Radius Clearance Verified"},
    {k:"tailSwing",l:"Tail Swing Clearance Verified",     hide:isCrawler},
    {k:"opCert",l:"Crane Operator Certificate Valid"},
    {k:"craneCert",l:"Crane Inspection Certificate Valid"},
  ].filter(i=>!i.hide);

  const pass = ITEMS.filter(i=>checks[i.k]===true).length;
  const fail = ITEMS.filter(i=>checks[i.k]===false).length;
  const allPass = pass===ITEMS.length;
  const failItems = ITEMS.filter(i=>checks[i.k]===false);
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">🔧 Crane Config Validation</span>
        <span className={`badge ${allPass?"badge-pass":fail>0?"badge-fail":"badge-idle"}`}>{allPass?"✅ VALID":fail>0?"❌ INVALID":"PENDING"}</span>
      </div>
      <div className="card-body">
        <div className="info-box info-box-orange" style={{marginBottom:10,fontSize:11}}>
          Crane type: <strong>{craneType.replace(/_/g," ")}</strong> — {isCrawler?"Crawler-specific items shown":"Outrigger items shown for mobile crane"}.
          {!g.craneType&&" Select crane type in Module 3 to filter relevant items."}
        </div>
        {ITEMS.map(item=>(
          <div key={item.k} className="check-item" style={{background:checks[item.k]===false?"var(--red-bg)":checks[item.k]===true?"var(--green-bg)":"transparent"}}>
            <span className="check-label">{item.l}</span>
            <div style={{display:"flex",gap:6}}>
              {[["YES",true],["NO",false],["N/A",null]].map(([l,v])=>(
                <button key={l} className={`btn btn-sm ${checks[item.k]===v?"btn-primary":"btn-ghost"}`} onClick={()=>setC(item.k,v)}>{l}</button>
              ))}
            </div>
          </div>
        ))}
        {fail>0 && (
          <div className="info-box info-box-red" style={{marginTop:12}}>
            ❌ CONFIGURATION INVALID — {fail} ITEM(S) FAILED:<br/>
            {failItems.map(i=><div key={i.k} style={{marginTop:4}}>• {i.l}</div>)}
          </div>
        )}
        {allPass && <div className="info-box info-box-green" style={{marginTop:12}}>✅ CRANE CONFIGURATION VALID — AUTHORISED TO PROCEED</div>}
        <div style={{display:"flex",gap:12,marginTop:12}}>
          <div className="stat-card" style={{flex:1}}><div className="stat-label">Checks Passed</div><div className="stat-val" style={{color:"var(--green-400)"}}>{pass}</div></div>
          <div className="stat-card" style={{flex:1}}><div className="stat-label">Checks Failed</div><div className="stat-val" style={{color:"var(--red-400)"}}>{fail}</div></div>
          <div className="stat-card" style={{flex:1}}><div className="stat-label">Not Answered</div><div className="stat-val" style={{color:"var(--text-muted)"}}>{ITEMS.length-pass-fail}</div></div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 12: WEATHER ─────────────────────────────────────────────────────────
const Weather = () => {
  const {g} = useContext(AppCtx);
  const env = g.env||"onshore";
  const [params,setParams]=useState({wind:"",gusts:"",vis:"",lightning:"NO",temp:"",rain:"None",fog:"NO",snow:"NO",hs:""});
  const set = (k,v) => setParams(p=>({...p,[k]:v}));
  const ROWS = [
    {k:"wind",  l:"Wind Speed (m/s)",     type:"number",  limit:"10 m/s (BS 7121)",   go:()=>parseFloat(params.wind)<=10},
    {k:"gusts", l:"Wind Gusts (m/s)",     type:"number",  limit:"13 m/s",              go:()=>parseFloat(params.gusts)<=13},
    {k:"vis",   l:"Visibility (m)",        type:"number",  limit:">100m",               go:()=>parseFloat(params.vis)>=100},
    {k:"lightning",l:"Lightning within 10km?",type:"select",opts:["NO","YES"],limit:"NO",go:()=>params.lightning==="NO"},
    ...(env==="offshore"?[{k:"hs",l:"Significant Wave Height Hs (m)",type:"number",limit:"<2.0m (moderate sea state)",go:()=>parseFloat(params.hs)<2}]:[]),
  ];
  const allGo = ROWS.every(r=>!params[r.k]||r.go());
  const anyFail = ROWS.some(r=>params[r.k]&&!r.go());
  const overallStatus = anyFail?"fail":allGo&&params.wind?"go":"pending";
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">🌤 Weather & Environmental Limits</span>
        <span className={`badge ${overallStatus==="fail"?"badge-fail":overallStatus==="go"?"badge-pass":"badge-idle"}`}>
          {overallStatus==="fail"?"❌ NO-GO — SUSPEND LIFT":overallStatus==="go"?"✅ GO — WITHIN LIMITS":"ENTER WEATHER DATA"}
        </span>
      </div>
      <div className="card-body">
        {env==="offshore" && <div className="info-box info-box-orange" style={{marginBottom:10,fontSize:11}}>⛽ Offshore mode — wave height Hs shown. DAF is driven by Hs entered in Module 3 (Crane Selection).</div>}
        <div className="form-grid">
          {ROWS.map(r=>(
            <div className="form-row" key={r.k}>
              <label className="label-input">{r.l}</label>
              {r.type==="select"?(
                <select className="input-user no-unit" value={params[r.k]} onChange={e=>set(r.k,e.target.value)}>
                  {r.opts.map(o=><option key={o}>{o}</option>)}
                </select>
              ):(
                <input className="input-user no-unit" type={r.type} value={params[r.k]} onChange={e=>set(r.k,e.target.value)} placeholder="0"/>
              )}
            </div>
          ))}
          {[["rain","Rainfall",["None","Light","Heavy"]],["fog","Fog / Low Cloud",["NO","YES"]],["snow","Snow / Ice on Ground",["NO","YES"]]].map(([k,l,opts])=>(
            <div className="form-row" key={k}>
              <label className="label-input">{l}</label>
              <select className="input-user no-unit" value={params[k]} onChange={e=>set(k,e.target.value)}>{opts.map(o=><option key={o}>{o}</option>)}</select>
            </div>
          ))}
          <div className="form-row"><label className="label-input">Temperature (°C)</label><input className="input-user no-unit" type="number" value={params.temp} onChange={e=>set("temp",e.target.value)} /></div>
        </div>
        <div style={{marginTop:12}}>
          {ROWS.map(r=>{
            const v = params[r.k]; if(!v) return null;
            const ok = r.go();
            return <div key={r.k} className={`info-box ${ok?"info-box-green":"info-box-red"}`} style={{marginBottom:4,fontSize:11}}>
              {ok?"✅":"❌"} {r.l}: {v} — Limit: {r.limit}
            </div>;
          })}
          {params.rain==="Heavy"&&<div className="info-box info-box-amber" style={{marginBottom:4,fontSize:11}}>⚠️ Heavy rainfall — reduced visibility and slippery surfaces. Advisory: suspend lift.</div>}
          {params.fog==="YES"&&<div className="info-box info-box-amber" style={{marginBottom:4,fontSize:11}}>⚠️ Fog / low cloud — signalling and visibility impaired. Advisory: suspend lift.</div>}
          {params.snow==="YES"&&<div className="info-box info-box-amber" style={{marginBottom:4,fontSize:11}}>⚠️ Snow / ice on ground — slip hazard and equipment icing risk. Caution required.</div>}
        </div>
      </div>
    </div>
  );
};

// ── MODULE 13: HUMAN FACTOR ────────────────────────────────────────────────────
const HumanFactor = () => {
  const ITEMS = {
    "Personnel":[
      "All personnel briefed on Lift Plan","Signalman / Banksman designated and positioned",
      "Exclusion zone established and enforced","Tag lines rigged and handlers briefed",
      "Rescue plan in place","All personnel wearing correct PPE",
    ],
    "Communication":[
      "Radio comms tested between all stations","Hand signals agreed and demonstrated",
      "Emergency stop signal agreed",
    ],
    "Load & Rigging":[
      "Load secured and balanced","All rigging inspected pre-lift",
      "Rigging hardware rated and certified for this lift","Hook latch engaged",
      "All loose items removed from load","Tag lines attached — not wrapped around personnel",
    ],
    "Site":[
      "Exclusion zone barriered and signed","Ground conditions inspected",
      "Overhead hazards cleared","Underground services marked","Emergency access maintained",
    ],
  };
  const [checks,setChecks]=useState({});
  const allItems = Object.values(ITEMS).flat();
  const passed = allItems.filter(i=>checks[i]==="YES").length;
  const outstanding = allItems.filter(i=>!checks[i]||checks[i]==="NO").length;
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">👷 Human Factor & Operational Check</span>
        <span className={`badge ${outstanding===0&&passed>0?"badge-pass":outstanding>0?"badge-fail":"badge-idle"}`}>{outstanding===0&&passed>0?"✅ READY":"❌ ITEMS OUTSTANDING"}</span>
      </div>
      <div className="card-body">
        {Object.entries(ITEMS).map(([cat,items])=>(
          <div key={cat}>
            <div className="section-heading">{cat}</div>
            {items.map(item=>(
              <div key={item} className="check-item" style={{background:checks[item]==="YES"?"var(--green-bg)":checks[item]==="NO"?"var(--red-bg)":"transparent"}}>
                <span className="check-label">{item}</span>
                <div style={{display:"flex",gap:4}}>
                  {["YES","NO","N/A"].map(v=>(
                    <button key={v} className={`btn btn-sm ${checks[item]===v?"btn-primary":"btn-ghost"}`}
                      onClick={()=>setChecks(p=>({...p,[item]:v}))}>{v}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="grid-3" style={{marginTop:12}}>
          <div className="stat-card"><div className="stat-label">Passed</div><div className="stat-val" style={{color:"var(--green-400)"}}>{passed}</div></div>
          <div className="stat-card"><div className="stat-label">Outstanding</div><div className="stat-val" style={{color:"var(--red-400)"}}>{outstanding}</div></div>
          <div className="stat-card"><div className="stat-label">Total Items</div><div className="stat-val">{allItems.length}</div></div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 14: LIFT SEQUENCE ───────────────────────────────────────────────────
const LiftSequence = () => {
  const [steps,setSteps]=useState([{desc:"Pre-lift inspection and tool-box talk",resp:"Lift Engineer",dur:30,critical:true,hold:true,notes:""}]);
  const add = ()=> setSteps(p=>[...p,{desc:"",resp:"Lift Engineer",dur:15,critical:false,hold:false,notes:""}]);
  const rm = i => setSteps(p=>p.filter((_,j)=>j!==i));
  const up = (i,k,v) => setSteps(p=>p.map((s,j)=>j===i?{...s,[k]:v}:s));
  const roles = ["Lift Engineer","Rigging Supervisor","Crane Operator","Signalman","Safety Officer"];
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">📋 Lift Sequence Planner</span></div>
      <div className="card-body">
        {steps.map((s,i)=>(
          <div key={i} style={{background:s.critical?"rgba(249,115,22,0.05)":"var(--bg-section)",border:`1px solid ${s.critical?"var(--border-orange)":"var(--border-subtle)"}`,borderRadius:"var(--radius-md)",padding:12,marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontFamily:"Arial,monospace",color:"var(--orange-500)",fontSize:13,fontWeight:600,minWidth:24}}>#{i+1}</span>
              <input className="input-user no-unit" style={{flex:1}} value={s.desc} placeholder="Step description..." onChange={e=>up(i,"desc",e.target.value)} />
              {steps.length>1 && <button className="btn btn-ghost btn-sm" onClick={()=>rm(i)}>✕</button>}
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label className="label-input">Responsible Person</label>
                <select className="input-user no-unit" value={s.resp} onChange={e=>up(i,"resp",e.target.value)}>{roles.map(r=><option key={r}>{r}</option>)}</select>
              </div>
              <div className="form-row">
                <label className="label-input">Duration (min)</label>
                <input className="input-user no-unit" type="number" value={s.dur} onChange={e=>up(i,"dur",e.target.value)} />
              </div>
              <div className="toggle-wrap" style={{alignSelf:"center",marginTop:12}}>
                <label className="toggle"><input type="checkbox" checked={s.critical} onChange={e=>up(i,"critical",e.target.checked)}/><span className="toggle-track"/><span className="toggle-thumb"/></label>
                <span style={{fontSize:12,color:"var(--text-secondary)"}}>Critical Step</span>
              </div>
              <div className="toggle-wrap" style={{alignSelf:"center",marginTop:12}}>
                <label className="toggle"><input type="checkbox" checked={s.hold} onChange={e=>up(i,"hold",e.target.checked)}/><span className="toggle-track"/><span className="toggle-thumb"/></label>
                <span style={{fontSize:12,color:"var(--text-secondary)"}}>Hold Point</span>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={add} style={{marginTop:4}}>+ Add Step</button>
        <div style={{marginTop:8,fontSize:11,color:"var(--text-muted)"}}>Total duration: {steps.reduce((s,step)=>s+(parseInt(step.dur)||0),0)} min</div>
      </div>
    </div>
  );
};

// ── MODULE 15: EXCLUSION ZONE ─────────────────────────────────────────────────
const ExclusionZone = () => {
  const [slew,setSlew]=useState(""); const [maxR,setMaxR]=useState(""); const [liftH,setLiftH]=useState("");
  const [loadW,setLoadW]=useState(""); const [buf,setBuf]=useState(1.5);
  const minExcR = (parseFloat(maxR)||0)+(parseFloat(loadW)||0)/2+(parseFloat(buf)||1.5);
  const dropR = liftH?Math.sqrt(2*(parseFloat(liftH)||0)/9.81)*5:0;
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">🚧 Exclusion Zone Calculator</span></div>
      <div className="card-body">
        <div className="form-grid">
          {[["Crane Slew Radius (m)",slew,setSlew],["Maximum Working Radius (m)",maxR,setMaxR],
            ["Lift Height (m)",liftH,setLiftH],["Load Width (m)",loadW,setLoadW]].map(([l,v,s])=>(
            <div className="form-row" key={l}><label className="label-input">{l}</label><input className="input-user no-unit" type="number" value={v} onChange={e=>s(e.target.value)} /></div>
          ))}
          <div className="form-row"><label className="label-input">Safety Buffer (m)</label><input className="input-user no-unit" type="number" value={buf} onChange={e=>setBuf(e.target.value)} /></div>
        </div>
        <div className="grid-3" style={{marginTop:12}}>
          <div className="stat-card"><div className="stat-label">Min Exclusion Radius</div><div className="stat-val">{f2(minExcR)}<span className="stat-unit">m</span></div></div>
          <div className="stat-card"><div className="stat-label">Fallen Object Radius</div><div className="stat-val">{f2(dropR)}<span className="stat-unit">m</span></div></div>
          <div className="stat-card"><div className="stat-label">Safety Buffer</div><div className="stat-val">{buf}<span className="stat-unit">m</span></div></div>
        </div>
        {maxR && (
          <div className="svg-diagram" style={{padding:8,marginTop:12}}>
            <svg width="100%" viewBox="0 0 340 200">
              <circle cx={170} cy={100} r={Math.min(parseFloat(slew)||20,80)*1.5} fill="rgba(249,115,22,0.05)" stroke="var(--border-orange)" strokeDasharray="4,3"/>
              <circle cx={170} cy={100} r={Math.min(minExcR,90)*1.5} fill="rgba(239,68,68,0.05)" stroke="var(--red-400)" strokeDasharray="6,3"/>
              <rect x={160} y={94} width={20} height={12} rx="2" fill="var(--orange-500)" opacity="0.6"/>
              <text x={170} y={105} textAnchor="middle" fill="white" fontSize="8">🏗</text>
              <text x={170} y={40} textAnchor="middle" fill="var(--red-400)" fontSize="9">EXCLUSION ZONE: {f2(minExcR)}m</text>
              <text x={280} y={100} fill="var(--border-orange)" fontSize="8">SLEW: {slew||"?"}m</text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

// ── MODULE 16: DROPPED OBJECT ─────────────────────────────────────────────────
const DroppedObject = () => {
  const [h,setH]=useState(""); const [w,setW]=useState(""); const [objType,setObjType]=useState("Solid"); const [pers,setPers]=useState("NO");
  const strikeR = h?Math.sqrt(2*(parseFloat(h)||0)/9.81)*2:0;
  const E = w&&h?(parseFloat(w)||0)*1000*9.81*(parseFloat(h)||0)/1000:0;
  const risk = !h||!w?"—":pers==="YES"&&E>100?"UNACCEPTABLE":pers==="YES"&&E>10?"HIGH":E>100?"MEDIUM":"LOW";
  const riskColor = risk==="UNACCEPTABLE"?"var(--red-400)":risk==="HIGH"?"var(--red-400)":risk==="MEDIUM"?"var(--amber-400)":"var(--green-400)";
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">💥 Dropped Object Risk</span></div>
      <div className="card-body">
        <div className="form-grid">
          <div className="form-row"><label className="label-input">Lift Height (m)</label><input className="input-user no-unit" type="number" value={h} onChange={e=>setH(e.target.value)} /></div>
          <div className="form-row"><label className="label-input">Object Weight (T)</label><input className="input-user no-unit" type="number" value={w} onChange={e=>setW(e.target.value)} /></div>
          <div className="form-row"><label className="label-input">Object Type</label><select className="input-user no-unit" value={objType} onChange={e=>setObjType(e.target.value)}>{["Solid","Fragile","Pressurised","Chemical"].map(t=><option key={t}>{t}</option>)}</select></div>
          <div className="form-row"><label className="label-input">Personnel Below?</label><select className="input-user no-unit" value={pers} onChange={e=>setPers(e.target.value)}><option>NO</option><option>YES</option></select></div>
        </div>
        <div className="grid-3" style={{marginTop:12}}>
          <div className="stat-card"><div className="stat-label">Struck-by Radius</div><div className="stat-val">{f2(strikeR)}<span className="stat-unit">m</span></div></div>
          <div className="stat-card"><div className="stat-label">Impact Energy</div><div className="stat-val">{f2(E)}<span className="stat-unit">kJ</span></div></div>
          <div className="stat-card" style={{background:risk==="LOW"?"var(--green-bg)":risk==="MEDIUM"?"var(--amber-bg)":"var(--red-bg)"}}>
            <div className="stat-label">Risk Level</div>
            <div className="stat-val" style={{fontSize:16,color:riskColor}}>{risk}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 17: REDUNDANCY ──────────────────────────────────────────────────────
const Redundancy = () => {
  const {g} = useContext(AppCtx);
  const sl = g.specialLift||"Standard Lift";
  const env = g.env||"onshore";
  const [overOccupied,setOverOccupied]=useState(false);
  const [overLive,setOverLive]=useState(false);
  const [unknownCOG,setUnknownCOG]=useState(false);
  const TRIGGERS = [
    ["GLW > 75% crane chart capacity", g.craneUtil>75],
    ["Tandem lift (two or more cranes)", sl==="Tandem Lift"],
    ["Blind lift", sl==="Blind Lift"],
    ["Man-riding / Personnel basket", sl==="Man-Riding / Personnel"],
    ["High elevated lift (>15m)", sl==="High Elevated Lift"],
    ["Offshore or subsea operation", env==="offshore"||sl==="Subsea / Below Keel"],
    ["Lift over occupied structures", overOccupied],
    ["Lift over live process equipment", overLive],
    ["Load with unknown Centre of Gravity", unknownCOG],
  ];
  const isCritical = TRIGGERS.some(([,v])=>v);
  const CHECKS = [
    "Secondary sling / back-up rigging in place",
    "Load tested to 125% of GLW","Independent third-party review completed",
    "Two-crane backup plan documented","Emergency lowering procedure written",
    "Contingency for single crane failure","Single-point-of-failure analysis completed",
  ];
  const [done,setDone]=useState({});
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">🔄 Redundancy Check — Critical Lifts</span>
        <span className={`badge ${isCritical?"badge-fail":"badge-info"}`}>{isCritical?"⚠️ CRITICAL LIFT":"STANDARD LIFT"}</span>
      </div>
      <div className="card-body">
        <div className="section-heading">Critical Lift Classification Triggers</div>
        {TRIGGERS.map(([l,v])=>(
          <div key={l} className="check-item" style={{background:v?"var(--red-bg)":"transparent"}}>
            <span className="check-label">{l}</span>
            <span style={{fontSize:11,color:v?"var(--red-400)":"var(--text-muted)"}}>{v?"⚠️ TRIGGERED":"—"}</span>
          </div>
        ))}
        <div className="info-box info-box-orange" style={{marginTop:8,fontSize:11}}>
          Manual overrides — check any that apply to this lift:
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:8}}>
          {[[overOccupied,setOverOccupied,"Over occupied structures"],[overLive,setOverLive,"Over live process plant"],[unknownCOG,setUnknownCOG,"Unknown / uncertain CoG"]].map(([v,set,label])=>(
            <div key={label} className="check-item" style={{background:v?"var(--amber-bg)":"var(--bg-section)",border:`1px solid ${v?"var(--amber-border)":"var(--border-subtle)"}`,borderRadius:"var(--radius-sm)"}}>
              <input type="checkbox" checked={v} onChange={e=>set(e.target.checked)} style={{accentColor:"var(--orange-500)"}} />
              <span className="check-label" style={{fontSize:12}}>{label}</span>
            </div>
          ))}
        </div>
        {isCritical && (
          <>
            <div className="info-box info-box-red" style={{marginTop:8}}>This lift meets critical lift classification criteria. All redundancy checks below are MANDATORY.</div>
            <div className="section-heading" style={{marginTop:12}}>Mandatory Critical Lift Checklist</div>
            {CHECKS.map(c=>(
              <div key={c} className="check-item" style={{background:done[c]?"var(--green-bg)":"transparent"}}>
                <span className="check-label">{c}</span>
                <input type="checkbox" style={{accentColor:"var(--orange-500)"}} checked={!!done[c]} onChange={e=>setDone(p=>({...p,[c]:e.target.checked}))} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// ── MODULE 18: GLOSSARY ────────────────────────────────────────────────────────
const GLOSSARY = [
  {term:"GLW",def:"Gross Lift Weight — total mass applied to crane hook including rigging allowances and contingency",formula:"GLW = W × (1 + r/100) × (1 + c/100)",std:"ISO 12480-1 Sec.7.2"},
  {term:"WLL",def:"Working Load Limit — maximum load a lifting component is designed to handle in normal service conditions",std:"ASME B30.9"},
  {term:"SWL",def:"Safe Working Load — older terminology equivalent to WLL; still used in legacy standards",std:"BS 7121-1"},
  {term:"MBL",def:"Minimum Breaking Load — minimum force required to cause failure; typically 5× WLL for rigging",std:"EN 13889"},
  {term:"FoS",def:"Factor of Safety — ratio of MBL to WLL; minimum 5:1 for rigging equipment per most standards",formula:"FoS = MBL / WLL",std:"ASME B30.9"},
  {term:"DAF",def:"Dynamic Amplification Factor — multiplier applied to account for dynamic forces during lifting",formula:"DDL = GLW × DAF",std:"ISO 12480-1 / DNVGL-ST-N001"},
  {term:"GBP",def:"Ground Bearing Pressure — pressure exerted on the ground per unit area by crane outrigger or track",formula:"GBP = Force / Area (kN/m²)",std:"CIRIA C703"},
  {term:"COG / CoG",def:"Centre of Gravity — the point at which a body's entire weight may be considered to act",std:"ASME B30 / EN 13155"},
  {term:"K Factor",def:"Sling angle efficiency factor — sin of the angle from horizontal; reduces effective WLL at low angles",formula:"K = sin(θ) where θ = angle from horizontal",std:"ASME B30.9"},
  {term:"DDL",def:"Dynamic Design Load — the load used for engineering calculations after applying DAF to GLW",formula:"DDL = GLW × DAF",std:"ISO 12480-1"},
  {term:"Proof Load",def:"Test load applied to lifting equipment to verify structural integrity; typically 110% or 125% of WLL",std:"LOLER 1998 / EN 13155"},
  {term:"LOLER",def:"Lifting Operations and Lifting Equipment Regulations 1998 — UK statutory regulation for safe lifting",std:"LOLER 1998"},
  {term:"PUWER",def:"Provision and Use of Work Equipment Regulations 1998 — requires equipment to be suitable and maintained",std:"PUWER 1998"},
  {term:"Critical Lift",def:"A lift requiring additional planning and controls due to elevated risk factors",std:"BS 7121-1 / ASME B30.5"},
  {term:"Tandem Lift",def:"A lift where two or more cranes work together to lift a single load",std:"BS 7121-3 Sec.12"},
  {term:"Blind Lift",def:"A lift where the crane operator cannot see the load or landing area directly",std:"BS 7121-1"},
  {term:"Outrigger",def:"Extendable jacks on a mobile crane that distribute the crane's weight and reaction forces to the ground",std:"ASME B30.5"},
  {term:"Radius",def:"The horizontal distance from the crane's slew axis (centre pin) to the hook block",std:"ISO 9374-1"},
  {term:"Boom",def:"The primary structural member of a crane from which loads are suspended",std:"ASME B30.5"},
  {term:"Jib",def:"Secondary boom extension attached to the tip of the main boom to increase reach",std:"ASME B30.5"},
  {term:"Duty Class",def:"ISO 4301-1 classification of crane usage intensity from A1 (infrequent) to A5 (continuous)",std:"ISO 4301-1"},
];
const Glossary = () => {
  const [filter,setFilter]=useState("");
  const terms = GLOSSARY.filter(g=>!filter||g.term.toLowerCase().includes(filter.toLowerCase())||g.def.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">📖 Engineering Glossary</span></div>
      <div className="card-body">
        <input className="input-user no-unit" placeholder="🔍 Search terms..." value={filter} onChange={e=>setFilter(e.target.value)} style={{marginBottom:12}} />
        {terms.map(t=>(
          <div key={t.term} style={{padding:"10px 14px",borderBottom:"1px solid var(--border-subtle)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
              <span style={{fontFamily:"Arial,monospace",color:"var(--orange-500)",fontWeight:600,fontSize:14,minWidth:120}}>{t.term}</span>
              {t.std && <span className="std-tag">{t.std}</span>}
            </div>
            <div style={{fontSize:12,color:"var(--text-secondary)",lineHeight:1.6}}>{t.def}</div>
            {t.formula && <div style={{fontFamily:"Arial,monospace",fontSize:11,color:"var(--blue-400)",marginTop:4}}>{t.formula}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── MODULE 18: PYTHAGOREAN CALCULATOR (new) ───────────────────────────────────
const PythagoreanCalc = () => {
  const [sideA,setSideA]=useState(""); const [sideAU,setSideAU]=useState("m");
  const [sideB,setSideB]=useState(""); const [sideBU,setSideBU]=useState("m");
  const [sideC,setSideC]=useState(""); const [sideCU,setSideCU]=useState("m");

  const aM=toM(sideA,sideAU), bM=toM(sideB,sideBU), cM=toM(sideC,sideCU);
  const hasA=sideA!=="", hasB=sideB!=="", hasC=sideC!=="";
  let A=aM, B=bM, C=cM, solveMode="none";
  if(hasA&&hasB&&!hasC){C=Math.sqrt(aM*aM+bM*bM);solveMode="C";}
  else if(hasA&&hasC&&!hasB&&cM>aM){B=Math.sqrt(cM*cM-aM*aM);solveMode="B";}
  else if(hasB&&hasC&&!hasA&&cM>bM){A=Math.sqrt(cM*cM-bM*bM);solveMode="A";}
  else if(hasA&&hasB&&hasC){C=Math.sqrt(aM*aM+bM*bM);solveMode="verify";}

  const thetaH=A>0&&B>0?Math.atan2(B,A)*180/Math.PI:null;
  const thetaV=thetaH!=null?90-thetaH:null;
  const K=thetaH!=null?Math.sin(thetaH*Math.PI/180):null;

  const svgW=280,svgH=160,margin=30;
  const sc=A>0&&B>0?Math.min((svgW-margin*2)/A,(svgH-margin*2)/B,50):20;
  const ox=margin, oy=svgH-margin;
  const bpX=ox+A*sc, bpY=oy, tpX=ox+A*sc, tpY=oy-B*sc;

  return (
    <div>
      <div className="module-card">
        <div className="card-header"><span className="module-title">📐 Pythagorean Calculator</span><span className="std-tag">ISO 80000-2:2019 | Rigging & Crane geometry</span></div>
        <div className="card-body">
          <div className="info-box info-box-orange" style={{marginBottom:10,fontSize:11}}>Enter ANY TWO sides — the third is auto-calculated. A=horizontal, B=vertical, C=hypotenuse (sling/boom length).</div>
          <div className="form-grid">
            {[["A — Horizontal (adjacent)","A",sideA,setSideA,sideAU,setSideAU,solveMode==="A"],
              ["B — Vertical (opposite)","B",sideB,setSideB,sideBU,setSideBU,solveMode==="B"],
              ["C — Hypotenuse (sling/boom)","C",sideC,setSideC,sideCU,setSideCU,solveMode==="C"]
            ].map(([label,id,val,setVal,unit,setUnit,isCalc])=>(
              <div className="form-row" key={id}>
                <label className={isCalc?"label-calc":"label-input"}>{label} {isCalc?"🔵 AUTO":""}</label>
                <div className="input-wrap">
                  <input className={isCalc?"input-calc":"input-user"} type="number" value={val}
                    onChange={e=>setVal(e.target.value)} placeholder="0" readOnly={isCalc}/>
                  <select className="unit-sel" value={unit} onChange={e=>setUnit(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
                </div>
              </div>
            ))}
          </div>
          {solveMode==="C"&&<div className="info-box info-box-orange" style={{fontSize:11,marginTop:6}}>C = √(A²+B²) = √({f2(aM)}²+{f2(bM)}²) = <strong style={{color:"var(--blue-400)"}}>{f3(C)} m</strong></div>}
          {solveMode==="B"&&<div className="info-box info-box-orange" style={{fontSize:11,marginTop:6}}>B = √(C²−A²) = <strong style={{color:"var(--blue-400)"}}>{f3(B)} m</strong></div>}
          {solveMode==="A"&&<div className="info-box info-box-orange" style={{fontSize:11,marginTop:6}}>A = √(C²−B²) = <strong style={{color:"var(--blue-400)"}}>{f3(A)} m</strong></div>}
          {hasC&&hasA&&cM>0&&aM>=cM&&<div className="info-box info-box-red" style={{fontSize:11,marginTop:6}}>❌ Hypotenuse must be the longest side. C must be greater than A.</div>}

          <div className="section-heading">Angle Calculations</div>
          <div className="grid-4">
            <div className="stat-card"><div className="stat-label">θh from Horizontal</div><div className="stat-val">{thetaH!=null?f2(thetaH):"—"}<span className="stat-unit">°</span></div></div>
            <div className="stat-card"><div className="stat-label">θv from Vertical</div><div className="stat-val">{thetaV!=null?f2(thetaV):"—"}<span className="stat-unit">°</span></div></div>
            <div className="stat-card"><div className="stat-label">K Factor sin(θh)</div><div className="stat-val" style={{color:"var(--blue-400)"}}>{K!=null?f3(K):"—"}</div></div>
            <div className="stat-card" style={{background:thetaH!=null&&thetaH>=45?"var(--green-bg)":thetaH!=null&&thetaH>=30?"var(--amber-bg)":thetaH!=null?"var(--red-bg)":""}}>
              <div className="stat-label">Status</div>
              <div style={{fontSize:12,color:thetaH!=null&&thetaH>=45?"var(--green-400)":thetaH!=null&&thetaH>=30?"var(--amber-400)":thetaH!=null?"var(--red-400)":"var(--text-muted)",marginTop:8}}>
                {thetaH!=null?(thetaH>=45?"✅ SAFE":thetaH>=30?"⚠️ LOW":"❌ PROHIBITED"):"—"}
              </div>
            </div>
          </div>

          <div className="section-heading">Live Diagram</div>
          <div className="svg-diagram" style={{padding:8}}>
            <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:"Arial,monospace"}}>
              <line x1={0} y1={oy} x2={svgW} y2={oy} stroke="var(--border-strong)" strokeWidth="1.5"/>
              {A>0&&B>0&&C>0?<>
                <line x1={ox} y1={oy} x2={bpX} y2={bpY} stroke="var(--orange-500)" strokeWidth="2" strokeLinecap="round"/>
                <line x1={bpX} y1={bpY} x2={tpX} y2={tpY} stroke="var(--orange-500)" strokeWidth="2" strokeLinecap="round"/>
                <line x1={ox} y1={oy} x2={tpX} y2={tpY} stroke="var(--blue-400)" strokeWidth="2.5" strokeLinecap="round"/>
                <polyline points={`${bpX-8},${bpY} ${bpX-8},${bpY-8} ${bpX},${bpY-8}`} fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
                <text x={(ox+bpX)/2} y={oy+14} textAnchor="middle" fill="var(--orange-500)" fontSize="10" fontWeight="600">A={f2(A)}m</text>
                <text x={bpX+8} y={(bpY+tpY)/2} fill="var(--orange-500)" fontSize="10">B={f2(B)}m</text>
                <text x={(ox+tpX)/2-20} y={(oy+tpY)/2-8} fill="var(--blue-400)" fontSize="10" fontWeight="600">C={f2(C)}m</text>
                {thetaH!=null&&<>
                  <path d={`M ${ox+25} ${oy} A 25 25 0 0 0 ${ox+25*Math.cos((90-thetaH)*Math.PI/180)} ${oy-25*Math.sin((90-thetaH)*Math.PI/180)}`} fill="none" stroke="var(--amber-500)" strokeWidth="1.5"/>
                  <text x={ox+32} y={oy-8} fill="var(--amber-500)" fontSize="9">θh={f2(thetaH)}°</text>
                  <text x={tpX+5} y={tpY+14} fill="var(--text-muted)" fontSize="8">θv={thetaV!=null?f2(thetaV):""}°</text>
                </>}
                <circle cx={ox} cy={oy} r="3" fill="var(--text-muted)"/>
                <circle cx={bpX} cy={bpY} r="3" fill="var(--text-muted)"/>
                <circle cx={tpX} cy={tpY} r="4" fill="var(--orange-500)"/>
              </>:<text x={svgW/2} y={svgH/2} textAnchor="middle" fill="var(--text-muted)" fontSize="11">Enter two values to see triangle</text>}
            </svg>
          </div>

          <div className="section-heading">Practical Applications</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["Sling Geometry","A = horiz. distance\nB = hook height H\nC = sling length S\nθh = sling angle\nK = sin(θh)","ASME B30.9"],
              ["Boom Geometry","A = working radius R\nB = boom tip height\nC = boom length L\nα = arccos(A÷C)","ASME B30.5 Sec.5-1.3.2"],
              ["Pipeline Slope","A = horizontal run\nB = vertical rise\nC = pipe length\nGradient = B÷A×100%","ISO 80000-2:2019"],
            ].map(([t,d,s])=>(
              <div key={t} style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 14px"}}>
                <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:8}}>{t}</div>
                <div style={{fontFamily:"Arial,monospace",fontSize:11,color:"var(--text-secondary)",lineHeight:1.8,whiteSpace:"pre-line"}}>{d}</div>
                <div style={{fontSize:10,color:"var(--text-muted)",marginTop:6}}>Ref: {s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 19: UNIT CONVERTER ─────────────────────────────────────────────────
const UnitConverter = () => {
  const CATS = {
    "Length":{units:["mm","cm","m","ft","in","yd"],base:1e-3,factors:{mm:1,cm:10,m:1000,"ft":304.8,"in":25.4,"yd":914.4}},
    "Mass":{units:["kg","T","lb","short ton","long ton"],base:1,factors:{kg:1,"T":1000,"lb":0.453592,"short ton":907.185,"long ton":1016.05}},
    "Force":{units:["N","kN","MN","kgf","lbf"],base:1,factors:{N:1,"kN":1000,"MN":1e6,"kgf":9.80665,"lbf":4.44822}},
    "Pressure":{units:["Pa","kPa","MPa","bar","psi"],base:1,factors:{Pa:1,"kPa":1000,"MPa":1e6,"bar":1e5,"psi":6894.76}},
    "Speed":{units:["m/s","km/h","mph","knots"],base:1,factors:{"m/s":1,"km/h":0.27778,"mph":0.44704,"knots":0.514444}},
    "Temperature":{units:["°C","°F","K"],special:true},
    "Angle":{units:["deg","rad","grad"],base:1,factors:{deg:1,rad:180/Math.PI,grad:0.9}},
  };
  const [cat,setCat]=useState("Length");
  const [vals,setVals]=useState({});
  const setVal = (unit,v) => {
    const num = parseFloat(v);
    if (isNaN(num)) {setVals({[unit]:v}); return;}
    const C = CATS[cat];
    if (C.special && cat==="Temperature") {
      let newVals={};
      if(unit==="°C"){newVals={"°C":v,"°F":fN(num*9/5+32,2),"K":fN(num+273.15,2)};}
      else if(unit==="°F"){newVals={"°C":fN((num-32)*5/9,2),"°F":v,"K":fN((num-32)*5/9+273.15,2)};}
      else{newVals={"°C":fN(num-273.15,2),"°F":fN((num-273.15)*9/5+32,2),"K":v};}
      setVals(newVals); return;
    }
    const baseVal = num*C.factors[unit];
    const newVals={};
    C.units.forEach(u=>{newVals[u]=u===unit?v:fN(baseVal/C.factors[u],6);});
    setVals(newVals);
  };
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">📏 Unit Converter</span></div>
      <div className="card-body">
        <div className="tab-bar">
          {Object.keys(CATS).map(c=><button key={c} className={`tab-btn ${cat===c?"active":""}`} onClick={()=>{setCat(c);setVals({})}}>{c}</button>)}
        </div>
        <div className="form-grid">
          {CATS[cat].units.map(u=>(
            <div className="form-row" key={u}>
              <label className="label-input">{u}</label>
              <input className="input-user no-unit" type="number" value={vals[u]||""} onChange={e=>setVal(u,e.target.value)} placeholder="0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── PLACEHOLDER MODULE ─────────────────────────────────────────────────────────
const ModulePlaceholder = ({id}) => (
  <div className="module-card">
    <div className="card-header"><span className="module-title">{MODULES[id]?.icon} {MODULES[id]?.label}</span></div>
    <div className="card-body">
      <div className="info-box info-box-orange" style={{padding:24,textAlign:"center"}}>
        Module fully specified and ready for deployment.
      </div>
    </div>
  </div>
);

// ── MODULE RENDERER ────────────────────────────────────────────────────────────
const COMPS = [ProjectInfo,WeightCalc,CraneSelection,GBP,RiggingCalc,WindLoad,COGCalc,Dashboard,RiggingEquipRef,DiscardCriteria,ProofLoad,CraneConfig,Weather,HumanFactor,LiftSequence,ExclusionZone,DroppedObject,Redundancy,PythagoreanCalc,UnitConverter];

// ── ABOUT MODAL ───────────────────────────────────────────────────────────────
const AboutModal = ({onClose}) => {
  const handleOverlay = e => { if(e.target===e.currentTarget) onClose(); };
  useEffect(()=>{
    const handler = e => { if(e.key==="Escape") onClose(); };
    document.addEventListener("keydown",handler);
    return ()=>document.removeEventListener("keydown",handler);
  },[]);
  const standards = [
    "ISO 12480-1","BS 7121-1/2/3","ASME B30.9","ASME B30.5",
    "LOLER 1998","CIRIA C703","EN 1997-1 (EC7)","ASME P30.1",
    "BS EN 1492-1/2","ISO 4309","ASME BTH-1","DNVGL-ST-N001",
  ];
  return (
    <div className="about-overlay" onClick={handleOverlay}>
      <div className="about-modal">
        <div className="about-header">
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:5,marginBottom:4}}>
              <span style={{fontFamily:"Arial Black,Arial,sans-serif",fontSize:22,fontWeight:900,color:"#ffffff"}}>RigCalc</span>
              <span style={{fontFamily:"Arial Black,Arial,sans-serif",fontSize:22,fontWeight:900,color:"#c00000"}}>Pro</span>
            </div>
            <div style={{fontFamily:"Arial,sans-serif",fontSize:11,color:"#9ca3af",letterSpacing:"0.1em",textTransform:"uppercase"}}>
              Lifting &amp; Rigging Engineering Suite
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:10,
              background:"rgba(192,0,0,0.15)",border:"1px solid rgba(192,0,0,0.30)",
              borderRadius:4,padding:"3px 10px"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#c00000",display:"inline-block"}}/>
              <span style={{fontFamily:"Arial,monospace",fontSize:11,color:"#fca5a5",letterSpacing:"0.06em"}}>Version 1.0</span>
            </div>
          </div>
          <button className="about-close" onClick={onClose} title="Close (Esc)">✕</button>
        </div>
        <div className="about-body">
          <div className="about-row">
            <span className="about-key">Developer</span>
            <span className="about-val" style={{fontWeight:700}}>Althaf Sali</span>
          </div>
          <div className="about-row">
            <span className="about-key">Contact</span>
            <span className="about-val">
              <a href="mailto:Althafsali.p@gmail.com?subject=RigCalc Pro Enquiry">Althafsali.p@gmail.com</a>
            </span>
          </div>
          <div className="about-row">
            <span className="about-key">Modules</span>
            <span className="about-val">20 engineering calculation modules</span>
          </div>
          <div className="about-row">
            <span className="about-key">Purpose</span>
            <span className="about-val">Precision lift planning and rigging calculation tool for Experts</span>
          </div>
          <div className="about-row" style={{alignItems:"flex-start"}}>
            <span className="about-key" style={{paddingTop:2}}>Standards</span>
            <div className="about-val">
              <div className="about-std-grid">
                {standards.map(s=>(<div key={s} className="about-std-item">{s}</div>))}
              </div>
            </div>
          </div>
          <div style={{marginTop:16,padding:"12px 14px",background:"#fffbeb",
            border:"1px solid #fde68a",borderLeft:"3px solid #d97706",borderRadius:6,
            fontFamily:"Arial,sans-serif",fontSize:11,color:"#78350f",lineHeight:1.7}}>
            ⚠ This tool is for engineering guidance only. All lift plans must be reviewed
            and approved by a competent person before execution. Refer to applicable
            standards and site-specific requirements.
          </div>
          <div style={{textAlign:"center",marginTop:20}}>
            <button className="btn btn-primary" style={{minWidth:120,fontFamily:"Arial,sans-serif"}} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── TOPBAR ─────────────────────────────────────────────────────────────────────
const Topbar = ({liftStatus,hasUnsaved,onAbout}) => {
  const {clearAll} = useContext(AppCtx);
  const bannerText = liftStatus==="pass"?"✅ ALL CHECKS PASS — LIFT APPROVED"
    :liftStatus==="warn"?"⚠️ WARNING — REVIEW REQUIRED"
    :liftStatus==="fail"?"❌ STOP — LIFT NOT APPROVED"
    :"⏳ ENTER DATA TO BEGIN";
  return (
    <div className="topbar">

      <div className="topbar-brand">
        {/* Actual logo image — resized to 62px height, 4KB JPEG */}
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABSAKQDASIAAhEBAxEB/8QAHgABAAEFAAMBAAAAAAAAAAAAAAcBBQYICQIDBAr/xAA9EAABAwMDAwIEBAIHCQEAAAABAgMEBQYRAAcICRIhEzEKFCJBFSMyUWFxFzNCYoGRoRY2Q0RjcoKSssX/xAAcAQEAAQUBAQAAAAAAAAAAAAAABQECAwQGBwj/xAA6EQABAwIFAgMDBw0AAAAAAAABAAIDBBEFEhMhMUFRYXGRBiIyIzNSgaHB0QcIFBVCU3KSk6Kx0tP/2gAMAwEAAhEDEQA/AO/H30000RM6qPbVPtqOt4OXO13H9ZbvXcGz7YkD2j1CqssyFfyaKu8/4J1ZJKyNuaQgDx2W1R0NTVyCGljc956NBJ9BcqRc41XWvFE6sXHC4agIzG8tiocUcZkz/lkf+7iUp/11Olp3lSL8oTNUodUp1ZpkkZZlwZKJLDv/AGrQSk/4HWOGqhm+aeHeRB/wtvEcBxPDwDX08kV+M7HNv/MArlnTXzVisxLepb86fKjQoUVBceffdS000ke6lKUQAB+5OvZBnM1KEzJjOtPx5CA4062sLQ4lQyFJI8EEeQRrOope3Q+dNNETONNNNEQ+2g99BoNETTOdNNETTP8ArpjT20RPbTOn300RVCsffTQZ/bTRFTGTq2XrelK26tKpV6u1CLSqPSI65c2ZJcDbUZpA7lLUo+wAGrnrRDn4mfz15m2nxjp0uXFsiixW7v3IfjLKFvR0rBiwO4exWopVj/qtrH9XrSr6owRZmC7iQGjuTx9XU9gCum9ksAZi1fo1EmnCxrpJX2vkjYLuIHVx2awdXuaOqxxnefe/q/XDNjbXVWpbMbARH1xXbtLJRXLq7T2rEUZBab8YyCnt/tKUrLQnbYHo/wCwWwLSH2rGgXbXCr1H6xdIFXmSHPu4fVBbQo/3EJ99bF2haVMsK16fRaNBi0uk0qOiLDiRmw2zGaQntShCR4CQABq45wM/trWp8JjB1ar5STueB4NHAH29yVN4x+UCqcw4fgQNHRjYMYbOcPpTSCzpHHk3OUcNa0bLEJHH6xJdNMN6yrSdhkdpYXRoymiP27SjGNRRX+HOzfHa64l/UGPK2rmsTWvXRaclyBGryicphuwGgpqUXD4CEtF0n9JB86kq/d6fw+5HbYtaB/tLd6UoU9FQ76cSkoX5S7NfAIZSR5SgBTqx+hBGVDQnqPcu07e3PdG21ubmUmDvPGtqVVroveSlTcbbuA4wtTUGnNpC0RZ0ztwhTiitpkLkOrX2Mtr3n0kLiC5guONuPJcpT49iUDXMineGuFnDMbOB6OF7EeYKiPrC8s7o5uXvQdn7LpFuSI1pXTBrdRodfhuVCn3E/DfKn6dPS2tLb0aI13vz0NrUiMUxmVKckvBpnf3pH8f3+NHT72+tmTVWaq85HkVdfy0dUaFBM2S7L+UitKUpTcVj1vSaSVEhCB7ew1V6f3Cm3dvOIN9bxQKA7So94W4KVYkeZTI8OqQbX9USG35gZQkLm1B5RlvLVlZR8qlX1IVnffiUCnjHYWQQRQouQRgj8sa2FEqRNM6173p6r3G/jrubVLMvnenb61rqoim0T6XUaqlmTEK20uoC0EeMoWhQ/goaz7jby72w5hWtOre1192xflLpkn5OZIos5EpMV7tCghwJ8pJSQRkDI9s6IpG+2mmo55JcutsOHtqwq3uhfdr2JS6lJ+TiSK1PRFTKe7SooR3eVEJBJwDge+NEUjHT76gnj91OePvKvcFFp7d7w2BeFyusOSm6ZTKs27KdbbGVqSjwVdo8nGcAE+wOp20RNDrD9q+Qdib5zK7Hsu8rYux+15pptYbpFTZmKpcoFQLD4bUfTcBSr6VYP0nx41mGiIdBqKN4edG0HH+8Tb167i2pbNbSwiSYVQmhp4Nrz2r7T9jg/wCWsp2X38svkTarlcsW6KLddJZkKiuSqZKS+226kAltRHsrCknB+ygfY6wtqYXP02uBcOlxf0UnNguIRUza2WB7YnWs8tcGm/FnEWN+m+6y720099MazKMVQCR76aAA/fTRFQ+Rj2z41p50waMm8t8+UW48pIXUa3uZLttt1QyoRKW2hlpIP2GXD4/ujW4avA8a1i6f9OTttvRySsZ0hMqFuK7dTScYzEq8RiQ2sfuPUbkJz+7ZH21HVbb1MBPALvXKbfZddlgExbguKRx/E5kV/wCATMv/AH6a2WqVSj0anSJkt9mLEiNqeffeWG22UJGVKUo+EpABJJOABqLE3ncPI3LVpvy7YshwYcuNbPZPrCT7intrH5bRH/NOJ+oeWkKBS8NM+XG4Mqt9TaNuDV6tccjZDZaq0Pbq8KGuoqNvP1CstOvoqMiN/VL+SkS6IFlYVgSO/wCn0Pq3G5y80bU4F8daruBday8hhxuBSqY28luVXqk8eyNBYKvHqOL/ALR+lCErcVhKFESK41RXzj5CzOHe0ytttiLchVvea5qVUKrQqUoqeap0dhsqlVuoLV3LWhCihCS4SuVJdaaBPctSNQ+OXF+s8gN7bT2tp1Vtabt8bQauHd+4qDNqD0++49TkMVKHEqL0hKcy6g6mQ88EqJTCeeaw22+yNWB+74e2+7FdvGVupO3a3937okBFFh7a3+uPBTcLMhxpu30IjrUG6XGYmMvB59GfTi1F9WVLKddHenbwnpXAfi3QrEhzDWayM1C462tHa7Xqo6lPzEpQ+yfpS22j/hstNIHhGiKPusRSplwcRadZtPqNXo8K+LopNtz10cLTMMN51RW2z6RSsE+mn9CkeAQVoQVKFw6QynqZw4Zt41WpVin2XXqtbdLkVCcmfK+SiSltsIckJADyko8d4yCMYUoAKOIdfm7bfo/TYuqgVqkqqk/cGfBtC3XDNbp7NLrE1704c16W4O2Myw4PUW4cfSCnI78jO+kxHsa1+E1uWdYlVj1+Nt2py1q1V43c5Gq1ZihAqMhp9QBkIVKU5+b57iCM/TrX0n6+pfa1reN+VLGtp/1Z+h6Y1NTNnsL5ctst+bX3tx9d1zKs/ZzZ3eP4pHlixvfQbCrtn0qzqfLbF3tx1U+JKLNEaQ4C+QhLhDi0g5yQsge+tTeNStqLO4g842rou2+Nvtuoe9NJYps7biOzIlNNJfqyYzTKS62j5YoAGQvGEpxnU8b/APDVrnz10+oNtiY3zFUq+1MeZQs5AbqsZqhvQ1fyLqAg/wB1xWoNvy6dvrv+EvWbVtSiWtedE3Ep1DvdMON6Uioz45c9KS+TlSlLjONE5+kL9UJA8jWwoldfN3Ovvx84Xbn0vaCvP7lV24qFbNPqU96mW05URAjuQ2nm1SShfcFqZW04ooSpKfUGVe+NB+tbzX236qlq8HL3tKm1aXZFwbuyaHKg3BAQw5KSiRTWn23GkrWktqSsj9XkEgjV62O3Qtva7r6co37kuOh22zUeP1KhxHKlUWoSZLxodCUGkKcUkKWQkq7Rk4STjxrRnbKqRaD03OAU6dJjwoUHfuryJMiQ6lpqO2iZS1LWtaiAlKQCSokAAEnRF2eqXRctvjD1abD5N7e07bTbXaHbOz6gxXaBSKa5EmSpJjVBLktDbLfpKw2+yCSoKKWSMHxr2bZ/FCcdd0LnsyCxbu9FLpd91tig0iv1G0fRo8iS496SQHw8rICs57QpSQDkeDi1cvOuQzRee7ex+30fa/ceyq5tbXrrlVyPVRVUtzIlNqsn5NaGVqZUhXybIWhR7ih5Xt4zyqubcbcjejhxwsu649y9snrPrO8cM0zbK1rPp1BVajyKhIQqQflSklDna4rtLSRmQDknySLaXpMdRPb3pe0vmrf25or5pE/ft2gRY9GgCbLkS3VVFxKEoKkJACGXFEqUB9OBkkA9Iun71uNnuo7vbXtu7Mpu4dAu23qT+NyIN0UH8NU5F9RtsrQQ4vyFOteFdpIXkZAOOAnI10RuN3I1a1BtCOZEVZUo9oSAzXcnP2Gu8PHvkdxh3Y6xm4dIsS311PfmPZLMmt3rCkIlUuo0oKhBMZt5ElaCtJVGBAaTgtn6jjyRRpuTszae/HxBEig3nbdGumijbNuT8lU4iZLAdS4AlfYoEdwCiAf4nUe9MfmXYPT52Y3Xm3VEq8ei1jeKdQKczRqeJPyykx0FKS2FJIQlCcAJCj4AAOrzyq4n27zL67MizronXDTqWNumZ4eo00RJPqNrwkd5Sr6SFnIx58a9PPHhDZfA6zuOtrWOqtuwqtvbTqtLfqkwSpLz6ktt57glIACUAAAfuTknXnzm1EcstZC0DI9/vdTmLRa3h5r69ppsJrKCg9nMQmkeaqmpjpgWa0RNkkLg8kgF1gPg6b36bFuddPZFraipXapm+hGplwM225BND7Z7kp1px1BS0XAOwpaX+pQUCAO3JGZN4W9R7b/nZVrnp9oRrop1StER1VCJXKb8k8lL3f2KSAtWfKFZBwR48YOtQerhxqs/jlcG2100QSoUvcHe6lV2vvzJxWyHkJeJWnuwGkALUT9gPv41IHTnr8G6urHy8qNMnRKlAlKoamZMV9L7LoDKxlK0kggEEeD4xjUtDiNa2ubTTubzY2HN2ucDztwNlwOJ+xnsxN7Lz43hUUrTpmRhe8ENLZoInMIDbG5keQ64NgNu2/gV2jTQZx4IGmurXgCoftrg9yj+JQ3j477z7rVGBt9so9AtS6ahaypK4Ez8VkQ4VRfiR/WcS+PVOcq7QAlJcWQBnz3hOvz08/dqOENc5HbxW02/yeuerVO4Kk5WBb9epP4DFrCpfqykxY815l15EeW4A4UAoSSpPqAAkUICua9wBAPPKwni71VLr6ilRsjYOn1q1NrKZyNvK7lbl1GTRm7gFVfmMNyI7aUTO1LKSntitpbX3ICGiFZSka2x3v4w8htyZ299Qm7uUfeer8Xmk0ag0qoWRFhTpcaVRafUpEunyI7vdGqrXckMPFLhUqOlCiEvODXFm8OLdpwjMolGrJqNttS/m6bNk1Kiwqihamm0ueo2mqPtgdyPAC1ZAByk+NeO03GaLa24sKof0o3VabbSi5+I0Op0V+otOgfllA/F2B74BUXAQPIz7aqrV+mnpyWTVuYu4sTlZf8ARqTBkVKhIo+3EGO20r5SlOoaVLrClJyfXqTqApCSe5mI2yjwpx7O68qU3CjreecbaabSVLWtQSlIAySSfA1yf6MPV72S2f2f2e41qjbp0yfAS3bcCvXVSIEFqZMffeLDbrEebIejB91Sm2VOJ9NZSkBf1JJvXxXkRuq8M9o4T6PVhzd0YjUhlRIQ8j8KqZ7Vj7jIHg+PGsFVOIIXzO4aCfQXUpgeFSYniVPhsRDXTSMjBPAL3BoJt0BO6293BokLqL0KVbUuDEe2KlkJqT8xlC132EryGYyVj8uB3JGZIw48R+SUIw8vy22psHp50mmWYIsCLsmyoRaDUIzLbIs3vX9MOaEAAxStWG5ZGUlQQ+c4eXwPoXHrbqn7YWdVK3QINDYqVPmPy5uIskvOMof+XbQ2WVemXi2hIScqT2EkdriMYvSNltu65ZtakS51tLlMUP51mK1SY8bElQczGV6iPzj9KEkNe/rZ/ShWuRPtxSi3ybt9/wBntfqV9Ex/muY8/MRVxWact7SnfMW8tjI5He9iO6/SVZPCjanb7lFdO99FtKBB3OvSCmnVq4ESn1Oz46QwA2pCnC0kARmPKUA/ljz75jKr9G3i5XrQvqgStrKEqi7lVpm4rkhIqUxtmpT2VvLbf7Uvj0ylUh7w32pIXgggADUv4aqI2x0xt5IabcbumNH3Kq7DNCc7VNTUfIU7EfCwpIQSfuO0eTjW4kvbm0406a0vjXbfbEVKShwUiK4mSGWG3EFHYwrIcWtaB9/ylEBRKUnq4Z3yxMljAs4A7m3Iv2K8Ar8Kp8PrqjD62Q54XvYS1oIORxaTu5p3I224XPrqqcHdz79523DUKRwh2y5AbaOWhEpVu1pmtR6JWYMpEZtpJkvrkgvhgpcSlC2clBaw4OzGpM6SfRJt6b0obL2r5YbXUOpVyhXJVK9GpUypBb9LMhYSk+tEeABWhIKkJcIx2Z8jA3El7U2RHqLrKeOluPoQwXUOoocbtcUFqT2+WRjICVD74V7Ajz88Xbiz5FCrclfGygMv0yDFlxGVUWIRUlOhPe2jDPclTR7u4KT3YAOATgX5pvoj1P4LW0sN/ev/AKbf+isWw3RQ4n8Zb0fuKydnbVo9Zk06VSXJC5cqWTGktKZkNhL7y0gONLWhRABKVqGcKINrtLoE8PLGqtKm0nYu1IU+g1JmrQpTcqZ8zHktKC21eoXyspCgD2KJQSBlJxrMf6OrNFbfiL42URLTU2VFRIFEiKbfbaQFNvJw14Q6Dgd2CCCPJ8atO6e09pb/AFbj1O8uOjVUqVPYTAZdnNd7iWUzW2EhKm0EFtLTinwCe4ISQADnFHOnts0X8z/qro4cLMgEk0gbvciNpPhYaoB8feFvFfRdfRv4wXhY9327V9qKBNot+XMLvrkd6dLIm1dIeAlhXrdzbmJD4w2UjDqhjBxq7cQulrx14FXrU7k2k23oFmV2sQvw6XOjy5Eh5yP3pcLQU+6vtSVoQSE4yUJznA1SnWrQ49h25bbnHmK5QaVPXCh05yJGfZpbS3nUGQlLiMAKCELVj6sPAknB0kbVWaLPp1TY46Ww69KgS5cqIqixkOw3GVoQ2yUljvWpzuUoYTntbJCScA1zTfRHqfwVjYsO3vK/k29xvF9j85sSORvY7XPKkxHHiwG9/Vboiiwhfq6b+EGr/MueoYmc+l2d/p48Dz25/jrz3k2AsPkG/bjl40eFXF2lVG6zSS7JW38nMb/Q6OxackY9lZH8NRnF2kst6nyXXOO1sRnGqzGprTblFiqLkd0I75Z7WThDZUoKAz+gnIHnXwo23tNcqOgcaLcR6y4iVBdIiAspdkPNOLUQyU4aS2lwgEqKXUYGsWicpbptsdz4nufdUi3EYhKyYVcwewZWmwu1tiMrTq3AsSLDaxKlLkTxq255Y2dGoG4dvUy56TDlpnMMSHlt+i8EqSFpU2tKge1agcHBB86tvGfhdtTxH/GDtpaNLtldc9L59cZ515cgN93pgqcWsgDvVgAgZJOsc/oTsFmlU15/YO1W5c9l5xcdFCiu/LKbfbbS2tSWcAqbWtwE4GGyPJOss4/2XTrWkyXYG2VB2+M6nxZDxgMNNOurUt7Mdz020gloJSo/Uf64eB5yFODMJnxtzd+vrb70kxmRmHuw6nrJtE76Z2jJuDctEhHIv8J3A81JwAxpqmNNbi5pfBclNl1elLYg1FylyFfpkIZQ6pH8krBT/mNc87x+Gv2uvHda57yXuFuFDrF2VSVWJoYp9DWyy/KcDkkMB2AtTTTqx3LaCuxRUvIwtQPRvTRFzCX8K1scs/7yVsffxaFqD/8AL0Z+Fa2NacCjcVaWAc9qrRtXB/ypeunumiLnHY3w1m1u3W4VuXXTtw9yXrgtaqxqzDmTmqVKW9IjLLkb1yqJl5tlZCm21HtQUIwMISBOPK3pcw+cW39KtjdTcS6Lpo9FqrdbhIRAg096PMbbdaS6l2M02sfQ84MZwe728DW1en89UIBFirmPcxwc02I4K57NfDdbGlCkyavuDLSsdqvUuOaO4fse14eNeyD8M7xdZx8zQrsln7lV11VH/wAyRroLprCaaE8sHoFIsxrEGfBO8eTnD71EvDXhBtvwG2rl2bthRJFDoVQqbtZlNv1GRPdkS3UNtrdU4+4teSlpsY7sDt9vfUte2mmswAAsFHPe57i9xuTuT3KY0001VWoR/LQDHtpp76ImNMD9hpp7aImP8NMaaaImNNNPudEVdNVH/lpoi8dNNNETTTTRFRP6dV000RUQcjQfqOmmiKummmiKv214g+dNNEVdD7HTTREPvpppoiaaaaImmmmiJpppoi//2Q==" alt="RigCalc Pro" style={{height:"82px",width:"auto",objectFit:"contain",display:"block",flexShrink:0}}/>


      </div>

      <span className={`banner banner-${liftStatus||"idle"}`}>{bannerText}</span>

      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {hasUnsaved&&<div style={{display:"flex",alignItems:"center",gap:5}}>
          <div className="unsaved-dot"/>
          <span className="unsaved-label">Unsaved</span>
        </div>}
        <button className="btn btn-ghost btn-sm" onClick={clearAll}>🗑 Clear</button>
        <div style={{height:20,width:1,background:"#e5e7eb"}}/>
        <span style={{fontFamily:"Arial,monospace",fontSize:9,color:"#374151",letterSpacing:"0.06em"}}>
          ISO 12480 · BS 7121 · ASME B30
        </span>
        <div style={{height:20,width:1,background:"#e5e7eb"}}/>
        <button className="about-btn-info" onClick={onAbout} title="About RigCalc Pro">ℹ</button>
      </div>

    </div>
  );
};

const Sidebar = ({active,setActive,g}) => {
  const getStatus = (id) => {
    if(id===1&&g?.glw>0) return "pass";
    if(id===2&&g?.craneUtil>0) return g?.craneUtil>90?"fail":g?.craneUtil>75?"warn":"pass";
    if(id===3&&g?.gbpUtil>0) return g?.gbpUtil>100?"fail":g?.gbpUtil>75?"warn":"pass";
    if(id===4&&g?.riggingUtil>0) return g?.riggingUtil>90?"fail":g?.riggingUtil>75?"warn":"pass";
    if(id===5&&g?.windForce>0) return "pass";
    if(id===6) return null;
    if(id===7) return g?.glw>0?"pass":null;
    return null;
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">Navigation</div>
      {MODULES.map((m,i)=>{
        const status = getStatus(m.id);
        return (
          <div key={m.id} className={`sidebar-item ${active===m.id?"active":""}`}
            style={{"--i":i}} onClick={()=>setActive(m.id)}>
            <span className="sidebar-icon">{m.icon}</span>
            <span className="sidebar-label">{m.label}</span>
            {status && <span className={`sidebar-badge ${status}`}>{status==="pass"?"✓":status==="warn"?"!":"✕"}</span>}
          </div>
        );
      })}
    </div>
  );
};

// ── ROOT APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [activeModule,setActiveModule]=useState(0);
  const [g,setG]=useState(()=>{ const s=loadStore(); return s.g||{}; });
  const [modInputs,setModInputs]=useState(()=>{ const s=loadStore(); return s.modInputs||{}; });
  const [hasUnsaved,setHasUnsaved]=useState(false);
  const [showBackTop,setShowBackTop]=useState(false);
  const [showAbout,setShowAbout]=useState(false);

  // FIX 7: Scroll to top on every module change
  useEffect(()=>{
    const el = document.querySelector('.content');
    if(el) el.scrollTop=0;
    window.scrollTo({top:0,behavior:'instant'});
  },[activeModule]);

  // FIX 7: Back-to-top visibility
  useEffect(()=>{
    const el = document.querySelector('.content');
    if(!el) return;
    const handler = ()=>setShowBackTop(el.scrollTop>300);
    el.addEventListener('scroll',handler);
    return ()=>el.removeEventListener('scroll',handler);
  },[]);

  const updateG = useCallback((patch)=>setG(p=>({...p,...patch})),[]);

  // Persist to localStorage on every change (debounced)
  useEffect(()=>{
    const timer = setTimeout(()=>{ saveStore({g,modInputs}); setHasUnsaved(true); },300);
    return ()=>clearTimeout(timer);
  },[g,modInputs]);

  const liftStatus = useMemo(()=>{
    const {craneUtil=0,gbpUtil=0,riggingUtil=0}=g;
    if(!g.glw||g.glw===0) return "idle";
    if(craneUtil>90||gbpUtil>100||riggingUtil>90) return "fail";
    if(craneUtil>75||gbpUtil>75||riggingUtil>75) return "warn";
    return "pass";
  },[g]);

  const clearAll = () => {
    setG({}); setModInputs({}); localStorage.removeItem(STORE_KEY); setHasUnsaved(false);
  };

  const Comp = COMPS[activeModule]||ModulePlaceholder;

  return (
    <AppCtx.Provider value={{g,updateG,modInputs,setModInputs,hasUnsaved,setHasUnsaved,clearAll}}>
      <style>{CSS}</style>
      <div className="app-root">
        <Topbar liftStatus={liftStatus} hasUnsaved={hasUnsaved} onAbout={()=>setShowAbout(true)} />
        <div className="app-body">
          <Sidebar active={activeModule} setActive={setActiveModule} g={g} />
          <div className="content">
            {activeModule<COMPS.length ? <Comp /> : <ModulePlaceholder id={activeModule} />}
            <RefPanel moduleId={activeModule} />
            <ModuleNavBar activeModule={activeModule} setActiveModule={setActiveModule} />
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderTop:"1px solid #e5e7eb",marginTop:16,background:"#f8f9fa"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontFamily:"'Arial Black',Arial,sans-serif",fontSize:13,fontWeight:900,color:"#1a1a1a",display:"flex",alignItems:"baseline",gap:4}}>
                  <span>RigCalc</span><span style={{color:"#c00000"}}>Pro</span>
                </div>
                <div style={{width:1,height:16,background:"#d1d5db"}}/>
                <div style={{fontFamily:"Arial,sans-serif",fontSize:10,color:"#6b7280",letterSpacing:"0.06em"}}>
                  Precision Engineering For Every Lift &nbsp;·&nbsp; v1.0
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:"#d1d5db",fontSize:10}}>|</span>
                <a href="mailto:Althafsali.p@gmail.com?subject=RigCalc Pro Enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{fontFamily:"Arial,sans-serif",fontSize:11,color:"#4b5563",
                    textDecoration:"none",cursor:"pointer",
                    borderBottom:"1px dotted #9ca3af"}}
                  onMouseOver={e=>{e.target.style.color='#c00000';e.target.style.borderBottomColor='#c00000'}}
                  onMouseOut={e=>{e.target.style.color='#4b5563';e.target.style.borderBottomColor='#9ca3af'}}>
                  Althafsali.p@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        {showAbout && <AboutModal onClose={()=>setShowAbout(false)} />}
        <button className={`btn-back-top ${showBackTop?"visible":""}`}
          onClick={()=>{const el=document.querySelector('.content');if(el)el.scrollTo({top:0,behavior:'smooth'});}}
          title="Back to top">↑</button>
      </div>
    </AppCtx.Provider>
  );
}
