const fs = require("fs");
function format(date) {
    return date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString()+" "
    +date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getSeconds().toString();
    // return date.getTime();
}
function deleteFolder(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
const imgFormat = {
    "image/jpeg":".jpg",
    "image/png":".png",
    "image/tiff":".tif",
    "image/gif":".gif",
}
module.exports = {
    format,
    imgFormat,
    deleteFolder
};
