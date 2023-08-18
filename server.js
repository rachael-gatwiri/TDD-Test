import express, { json } from 'express'
import { studentrouter } from './Routes/routes'

const app = express()

app.use(json())
app.use('./', studentrouter)


const port = 4700

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

export default app;