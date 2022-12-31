<script>
    let query, h, m, s;
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

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
            i = "0" + i;
        }
        return i;
    }

    startTime();
    let day = new Date();

    const nth = function (d) {
        const dString = String(d);
        const last = +dString.slice(-2);
        if (last > 3 && last < 21) return "th";
        switch (last % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    function handleKeydown(event) {
        if (event.code == "Enter" && query !== "") {
            window.location.href = "https://www.google.com/search?q=" + query;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="main1">
    <p>it's</p>
    <p>{weekday[day.getDay()]}</p>
    <p>{month[day.getMonth()]} {day.getDate()}{nth(day.getDate())}</p>
</div>
<div class="main2">
    <input bind:value={query} type="text" placeholder="Search" name="" id="" />
</div>
<div class="main3">
    <p>
        {day
            .toLocaleString("en-US", { hour: "numeric", hour12: true })
            .slice(0, -3)}:{m}
        {h >= 12 ? "PM" : "AM"}
    </p>
</div>

<style>
    div {
        background-color: rgba(10, 10, 10, 0.05);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.6rem;
        border-bottom: 2px solid rgba(10, 10, 10, 0.3);
        font-size: 1.2em;
        padding: 20px;
    }

    .main2 {
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
</style>
