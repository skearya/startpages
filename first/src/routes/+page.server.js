/** @type {import('./$types').PageServerLoad} */
import { API_KEY, ZIP_CODE, GITHUB_USERNAME, NOTION_DB, NOTION_KEY } from '$env/static/private';
import { Client } from '@notionhq/client'


export async function load() {
  const fetchWeather = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${ZIP_CODE}&appid=${API_KEY}&units=imperial`)
    const data = await res.json()
    return data
  }

  return {
    weather: fetchWeather(),
    username: GITHUB_USERNAME,
    notion: getTasks()
  }
};

async function getTasks() {
  if (NOTION_DB == "" || NOTION_KEY == "") {
    return {
      length: "no notion key",
      tasks: "❌"
    }
  }

  const notion = new Client({ auth: NOTION_KEY });
  const res = await notion.databases.query({
    database_id: NOTION_DB,
    filter: {
      and: [
        {
          property: 'Status',
          status: {
            does_not_equal: 'Done'
          }
        },
        {
          property: 'Long Term',
          checkbox: {
            equals: false
          }
        },
      ],
    },
  });

  let tasks = []

  for (let i = 0; i < res.results.length; i++) {
    tasks.push(res.results[i].properties.Task.title[0].plain_text)
  }
  
  return {
    length: res.results.length,
    tasks: tasks,
    url: `https://www.notion.so/${NOTION_DB}`
  }
}