<script>
  import "../app.css";
</script>

<nav class="crumbs">
  <div style="display: flex; flex-flow: row nowrap;">
    startpage
  </div>

  <div style="display: flex; flex-flow: row nowrap; gap: 10px;">
    <!-- <li class="crumb"><a href="/">settings</a></li> will add later --> 
  </div>
</nav>

<slot />

<style>
  nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    padding: 10px 0;
  }

  /* .crumb {
    list-style: none;
  } */
</style>
