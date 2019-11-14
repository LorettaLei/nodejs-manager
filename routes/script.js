const express = require('express');
const router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
const logger = require('../logger').logger;
var cheerio = require("cheerio");

router.post('/qq', function (req, res, next) {
    request({
        url: 'http://www.qqw21.com/feizhuliutouxiang/index-1.html',
        method: 'get',
    }, function (err, re, body) { 
            if (err) {
                logger.error(`script:::/qq:::err:${JSON.stringify(err)}`)
                res.send({
                    code: 500,
                    err
                })
            } else {
                const $ = cheerio.load(body);
                console.log($('img'));
                res.send({
                    code: 200,
                    result: $('img')
                })
            }
    })
})
/**生成随机数
 * @method randomNumber
 * @for BASE
 * @param {Number} range 生成的字符串长度
 * @return {Number} range个数字随机组合的数
 *  */
function base_randomNumber(range) {
    var str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    range = range || 10;
    for(var i=0; i<range; i++){
        str += arr[Math.round(Math.random() * (arr.length - 1))];
    }
    return str;
}
module.exports = router;
