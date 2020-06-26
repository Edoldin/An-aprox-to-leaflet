var http=require('http');
const fs= require('fs');
var path=require('path');

const hostname = '127.0.0.1';//'83.59.176.135'; //'127.0.0.1';
const portHttp = 5001
var servidorHttp=http.createServer(function (solicitud,respuesta){
    console.log(solicitud.url)
    if (solicitud.url == '/')        solicitud.url = '/index.html';
    var filePath = '.' + solicitud.url;
    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        //'.gif': 'image/gif',
        //'.wav': 'audio/wav',
        //'.mp4': 'video/mp4',
        //'.woff': 'application/font-woff',
        //'.ttf': 'application/font-ttf',
        //'.eot': 'application/vnd.ms-fontobject',
        //'.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };
    contentType = mimeTypes[extname] || 'application/octet-stream';
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    respuesta.writeHead(200, { 'Content-Type': contentType });
                    respuesta.end(content, 'utf-8');
                });
            }
            else {
                respuesta.writeHead(500);
                respuesta.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                respuesta.end();
            }
        }
        else {
            respuesta.writeHead(200, { 'Content-Type': contentType });
            respuesta.end(content, 'utf-8');
        }
    });
});
servidorHttp.listen(portHttp);
console.warn('Http listen on port '+portHttp)