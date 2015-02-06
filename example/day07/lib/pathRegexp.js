module.exports = pathRegexp;
function pathRegexp(path) {

    var paramNames = [];

    path = path

        // 这个方法用把 * 替换成正则表达式的 [0-9a-zA-Z\-_]* 形式。
        // 上一节介绍了，这里用了 [0-9a-zA-Z\-_]* 目的是一种限定。
        // 如果用 .* 那么 /article/:name 就会有个bug，/article/ok/abc 也是匹配的
        // 这是因为 .* 匹配的话 ok/abc 也是匹配 .* 的，因为 / 也符合。
        .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g, "[0-9a-zA-Z\-_]*")

        // 这个方法是把 :xxx 的形式替换成  [0-9a-zA-Z\-_]*  正则表达式形式。
        // 这个方法还有个作用，就是例如：把 :name的，提取出 name ，并保存到paramNames数组中。
        // 保存到paramNames中的目的是，当有匹配这个路由时，通过paramNames可以得到对应的值。
        // 这也是为什么要采用 ([0-9a-zA-Z\-_]*) 的形式 ，而不是直接 [0-9a-zA-Z\-_]* 用这个，
        // 因为 ([0-9a-zA-Z\-_]*) 形式是正则表达式组的形式，通过通过正则表达式的 RegExp.$1 ... $n 
        // 与paramNames就可得到参数名对应的值  ，例如：
        //  /article/:id  的如果url是 /article/id001 ，那么就有办法得到 id="id001"，因为paramNames数组
        // 现在是 ["id"] ，那么，/article/:id 由这个方法转换后，转换为 /^\/article\/([0-9a-zA-Z\-_]*)\/?$/ 
        // 这个形式。通过  /^\/article\/([0-9a-zA-Z\-_]*)\/?$/g.test("/article/id001") 得到true。
        // 当正则表达式调用了test方法，那么RegExp表达式类的静态值$1 $2 ... 就会重写！
        // 那么，这里RegExp.$1值就是id001。而 paramNames[0] 的值是 id，这样就能得到
        // id和对应的值。
        // 具体实验代码如下：
        //  /^\/article\/([0-9a-zA-Z\-_]*)\/?$/g.test("/article/id001");
        //  console.log(RegExp.$1);  // 打印出 id001
        .replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g,function () {

            // arguments的第一个和最后两个参数，并不是我们想要的$1 ... $n的匹配值，
            // 所以 len 是匹配的数量
            var len = arguments.length - 3;
            for (var i = 0; i < len; i++) {
                var avg = arguments[i + 1];

                // 由于正则嵌套分组，所以要判断匹配字符串是否有 " : " 前缀，
                // 目的是得到 :name的name部分和 :age 的 age部分。
                if (typeof avg === "string" && avg[0] !== ":") {
                    paramNames.push(avg);
                }
            }
            return "([0-9a-zA-Z\-_]*)"

        })

        // 把 /article/:id/ 的转换为 /article/:id
        .replace(/\/$/g, "")

        // 把 / 转换为 \/ ，因为这是字符串形式，最后通过 new RegExp(path)
        // 生成时，必须要经过这个转换。
        .replace(/\//g, "\\\/")

    var regexp = new RegExp("^" + path + "\\/?$");
    regexp.paramNames = paramNames;
    return regexp;
}
