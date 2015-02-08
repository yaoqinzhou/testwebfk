/**
 * Created by yaoqing.zhou on 2015/2/4.
 */
module.exports = function (req,res,next){
    console.log('this is from middle02');
    next();
};