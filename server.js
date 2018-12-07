const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/dist", express.static(path.join(__dirname, "dist")));

// main route
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

