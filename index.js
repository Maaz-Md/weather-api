require("dotenv").config()
const express = require("express");
const axios = require("axios");


const app = express();

app.get("/weather", async (req, res) => {

  const city = req.query.city;

  if (!city) {
    return res.status(400).send("City is Required");
  }

  try {

    const apiKey =  process.env.WEATHER_API_kEY;

    const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`)

    res.json(response.data);

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

