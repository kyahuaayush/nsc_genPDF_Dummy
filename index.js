var html_to_pdf = require('html-pdf-node');

const express = require('express');
const app = express();
const port = process.env.PORT || 1000;
var fs = require('fs');

fs.writeFileSync('content.log', 'Hey there!');

// sendWADoc(917982454237, '123123');


app.get('/12/:id', async function(req, res) {

  var docId = req.params.id;
  console.log(docId);

  var docPDFName = docId;

  //Document Type
    let options = {
        format: 'A4',
        path: docPDFName,
        landscape: true,
        scale: .99
    };

    //HTML FIle to Convert to pdf
    let file = [{
        url: "http://getpdf.nutom.in/testReport.php?name=Ayush%20Kumar",
        name: 'ReportName.pdf'
    }];

    //Converting HTML to PDF
    downloadPdf();

    //waiting for 5 sec to complete the conversion and  download
    setTimeout(await function() {

      res.download(docPDFName);
      
    }, 5000);


        //after 5 sec of download, deleting the file coverted
    setTimeout(await function() {

            // res.redirect("/");
            var fileDelPath = docPDFName;
            fs.unlinkSync(fileDelPath);

        }, 10000);




    async function downloadPdf() {
        const htmlDoc = await html_to_pdf.generatePdfs(file, options).then(output => {
            console.log("PDF Buffer:-", output);
        });
    }




})


app.get('/', function(req, res) {
    res.send("Home Page");
})




app.listen();


app.listen(port, () => {
    console.log(`app is listening on  https://localhost:${port}`);
})



//send file function

function sendWADoc(phoneNo, id){


const FormData = require('form-data');
const fetch = require('node-fetch');
const formData = new FormData();

formData.append('file', fs.createReadStream('123123.pdf'));

const url = "https://live-server-1867.wati.io/api/v1/sendSessionFile/"+phoneNo+"?caption=NSC 3C's Certificate";
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMzU2M2I1MS1kOWQxLTRjZGYtODNjNC1mODBiNTc4MDM2OGIiLCJ1bmlxdWVfbmFtZSI6ImNvbm5lY3QubnV0b21AZ21haWwuY29tIiwibmFtZWlkIjoiY29ubmVjdC5udXRvbUBnbWFpbC5jb20iLCJlbWFpbCI6ImNvbm5lY3QubnV0b21AZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDYvMDQvMjAyMSAxNjoxNDoxMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.HUvT23dtsOdrhmRdzoiUIYc8FYmEEJufQbEXYPxn7Gw'
  }
};

options.body = formData;

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));


}
