function format(date) {
    return date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString()+"-"
    +date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
    // return date.getTime();
}

module.exports = format;