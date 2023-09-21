const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()


app.use(express.json({limit: "25mb"}))
app.use(express.urlencoded({extended: true}))
app.use(cors({
    allowedHeaders: "*",
    origin: "*"
}))
app.use(morgan("common"))

app.get("/", (req, res) => {
    res.send({
        "status": "ok"
    }).status(200)
})


app.listen(8080, () => console.log("server running at port 8080"))