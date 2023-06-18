const mongoose = require('mongoose');
const app = require('./app')
const DB_Host = "mongodb+srv://Kostya:GwuEWSFufrgeh7VI@cluster0.mrsfz97.mongodb.net/db-contacts?retryWrites=true&w=majority";
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
mongoose.connect(DB_Host)
.then (()=>
{app.listen(3000);
})
.catch(error =>{
  console.log (error.message);
  process.exit(1);
})