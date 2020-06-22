window.fut == false;
let kor = [];
var seged = 0;
var osszeg = 0;
let mpTomb = [];
var elozoMp = 0;
var elozoKor = 0;
var elozoOra = 0;
var elozoPerc = 0;
var mpEzredbe = 0;
var elozoEzred = 0;
var oraEzredbe = 0;
var lapSzamlalo = 0;
var legrovidebb = 0;
var mpSzamlalo = 00;
var percEzredbe = 0;
var oraSzamlalo = 00;
var percSzamlalo = 00;
var ezredSzamlalo = 00;
let szetFaragottMp = [];
let szetFaragottLap = [];
let szetFaragottOra = [];
let szetFaragottPerc = [];
let szetFaragottEzred = [];
var adatok = [mpSzamlalo, percSzamlalo, oraSzamlalo, ezredSzamlalo];

var maximum = 0;
var minimum = 0;

var probahosszabb = 0;
var probarovidebb = 0;

function start() {
  window.fut = true;
  setInterval(function() {

    if (window.fut == false) {
      console.log("nemfut");
    } else if (window.fut == true) {
      console.log("fut");
      if (mpSzamlalo < 60) {
        mpSzamlalo++;
        mp.innerHTML = mpSzamlalo;
      };
      if (mpSzamlalo % 60 == 0) {
        mpSzamlalo = 00;
        percSzamlalo++;
        perc.innerHTML = percSzamlalo;
      };
    };
  }, 1000);

  setInterval(function() {
    if (window.fut == true) {
      if (ezredSzamlalo < 999) {
        ezredSzamlalo = ezredSzamlalo + 10;
        ezred.innerHTML = ezredSzamlalo;
      } else if (ezredSzamlalo > 999) {
        ezredSzamlalo = 0;
        ezred.innerHTML = ezredSzamlalo;
      };
    };
  }, 0.0001)
}

function stop() {
  window.fut = false;
  console.log("****************************************");

  var ezred = document.getElementById("ezred").innerHTML;
  var mp = document.getElementById("mp").innerHTML;
  var perc = document.getElementById("perc").innerHTML;
  var ora = document.getElementById("óra").innerHTML;

  localStorage.setItem('e', adatok[3]);
  localStorage.setItem('mp', adatok[2]);
  localStorage.setItem('p', adatok[1]);
  localStorage.setItem('ó', adatok[0]);

  var legjobb = document.getElementById("legjobb");
  var leghosszabb = document.getElementById("leghosszabb");

  var rovidebb = localStorage.getItem('rovidebb');
  console.log("rovidebb: " + rovidebb); // ez null

  var hosszabb = localStorage.getItem('hosszabb');
  console.log("hosszabb: " + hosszabb);

  if (hosszabb % 1000) {
    console.log("osztható ezerrel");
  };

  console.log("MAXIMUM: " + maximum); // EZ ELVILEG JO, EZ ALAPJAN CSINALD MEG A MINIMNUMOT,meg meg at kene váltani
  console.log("MINIMUM: " + minimum);
  var maximumStrAtvaltottFormat = convertToFormat(maximum);
  var minimumStrAtvaltottFormat = convertToFormat(minimum);

  console.log("maximumStrAtvaltottFormat: " + maximumStrAtvaltottFormat);
  console.log("minimumStrAtvaltottFormat: " + minimumStrAtvaltottFormat);

  if (ora == 0 && perc == 0) {
    console.log("NINCS ÓRA ÉS NINCS PERC");
    maximumStrAtvaltottFormat = "0:" + "0:" + maximumStrAtvaltottFormat;
    minimumStrAtvaltottFormat = "0:" + "0:" + minimumStrAtvaltottFormat;
  } else if (ora == 0 && perc != 0) {
    console.log("NINCS ÓRA de VAN PERC");
    maximumStrAtvaltottFormat = "0:" + maximumStrAtvaltottFormat;
    minimumStrAtvaltottFormat = "0:" + minimumStrAtvaltottFormat;
  } else  if (ora != 0 && perc == 0) {
    console.log("VAN ÓRA de NINCS PERC");
  } else if (ora != 0 && perc != 0){
    console.log("VAN ÓRA ÉS VAN PERC");
  };

  leghosszabb.innerHTML = maximumStrAtvaltottFormat;
  legjobb.innerHTML = minimumStrAtvaltottFormat; // ez még nincs meg

  console.log("****************************************");

  // már csak a slowest lap indexe, fastest lap, annak az indexe, ccs, code clean up kell, aztan kesz
  return;
}

function convertToFormat(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ":");
}

function reset() {
  window.fut = false;

  var ezred = document.getElementById("ezred");
  var mp = document.getElementById("mp");
  var perc = document.getElementById("perc");
  var ora = document.getElementById("óra");
  var table = document.getElementById("myTable");

  var legjobb = document.getElementById("legjobb");
  var leghosszabb = document.getElementById("leghosszabb");

  mpSzamlalo = 00;
  percSzamlalo = 00;
  ezredSzamlalo = 00;
  oraSzamlalo = 00;
  lapSzamlalo = 0;

  localStorage.removeItem('hosszabb');
  localStorage.removeItem('rovidebb');

  ezred.innerHTML = ezredSzamlalo;
  mp.innerHTML = oraSzamlalo;
  perc.innerHTML = percSzamlalo;
  ora.innerHTML = mpSzamlalo;

  table.innerHTML = "";
  legjobb.innerHTML = "";
  leghosszabb.innerHTML = "";
}

