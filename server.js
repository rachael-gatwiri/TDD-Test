import express, { json } from 'express'
import {studentrouter} from './Routes/routes.js'


const app = express()

app.use(json())
app.use('/students', studentrouter)

app.use((err, req, res, next)=>{
    if(err){
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
    next()
})



const port = 4700

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

export default app;