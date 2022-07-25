window.addEventListener('DOMContentLoaded', () => {
    const api = {
        key: '10fc66b955339e5d488fcc0231988b8f',
        baseUrl: 'https://api.openweathermap.org/data/2.5/',
    };
    
    const searchBox = document.querySelector('.search-box');
    const body = document.querySelector('#body');
    
    searchBox.addEventListener('keyup', setQuery);
    
    function setQuery(e) {
        if(e.keyCode == 13) {
            getResults(searchBox.value)
        }
    }
    
    function getResults(query) {
        fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => weather.json())
        .then(displayResults)
    }
    
    function displayResults(weather) {
        console.log(weather);
        let city = document.querySelector('.location .city');
        city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    
        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerHTML = dateBuilder(now);
    
        let temp = document.querySelector('.temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    
        let weatherEl = document.querySelector('.weather');
        weatherEl.innerHTML = weather.weather[0].main;
    
        switch (weatherEl.textContent) {
            case 'Clouds' : body.style.cssText = 'background-image: url(img/cloud.jpg);'; break;
            case 'Clear' : body.style.cssText = 'background-image: url(img/clear.jpg);'; break;
            case 'Drizzle' : body.style.cssText = 'background-image: url(img/rain.jpg);'; break;
            case 'Rain' : body.style.cssText = 'background-image: url(img/rain.jpg);'; break;
        }
    
        let hightLow = document.querySelector('.hight-low');
        hightLow.innerHTML = `${Math.round(weather.main.temp_min)}<span>°C</span> / ${Math.round(weather.main.temp_max)}<span>°C</span>`;
    
    }
    
    function dateBuilder(s) {
        let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[s.getDay()];
        let date = s.getDate();
        let month = months[s.getMonth()];
        let year = s.getFullYear();
    
        return `${day} ${date} ${month} ${year}`;
    }
})