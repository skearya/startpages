<script>
  import "../app.css";
  import Toggle from "./Toggle.svelte";
</script>

<nav class="crumbs">
  <div style="display: flex; flex-flow: row nowrap; align-items: center;">
    <div style="display: flex; flex-flow: column nowrap;">
      <div class="blue" />
      <div class="yellow" />
    </div>
    <div
      style="background-color: #DF81CF; height: 24px; line-height: 24px; padding: 0 5px; border-radius: 0 5px 5px 0;"
    >
      startpage
    </div>
  </div>

  <div>
    <li class="crumb">
      <Toggle>toggle</Toggle>
      <a id="repo" href="https://github.com/skearya/startpage">repo</a>
    </li>
  </div>
</nav>

<slot />

<style>
  :global(body) {
    background-color: white;
    color: black;
    transition: background-color 0.3s;
  }
  :global(body.dark-mode) {
    background-color: #1c1c1c;
    color: white;
  }

  nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    padding: 10px 0;
    font-size: large;
  }

  .crumb {
    list-style: none;
  }

  .blue {
    height: 12px;
    width: 12px;
    background-color: #7eeaf6;
  }
  .yellow {
    height: 12px;
    width: 12px;
    background-color: #fadd75;
  }

  #repo {
    background-color: #61d67e;
    color: black;
    padding: 1px 5px;
    border-radius: 5px;
  }

  a:link {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  a:active {
    text-decoration: none;
  }

  :global(body.dark-mode) #repo {
    color: white;
  }
</style>
