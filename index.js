var html_to_pdf = require('html-pdf-node');

const express = require('express');
const app = express();
const port = process.env.PORT || 1000;
var fs = require('fs');

fs.writeFileSync('content.log', 'Hey there!');


app.get('/certificate/:id', async function(req, res) {

  var Id = req.params.id;
  var docId = Id.substring(0,13);
  console.log(docId);

  var docPDFName = "Certi_"+docId+".pdf";

  //Document Type
    let options = {
        format: 'A4',
        path: docPDFName,
        landscape: true,
        scale: .99,
    };

    //HTML FIle to Convert to pdf
    let file = [{
        url: "http://nsc.nutom.in/3Cs/?uid="+docId,
        name: 'Certificate.pdf'
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


app.get('/report/:id', async function(req, res) {

  var Id = req.params.id;
  var docId = Id.substring(0,13);
  // console.log(docId);

  var docPDFName = "Report_"+docId+".pdf";

  //Document Type
    let options = {
        format: 'A4',
        path: docPDFName,
        landscape: false,
        scale: .98,
    };

    //HTML FIle to Convert to pdf
    let file = [{
        url: "http://nsc.nutom.in/3Cs/report.php/?uid="+docId,
        name: 'Report.pdf'
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





app.listen();


app.listen(port, () => {
    console.log(`app is listening on  https://localhost:${port}`);
})

