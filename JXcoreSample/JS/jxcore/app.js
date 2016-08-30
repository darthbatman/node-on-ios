// Call a native method 'ScreenBrightness'
Mobile('ScreenBrightness').call(function(br){
  console.log("Screen Brightness", br);
});


var base_html = "Update TextBox on Mobile application to change this message";

// Register UpdateHTML method so we can call it from native side
Mobile('UpdateHTML').register(function(html){
  base_html = html;
  
  console.log("HTML text is updated to", html);
});


var os = require('os');
var nis = os.networkInterfaces();

var arrIP = [];
for (var o in nis) {
  if (!nis.hasOwnProperty(o)) continue;
  
  var interfaces = nis[o];
  
  for(var o in interfaces) {
    if (interfaces[o].family == "IPv4" && interfaces[o].address != "127.0.0.1"
              && interfaces[o].address.length) {
      arrIP.push(interfaces[o].address);
    }
  }
}

// calling a native method but
// we don't know the number of arguments
// Use function.apply
var ipset = Mobile('SetIPAddress');
ipset.call.apply(ipset, arrIP);

var billboard = require('billboard-top-100');
var fs = require('fs');

billboard(function(songs){
          console.log(songs); //prints array of top 100 songs
          console.log(songs[3]); //prints song with rank: 4
          console.log(songs[0].title); //prints title of top song
          console.log(songs[0].artist); //prints artist of top songs
          console.log(songs[0].rank) //prints rank of top song (1)
          
          fs.writeFile("test.txt", songs[0].title, function(){
                       console.log("file written?");
            });
          
});

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<p style="color:#006699">Visit JS/jxcore/app.js to update the code</p><hr/>');
  res.end('<div>' + base_html.replace(/\n/g, "<br/>") + '</div>');
}).listen(3000);
console.log('Server running at (port:3000) ' + arrIP);