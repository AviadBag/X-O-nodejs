const http = require('http');
const io = require('socket.io')(3000);

const get_content_type = require('../test/www/js/content-type');
const read_file = require('../test/www/js/read-file')
const win = require('../test/www/js/win');

let users = {};

const empty = ' '
let arr_2d = [[], [], []];
for (let i = 0; i < arr_2d.length; i++) {
    for (let j = 0; j < arr_2d.length; j++) {
        arr_2d[i][j] = empty;
    }
}

function exists(obj, val) {
    e = false;

    Object.keys(obj).forEach(function(key) {
        if (obj[key] == val) e = true;
    });

    return e;
}

turn = 'X'
function next_turn() {
    if (turn == 'X') turn = 'O';
    else turn = 'X';
}

http.createServer(function(req, res) {    
    path = "";
    
    if (req.url == '/') path = 'www/html/index.html'; 
    else if (req.url == '/favicon.ico') path = "www/images/favicon.ico";
    else path = 'www' + req.url;
    read_file(path, function(p, err, data) {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': get_content_type(p)});
        res.write(data);
        res.end();
    })
    
}).listen(80);

io.on('connection', function(socket) {
    console.log('A new user connected!');


    if (!exists(users, 'O')) users[socket.id] = 'O';
    else users[socket.id] = 'X';

    console.log(`Size: ${Object.keys(users).length}`)
    if (Object.keys(users).length == 2) {
        io.sockets.emit('x-o-start');
        socket.emit('x-o-can-start');
    } else if (Object.keys(users).length > 2) {
        delete users[socket.id];
        socket.emit('x-o-cant-play');
    } 

    socket.on('x-o-click', function(i, j) {        
        arr_2d[i][j] = users[socket.id];
        io.sockets.emit('x-o-change', users[socket.id], i, j);
        
        console.log(arr_2d);

        if (win(arr_2d)) {
            console.log("Win");

            io.sockets.emit('x-o-win', users[socket.id]);
            
            users = {};
            arr_2d = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
            turn = 'X';
        }

        next_turn();
        const id = Object.keys(users).find(key => users[key] === turn);
        io.to(id).emit('x-o-can-start');
    });

    socket.on('disconnect', function() {
        console.log(`${users[socket.id]} disconnected...`);
        users = {};
        arr_2d = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
        turn = 'X';
    });
});
