import {app} from "../Backend/src/app.js";
const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, 
    ()=>(
        console.log(`App listening on port ${PORT}`)      
    )
)