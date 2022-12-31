<script>
    export let data;

    import { fly } from "svelte/transition";

    import Center from "./Center.svelte";
    import Contributions from "./Contributions.svelte";
    import Shortcuts from "./Shortcuts.svelte";
    import Tasks from "./Tasks.svelte";
    import Weather from "./Weather.svelte";

    let dark = false;
</script>

<svelte:head>
    <title>skeary's startpage</title>
    <link rel="preconnect" href="https://rsms.me/" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<div class="center">
    <div class="parent">
        <div class="div1">
            <Tasks notion={data.notion} />
        </div>
        <div class="div2">
            <Center />
        </div>
        <div class="div3">
            <Weather weather={data.weather} {dark} />
        </div>
        <div class="div4">
            <Shortcuts />
        </div>
        <div class="div5">
            <Contributions username={data.username} />
        </div>
    </div>
</div>

<style>
    .center {
        display: flex;
        justify-content: center;
        flex-flow: column wrap;
        align-items: center;
        min-height: calc(100% - 45px);
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
        transition: background-color 0.3s;
        background-color: rgba(10, 10, 10, 0.05);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.6rem;
        border-bottom: 2px solid rgba(10, 10, 10, 0.3);
        font-size: 1.2em;
        padding: 20px;
    }

    .parent > div {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    }

    .parent .div1 {
        align-items: unset;
    }

    .parent .div2 {
        display: grid;
        align-items: unset;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 20px;
    }

    .parent .div3 {
        justify-content: space-evenly;
        align-items: center;
    }

    .parent .div4 {
        align-items: unset;
    }

    .parent .div5 {
        padding: 0;
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
        grid-area: 2 / 1 / 3 / 2;
    }
    .div5 {
        grid-area: 2 / 3 / 3 / 4;
    }

    :global(body.dark-mode) .parent div {
        background-color: #242424;
    }
</style>
