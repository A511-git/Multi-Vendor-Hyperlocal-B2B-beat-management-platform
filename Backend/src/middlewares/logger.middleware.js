import * as fs from "node:fs";
import path from "node:path";
import morgan from "morgan";



export const loggerSetup = (app) => {
    const logFolder = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder);
    }

    const accessLogStream = fs.createWriteStream(
        path.join(logFolder, "access.log"),
        { flags: "a" }
    );

    console.log("Logger middleware loaded");

    app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: accessLogStream }));
}
