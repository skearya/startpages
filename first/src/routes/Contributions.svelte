<script>
    import { fly } from "svelte/transition";

    export let username;

    function preload(src) {
        return new Promise(function (resolve) {
            let img = new Image();
            img.onload = resolve;
            img.src = src;
        });
    }

    let src =
        "https://contribution.catsjuice.com/_/" +
        username +
        "?chart=calendar&format=png&weeks=12&theme=dark_green&widget_size=small&dark=false";
</script>

{#await preload(src)}
    <p>Getting Contributions...</p>
{:then}
    <img {src} in:fly id="git" alt="GitHub Contribution Graph" />
{/await}

<style>
    #git {
        width: 85%;
        height: 85%;
        max-height: 100%;
        max-width: 100%;
        border-radius: 0.6rem;
        background-color: rgba(10, 10, 10, 0.1);
        filter: drop-shadow(16px 16px 20px rgba(10, 10, 10, 0.4));
    }
</style>
