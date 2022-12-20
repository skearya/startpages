<script>
    import { fly } from "svelte/transition";
    export let data;

    let dark = false;
    let query = ""
    let h, m, s
    
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    function preload(src) {
        return new Promise(function (resolve) {
            let img = new Image();
            img.onload = resolve;
            img.src = src;
        });
    }

    let src =
        "https://contribution.catsjuice.com/_/" +
        data.username +
        "?chart=calendar&format=png&weeks=12&theme=dark_green&widget_size=small&dark=false";

    function handleKeydown(event) {
        if (event.code == "Enter" && query !== "") {
            window.location.href = "https://www.google.com/search?q=" + query;
        }
    }

    function startTime() {
        const today = new Date();
        h = today.getHours();
        m = today.getMinutes();
        s = today.getSeconds();
        
        m = checkTime(m);
        s = checkTime(s);
        setTimeout(startTime, 1000);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        };  // add zero in front of numbers < 10
        return i;
    }
    
    startTime();
    let day = new Date();

    const nth = function(d) {
        const dString = String(d);
        const last = +dString.slice(-2);
        if (last > 3 && last < 21) return 'th';
        switch (last % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">

<div class="center">
    <div class="parent">
        <div style="display: none;" class="div1">notion tasks: x</div>
        <!-- i couldnt get the notion api to work with fetching tasks that arent done, ill try again later -->
        <div class="div2">
            <div class="main1">
                <p>it's</p>
                <p>{month[day.getMonth()]}</p>
                <p>{weekday[day.getDay()]} {day.getDate()}{nth(day.getDate())}</p>
            </div>
            <div class="main2">
                <input bind:value={query} type="text" placeholder="Search..." name="" id=""/>
            </div>
            <div class="main3"><p>{day.toLocaleString('en-US', { hour: 'numeric', hour12: true }).slice(0, -3)}:{m} {h >= 12 ? 'PM' : 'AM'}</p></div>
        </div>
        <div class="div3">
            {#await data}
                <h2>...</h2>
            {:then}
                <div class="weatherContainer">
                    <div class="w1">
                        <h3 style="margin: 0; text-align: center;" in:fly>{Math.round(data.weather.main.temp)}°<br><p id="feels">feels like {Math.round(data.weather.main.feels_like)}°</p></h3>
                        <img id="icon" src="http://openweathermap.org/img/wn/{data.weather.weather[0].icon.slice(0, -1) + ((dark == true) ? "n": "d")}@2x.png" alt="...">
                    </div>
                    <div style="margin: 0;" class="w2">
                        {data.weather.weather[0].description}
                    </div>
                </div>
            {/await}
        </div>
        <div class="div4">
            <div class="linkParent">
                <div class="link1">
                    <a class="link" href="https://www.notion.so/">
                        <img alt="Notion" src="https://img.icons8.com/glyph-neue/48/null/notion.png"/>
                    </a>
                </div>
                <div class="link2">
                    <a class="link" href="https://www.udemy.com/">
                        <img alt="Udemy" src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/null/external-udemycom-is-an-online-learning-and-teaching-platform-logo-bold-tal-revivo.png"/>
                    </a>
                </div>
                <div class="link3">
                    <a class="link" href="https://drive.google.com">
                        <img alt="Drive" src="https://img.icons8.com/fluency-systems-filled/48/null/google-drive.png"/>    
                    </a>
                </div>
                <div class="link4">
                    <a class="link" href="https://monkeytype.com/">
                        <img alt="Typing" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/null/external-keyboard-social-media-ui-tanah-basah-glyph-tanah-basah.png"/>
                    </a>
                </div>
                <div class="link5">
                    <a class="link" href="https://github.com">
                      <img alt="GitHub" src="https://img.icons8.com/ios-filled/48/null/github.png"/>
                  </a>
                </div>
                <div class="link6">
                    <a class="link" href="https://bitwarden.com/">
                        <img alt="Passwords" src="https://img.icons8.com/ios/48/null/bitwarden.png"/>
                    </a>
                </div> 
            </div> 
        </div>
        <div class="div5">
            {#await preload(src)}
                <p>Getting Contributions...</p>
            {:then}
                <img {src} in:fly id="git" alt="GitHub Contribution Graph" />
            {/await}
        </div>
    </div>
</div>

<style>
    .center {
        display: flex;
        justify-content: center;
        flex-flow: column wrap;
        align-items: center;
        min-height: calc(100% - 41px);
        border: 0px solid green;
    }
    .parent {
        display: grid;
        /* removing grid here makes this basically mobile responsive lol */
        grid-template-columns: repeat(3, 300px);
        grid-template-rows: repeat(2, 200px);
        grid-column-gap: 50px;
        grid-row-gap: 50px;
    }

    .parent div {
        background-color: rgba(10, 10, 10, 0.05);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.6rem;
        border-bottom: 2px solid rgba(10, 10, 10, 0.3);
        font-size: 1.2em;
        padding: 20px;
    }
    .parent .div5 {
        padding: 0;
    }
    .parent .div2 {
        display: grid;
        align-items: unset;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 20px;
    }
    .parent .div2 .main2 {
        /* flex-flow: column; */
        padding: 0;
        /* justify-content: unset; */
    }

    .main1 {
        grid-area: 1 / 1 / 2 / 2;
        line-height: 2.7rem;
        text-align: center;
        flex-flow: column;
        height: 125px;
    }
    .main1 p {
        margin: 0;
        font-size: 1.4rem;
        text-align: center;
    }
    .main1 p:nth-child(1) {
        color: rgba(0, 0, 0, 0.5);
        font-weight: 400;
    }
    .main1 p:nth-child(2) {
        color: rgba(0, 0, 0, 0.75);
        font-weight: 400;
    }
    .main1 p:nth-child(3) {
        color: rgba(0, 0, 0, 1);
        font-weight: 600;
    }
    .main2 {
        grid-area: 2 / 1 / 3 / 2;
    }
    .main3 {
        grid-area: 3 / 1 / 4 / 2;
    }
    .main3 p {
        font-size: 2rem;
        font-weight: 300;
        margin: 0;
    }

    input {
        width: 75%;
        height: 30px;
        background-color: rgba(10, 10, 10, 0.1);
        font-family: "Inter";
        color: black;
        font-size: large;
        padding: 6px 0px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
    }

    input::placeholder {
        font-family: "Inter";
        font-weight: bold;
        font-size: medium;
        /* opacity: 0.5; */
        color: rgba(10, 10, 10, 1);
    }

    #git {
        width: 85%;
        height: 85%;
        max-height: 100%;
        max-width: 100%;
        border-radius: 0.6rem;
        background-color: rgba(10, 10, 10, 0.1);
        filter: drop-shadow(16px 16px 20px rgba(10, 10, 10, 0.4));
    }

    #feels {
        color: rgba(10, 10, 10, 0.5);
        font-size: 0.9rem;
        margin: 0;
        font-weight: 500;
        padding-right: 0.4rem;
        
    }
    #icon {
        object-fit: none;
        width: 50px;
        height: 50px;
    }

    .parent .div3 {
        justify-content: space-evenly;
        align-items: center;
    }
    .div3 .weatherContainer {
        display: flex;
        justify-content: space-around;
        flex-flow: column;
        padding: 10px;
        width: 100%;
        height: 90%;
    }

    .div3 .weatherContainer .w1, .div3 .weatherContainer .w2{
        border-bottom: none;
        padding: unset;
        background-color: unset;
    }

    .div3 .weatherContainer .w1 {
        justify-content: space-around;
        width: 100%;
    }

    .div3 .weatherContainer .w2 {
        color: rgba(0, 0, 0, 0.75);
        font-size: 1.5rem;
    }

    .div1 {
        grid-area: 1 / 1 / 2 / 2;
    }
    .div2 {
        grid-area: 1 / 2 / 3 / 3;
    }
    .div3 {
        grid-area: 1 / 3 / 2 / 4;
    }
    .div4 {
        grid-area: 1 / 1 / 3 / 2;
    }
    .div5 {
        grid-area: 2 / 3 / 3 / 4;
    }
    .parent > div {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    }

    .parent .div4 .linkParent {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 12px;
        grid-row-gap: 12px;
        width: 100%;
        align-items: unset;
        padding: 0;
        background-color: unset;
        border-bottom: none;
        border-radius: 0;
    }
    .parent .div4 {
        align-items: unset;
    }
    .link {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        /* z-index: 1; */
    }

    .link1 {
        grid-area: 1 / 1 / 2 / 2;
    }
    .link2 {
        grid-area: 1 / 2 / 2 / 3;
    }
    .link3 {
        grid-area: 2 / 2 / 3 / 3;
    }
    .link4 {
        grid-area: 2 / 1 / 3 / 2;
    }
    .link5 {
        grid-area: 3 / 1 / 4 / 2;
    }
    .link6 {
        grid-area: 3 / 2 / 4 / 3;
    }

    .parent .linkParent div {
        padding: 0;
    }

</style>
