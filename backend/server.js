const express = require('express');
const app = express();

app.get("/connect", (req,res) => {
    res.json({"messages": ["The data", "from the backend", "just arrived!"]})
})

app.listen(9000, () => {console.log("Server started on 9000")})