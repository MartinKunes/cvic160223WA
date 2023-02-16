class Zeme {
    constructor(IDNation,Nation,IDYear,Year,Population,Slugnation) {
        this.IDNation = IDNation;
        this.Nation = Nation;
        this.IDYear = IDYear;
        this.Year = Year;
        this.Population = Population;
        this.Slugnation = Slugnation;

  }
}



function reqListener() {
  console.log(this.responseText);
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
 req.open("GET", "https://datausa.io/api/data?drilldowns=Nation&measures=Population");
req.send();

function load() {
    localStorage.setItem("data" , this.responseText);
    }

    btn.addEventListener('click', load);






