<script>
    export let weather;
    export let dark;
</script>

<div class="weatherContainer">
    <div class="w1">
        <h3 style="margin: 0; text-align: center;">
            {Math.round(weather.main.temp)}°<br />
            <p id="feels">
                feels like {Math.round(weather.main.feels_like)}°
            </p>
        </h3>
        <img
            id="icon"
            src="https://openweathermap.org/img/wn/{weather.weather[0].icon.slice(
                0,
                -1
            ) + (dark == true ? 'n' : 'd')}@2x.png"
            alt="..."
        />
    </div>
    <div style="margin: 0;" class="w2">
        {weather.weather[0].description}
    </div>
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

    #feels {
        color: rgba(10, 10, 10, 0.5);
        font-size: 0.9rem;
        margin: 0;
        font-weight: 500;
        padding-right: 0.4rem;
    }
    
    #icon {
        object-fit: contain;
        width: 50px;
        height: 50px;
    }

    .weatherContainer {
        display: flex;
        justify-content: space-around;
        flex-flow: column;
        padding: 10px;
        width: 100%;
        height: 90%;
    }

    .weatherContainer .w1,
    .weatherContainer .w2 {
        border-bottom: none;
        padding: unset;
        background-color: unset;
    }

    .weatherContainer .w1 {
        justify-content: space-around;
        width: 100%;
    }

    .weatherContainer .w2 {
        color: rgba(0, 0, 0, 0.75);
        font-size: 1.5rem;
    }

    :global(body.dark-mode) #feels {
        color: rgba(255, 255, 255, 0.5);
    }
    :global(body.dark-mode) .w2 {
        color: rgba(255, 255, 255, 0.9);
    }
</style>
