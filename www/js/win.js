let arr_2d;
const empty = ' ';

function each_box(callback) {
    for (let i = 0; i < arr_2d.length; i++) {
        for (let j = 0; j < arr_2d[i].length; j++) {
          callback(i, j)  
        }
    }
}

function get_arr_columns() {
    cols_arr_2d = [[], [], []]
    each_box(function(i, j) {
        cols_arr_2d[i].push(arr_2d[j][i]);
    })
    return cols_arr_2d;
}

function equals(array) {
    if (array.indexOf(empty) > -1) return false;
    my_set = new Set(array);
    return my_set.size <= 1;
}

function check_direct() {
    for (let row = 0; row < arr_2d.length; row++) {
        if (equals(arr_2d[row]) || equals(get_arr_columns()[row])) {
            return true;
        }
    }
    return false;
}

function check_diagonally() {
    first_d = [arr_2d[0][0], arr_2d[1][1], arr_2d[2][2]];
    second_d = [arr_2d[0][2], arr_2d[1][1], arr_2d[2][0]];

    if (equals(first_d) && first_d.indexOf(' ') <= -1) return true;
    else if (equals(second_d) && second_d.indexOf(' ') <= -1) return true;

    return false;
}


function win(a) {
    arr_2d = a;
    return check_direct() || check_diagonally();
}

module.exports = win;