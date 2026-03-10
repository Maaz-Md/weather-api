# 📝 A Simple  Weather API  From  [roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service) 

A simple Weather API built with Node.js, Express, and Redis caching.
The API fetches weather data from a third-party weather service and caches responses using Redis to improve performance and reduce external API calls.

---
## 🖥️ Installation

```bash

# 1️⃣ Clone the repository
git clone https://github.com/Maaz-Md/weather-api.git

# 2️⃣ Navigate into the project directory
cd weather-api

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create environment variables
Create a .env file in the root directory.

Example:
    PORT=3000
    REDIS_URL=redis://localhost:6379
    WEATHER_API_KEY=your_api_key_here

# Then open the app in your browser at 
http://localhost:3000

```

## API endPoint 
You must provide the city query parameter in the URL.

http://localhost:3000/weather?city=London

Replace "London" with any city name.

Error Response
---

If the city parameter is missing, the API will return:

"City query parameter is required. Use /weather?city=cityname"