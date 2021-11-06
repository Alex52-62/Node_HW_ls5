const http = require('http');
const path = require('path');
const fs = require('fs');

const isFile = (path) => fs.lstatSync(path).isFile();

http.createServer( (req, res) => {
    const executionDir = path.join(process.cwd(), req.url);
    if (!fs.existsSync(executionDir)) return res.end('404 Not Found\n');
    if (isFile(executionDir)) return fs.createReadStream(executionDir).pipe(res);
    
    let screen = '';
    filenames = fs.readdirSync(executionDir);
    filenames.forEach(file => {
        const newPath = path.join(req.url, file);
        console.log(file);
        screen += `<li><a href="${newPath}"><span style="color: #a52a2a;">${file}</span></a></li>`;
    });

    const page = fs
        .readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
        .replace('myDir', screen);
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    return res.end(page);
    
}).listen(8080);

