const path = require('path')
const { series } = require('gulp')
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync").create();

const server = path.resolve(__dirname, "mock");

function serve() {
    // 设个变量来防止重复重启
    var started = false;
    var stream = nodemon({
        script: "./mock/server.js",
        // 监听文件的后缀
        ext: "js",
        env: {
            NODE_ENV: "development"
        },
        // 监听的路径
        watch: [server]
    });
    stream
        .on("start", function () {
            if (!started) {
                started = true;
            }
        })
        .on("crash", function () {
            console.error("application has crashed!\n");
            stream.emit("restart", 10);
        });
}

exports.default = serve;