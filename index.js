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
                  productName = "123",
                  env = "master",
                  version = "1.0.1",
                  $engin = {}
              } = {}) {
    const {targetDir = "./out", sourceDir = "./123", zip = true} = $engin;

    const realTargetDir = path.resolve(targetDir, `${productName}-${env}-${version}`)

    fse.removeSync(realTargetDir)
    fse.removeSync(realTargetDir + ".zip")
    fse.mkdirsSync(realTargetDir)

    // copy 代码
    const htmlDir = path.resolve(realTargetDir, "source")
    fse.mkdirsSync(htmlDir)
    fse.copySync(sourceDir, htmlDir)
    // copy dockfile
    fse.copySync("./template", realTargetDir)
    // 写文件
    const content = getFileContent("./template/run.sh")
    const result = mustache.render(content, {productName, env, version})
    let fd = fs.openSync(path.resolve(realTargetDir, "run.sh"), 'w');
    fs.writeFileSync(fd, result);
    fs.closeSync(fd);

    // zip
    if (zip) {
        compressing.zip.compressDir(realTargetDir, realTargetDir + ".zip").then(() => fse.removeSync(realTargetDir))
    }


}

module.exports = main


