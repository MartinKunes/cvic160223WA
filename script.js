class Zamestnanec {
  constructor(id,name,position,salary,start_date,office,extn ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.salary = salary;
    this.start_date = start_date;
    this.office = office;
    this.extn = extn;
  }
}

function reqListener() {
  console.log(this.responseText);
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "https://datatables.net/examples/ajax/data/objects.txt?_=1675073860460");
req.send();