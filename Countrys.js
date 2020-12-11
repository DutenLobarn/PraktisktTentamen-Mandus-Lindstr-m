// Constructor
function Country(_name, _time, _url) {
    this.name = _name;
    this.time = _time;
    this.url = _url
}

// Hämtar body
let body = document.querySelector('body');

// en prototyp metod som skapar ett element, ändra innertext och appendar elemnter till body
Country.prototype.getCountry = function(country) {
    let h2Country = document.createElement('h3');
    h2Country.innerText = country;
    body.appendChild(h2Country);

};

// en prototyp som gör att jag kan sätta in det landets rätta tid genom att ändra dens utc tid.
Country.prototype.getTime = function(time) {
    let substring = time;
    let addOrSub = substring.substr(3, 1);
    let substring2 = substring.substr(4, 5);

    if (addOrSub == '+') {
        let num = parseInt(substring2);
        let date = new Date();
        let changeDate = date.getUTCHours() + num;
        changeDate = `${changeDate} ${date.getUTCMinutes()}`
        this.time = changeDate;
        let h3Times = document.createElement('h3');
        h3Times.innerText = changeDate;
        body.appendChild(h3Times);
    } else {
        let num = parseInt(substring2);
        let date = new Date();
        let changeDate = date.getUTCHours() - num;
        changeDate = `${changeDate} ${date.getUTCMinutes()}`
        this.time = changeDate;

        let h3Times = document.createElement('h3');
        h3Times.innerText = changeDate;
        body.appendChild(h3Times);
    }
};

// en prototyp som skapar ett element lägger till en url till image elementet sen appendar det till body 
Country.prototype.getUrl = function(url) {
    let img = document.createElement("img");
    img.src = url;
    body.appendChild(img);
};


// Lägger i api url i en variabel
const url = 'https://restcountries.eu/rest/v2/all';


// fetchar min api url sen gör om den till hanterbar data.
fetch(url).then(function(response) {
    return response.json();

}).then(function(data) {

    // skapar en foor loop där jag hämtar 3 random länder och ger dom namn, tidszon och en url till en bild.
    for (let i = 0; i < 3; i++) {
        let randomCountries = Math.floor(Math.random() * data.length);

        let name = data[randomCountries].nativeName;
        let timezone = data[randomCountries].timezones[0];
        let url = data[randomCountries].flag;

        //Skapar nya länder och använder mig utav mina prototyper.
        let country = new Country(name, timezone, url);
        country.getCountry(name);
        country.getTime(timezone);
        country.getUrl(url);
    };

    // errorhantering
}).catch(
    function(error) {
        if (error === 'Not found') {
            console.log('Det hittades inte!');
        }

    }
);