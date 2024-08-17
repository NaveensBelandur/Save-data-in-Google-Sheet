const Express = require('express')
const App = Express()
const env = require('dotenv').config()
const Port = process.env.PORT
const {google}  = require('googleapis')
const cors = require('cors')

App.use(cors())
App.use(Express.json())
App.get('/',(req,res)=>{
   res.status(200).json("Hello World")
})

App.post("/post", async (req, res) => {
   const {name,title,text} = req.body

 
   const auth = new google.auth.GoogleAuth({
     keyFile: "credentials.json",
     scopes: "https://www.googleapis.com/auth/spreadsheets",
   });
 

   const client = await auth.getClient();
  
   const googleSheets = google.sheets({ version: "v4", auth: client });

   const spreadsheetId = process.env.SPREADSHEET_ID;
 

   const metaData = await googleSheets.spreadsheets.get({
     auth,
     spreadsheetId,
   });
    

   // // Read rows from spreadsheet
   const getRows = await googleSheets.spreadsheets.values.get({
     auth,
     spreadsheetId,
     range: "Sheet1!A:A",
   });
 

   await googleSheets.spreadsheets.values.append({
     auth,
     spreadsheetId,
     range: "Sheet1!A:B",
     valueInputOption: "USER_ENTERED",
     resource: {
       values: [[ name,title,text]],
     },
   });
 
   res.status(200).json({
      message:"Data Sent SuccesFully",
      success:true
   })
 });
 



App.listen(Port,()=>{
console.log('Connected to the Port' + Port)
})