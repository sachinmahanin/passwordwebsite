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

var responses = [];
router.post("/", (req, res, next) => {
  responses = [];
  var completed_requests=0
  var post_data=JSON.stringify({'password': req.body.password})
 
  //list of servcies to be called with their host,port & path
  var arrOptions=[ {
    method: 'POST',
    host:appConfig.strengthCalcualatorHost,
    port:appConfig.strengthCalcualatorPort,
    path:appConfig.strengthCalcualatorURL
    },
    {
    method: 'POST',
    host:appConfig.passwordRepeatServiceHost,
    port:appConfig.passwordRepeatServicePort,
    path:appConfig.passwordRepeatServiceURL
    },
    {
      method: 'POST',
      host:appConfig.commonPasswordServiceHost,
      port:appConfig.commonPasswordServicePORT,
      path:appConfig.commonPasswordServiceURL
    },
    ]
    //Post the request to all the services one by one
    arrOptions.forEach(function(options) {
    
    console.log('http://'+  options.host+':'+  options.port+options.path);
    
    //create the request
    var serviceRequest= http.request(options,function(resp) {

      resp.on('data', function(chunk){
        responses.push(chunk);
      });

      resp.on('end', function(){
        if (completed_requests++ == arrOptions.length - 1) {
          // All downloads are completed then join the response and send it back to the browser
          console.log('body:', responses.join());
          res.send(responses.join())
        }      
      });
    });

    serviceRequest.on('error', error => {
      console.error(error)
         })
  //post the request
  serviceRequest.write(post_data)

  serviceRequest.end();

  });//for each

});




module.exports = router;
