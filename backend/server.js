import app from './src/app.js'
import { config } from './src/config/config.js'
import { connectToDb } from './src/config/db.js'


await connectToDb()



const port = config.PORT||4000
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})