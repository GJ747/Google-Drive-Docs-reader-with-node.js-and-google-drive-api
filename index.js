const { google } = require('googleapis');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

app.set('view engine', 'ejs');

const CLIENT_ID = '333971167995-lbr25ikaepvnnbk1uvf5qvcgthdftnk4.apps.googleusercontent.com'
    const CLIENT_SECRET = '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'
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
    const REFRESH_TOKEN = '1//04bX32wTU338uCgYIARAAGAQSNwF-L9IrLCo1cSpGQHSeIGM68-fhnlce3sAgaQE33IZ8Ic_kUGOuD1OX6P1390AaKE6sEu155AE'
    var files

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    )

    oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

    const drive = google.drive({
        version : 'v3',
        auth : oauth2Client
    })

    drive.files.list({ q: 'mimeType=\'application/msword\'',
    fields: 'files(name, webViewLink)',
    spaces: 'drive',}, (err, res) => {
        if (err) throw err;
        files = res.data.files;
      });

    app.get('/',(req,res)=>{
       res.render('home.ejs',{files})
    })

    app.listen(3000,()=>{
        console.log("server start")
    })