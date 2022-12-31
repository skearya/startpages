<script>
    export let notion;
</script>

<div class="container">
    <div class="count">
        <a id="tasks" href={notion.url}>tasks</a>: &nbsp
        <p style="font-weight: bold; margin: 0;">
            {notion.length}
        </p>
    </div>
    <ul style="margin: 0">
        {#each notion.tasks as item}
            <li>{item}</li>
        {:else}
            <li>none!</li>
        {/each}
    </ul>
</div>

<style>
    .container {
        background-color: rgba(10, 10, 10, 0.05);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 0.6rem;
        border-bottom: 2px solid rgba(10, 10, 10, 0.3);
        font-size: 1.2em;
        flex-flow: column;
        width: 100%;
    }

    ul {
        background-color: rgba(10, 10, 10, 0.05);
        max-height: 80px;
        overflow: auto;
        font-size: 1.1vw;
        text-align: center;
        padding-left: 0px;
        border-radius: 0.6rem;
        width: 90%;
        list-style: none;
    }

    li {
        margin: 5px 0;
    }

    .count {
        display: flex;
        flex-flow: row;
    }

    #tasks {
        color: black;
        margin: 0;
    }

    :global(body.dark-mode) #tasks {
        color: white;
    }
</style>
