# My Startpage

<img width="1392" alt="image" src="https://user-images.githubusercontent.com/77034153/210124534-798827f9-33f6-42d5-9aaf-e9adf746a33e.png">

> (preview) https://start.skeary.me/

- Made with SvelteKit!
- Uses [OpenWeatherMap](https://openweathermap.org/), [ssr-contributions-img](https://github.com/CatsJuice/ssr-contributions-img) and the [Notion API](https://developers.notion.com/)

---
## Usage

> npm install

> npm run build

> npm run preview

To get the notion component to work you will most likely need to change the api request in src/+page.server.js to fit your database, other configuration is done through environment variables.

### Environment Variables Needed
API_KEY (api key from [OpenWeatherMap](https://openweathermap.org/)), ZIP_CODE, GITHUB_USERNAME, [NOTION_KEY](https://developers.notion.com/), [NOTION_DB](https://developers.notion.com/docs/working-with-databases)




