<script>
    function toggle() {
        window.document.body.classList.toggle("dark-mode");
    }
</script>

<button on:click={toggle}>
    <slot />
</button>

<style>
    button {
        background-color: whitesmoke;
        /* color: white; */
        border: none;
        border-radius: 4px;
        /* padding: 0.2rem; */
        height: 24px;
        font-size: large;
    }
    :global(body.dark-mode) button {
        background-color: #393939;
        color: white;
    }
</style>
