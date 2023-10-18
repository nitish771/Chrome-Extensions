function loadJoke(){
    fetch('https://icanhazdadjoke.com/slack')
        .then(data =>  data.json())
        .then( jokeData => {
            const joke = jokeData.attachments[0].text;
            const joke_div = document.getElementById("joke");
            joke_div.innerHTML = "<p>" + joke + "</p>";       
        });
}

loadJoke();
setInterval(loadJoke, 10000);