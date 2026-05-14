const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".weathercity");
const card = document.querySelector(".card")
const apiKey = "2615239d690b08ce1c97fd63fec49f81";

weatherform.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){

        try{
        const weatherdata = await getweatherdata(city);
        displayweather(weatherdata)
        }
        catch(error){
            console.error(error)
            displayerror(error)
        }
    }
    else{
        displayerror("please enter a city");
    }
});

async function getweatherdata(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response =  await fetch(apiUrl);

    if(!response.ok){
    
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message);
}
    return await response.json()
}

function displayweather(data){

    const {
        name: city,
        main:{temp, humidity, feels_like},
        weather:[{description, id}]
    } = data;

    const weatherEmoji = getweatherEmoji(id);
    // Dynamic background based on weather

if(id === 800){

    // Sunny
    document.body.style.background =
    "linear-gradient(135deg,#00c6ff,#0072ff)";
}
else if(id >= 801 && id < 900){

    // Cloudy
    document.body.style.background =
    "linear-gradient(135deg,#4e54c8,#8f94fb)";
}
else if(id >= 500 && id < 600){

    // Rain
    document.body.style.background =
    "linear-gradient(135deg,#373b44,#4286f4)";
}
else if(id >= 200 && id < 300){

    // Thunderstorm
    document.body.style.background =
    "linear-gradient(135deg,#232526,#414345)";
}
else if(id >= 600 && id < 700){

    // Snow
    document.body.style.background =
    "linear-gradient(135deg,#83a4d4,#b6fbff)";
}
else{

    // Default
    document.body.style.background =
    "linear-gradient(135deg,#0f63ff,#7b2cff)";
}

    card.style.display = "block";

    card.innerHTML = `

    <div class="top">
        <h1 class="cityDisplay">${city}</h1>
        <p class="weatherText">Current Weather</p>
    </div>

    <hr>

    <div class="middle">

        <div class="left">
            <div class="weatherEmoji">${weatherEmoji}</div>
        </div>

        <div class="right">
            <p class="tempdisplay">${temp.toFixed(1)}°C</p>
            <p class="descdisplay">${description}</p>
        </div>

    </div>

    <hr>

    <div class="bottom">

        <div class="infoBox">
            <p class="label">Humidity</p>
            <p class="value">${humidity}%</p>
        </div>

        <div class="infoBox">
            <p class="label">Feels Like</p>
            <p class="value">${feels_like.toFixed(1)}°C</p>
        </div>

    </div>
    `;
}

function getweatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
             return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
             return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
             return "⛈️";
        case (weatherId >= 600 && weatherId < 700):
             return "❄️";
        case (weatherId >= 700 && weatherId < 800):
             return "🌫️";
        case (weatherId === 800):
             return "🌞";
        case (weatherId >= 801 && weatherId < 900):
             return "☁️";
        default:
            return "❔"
    }
}

function displayerror(message){
    
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errordisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}