function insertRow() {
  if (window.fut == true) {
    lapSzamlalo = lapSzamlalo + 1;

    var table = document.getElementById("myTable");
    var ezred = document.getElementById("ezred").innerHTML;
    var mp = document.getElementById("mp").innerHTML;
    var perc = document.getElementById("perc").innerHTML;
    var ora = document.getElementById("óra").innerHTML;
    var tableTd = document.getElementById("myTable").getElementsByTagName("td");

    var row = table.insertRow(0);
    var lapCell = row.insertCell(0);
    var óraCell = row.insertCell(1);
    var percCell = row.insertCell(2);
    var mpCell = row.insertCell(3);
    var ezredCell = row.insertCell(4);
    var elozoKorok = [];
    var uj = lapSzamlalo;

    var kellEzred = 0;
    var kellMp = 0;
    var kellPerc = 0;
    var kellOra = 0;

    tableTd[0].style.color = "red";
    kor[lapSzamlalo] = [lapSzamlalo, oraSzamlalo, percSzamlalo, mpSzamlalo, ezredSzamlalo];
    console.table(kor);

    szetFaragottLap[lapSzamlalo] = lapSzamlalo;
    szetFaragottOra[lapSzamlalo] = oraSzamlalo;
    szetFaragottPerc[lapSzamlalo] = percSzamlalo;
    szetFaragottMp[lapSzamlalo] = mpSzamlalo;
    szetFaragottEzred[lapSzamlalo] = ezredSzamlalo;

    console.log("lapSzamlalo: " + lapSzamlalo);

    console.log("szetFaragottLap[lapSzamlalo]: " + szetFaragottLap[lapSzamlalo]);
    console.log("szetFaragottOra[lapSzamlalo]: " + szetFaragottOra[lapSzamlalo]);
    console.log("szetFaragottPerc[lapSzamlalo]: " + szetFaragottPerc[lapSzamlalo]);
    console.log("szetFaragottMp[lapSzamlalo]: " + szetFaragottMp[lapSzamlalo]);
    console.log("szetFaragottEzred[lapSzamlalo]: " + szetFaragottEzred[lapSzamlalo]);

    // ez bullshit, de ha ez nincs itt, akkor nem írja ki az első kört, hanem egyből a másodikkal kezd
    if (uj != 1) {
      uj = uj - 1;
    };

    console.log("elozo ezrede: " + kor[uj][4]);
    console.log("elozo mpje: " + kor[uj][3]);
    console.log("elozo perce: " + kor[uj][2]);
    console.log("elozo oraja: " + kor[uj][1]);

    if (lapSzamlalo == 1) {
      kellEzred = ezredSzamlalo;
      kellMp = mpSzamlalo;
      kellPerc = percSzamlalo;
      kellOra = oraSzamlalo;
    } else {
      kellEzred = ezred - kor[uj][4];
      kellMp = mp - kor[uj][3];
      kellPerc = perc - kor[uj][2];
      kellOra = ora - kor[uj][1];
    };

    if (kellEzred < 0) {
      kellEzred = kellEzred * (-1);
    };
    if (kellMp < 0) {
      kellMp = kellMp * (-1);
    };
    if (kellPerc < 0) {
      kellPerc = kellPerc * (-1);
    };
    if (kellOra < 0) {
      kellOra = kellOra * (-1);
    };

    console.log("kellOra: " + kellOra);
    console.log("kellPerc: " + kellPerc);
    console.log("kellMp: " + kellMp);
    console.log("kellEzred: " + kellEzred);

    ezredCell.innerHTML = " " + kellEzred;
    mpCell.innerHTML = kellMp + " :";
    percCell.innerHTML = kellPerc + " :";
    óraCell.innerHTML = kellOra + " :";
    lapCell.innerHTML = lapSzamlalo + ".";

    oraEzredbe = kellOra * 3600000;
    percEzredbe = kellPerc * 60000;
    mpEzredbe = kellMp * 1000;

    console.log("oraEzredbe: " + oraEzredbe);
    console.log("percEzredbe: " + percEzredbe);
    console.log("mpEzredbe: " + mpEzredbe);
    osszeg = oraEzredbe + percEzredbe + mpEzredbe + kellEzred;

    mpTomb[lapSzamlalo] = osszeg;
    console.table("mpTomb[" + lapSzamlalo + "]: " + mpTomb[lapSzamlalo]);

    console.log("mpTomb[" + lapSzamlalo + "]: " + mpTomb[lapSzamlalo]);
    console.log("mpTomb[" + (lapSzamlalo - 1) + "]: " + mpTomb[lapSzamlalo - 1]);
    seged++;

    if (maximum < mpTomb[lapSzamlalo]) {
      console.log("maximum elozo: " + maximum);
      console.log("nagyobb");
      maximum = mpTomb[lapSzamlalo];
      console.log("MAXIMUM: " + maximum);

      localStorage.setItem('hosszabb', maximum)
    } else {
      console.log("kisebb");
    };
    console.log("mpTomb[lapSzamlalo]: " + mpTomb[lapSzamlalo]);

    /*
    // ez elvileg szar,és nem a kacsacsőrt kell megváltoztatni,mert akkor elkurja a maxot is
    while (minimum < mpTomb[lapSzamlalo]) {
      console.log("kisebb"); // ez sose fut le mert a minimum mindig nulla
      minimum = mpTomb[lapSzamlalo];
      console.log("MINIMNUM: " + minimum); // mindig nulla

      localStorage.setItem('rovidebb', minimum)
    };
    console.log("minimum: " + minimum); // mindig nulla
    */

  } else if (window.fut == false) {
    console.log("REEEEEE");
    alert("The clock is stopped which means you cannot create a new lap.")
  }
}
