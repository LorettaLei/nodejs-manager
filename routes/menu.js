const express = require('express');
const router = express.Router();
const logger = require('../logger').logger;
const Auth = require('../db/auth');
//菜单列表
router.get('/list', function (req, res) {
    let query = req.query;
    Auth.find({}, 'auth_id children name url _id',(error, result) => {
        if (error) {
            logger.error(`menu::/list::error:${JSON.stringify(error)}`);
            res.json({
                status: 400,
                msg: '未知错误'
            });
        } else {
            res.json({
                status: 200,
                result: result
            })
        }
    })
    
});

//菜单更新
router.post('/update', function (req, res) {
    let data = req.body;
    Auth.findOneAndUpdate(
        { auth_id: 100 },
        { $set: { auth_id: 100, name: data.name, url: data.url, children: JSON.parse(data.children) } },
        { upsert: true, new:true },
        (error, result) => {
            // console.log(1,result);
            if (error) {
                logger.error(`menu::/update::error:${JSON.stringify(error)}`);
                res.json({
                    status: 400,
                    msg: '未知错误'
                });
            }else {
                res.json({
                    status: 200,
                    result: result,
                    msg: '更新成功'
                })
        }
    })
    
});
//菜单删除
router.post('/delete', function (req, res) {
    let data = req.body;
    Auth.deleteOne(
        { _id: data.id },
        (error, result) => {
            if (error) {
                logger.error(`menu::/update::error:${JSON.stringify(error)}`);
                res.json({
                    status: 400,
                    msg: '未知错误'
                });
            }else {
                res.json({
                    status: 200,
                    result: result,
                    msg: '删除成功'
                })
        }
    })
    
});

module.exports = router;
