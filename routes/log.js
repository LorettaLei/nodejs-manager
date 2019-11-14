const express = require('express');
const router = express.Router();
const logger = require('../logger').logger;
const Log = require('../db/dataLog');
//菜单列表
router.get('/list', function (req, res) {
    let query = req.query;
    Log.countDocuments({
        account: { $regex: query.user },
        url: { $regex: query.model }
    }, (error, count) => {
        if (error) {
            logger.error(`log::/list::error:${JSON.stringify(error)}`);
            res.json({
                status: 400,
                msg: JSON.stringify(error)
            });
        } else {
            Log.find({
                account: { $regex: query.user },
                url: { $regex: query.model }
            }, 'username url created action title').skip((query.pageNo - 1) * query.pageSize).limit(parseInt(query.pageSize) || 20).sort({ 'created': -1 }).exec((err, result) => {
                if (err) {
                    logger.error(`log::/list::err:${JSON.stringify(err)}`);
                    res.json({
                        status: 400,
                        msg: '未知错误'
                    });
                } else {
                    res.json({
                        status: 200,
                        result: result,
                        total: count,
                        msg: 'OK'
                    })
                }
            })
        }
    })
    
});

//菜单更新
router.post('/create', function (req, res) {
    let data = req.body;
    Log.create({
        username: data.username,
        account: data.account,
        created: new Date().getTime(),
        title: data.title,
        url: data.url,
        action: data.action
    }, (err, doc) => {
        if (err) {
            logger.error(`log::/create::err:${JSON.stringify(err)}`);
            res.json({
                status: 400,
                msg:'未知错误'
            })
        } else {
            logger.info(`log::/create::params:${JSON.stringify(data)}`);
            res.json({
                status: 200,
                msg: '创建成功'
            })
        }
    })
    
});

module.exports = router;