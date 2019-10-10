function format(date) {
    return date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString()+"-"
    +date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
    // return date.getTime();
}
const imgFormat = {
    "image/jpeg":".jpg",
    "image/png":".png",
    "image/tiff":".tif",
    "image/gif":".gif",
}
module.exports = {
    format,
    imgFormat
};