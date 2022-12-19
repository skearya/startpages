/** @type {import('./$types').PageServerLoad} */
import { API_KEY, ZIP_CODE, GITHUB_USERNAME } from '$env/static/private';

export async function load() {
    let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${ZIP_CODE}&appid=${API_KEY}&units=imperial`
    );

    return {
        weather: await response.json(),
        username: GITHUB_USERNAME
    }
};