const path = require('path');

const mimeTypes = {        // 部分 MINE 和 MIME type 的对应关系
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'audio/x-ms-wmv',
    'xml': 'text/xml',
}

module.exports = (filePath) => {
    let ext = path.extname(filePath)
    .split('.')     // 如 jquery.min.JS 有可能返回的是 ".min.JS"
    .pop()
    .toLowerCase();
    
    
    if (!ext) {   // 如果文件没有 拓展名
        ext = filePath;
    }
    // console.log('ext', ext)

    return mimeTypes[ext] || mimeTypes['txt'];   // 如果能读取到，则返回对应 mimeTypes, 否则都按照 普通文本返回
}