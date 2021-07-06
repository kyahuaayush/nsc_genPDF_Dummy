var html_to_pdf = require('html-pdf-node');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;




app.get('/12', async function(req,res){


  let options = {
    format: 'A4',
    path: "htmltopdfDoc.pdf",
    landscape: true,
    scale: .99};
  let file = [{ url: "http://getpdf.nutom.in/testReport.php?name=Ayush%20Kumar", name: 'ReportName.pdf' }];

  console.log("Before PDF");  

  
    console.log("In After PDF");
    downloadPdf();
  
    setTimeout(await function() {
        

      res.download('htmltopdfDoc.pdf');
          
    // res.redirect("/");
          
      }, 5000);



      async function downloadPdf(){
        const htmlDoc = await html_to_pdf.generatePdfs(file, options).then(output => {
          console.log("PDF Buffer:-", output);
        });
      }







})


app.get('/', function (req, res){
  res.send("Home Page");
})






app.listen();


app.listen(port, () => {
  console.log(`app is listening on  http://localhost:${port}`);
})