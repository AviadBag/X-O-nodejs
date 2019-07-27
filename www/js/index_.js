const socket = io('http://localhost:3000')

const arr_2d = [[], [], []];

const cant_play_message = document.getElementById('cant-play-message');
const wait_message = document.getElementById('wait-message');

const table_div = document.getElementById('table-div');
const table = document.getElementById('table');

can_play = false;

const all_rows = table.getElementsByTagName("tr");
for (let i = 0; i < all_rows.length; i++) {
    let all_boxes = all_rows[i].getElementsByTagName("td");
    for (let j = 0; j < all_boxes.length; j++) {
        arr_2d[i].push(all_boxes[j])
    }
}

function set(i, j) {
    if (can_play) {
        if (arr_2d[i][j].innerText == 'X' || arr_2d[i][j].innerText == 'O') {
            return false;
        }
        socket.emit('x-o-click', i, j);
        can_play = false;
    }
}

socket.on('x-o-can-start', function() {
    can_play = true;
});

socket.on('x-o-start', function() {
    wait_message.style.display = 'none';
    table_div.style.display = 'block'
});

socket.on('x-o-change', function(t, i, j) {
    arr_2d[i][j].innerText = t;
});

socket.on('x-o-win', function(t) {
    alert(`${t} Won!!!!!!!!`);
    can_play = false;
});

socket.on('x-o-cant-play', function() {
    console.log('cant play...')
    cant_play_message.style.display = 'block';
    wait_message.style.display = 'none';
});