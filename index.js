//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key:"3ed5c30462bce3f0dc1692d9d706cef8",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather"
}
const fontimg = document.getElementById('img');
// Event listener function on keypress

const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) =>{
    // keycode 13 for enter key
           if(event.keyCode==13){

            console.log(searchInputBox.value);
            getWeatherReport(searchInputBox.value);
            document.querySelector('.weather-body').style.display = " block";
           }
});

// get weather report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// show weather report

function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText =`${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML =`${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML=`${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear')
    {
        fontimg.innerHTML='<i class="fas fa-sun fa-5x"></i>';
        

        document.body.style.backgroundImage = "url('clear.webp')";
    }
    else if(weatherType.textContent == 'Clouds')
    {
        fontimg.innerHTML='<i class="fas fa-cloud fa-5x"></i>';
        
        document.body.style.backgroundImage = "url('cloud.webp')";
    }
    else if(weatherType.textContent == 'Rain' || weatherType.textContent == 'Drizzle')
    {
        fontimg.innerHTML='<i class="fas fa-cloud-showers-heavy fa-5x"></i>';
        document.body.style.backgroundImage = "url('rain.jpeg')";
    }
    else if(weatherType.textContent == 'Snow')
    {
        fontimg.innerHTML='<i class="fas fa-cloud-snow fa-5x" ></i>';
        document.body.style.backgroundImage = "url('snow.webp')";
    }
    else if(weatherType.textContent == 'Thunderstorm')
    {
        fontimg.innerHTML='<i class="fad fa-poo-storm fa-5x"></i>';
        document.body.style.backgroundImage = "url('thunder.webp')";
    }
    if(weatherType.textContent == 'Haze')
    {
        fontimg.innerHTML='<i class="fas fa-sun fa-5x"></i>';
        document.body.style.backgroundImage = "url(haze.webp)";
    }
}
// date manage

function dateManage(dateArg){

    let days = ['Sun', 'Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month}, (${day})  ${year}`;
}


