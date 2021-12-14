const express = require("express");
const router = express.Router();
const http = require('http')
var appConfig = require('../../config');
const request = require('request');
var querystring = require('querystring');
const { response } = require("express");


router.get("/", (req, res, next) => {
  res.sendFile(staticPath + 'index.html');
});
router.post("/test", (req, res, next) => {
  res.send(req.body.password)

});

var responses = [];
router.post("/", (req, res, next) => {
  responses = [];
  var urls = ['http://'+  appConfig.strengthCalcualatorHost+':'+  appConfig.strengthCalcualatorPort+appConfig.strengthCalcualatorURL,'http://'+  appConfig.strengthCalcualatorHost+':'+  appConfig.strengthCalcualatorPort+appConfig.strengthCalcualatorURL];
  var completed_requests=0
  var post_data=JSON.stringify({'password': req.body.password})
 



  var options = {
    method: 'POST',
    host:appConfig.strengthCalcualatorHost,
    port:appConfig.strengthCalcualatorPort,
    path:appConfig.strengthCalcualatorURL

    }
  urls.forEach(function(url) {
    
   
    var serviceRequest= http.request(options,function(resp) {
      resp.on('data', function(chunk){
        responses.push(chunk);
      });

      resp.on('end', function(){
        if (completed_requests++ == urls.length - 1) {
          // All downloads are completed
          console.log('body:', responses.join());
          res.send(responses.join())
        }      
      });
    

    });
    serviceRequest.on('error', error => {
      console.error(error)
         })
  serviceRequest.write(post_data)
  serviceRequest.end();
  });//for each

});




module.exports = router;
