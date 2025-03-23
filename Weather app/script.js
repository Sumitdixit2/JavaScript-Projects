document.getElementById("search-button").addEventListener("click", function(){
    const city = document.getElementById("search-input").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=669650e55af18162e764bc00e0128068`;


fetch(url)
.then(response => response.json())
.then(data => {   
    document.getElementById("location").textContent = `City: ${city}`;
    document.getElementById("temperature").textContent = `temperature: ${data.main.temp}°C`;
}
)
.catch(error => console.error(error))

})


