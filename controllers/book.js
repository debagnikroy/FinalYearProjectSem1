const fetch=require('node-fetch');
const User = require('../models/user');
const Book = require('../models/books');


exports.getListedBooks = (req, res) => {
    User.find({ _id: req.profile._id },{listedBooks:1,_id:0})
        .sort('-created')
        .exec((err, orders) => {
            console.log(orders);
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

exports.getTransferMarketListedBooks = (req, res) => {
    Book.find({ name: 'admin' },{listedBooks:1,_id:0})
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            let result=[];
            if(orders[0].listedBooks==='undefined'){
                res.json(result);
            }

            for(var i=0;i<orders[0].listedBooks.length;i++){
                console.log("transfer market  ",orders[0].listedBooks[i].isbn,orders[0].listedBooks[i].userId);
                console.log("transfer market  ",orders[0].listedBooks[i].userId,"  ",req.profile._id);

                if(orders[0].listedBooks[i].userId == req.profile._id){
                    continue;
                }
                if(orders[0].listedBooks[i].userId != req.profile._id){
                    result.push(orders[0].listedBooks[i]);
                    console.log("if block", orders[0].listedBooks[i]);
                }                    
            }
            console.log("result tm", result)
            res.json(result);
        });
};