content_types = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'ico': 'image/vnd.microsoft.icon',  
}

function get_content_type(path) {
    ext = path.split('.')[path.split('.').length-1];
    return content_types[ext];
}

module.exports = get_content_type;