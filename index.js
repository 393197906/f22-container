const mustache = require("mustache")
const fs = require("fs")
const fse = require("fs-extra")
const path = require("path")
const compressing = require('compressing');


function getFileContent(filePath) {
    return fs.readFileSync(filePath).toString()
}


// 入口
function main({
                  productName = "noname",
                  env = "master",
                  version = "1.0.0",
                  port = 9001,
                  $engin = {}
              } = {}) {
    const {targetDir = "./out", sourceDir = "./123", zip = false} = $engin;
    const realTargetDir = path.resolve(targetDir, `${productName}-${env}-${port}`)

    fse.removeSync(realTargetDir)
    fse.removeSync(realTargetDir + ".zip")
    fse.mkdirsSync(realTargetDir)

    // copy 代码
    const htmlDir = path.resolve(realTargetDir, "source")
    fse.mkdirsSync(htmlDir)
    fse.copySync(sourceDir, htmlDir)
    // copy dockfile
    fse.copySync(path.resolve(__dirname, "./template"), realTargetDir)
    // 写文件
    const content = getFileContent(path.resolve(__dirname, "./template/run.sh"))
    const result = mustache.render(content, {productName, env, port})
    let fd = fs.openSync(path.resolve(realTargetDir, "run.sh"), 'w');
    fs.writeFileSync(fd, result);
    fs.closeSync(fd);

    // zip
    if (zip) {
        compressing.zip.compressDir(realTargetDir, realTargetDir + ".zip").then(() => fse.removeSync(realTargetDir))
    }


}

// main()

module.exports = main


