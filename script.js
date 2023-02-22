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

let text = document.getElementById("text");
function reqListener() {
console.log(this.responseText);
text.textContent = this.responseText;
}





//vytvori data

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
 req.open("GET", "https://datausa.io/api/data?drilldowns=Nation&measures=Population");
req.send();

req.onload = (e) => {
    let data = JSON.parse(req.responseText);

    if (data == null || data == undefined || data == "") {
        console.error("Error while parsing products from web");
        return;
    }
}

