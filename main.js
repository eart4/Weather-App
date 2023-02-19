import conditions from './conditions.js';

console.log(conditions);

const apiKey = 'ba916fb4e5924beab11125540231902'

const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

function removeCard(){
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage){
    const html = `<div class="card">${errorMessage}</div>`;
    header.insertAdjacentHTML('afterend', html);
}



function showCard({name , country, temp, condition}){
    const html = `<div class="card">
<h2 class="card-city">${name}<span>${country}</span></h2>


<div class="card-weather">
  <div class="card-value">${temp}<sup>°c</sup></div>
  <img class="card-img" src="./images/example.svg" alt="">
</div>

<div class="card-description">${condition}</div>



</div>`;

header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city){
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}







form.onsubmit = async function (e) {
    // отменяем отправку формы
    e.preventDefault();

    // берем значение импута обрезаем пробулы

    let city = input.value.trim();
    const data = await getWeather(city)


    
if (data.error) {
    removeCard();
    showError(data.error.message);

} else {
    removeCard();
    const info = conditions.find(
       (obj) => obj.code === data.current.condition.code 
    );

    const condition = data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text'];
    

    const weatherData = {
        name: data.location.name, 
        country: data.location.country, 
        temp:data.current.temp_c,
        condition: condition,
    };
    showCard(weatherData);
}



 

}