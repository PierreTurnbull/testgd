import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { writeFileSync } from "fs";

const app = express();
const port = 12201;

app.use(cors())
app.use(bodyParser.json())

app.put("/editor", (req, res) => {
	writeFileSync("src/app/domains/editor/data/data.json", JSON.stringify(req.body, null, 4))
	console.info("Saved editor data.", req.body)
	return res.status(200).send()
})

app.listen(port, () => {
	console.info(`Editor server listening on port ${port}`);
});