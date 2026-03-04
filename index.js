const express = require("express");

const app = express();

app.get("/weather", (req, res) => {
    res.json({
    city: "London",
    temperature: 25,
    condition: "Sunny",
    humidity: 60
  });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
})

