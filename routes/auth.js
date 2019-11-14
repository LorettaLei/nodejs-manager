const express = require('express');
const router = express.Router();
const logger = require('../logger').logger;
const Authority = require('../db/authority');

router.get('/list', function (req, res) {
    let query = req.query;
    Authority.countDocuments({}, (error, count) => {
        if (error) {
            logger.error(`auth::/list::error:${JSON.stringify(error)}`);
            res.json({
                status: 400,
                msg: '未知错误'
            });
        } else {
            Authority.find({}).skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize)||20) .sort({ 'created': -1 }).exec((err, doc) => {
                if (err) {
                    logger.error(`auth::/list::err:${JSON.stringify(err)}`);
                    res.json({
                        status: 400,
                        msg: '未知错误'
                    });
                } else {
                    res.json({
                        status: 200,
                        result: doc,
                        total: count,
                        msg:'OK'
                    });
                }
            })
        }
    })
});

//
router.post('/create', function(req, res) {
    let data = req.body;
    if (!data.name) {
        res.json({
            status: 400,
            msg: '导航名称不能为空'
        })
    }
    if (!data.url) {
        res.json({
            status: 400,
            msg: '导航地址不能为空'
        })
    }
    Authority.create({
        auth_id: randomNum(8),
        name: data.name,
        url: data.url,
        actions: JSON.parse(data.actions),
        created: new Date().getTime()
    }, (err, result) => {
        if (err) {
            logger.error(`auth::/create::err:${JSON.stringify(err)}`);
            res.json({
                status: 500,
                msg: '未知错误'
            });
        } else {
            logger.info(`auth::/create::params:${JSON.stringify(data)}`);
            res.json({
                status: 200,
                msg: '创建成功'
            })
        }
    })
});

//
router.post('/update', function(req, res) {
    let data = req.body;
    if (!data._id) {
        res.json({
            status: 400,
            msg: '_id不能为空'
        })
    }
    if (!data.name) {
        res.json({
            status: 400,
            msg: '导航名称不能为空'
        })
    }
    if (!data.url) {
        res.json({
            status: 400,
            msg: '导航地址不能为空'
        })
    }
    Authority.updateOne({_id: data._id}, {
        name: data.name,
        url: data.url,
        actions: JSON.parse(data.actions)
    }, (err, result) => {
        if (err) {
            logger.error(`auth::/update::err:${JSON.stringify(err)}`);
            res.json({
                status: 500,
                msg: '未知错误'
            });
        } else {
            logger.info(`auth::/update::params:${JSON.stringify(data)}`);
            res.json({
                status: 200,
                msg: '更新成功'
            })
        }
    })
});

//
router.post('/delete', function(req, res) {
    let data = req.body;
    if (!data._id) {
        res.json({
            status: 400,
            msg: '_id不能为空'
        })
    }
    Authority.deleteOne({ _id: data._id }, (error, doc) => {
        if (error) {
            logger.error(`auth::/delete::error:${JSON.stringify(error)}`);
            res.json({
                status: 500,
                msg: '未知错误'
            });
        } else {
            logger.info(`auth::/delete::params:${JSON.stringify(data)}`);
            res.json({
                status: 200,
                msg: '已删除'
            });
        }
    })
});

/**生成随机字符串
 * @method randomNum
 * @for BASE
 * @param {Number} range 生成的字符串长度
 * @return {String} range个字母数字随机组合的字符串
 *  */
randomNum= (range)=> {
    var str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    range = range || 10;
    for(var i=0; i<range; i++){
        str += arr[Math.round(Math.random() * (arr.length - 1))];
    }
    return str;
}
module.exports = router;