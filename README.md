# Astro Bot
[This site](https://astro-bot.vercel.app/) allows the user to select their zodiac sign, and receive different information based on their selection, including:
1. Getting a daily horoscope courtesy of https://ohmanda.com/api/horoscope/
2. Chatting with a "Zodiac Expert" to give them advice based on their zodiac sign (which is really the Mistral 7B Instruct LLM pretending to be a zodiac expert). The user can both feed the model questions and tell it to continue its response, since the Mistral responses are limited in length.

PLEASE NOTE: upon requesting a horoscope, the Render backend will need to spin up, since it is hosted on the free tier. It may take a couple of minutes to load the first horoscope. Going through a backend for this API was necessary to enable CORS, but it was not necessary for the Hugging Face Inference API.


My code includes:
1. React pages and components for the frontend of the website.
2. A backend which calls the ohmanda API.
