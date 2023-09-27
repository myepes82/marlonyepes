const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const mailer = require("./functions/emailFunctions")


const {NODE_ENV} = process.env
if(NODE_ENV === "dev") dotenv.config();

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


app.post("/mail", (req, res) => mailer.sent(req, res))

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server running at port ${port}`))