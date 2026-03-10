require("dotenv").config()
const express = require("express");
const axios = require("axios");
const redis = require("redis");
const rateLimit = require("express-rate-limit");

const app = express();

//Create a Redis Client Instance
const redisClient = redis.createClient({url: "redis://localhost:6379"});

// connect to redis server
redisClient.connect().catch(console.error);

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // limit each IP to 5 requests
  message: "Too many requests, please try again later."
});

app.get("/weather", limiter, async (req, res) => {

    const city = req.query.city?.toLowerCase();

    // Check if the city is present 
    if (!city) {
      return res.status(400).send("City query parameter is required. Use /weather?city=cityname");
    }

    try {

      //check if city is in cache
      const cachedData = await redisClient.get(city);

      if (cachedData) {
        console.log("Cache HIT");
        return res.json(JSON.parse(cachedData));
      }

      console.log("Cache MISS");

      const apiKey =  process.env.WEATHER_API_kEY;

      const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`)

      const weatherData = response.data;

      // store data in redis for 1 hour
      await redisClient.setEx(city, 3600, JSON.stringify(weatherData)); 

      res.json(weatherData);

    } catch (error) {

      if (error.response.status === 404) {
        return res.status(404).send("City not found")
      }

      if (error.response.status === 502) {
        return res.status(502).send("Weather service unavailable")
      }

      if (error.response.status === 401) {
        return res.status(401).send("Invalid API key")
      }

      res.status(500).send("Error fetching weather data")
    }
    
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

