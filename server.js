const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 8000

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url)

    const extName = String(path.extname(filePath).toLowerCase())

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png'
    }

    const contentType = mimeTypes[extName] || 'application/octet-stream'

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT"){
                res.writeHead(404, {'Content-Type': 'text/html'})
                res.end('404: file not found')
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content, 'utf-8')
        }
    })
})

server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})