/* =====================================================================
   LoomLine Textile ERP — seed data
   Everything the demo starts with. On first load this is copied into
   browser storage; after that the ERP reads and writes the stored copy.
   Settings → Reset demo data brings this file back.
   ===================================================================== */
window.ERP_SEED = (function () {

  const company = {
    name: "Sri Kaveri Textiles Pvt Ltd",
    unit: "Weaving + Processing",
    gstin: "33AACCS1234K1ZP",
    address: "SIDCO Industrial Estate, Thuvakudi, Tiruchirappalli 620015",
    phone: "+91 431 240 0000",
    email: "works@srikaveritextiles.in",
    fyStart: "2026-04-01",
    state: "Tamil Nadu",
    stateCode: "33",
    bank: { name:"HDFC Bank, Thillai Nagar", ac:"50200041230011", ifsc:"HDFC0000521" },
    terms: "Payment within the agreed credit period. Interest at 18% per annum on overdue amounts.\nGoods once dispatched will not be taken back without written agreement.\nDisputes subject to Tiruchirappalli jurisdiction.",
    branches: ["Unit 1 — Weaving", "Unit 2 — Processing", "Godown — Thuvakudi"]
  };

  const users = [
    { id:"U-01", name:"John Britto",   role:"Director",          email:"john@srikaveritextiles.in",   pin:"1234", roleId:"R-01", active:true },
    { id:"U-02", name:"Varsha R",      role:"Accounts",          email:"varsha@srikaveritextiles.in", pin:"1234", roleId:"R-06", active:true },
    { id:"U-03", name:"Selvam K",      role:"Production",        email:"selvam@srikaveritextiles.in", pin:"1234", roleId:"R-03", active:true },
    { id:"U-04", name:"Meena P",       role:"Quality",           email:"meena@srikaveritextiles.in",  pin:"1234", roleId:"R-04", active:true },
    { id:"U-05", name:"Rajan M",       role:"Stores",            email:"rajan@srikaveritextiles.in",  pin:"1234", roleId:"R-05", active:true }
  ];

  const customers = [
    { id:"C-001", name:"ABC Textiles",        city:"Tiruppur",     gstin:"33AABCA1111C1Z5", contact:"Mohan",   phone:"+91 98430 11111", terms:"30 days", state:"Tamil Nadu", stateCode:"33", credit:2500000, outstanding:845000 },
    { id:"C-002", name:"Vante Noir",          city:"Chennai",      gstin:"33AACCV2222D1Z2", contact:"Anitha",  phone:"+91 98840 22222", terms:"45 days", state:"Tamil Nadu", stateCode:"33", credit:1500000, outstanding:312000 },
    { id:"C-003", name:"Karur Home Linen",    city:"Karur",        gstin:"33AAECK3333E1Z9", contact:"Bala",    phone:"+91 99940 33333", terms:"30 days", state:"Tamil Nadu", stateCode:"33", credit:2000000, outstanding:560000 },
    { id:"C-004", name:"Surat Textile Trading", city:"Surat",      gstin:"24AAFFE4444F1Z1", contact:"Kumar",   phone:"+91 94430 44444", terms:"On invoice", state:"Gujarat", stateCode:"24", credit:800000, outstanding:0 },
    { id:"C-005", name:"Coimbatore Knits",    city:"Coimbatore",   gstin:"33AAGCC5555G1Z7", contact:"Sridhar", phone:"+91 90030 55555", terms:"60 days", state:"Tamil Nadu", stateCode:"33", credit:3000000, outstanding:1180000 },
    { id:"C-006", name:"Madurai Uniforms",    city:"Madurai",      gstin:"33AAHCM6666H1Z4", contact:"Fatima",  phone:"+91 96770 66666", terms:"30 days", state:"Tamil Nadu", stateCode:"33", credit:600000, outstanding:96000 }
  ];

  const suppliers = [
    { id:"S-001", name:"Sri Balaji Spinners",  city:"Rajapalayam", gstin:"33AABBS7777J1Z3", supplies:"Cotton yarn",   contact:"Ravi",    phone:"+91 98940 77777", terms:"30 days", payable:640000 },
    { id:"S-002", name:"Amaravathi Yarns",     city:"Udumalpet",   gstin:"33AABAY8888K1Z8", supplies:"Cotton yarn",   contact:"Prakash", phone:"+91 98420 88888", terms:"45 days", payable:288000 },
    { id:"S-003", name:"Chem Colour India",    city:"Ahmedabad",   gstin:"24AACCC9999L1Z6", supplies:"Dyes, chemicals",contact:"Jignesh",phone:"+91 97250 99999", terms:"15 days", payable:154000 },
    { id:"S-004", name:"PolyPack Solutions",   city:"Trichy",      gstin:"33AAPPS1212M1Z2", supplies:"Packing",       contact:"Senthil", phone:"+91 94860 12121", terms:"On delivery", payable:0 },
    { id:"S-005", name:"Kongu Sizing Works",   city:"Erode",       gstin:"33AAKSW1313N1Z9", supplies:"Sizing, job work",contact:"Murugan",phone:"+91 90474 13131", terms:"30 days", payable:76000 }
  ];

  /* ---------- yarn lots (kg) ---------- */
  const yarn = [
    { id:"Y-1452", count:"40s", type:"Combed cotton", blend:"100% Cotton", shade:"Grey",  supplier:"S-001", recd:"2026-08-02", rate:298, kgIn:4200, kgUsed:3100, rack:"A-01", test:"Pass · CV 2.1%" },
    { id:"Y-1461", count:"30s", type:"Carded cotton", blend:"100% Cotton", shade:"Grey",  supplier:"S-002", recd:"2026-08-05", rate:262, kgIn:3600, kgUsed:2050, rack:"A-02", test:"Pass · CV 2.6%" },
    { id:"Y-1470", count:"60s", type:"Combed cotton", blend:"100% Cotton", shade:"Grey",  supplier:"S-001", recd:"2026-08-09", rate:352, kgIn:1800, kgUsed:420,  rack:"A-03", test:"Pass · CV 1.9%" },
    { id:"Y-1478", count:"20s", type:"PC blend",      blend:"65/35 PC",    shade:"Grey",  supplier:"S-002", recd:"2026-08-11", rate:214, kgIn:5000, kgUsed:3980, rack:"A-04", test:"Pass" },
    { id:"Y-1483", count:"40s", type:"Combed cotton", blend:"100% Cotton", shade:"Grey",  supplier:"S-001", recd:"2026-08-16", rate:305, kgIn:3000, kgUsed:640,  rack:"A-05", test:"Pass · CV 2.0%" },
    { id:"Y-1490", count:"2/40s",type:"Doubled cotton",blend:"100% Cotton",shade:"Grey",  supplier:"S-002", recd:"2026-08-19", rate:388, kgIn:900,  kgUsed:120,  rack:"A-06", test:"Pass" },
    { id:"Y-1495", count:"30s", type:"Viscose",       blend:"100% Viscose",shade:"Grey",  supplier:"S-002", recd:"2026-08-21", rate:246, kgIn:1200, kgUsed:0,    rack:"A-07", test:"Awaiting test" },
    { id:"Y-1499", count:"40s", type:"Combed cotton", blend:"100% Cotton", shade:"Grey",  supplier:"S-001", recd:"2026-08-24", rate:301, kgIn:2400, kgUsed:0,    rack:"A-08", test:"Awaiting test" }
  ];

  /* ---------- fabric masters ---------- */
  const fabrics = [
    { id:"F-001", name:"Poplin 40x40",     warp:"40s", weft:"40s", gsm:110, width:60, weave:"Plain",  comp:"100% Cotton", finish:"Bleached",  shrink:"2.5%", rate:96, hsn:"5208" },
    { id:"F-002", name:"Twill 20x20",      warp:"20s", weft:"20s", gsm:180, width:58, weave:"Twill",  comp:"65/35 PC",    finish:"Dyed",      shrink:"3.0%", rate:128, hsn:"5208" },
    { id:"F-003", name:"Voile 60x60",      warp:"60s", weft:"60s", gsm:78,  width:44, weave:"Plain",  comp:"100% Cotton", finish:"Mercerised",shrink:"2.0%", rate:104, hsn:"5208" },
    { id:"F-004", name:"Cambric 30x30",    warp:"30s", weft:"30s", gsm:120, width:63, weave:"Plain",  comp:"100% Cotton", finish:"Dyed",      shrink:"2.8%", rate:88, hsn:"5208" },
    { id:"F-005", name:"Oxford 2/40x20",   warp:"2/40s",weft:"20s",gsm:165, width:58, weave:"Oxford", comp:"100% Cotton", finish:"Soft",      shrink:"3.2%", rate:142, hsn:"5208" },
    { id:"F-006", name:"Rayon Challis",    warp:"30s", weft:"30s", gsm:95,  width:56, weave:"Plain",  comp:"100% Viscose",finish:"Printed",   shrink:"3.5%", rate:112, hsn:"5516" }
  ];

  /* ---------- machines ---------- */
  const machines = [
    { id:"L-01", name:"Loom 01", type:"Airjet",  make:"Toyota JAT810",  installed:"2019-06-12", status:"Running",   target:1000, actual:950, downtime:12, operator:"Selvam K",  shift:"A" },
    { id:"L-02", name:"Loom 02", type:"Airjet",  make:"Toyota JAT810",  installed:"2019-06-12", status:"Running",   target:1000, actual:890, downtime:26, operator:"Mani S",    shift:"A" },
    { id:"L-03", name:"Loom 03", type:"Rapier",  make:"Picanol OptiMax",installed:"2020-11-03", status:"Running",   target:1000, actual:930, downtime:18, operator:"Arun P",    shift:"A" },
    { id:"L-08", name:"Loom 08", type:"Airjet",  make:"Toyota JAT710",  installed:"2018-02-20", status:"Running",   target:1000, actual:962, downtime:8,  operator:"Kavitha R", shift:"A" },
    { id:"L-12", name:"Loom 12", type:"Rapier",  make:"Somet Thema11",  installed:"2016-09-15", status:"Running",   target:1000, actual:742, downtime:45, operator:"Vinoth D",  shift:"A" },
    { id:"L-18", name:"Loom 18", type:"Rapier",  make:"Somet Thema11",  installed:"2016-09-15", status:"Breakdown", target:1000, actual:0,   downtime:480,operator:"—",         shift:"A" },
    { id:"D-04", name:"Jet dyeing 4", type:"Soft flow", make:"Fongs ALLFIT", installed:"2021-03-08", status:"Running", target:600, actual:560, downtime:0, operator:"Ismail K", shift:"A" },
    { id:"D-05", name:"Jet dyeing 5", type:"Soft flow", make:"Fongs ALLFIT", installed:"2021-03-08", status:"Maintenance", target:600, actual:0, downtime:240, operator:"—",     shift:"A" },
    { id:"P-01", name:"Rotary print 1", type:"Rotary", make:"Stork RD-IV", installed:"2022-05-19", status:"Running", target:2400, actual:2180, downtime:20, operator:"Ismail K", shift:"A" },
    { id:"P-02", name:"Rotary print 2", type:"Rotary", make:"Stork RD-IV", installed:"2022-05-19", status:"Idle",    target:2400, actual:0,    downtime:0,  operator:"—",        shift:"A" }
  ];

  /* ---------- sales orders ---------- */
  const salesOrders = [
    { id:"SO-1025", date:"2026-08-04", customer:"C-001", fabric:"F-001", qty:20000, rate:96,  due:"2026-09-05", produced:14200, passed:13600, packed:11800, dispatched:9000, status:"In production" },
    { id:"SO-1026", date:"2026-08-06", customer:"C-003", fabric:"F-004", qty:12000, rate:88,  due:"2026-09-10", produced:9600,  passed:9400,  packed:8200,  dispatched:8200, status:"In production" },
    { id:"SO-1027", date:"2026-08-08", customer:"C-002", fabric:"F-005", qty:6000,  rate:142, due:"2026-09-02", produced:6000,  passed:5820,  packed:5820,  dispatched:5820, status:"Completed" },
    { id:"SO-1028", date:"2026-08-12", customer:"C-005", fabric:"F-002", qty:25000, rate:128, due:"2026-09-20", produced:7400,  passed:7100,  packed:5000,  dispatched:2500, status:"In production" },
    { id:"SO-1029", date:"2026-08-18", customer:"C-006", fabric:"F-003", qty:4000,  rate:104, due:"2026-09-14", produced:0,     passed:0,     packed:0,     dispatched:0,    status:"Confirmed" },
    { id:"SO-1030", date:"2026-08-22", customer:"C-004", fabric:"F-006", qty:9000,  rate:112, due:"2026-09-28", produced:0,     passed:0,     packed:0,     dispatched:0,    status:"Confirmed" },
    { id:"SO-1031", date:"2026-08-25", customer:"C-001", fabric:"F-001", qty:15000, rate:98,  due:"2026-10-05", produced:0,     passed:0,     packed:0,     dispatched:0,    status:"Draft" }
  ];

  const quotations = [
    { id:"QT-0416", date:"2026-08-20", customer:"C-005", gstMode:"gst", gstRate:5, validity:"2026-09-20",
      delivery:"30 days from confirmed order", transport:"Ex-works Trichy", discount:12000, freight:0,
      status:"Sent", notes:"Shade band to be approved before bulk.",
      items:[{ desc:"Twill 20x20 · 180 GSM · 58\"", hsn:"5208", qty:30000, unit:"m", rate:126 }] },
    { id:"QT-0417", date:"2026-08-23", customer:"C-003", gstMode:"gst", gstRate:5, validity:"2026-09-23",
      delivery:"21 days", transport:"Freight paid to Karur", discount:0, freight:8500,
      status:"Under discussion", notes:"",
      items:[{ desc:"Poplin 40x40 · 110 GSM · 60\"", hsn:"5208", qty:18000, unit:"m", rate:97 },
             { desc:"Cambric 30x30 · 120 GSM · 63\"", hsn:"5208", qty:6000, unit:"m", rate:89 }] },
    { id:"QT-0418", date:"2026-08-25", customer:"C-006", gstMode:"none", gstRate:0, validity:"2026-09-25",
      delivery:"15 days", transport:"Buyer's vehicle", discount:0, freight:0,
      status:"Sent", notes:"Quoted without tax at buyer's request — bill of supply.",
      items:[{ desc:"Cambric 30x30 · 120 GSM · 63\"", hsn:"5208", qty:5000, unit:"m", rate:90 }] }
  ];

  /* ---------- production ---------- */
  const prodOrders = [
    { id:"PO-00125", so:"SO-1025", fabric:"F-001", qty:20000, made:14200, start:"2026-08-06", due:"2026-08-31", machines:["L-08","L-12"], yarnLot:"Y-1452", status:"Running" },
    { id:"PO-00126", so:"SO-1026", fabric:"F-004", qty:12000, made:9600,  start:"2026-08-09", due:"2026-09-04", machines:["L-01","L-02"], yarnLot:"Y-1461", status:"Running" },
    { id:"PO-00127", so:"SO-1027", fabric:"F-005", qty:6000,  made:6000,  start:"2026-08-10", due:"2026-08-25", machines:["L-03"],        yarnLot:"Y-1490", status:"Completed" },
    { id:"PO-00128", so:"SO-1028", fabric:"F-002", qty:25000, made:7400,  start:"2026-08-14", due:"2026-09-15", machines:["L-01","L-03"], yarnLot:"Y-1478", status:"Running" },
    { id:"PO-00129", so:"SO-1029", fabric:"F-003", qty:4000,  made:0,     start:"2026-08-28", due:"2026-09-10", machines:["L-08"],        yarnLot:"Y-1470", status:"Planned" }
  ];

  /* daily production entries, most recent first */
  const prodEntries = [
    { id:"PE-2211", date:"2026-08-25", po:"PO-00125", machine:"L-08", shift:"A", metres:962, operator:"Kavitha R", downtime:8 },
    { id:"PE-2212", date:"2026-08-25", po:"PO-00125", machine:"L-12", shift:"A", metres:742, operator:"Vinoth D",  downtime:45 },
    { id:"PE-2213", date:"2026-08-25", po:"PO-00126", machine:"L-01", shift:"A", metres:950, operator:"Selvam K",  downtime:12 },
    { id:"PE-2214", date:"2026-08-25", po:"PO-00126", machine:"L-02", shift:"A", metres:890, operator:"Mani S",    downtime:26 },
    { id:"PE-2215", date:"2026-08-25", po:"PO-00128", machine:"L-03", shift:"A", metres:930, operator:"Arun P",    downtime:18 },
    { id:"PE-2205", date:"2026-08-24", po:"PO-00125", machine:"L-08", shift:"A", metres:940, operator:"Kavitha R", downtime:15 },
    { id:"PE-2206", date:"2026-08-24", po:"PO-00125", machine:"L-12", shift:"A", metres:810, operator:"Vinoth D",  downtime:38 },
    { id:"PE-2207", date:"2026-08-24", po:"PO-00126", machine:"L-01", shift:"A", metres:965, operator:"Selvam K",  downtime:6 },
    { id:"PE-2208", date:"2026-08-24", po:"PO-00128", machine:"L-03", shift:"A", metres:905, operator:"Arun P",    downtime:22 }
  ];

  /* ---------- rolls ---------- */
  const rolls = [
    { id:"R-00251", po:"PO-00125", fabric:"F-001", machine:"L-08", yarnLot:"Y-1452", metres:125, gsm:110, width:60, grade:"A", points:8,  date:"2026-08-18", rack:"B-12", status:"In stock",  so:"SO-1025" },
    { id:"R-00252", po:"PO-00125", fabric:"F-001", machine:"L-12", yarnLot:"Y-1452", metres:118, gsm:112, width:60, grade:"B", points:26, date:"2026-08-18", rack:"QC hold", status:"On hold", so:"SO-1025" },
    { id:"R-00253", po:"PO-00125", fabric:"F-001", machine:"L-08", yarnLot:"Y-1452", metres:130, gsm:110, width:60, grade:"A", points:6,  date:"2026-08-19", rack:"B-12", status:"Dispatched", so:"SO-1025" },
    { id:"R-00254", po:"PO-00125", fabric:"F-001", machine:"L-12", yarnLot:"Y-1452", metres:122, gsm:111, width:60, grade:"A", points:11, date:"2026-08-19", rack:"B-13", status:"In stock",  so:"SO-1025" },
    { id:"R-00255", po:"PO-00126", fabric:"F-004", machine:"L-01", yarnLot:"Y-1461", metres:140, gsm:120, width:63, grade:"A", points:5,  date:"2026-08-20", rack:"B-14", status:"Dispatched", so:"SO-1026" },
    { id:"R-00256", po:"PO-00126", fabric:"F-004", machine:"L-02", yarnLot:"Y-1461", metres:136, gsm:121, width:63, grade:"A", points:9,  date:"2026-08-20", rack:"B-14", status:"In stock",  so:"SO-1026" },
    { id:"R-00257", po:"PO-00126", fabric:"F-004", machine:"L-02", yarnLot:"Y-1461", metres:128, gsm:119, width:63, grade:"B", points:22, date:"2026-08-21", rack:"QC hold", status:"On hold", so:"SO-1026" },
    { id:"R-00258", po:"PO-00128", fabric:"F-002", machine:"L-03", yarnLot:"Y-1478", metres:96,  gsm:180, width:58, grade:"A", points:7,  date:"2026-08-21", rack:"B-20", status:"In stock",  so:"SO-1028" },
    { id:"R-00259", po:"PO-00128", fabric:"F-002", machine:"L-01", yarnLot:"Y-1478", metres:104, gsm:181, width:58, grade:"A", points:10, date:"2026-08-22", rack:"B-20", status:"In stock",  so:"SO-1028" },
    { id:"R-00260", po:"PO-00128", fabric:"F-002", machine:"L-03", yarnLot:"Y-1478", metres:99,  gsm:179, width:58, grade:"A", points:4,  date:"2026-08-22", rack:"B-21", status:"In stock",  so:"SO-1028" },
    { id:"R-00261", po:"PO-00125", fabric:"F-001", machine:"L-08", yarnLot:"Y-1483", metres:127, gsm:110, width:60, grade:"A", points:9,  date:"2026-08-23", rack:"B-13", status:"In stock",  so:"SO-1025" },
    { id:"R-00262", po:"PO-00125", fabric:"F-001", machine:"L-12", yarnLot:"Y-1483", metres:115, gsm:113, width:60, grade:"C", points:41, date:"2026-08-23", rack:"QC hold", status:"Rejected", so:"SO-1025" },
    { id:"R-00263", po:"PO-00126", fabric:"F-004", machine:"L-01", yarnLot:"Y-1461", metres:142, gsm:120, width:63, grade:"A", points:6,  date:"2026-08-24", rack:"B-15", status:"In stock",  so:"SO-1026" },
    { id:"R-00318", po:"PO-00127", fabric:"F-005", machine:"L-03", yarnLot:"Y-1490", metres:96,  gsm:165, width:58, grade:"A", points:5,  date:"2026-08-21", rack:"Dyer",  status:"At job work", so:"SO-1027", dyeBatch:"DB-00412" }
  ];

  /* ---------- quality ---------- */
  const inspections = [
    { id:"QC-0771", roll:"R-00251", date:"2026-08-18", inspector:"Meena P", points:8,  grade:"A", defects:[{type:"Slub",n:2},{type:"Oil mark",n:1}] },
    { id:"QC-0772", roll:"R-00252", date:"2026-08-18", inspector:"Meena P", points:26, grade:"B", defects:[{type:"Colour variation",n:5},{type:"Broken yarn",n:3},{type:"Slub",n:2}] },
    { id:"QC-0773", roll:"R-00254", date:"2026-08-19", inspector:"Meena P", points:11, grade:"A", defects:[{type:"Slub",n:3},{type:"Missing yarn",n:1}] },
    { id:"QC-0774", roll:"R-00257", date:"2026-08-21", inspector:"Meena P", points:22, grade:"B", defects:[{type:"Stain",n:4},{type:"Weaving defect",n:2}] },
    { id:"QC-0775", roll:"R-00262", date:"2026-08-23", inspector:"Meena P", points:41, grade:"C", defects:[{type:"Hole",n:3},{type:"Broken yarn",n:6},{type:"Weaving defect",n:4}] },
    { id:"QC-0776", roll:"R-00261", date:"2026-08-23", inspector:"Meena P", points:9,  grade:"A", defects:[{type:"Slub",n:3}] }
  ];

  const defectTypes = ["Hole","Stain","Slub","Missing yarn","Broken yarn","Oil mark","Colour variation","Weaving defect","Printing defect","Selvedge fault"];

  /* ---------- dyeing ---------- */
  const recipes = [
    { id:"RC-NAVY-r3", shade:"Navy blue", rev:3, temp:130, mins:60, items:[{n:"Reactive Navy HER",q:"4.2%"},{n:"Reactive Black B",q:"0.8%"},{n:"Glauber salt",q:"70 g/l"},{n:"Soda ash",q:"20 g/l"},{n:"Levelling agent",q:"1 g/l"}] },
    { id:"RC-RED-r2",  shade:"Madder red",rev:2, temp:120, mins:55, items:[{n:"Reactive Red ME4BL",q:"3.6%"},{n:"Glauber salt",q:"60 g/l"},{n:"Soda ash",q:"18 g/l"}] },
    { id:"RC-BEIGE-r1",shade:"Beige",     rev:1, temp:110, mins:45, items:[{n:"Reactive Yellow MERL",q:"0.9%"},{n:"Reactive Red ME4BL",q:"0.3%"},{n:"Glauber salt",q:"40 g/l"},{n:"Soda ash",q:"12 g/l"}] }
  ];

  const dyeBatches = [
    { id:"DB-00412", date:"2026-08-21", fabric:"F-005", kg:240, shade:"Navy blue", recipe:"RC-NAVY-r3", machine:"D-04", temp:130, mins:60, water:4800, operator:"Ismail K", status:"Completed", loss:3.3 },
    { id:"DB-00413", date:"2026-08-23", fabric:"F-002", kg:310, shade:"Madder red",recipe:"RC-RED-r2",  machine:"D-04", temp:120, mins:55, water:6100, operator:"Ismail K", status:"Completed", loss:2.8 },
    { id:"DB-00414", date:"2026-08-25", fabric:"F-004", kg:280, shade:"Beige",     recipe:"RC-BEIGE-r1",machine:"D-04", temp:110, mins:45, water:5600, operator:"Ismail K", status:"Running",   loss:0 },
    { id:"DB-00415", date:"2026-08-26", fabric:"F-002", kg:300, shade:"Navy blue", recipe:"RC-NAVY-r3", machine:"D-05", temp:130, mins:60, water:0,    operator:"—",        status:"Planned",   loss:0 }
  ];

  /* ---------- job work ---------- */
  const jobWorks = [
    { id:"JW-0087", type:"Dyeing",    vendor:"S-005", date:"2026-08-19", process:"Reactive dyeing navy", sentKg:240, recdKg:232, rate:52, due:"2026-08-24", status:"Received" },
    { id:"JW-0088", type:"Sizing",    vendor:"S-005", date:"2026-08-21", process:"Warp sizing 40s",      sentKg:1800,recdKg:1782,rate:14, due:"2026-08-25", status:"Received" },
    { id:"JW-0089", type:"Printing",  vendor:"S-003", date:"2026-08-24", process:"Rotary print 4 colour",sentKg:420, recdKg:0,   rate:38, due:"2026-08-31", status:"Sent" },
    { id:"JW-0090", type:"Finishing", vendor:"S-005", date:"2026-08-25", process:"Compacting + soft",    sentKg:610, recdKg:0,   rate:11, due:"2026-09-01", status:"Sent" }
  ];

  /* ---------- purchase ---------- */
  const purchaseOrders = [
    { id:"PU-0331", date:"2026-08-01", supplier:"S-001", item:"40s combed cotton", qty:4200, unit:"kg", rate:298, due:"2026-08-04", status:"Received", grn:"GRN-0290" },
    { id:"PU-0332", date:"2026-08-03", supplier:"S-002", item:"30s carded cotton", qty:3600, unit:"kg", rate:262, due:"2026-08-06", status:"Received", grn:"GRN-0291" },
    { id:"PU-0333", date:"2026-08-14", supplier:"S-003", item:"Reactive Navy HER", qty:180,  unit:"kg", rate:640, due:"2026-08-20", status:"Received", grn:"GRN-0296" },
    { id:"PU-0334", date:"2026-08-20", supplier:"S-001", item:"40s combed cotton", qty:2400, unit:"kg", rate:301, due:"2026-08-24", status:"Received", grn:"GRN-0299" },
    { id:"PU-0335", date:"2026-08-24", supplier:"S-004", item:"Poly bags + cartons",qty:5000, unit:"nos",rate:14,  due:"2026-08-29", status:"Ordered",  grn:"" },
    { id:"PU-0336", date:"2026-08-25", supplier:"S-002", item:"30s viscose",       qty:1500, unit:"kg", rate:246, due:"2026-09-01", status:"Ordered",  grn:"" }
  ];

  /* ---------- chemicals & packing stock ---------- */
  const stores = [
    { id:"CH-01", name:"Reactive Navy HER", group:"Dye",      unit:"kg",  qty:142,  reorder:60,  rate:640 },
    { id:"CH-02", name:"Reactive Red ME4BL",group:"Dye",      unit:"kg",  qty:38,   reorder:50,  rate:710 },
    { id:"CH-03", name:"Glauber salt",      group:"Chemical", unit:"kg",  qty:2400, reorder:800, rate:14 },
    { id:"CH-04", name:"Soda ash",          group:"Chemical", unit:"kg",  qty:610,  reorder:400, rate:32 },
    { id:"CH-05", name:"Softener SIL-40",   group:"Chemical", unit:"kg",  qty:180,  reorder:120, rate:96 },
    { id:"PK-01", name:"Poly bags 60in",    group:"Packing",  unit:"nos", qty:3200, reorder:1500,rate:9 },
    { id:"PK-02", name:"Cartons 5-ply",     group:"Packing",  unit:"nos", qty:480,  reorder:600, rate:42 }
  ];

  /* ---------- dispatch & invoices ---------- */
  const dispatches = [
    { id:"DC-0455", date:"2026-08-20", so:"SO-1027", customer:"C-002", rolls:["R-00318"], metres:5820, vehicle:"TN45 BX 9012", transporter:"VRL Logistics", eway:"381004556721", status:"Delivered" },
    { id:"DC-0456", date:"2026-08-22", so:"SO-1025", customer:"C-001", rolls:["R-00253"], metres:9000, vehicle:"TN45 AZ 4471", transporter:"Trichy Roadways", eway:"381004561902", status:"Delivered" },
    { id:"DC-0457", date:"2026-08-24", so:"SO-1026", customer:"C-003", rolls:["R-00255"], metres:8200, vehicle:"TN47 CD 3388", transporter:"KM Carriers",     eway:"381004566318", status:"In transit" },
    { id:"DC-0458", date:"2026-08-26", so:"SO-1028", customer:"C-005", rolls:[],          metres:2500, vehicle:"TN37 EF 7712", transporter:"VRL Logistics",  eway:"381004571144", status:"Loading" }
  ];

  const invoices = [
    { id:"IN-2026-0311", date:"2026-08-20", type:"Tax invoice", customer:"C-002", so:"SO-1027", dc:"DC-0455",
      gstMode:"gst", gstRate:5, discount:0, freight:6200, paid:514000, status:"Part paid", notes:"",
      items:[{ desc:"Oxford 2/40x20 · 165 GSM · 58\"", hsn:"5208", qty:5820, unit:"m", rate:142 }] },
    { id:"IN-2026-0312", date:"2026-08-22", type:"Tax invoice", customer:"C-001", so:"SO-1025", dc:"DC-0456",
      gstMode:"gst", gstRate:5, discount:0, freight:0, paid:0, status:"Unpaid", notes:"",
      items:[{ desc:"Poplin 40x40 · 110 GSM · 60\"", hsn:"5208", qty:9000, unit:"m", rate:96 }] },
    { id:"IN-2026-0313", date:"2026-08-24", type:"Tax invoice", customer:"C-003", so:"SO-1026", dc:"DC-0457",
      gstMode:"gst", gstRate:5, discount:4000, freight:0, paid:200000, status:"Part paid", notes:"",
      items:[{ desc:"Cambric 30x30 · 120 GSM · 63\"", hsn:"5208", qty:8200, unit:"m", rate:88 }] },
    { id:"IN-2026-0308", date:"2026-08-08", type:"Tax invoice", customer:"C-002", so:"SO-1027", dc:"",
      gstMode:"gst", gstRate:5, discount:0, freight:0, paid:298200, status:"Paid", notes:"",
      items:[{ desc:"Oxford 2/40x20 · 165 GSM · 58\"", hsn:"5208", qty:2000, unit:"m", rate:142 }] },
    { id:"IN-2026-0309", date:"2026-08-14", type:"Bill of supply", customer:"C-006", so:"", dc:"",
      gstMode:"none", gstRate:0, discount:0, freight:0, paid:0, status:"Unpaid",
      notes:"Supplied without tax at the buyer's request.",
      items:[{ desc:"Cambric 30x30 · 120 GSM · 63\"", hsn:"5208", qty:1200, unit:"m", rate:90 }] }
  ];

  /* ---------- HR ---------- */
  const employees = [
    { id:"E-101", name:"Selvam K",  dept:"Weaving",   role:"Loom operator",  shift:"A", doj:"2019-07-01", wage:780, present:24 },
    { id:"E-102", name:"Mani S",    dept:"Weaving",   role:"Loom operator",  shift:"A", doj:"2020-01-15", wage:760, present:23 },
    { id:"E-103", name:"Arun P",    dept:"Weaving",   role:"Loom operator",  shift:"B", doj:"2021-03-22", wage:740, present:25 },
    { id:"E-104", name:"Kavitha R", dept:"Weaving",   role:"Loom operator",  shift:"A", doj:"2018-11-05", wage:800, present:26 },
    { id:"E-105", name:"Vinoth D",  dept:"Weaving",   role:"Loom operator",  shift:"C", doj:"2022-06-18", wage:720, present:22 },
    { id:"E-106", name:"Meena P",   dept:"Quality",   role:"Inspector",      shift:"A", doj:"2020-09-09", wage:860, present:26 },
    { id:"E-107", name:"Rajan M",   dept:"Stores",    role:"Storekeeper",    shift:"A", doj:"2017-04-11", wage:840, present:25 },
    { id:"E-108", name:"Ismail K",  dept:"Processing",role:"Dyeing operator",shift:"B", doj:"2021-12-01", wage:820, present:24 }
  ];

  /* ---------- 30-day production history for charts ---------- */
  const history = (function () {
    const out = []; let d = new Date("2026-07-28");
    const base = [88000, 92000, 96000, 84000, 91000, 78000, 0];
    for (let i = 0; i < 30; i++) {
      const day = new Date(d.getTime() + i * 86400000);
      const dow = day.getDay();
      const metres = dow === 0 ? 0 : Math.round(base[i % base.length] * (0.9 + ((i * 37) % 20) / 100));
      out.push({ date: day.toISOString().slice(0, 10), metres, rejected: Math.round(metres * (0.015 + ((i * 13) % 18) / 1000)) });
    }
    return out;
  })();

  const modules = [
    { key:"sales",     name:"Sales & orders",       on:true },
    { key:"purchase",  name:"Purchase & GRN",       on:true },
    { key:"inventory", name:"Inventory & rolls",    on:true },
    { key:"production",name:"Production planning",  on:true },
    { key:"weaving",   name:"Weaving & looms",      on:true },
    { key:"dyeing",    name:"Dyeing & recipes",     on:true },
    { key:"quality",   name:"Quality control",      on:true },
    { key:"jobwork",   name:"Job work",             on:true },
    { key:"dispatch",  name:"Dispatch & invoicing", on:true },
    { key:"hr",        name:"HR & attendance",      on:true },
    { key:"printing",  name:"Printing",             on:false },
    { key:"garment",   name:"Garment manufacturing",on:false },
    { key:"portal",    name:"Customer portal",      on:false },
    { key:"iot",       name:"IoT machine capture",  on:false }
  ];


  /* ---------- roles & permissions ---------- */
  const modulesList = [
    { key:"dashboard",    name:"Dashboard",            group:"Overview" },
    { key:"sales",        name:"Sales orders",         group:"Sell" },
    { key:"quotations",   name:"Quotations",           group:"Sell" },
    { key:"invoices",     name:"Invoices",             group:"Sell" },
    { key:"dispatch",     name:"Dispatch challans",    group:"Sell" },
    { key:"finance",      name:"Finance",              group:"Sell" },
    { key:"production",   name:"Production",           group:"Make" },
    { key:"looms",        name:"Loom board",           group:"Make" },
    { key:"dyeing",       name:"Dyeing",               group:"Make" },
    { key:"printing",     name:"Printing",             group:"Make" },
    { key:"garment",      name:"Garment",              group:"Make" },
    { key:"quality",      name:"Quality control",      group:"Make" },
    { key:"jobwork",      name:"Job work",             group:"Make" },
    { key:"maintenance",  name:"Maintenance",          group:"Make" },
    { key:"inventory",    name:"Inventory & rolls",    group:"Stock" },
    { key:"traceability", name:"Traceability",         group:"Stock" },
    { key:"purchase",     name:"Purchase & GRN",       group:"Stock" },
    { key:"hr",           name:"People & payroll",     group:"Manage" },
    { key:"masters",      name:"Masters",              group:"Manage" },
    { key:"reports",      name:"Reports",              group:"Manage" },
    { key:"users",        name:"Users & permissions",  group:"Manage" },
    { key:"settings",     name:"Settings",             group:"Manage" }
  ];

  const all = modulesList.map(m => m.key);
  const roles = [
    { id:"R-01", name:"Director",  note:"Everything, including users and permissions", perms: all.slice() },
    { id:"R-02", name:"Manager",   note:"Runs the plant, cannot change users",
      perms: all.filter(k => k !== "users" && k !== "settings") },
    { id:"R-03", name:"Production",note:"Shop floor: orders, machines, processes",
      perms:["dashboard","production","looms","dyeing","printing","garment","jobwork","maintenance","quality","inventory","traceability"] },
    { id:"R-04", name:"Quality",   note:"Inspection and traceability only",
      perms:["dashboard","quality","traceability","inventory"] },
    { id:"R-05", name:"Stores",    note:"Material in and out",
      perms:["dashboard","inventory","purchase","traceability","jobwork","dispatch"] },
    { id:"R-06", name:"Accounts",  note:"Money, orders and reports",
      perms:["dashboard","sales","quotations","invoices","dispatch","finance","purchase","hr","reports"] }
  ];

  /* ---------- printing ---------- */
  const designs = [
    { id:"DS-041", name:"Kalamkari Vine", colours:4, screens:4, repeat:"64 cm", customer:"C-002", status:"Approved", artwork:"kalamkari-vine.ai" },
    { id:"DS-042", name:"Micro Dot",      colours:2, screens:2, repeat:"12 cm", customer:"C-003", status:"Approved", artwork:"micro-dot.ai" },
    { id:"DS-043", name:"Palm Stripe",    colours:3, screens:3, repeat:"48 cm", customer:"C-005", status:"Sample sent", artwork:"palm-stripe.ai" },
    { id:"DS-044", name:"Block Floral",   colours:5, screens:5, repeat:"72 cm", customer:"C-002", status:"Awaiting approval", artwork:"block-floral.ai" }
  ];
  const printJobs = [
    { id:"PJ-0210", date:"2026-08-22", design:"DS-041", fabric:"F-006", metres:2400, machine:"P-01", rate:22, operator:"Ismail K", status:"Completed", wastage:38 },
    { id:"PJ-0211", date:"2026-08-24", design:"DS-042", fabric:"F-004", metres:1800, machine:"P-01", rate:14, operator:"Ismail K", status:"Running",   wastage:0 },
    { id:"PJ-0212", date:"2026-08-26", design:"DS-043", fabric:"F-006", metres:3200, machine:"P-02", rate:19, operator:"—",        status:"Planned",   wastage:0 }
  ];

  /* ---------- garment ---------- */
  const styles = [
    { id:"ST-118", name:"Men's oxford shirt", buyer:"C-002", fabric:"F-005", sizes:"S–XXL", smv:18.5, rate:410, sample:"Approved" },
    { id:"ST-119", name:"School uniform shirt", buyer:"C-006", fabric:"F-004", sizes:"24–40", smv:12.0, rate:265, sample:"Approved" },
    { id:"ST-120", name:"Ladies' A-line dress", buyer:"C-002", fabric:"F-006", sizes:"XS–XL", smv:26.0, rate:640, sample:"In development" }
  ];
  const cutLots = [
    { id:"CL-0331", date:"2026-08-21", style:"ST-118", fabricM:1840, layers:52, marker:"92.4%", cutPcs:1180, wastage:5.6, bundles:24 },
    { id:"CL-0332", date:"2026-08-24", style:"ST-119", fabricM:2260, layers:64, marker:"94.1%", cutPcs:2400, wastage:4.2, bundles:40 }
  ];
  const stitchLines = [
    { id:"LN-01", style:"ST-118", operators:28, target:900, actual:812, hours:8, defects:19, status:"Running" },
    { id:"LN-02", style:"ST-119", operators:32, target:1400, actual:1355, hours:8, defects:24, status:"Running" },
    { id:"LN-03", style:"—",      operators:0,  target:0,    actual:0,    hours:0, defects:0,  status:"Idle" }
  ];

  /* ---------- maintenance ---------- */
  const maintenance = [
    { id:"MT-0155", machine:"L-18", type:"Breakdown",  date:"2026-08-26", reported:"Vinoth D", fault:"Rapier tape snapped", technician:"Murali S", downtime:480, cost:14500, parts:"Rapier tape, guide", status:"Open" },
    { id:"MT-0154", machine:"D-05", type:"Preventive", date:"2026-08-25", reported:"Schedule", fault:"Quarterly pump service", technician:"Fongs service", downtime:240, cost:8200, parts:"Seal kit", status:"In progress" },
    { id:"MT-0153", machine:"L-12", type:"Breakdown",  date:"2026-08-23", reported:"Vinoth D", fault:"Weft feeler misreading", technician:"Murali S", downtime:95, cost:2400, parts:"Feeler sensor", status:"Closed" },
    { id:"MT-0152", machine:"L-02", type:"Preventive", date:"2026-08-18", reported:"Schedule", fault:"Monthly lubrication", technician:"In-house", downtime:45, cost:900, parts:"—", status:"Closed" }
  ];
  const maintSchedule = [
    { machine:"L-01", task:"Monthly lubrication",   every:"30 days", last:"2026-08-04", next:"2026-09-03" },
    { machine:"L-08", task:"Reed and heald check",  every:"60 days", last:"2026-07-14", next:"2026-09-12" },
    { machine:"L-12", task:"Rapier timing check",   every:"45 days", last:"2026-07-20", next:"2026-09-03" },
    { machine:"D-04", task:"Pump and seal service", every:"90 days", last:"2026-06-10", next:"2026-09-08" },
    { machine:"P-01", task:"Squeegee replacement",  every:"30 days", last:"2026-08-10", next:"2026-09-09" }
  ];

  /* ---------- attendance ---------- */
  const attendance = [
    { date:"2026-08-26", shift:"A", present:38, absent:4, overtime:12 },
    { date:"2026-08-25", shift:"A", present:40, absent:2, overtime:8 },
    { date:"2026-08-25", shift:"B", present:36, absent:6, overtime:14 },
    { date:"2026-08-24", shift:"A", present:39, absent:3, overtime:6 },
    { date:"2026-08-24", shift:"B", present:37, absent:5, overtime:10 }
  ];

  /* ---------- finance ---------- */
  const expenses = [
    { id:"EX-0451", date:"2026-08-25", head:"Power",      note:"TANGEDCO monthly demand + energy", amount:684000, mode:"NEFT" },
    { id:"EX-0452", date:"2026-08-24", head:"Wages",      note:"Weekly wage payout, weaving",      amount:212000, mode:"Cash" },
    { id:"EX-0453", date:"2026-08-22", head:"Transport",  note:"Inward yarn freight",              amount:38400,  mode:"UPI" },
    { id:"EX-0454", date:"2026-08-20", head:"Maintenance",note:"Rapier spares, Loom 12",           amount:24500,  mode:"NEFT" },
    { id:"EX-0455", date:"2026-08-18", head:"Job work",   note:"Sizing charges, Kongu",            amount:76000,  mode:"NEFT" },
    { id:"EX-0456", date:"2026-08-15", head:"Water",      note:"Tanker supply, processing",        amount:41000,  mode:"Cash" },
    { id:"EX-0457", date:"2026-08-12", head:"Office",     note:"Stationery, internet, phone",      amount:18600,  mode:"UPI" }
  ];
  const costHeads = [
    { head:"Yarn",        perMetre:38.4 },
    { head:"Sizing",      perMetre:2.1 },
    { head:"Weaving wages",perMetre:9.6 },
    { head:"Power",       perMetre:11.2 },
    { head:"Processing",  perMetre:14.8 },
    { head:"Packing",     perMetre:1.9 },
    { head:"Overheads",   perMetre:6.4 }
  ];

  return { company, users, customers, suppliers, yarn, fabrics, machines, salesOrders, quotations,
           prodOrders, prodEntries, rolls, inspections, defectTypes, recipes, dyeBatches, jobWorks,
           purchaseOrders, stores, dispatches, invoices, employees, history, modules, modulesList, roles, designs, printJobs, styles, cutLots,
           stitchLines, maintenance, maintSchedule, attendance, expenses, costHeads };
})();
