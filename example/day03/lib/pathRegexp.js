/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
module.exports = pathRegexp;

function pathRegexp (path){
    path = path.replace(/\?(.*)$/,"")

        // 这一步是把所有 * 替换成正则表达式(.*)
        .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g,"(.*)")

        // 这一步是把所有 :xxx 替换成正则表达式(.*)
        .replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g,"(.*)")

        // 这一步是把所有 / 路径 变为匹配正则表达式的 \/ 的形式
        .replace(/\//g,"\\\/");

    //这一步，通过生成正则表达式  ，前后的 ^ 和 &amp; 顾名思义，要严格匹配整个路径。
    return new RegExp("^"+path+"$");
}