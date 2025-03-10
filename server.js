
var port = 18080;
var odata = require('node-odata');
var mongoose = require('mongoose');
var async = require('async');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var CrStructure = require('./CrStructure');
var ObjectId = mongoose.Types.ObjectId;

//global.db = mongoose.createConnection();

/*数据库连接信息host,port,user,pwd*/
var db_name = 'SnTPMJFRIcnMnJujtQId';                  // 数据库名，从云平台获取
var db_host = 'mongo.duapp.com';      // 数据库地址
var db_port = '8908';   // 数据库端口
var username = '4ea46a5d26bf4884b7a12de5f362f9cd';                 // 用户名（API KEY）
var password = '78e53609d14a4d0e89138a581504a466';                 // 密码(Secret KEY)
var mongo_url = "";

if (process.env.homeloc == "CN_CTUL") {
    db_host = 'localhost';
    db_name = 'oDataTest';
    db_port = '27017';
    mongo_url = 'mongodb://' + db_host + '/' + db_name;
}
else {
    db_name = 'SnTPMJFRIcnMnJujtQId';                  // 数据库名，从云平台获取
    db_host = 'mongo.duapp.com';      // 数据库地址
    db_port = '8908';   // 数据库端口
    mongo_url = "mongodb://" + username + ":" + password + "@" + db_host + ':' + db_port + '/' + db_name;
}

console.log(mongo_url);

var server = odata(mongo_url);
var db = new Db(db_name, new Server(db_host, db_port, {}), { w: 1 });

/*

server.resources.register({
    url: '/exhibitions',
    model: {
        subject: String,
        vanue: Number,
        startDate: String
    }    ,
    
rest: {
    
    // 当进行 GET /resource/:id 获取特定资源时时:
  get: {    
    //在请求完成之后的 handle (异步, response 返回后继续执行)
    after: function (entity) {
        console.log("get entity");
        }
  },
  
 
  // 在进行 GET /resource 获取资源列表时:
  getAll: {
    // 授权验证, 若返回 false, 则客户端将得到 401
     auth: function (req) {
         console.log('auth');
         return true; 
        },
  
    // 在请求之前的 handle (同步, 将阻塞请求)
    before: function (req, res) {        
         console.log('before');
     },     

    //在请求完成之后的 handle (异步, response 返回后继续执行)
    after: function (entity) {
         console.log('getAll entity');
       }
     }  
    },

});
    
    */

server.resource('artcategories',
    {
        _id: String,
        cateName: String,
    }
    );

server.resource('adverts',
    {
        _id: String,
        title: String
    }
    );


server.resource('galleries',
    {
        _id: String,
        name: String,
        description: String,
        address: String,
        longitude: String,
        latitude: String,
        posterURL: String,
        city: String,
    }
    );

server.resource('users',
    {
        _id: String,
        user: String,
        phone: String,
        name: String,
        password: String,
        token: String,
        favorCategory: String,
    }
    );

server.resource('artists',
    {
        _id: String,
        name: String
    }
    );

server.resource('arts',
    {
        _id: String,
        title: String,
        year: String,
        cateName: String,
        price: String
    }
    );


server.resource('mixarts',
    {
        Exhi: {
            _id: String,
            subject: String,
            decsription: String,
            major: String,
            vanue: String,
            curator: String,
            startDate: String,
            startTime: String,
            endDate: String,
            endTime: String,
            triggerDistance: String,
            artCategory: [{
                cateName: String
            }],
            posterURL: String,
            posterThumbnailURL: String,
            address: String,
            longitude: String,
            latitude: String,
        },
        Art: {
            _id: String,
            title: String,
            size: String,
            price: String,
            decsription: String,
            year: String,
            cateName: String,
            posterURL: String,
            posterThumbnailURL: String,
            recommended: Boolean,
            artist: {
                _id: String,
                name: String
            }
        }
    }
    );

server.resource('exhibitions',
    {
        _id: String,
        subject: String,
        major: String,
        vanue: String,
        city: String,
        startDate: String,
        endDate: String,
        triggerDistance: String,
    }
    );

server.resource('journeys',
    {
        _id: String,
        user: String,
        date: String,
        exhibition: String
    }
    );

server.resource('praises',
    {
        _id: String,
        user: String,
        Art: String
    }
    );

server.resource('favorites',
    {
        _id: String,
        user: String,
        Art: String
    }
    );

server.resource('fgalleries',
    {
        _id: String,
        user: String,
        gallery: String
    }
    );

server.resource('fexhibitions',
    {
        _id: String,
        user: String,
        exhibition: String
    }
    );
    
server.resource('beacons',
    {
        _id: String,
        beaconUUID: String,
        major: String,
        minor: String,
        triggerDistance: String,
        triggerDuration: String,
        triggerMessage: String,
        itemNum: String,
    }
    );

server.resource('beaconvisits',
    {
        _id: String,
        user: String,
        beaconUUID: String,
        major: String,
        minor: String,
        date: String,
        startTime: String,
        endTime: String,
        duration: String,
        title: String,
        description: String,
    }
    );

server.resource('notifications',
    {
        _id: String,
        user: String,
        token: String,
        date: String,
        time: String,
    }
    );

server.resource('pictures',
    {
        _id: String,
        picName: String,
        picURL: String,
        picFolder: String,
        dateTime: String,
        picType: String,
        picFormat: String,
    }
    );
    
/*
 
.getAll()
 .auth(function (req) {
         console.log(req);
         console.log("auth");
         return true;
     })
 .before(function (entities) {       
        entities.value[0]["title"] = "欢迎你";
        console.log('adverts before');
        console.log(entities);
        })
 .after(function (entities) {
        console.log('adverts getAll entity');
        console.log(entities.value[0]);
        console.log(entities.value[0][title]);
        console.log(entities.value[0].title);
        
        entities.value[0][title] = "不欢迎你";
                 
        console.log(entities);
        })
                  
*/

server.get('/odata/QBookExhi', function (req, res, next) {
    var exhibitionDAO = CrStructure.mongoose.models.exhibition;  
    //    console.log(req.query); 
    var qParam = req.query;
    if (qParam["artCategory.cateName"]) {

        var arrCategory = qParam["artCategory.cateName"].split(",");
        qParam["artCategory.cateName"] = { $in: arrCategory };

        req.query = qParam;
    }

    if (qParam["city"]) {
            if (qParam["city"] == '\'\'') {
                delete qParam["city"];
            }
            else {
                var arrCity = qParam["city"].split(",");
                qParam["city"] = { $in: arrCity };
            };
            req.query = qParam;
        }

            queryOptionsRefModle(req, res, next, exhibitionDAO, "exhibition");
        }
    );

server.get('/odata/QGallery', function (req, res, next) {
    var galleryDAO = CrStructure.mongoose.models.gallery;

    var qParam = req.query;
    if (qParam["city"]) {
        if (qParam["city"] == '\'\'') {
            delete qParam["city"];
        }
        else {
            var arrCity = qParam["city"].split(",");
            qParam["city"] = { $in: arrCity };
        };
        req.query = qParam;
    }

            queryOptionsRefModle(req, res, next, galleryDAO, "gallery");
        }
    );

server.get('/odata/QJourney', function (req, res, next) {
    var journeyDAO = CrStructure.mongoose.models.journey;

    queryOptionsRefModle(req, res, next, journeyDAO, "exhibition");
}
    );

server.get('/odata/QPraise', function (req, res, next) {
    var praiseDAO = CrStructure.mongoose.models.praise;
    queryOptionsRefModle(req, res, next, praiseDAO, "Art");
}
    );
    
    server.get('/odata/QFGallery', function (req, res, next) {
    var fgalleryDAO = CrStructure.mongoose.models.fgallery;

    queryOptionsRefModle(req, res, next, fgalleryDAO, "gallery");
}
    );

server.get('/odata/QFExhibition', function (req, res, next) {
    var fexhibitionDAO = CrStructure.mongoose.models.fexhibition;
    queryOptionsRefModle(req, res, next, fexhibitionDAO, "exhibition");
}
    );

server.delete('/odata/QPraise', function (req, res, next) {
    var qParam = req.query

    if (!qParam["user"]) {
        console.log("delete err");
        res.json({ "error": "user parameter should not be empty" });
        return;
    };

    var qArt = qParam["Art"];
    qParam["Art"] = { _id: qArt };
    req.query = qParam;

    var praiseDAO = CrStructure.mongoose.models.praise;
    deleteRefModle(req, res, next, praiseDAO);
}
    );

server.get('/odata/QFavorite', function (req, res, next) {
    var FavoriteDAO = CrStructure.mongoose.models.favorite;
    queryOptionsRefModle(req, res, next, FavoriteDAO, "Art");
}
    );

server.delete('/odata/QFavorite', function (req, res, next) {
    var qParam = req.query
    if (!qParam["user"]) {
        console.log("delete err");
        res.json({ "error": "user parameter should not be empty" });
        return;
    };

    var FavoriteDAO = CrStructure.mongoose.models.favorite;
    deleteRefModle(req, res, next, FavoriteDAO);
}
    );

server.get('/odata/QBeacon', function (req, res, next) {
    var beaconDao = CrStructure.mongoose.models.beacon; 
                       
    //  var opts = [{ path: 'Exhi' , model: 'exhibition'}
    //                  , { path: 'Art', model: 'art'} ] ;
                                                         
    var opts = [{ path: 'Art', model: 'art' }];

    queryOptionsRefModleOpts(req, res, next, beaconDao, opts);
}
    );


server.get('/odata/QBeaconVisit', function (req, res, next) {
    var beaconDao = CrStructure.mongoose.models.beacon;
    var beaconVisitDao = CrStructure.mongoose.models.beaconvisit;

    //var opts = [{ path: 'Art', model: 'art' }];

    mongoose.connect(mongo_url, function (err) {
        if (err) throw err;

        var qParam = req.query;

        beaconVisitDao.find(qParam).exec(function (err, docVisits) {

            if (err) {
                console.log(err);
                mongoose.connection.close();
            };

            var arrBeacon = [];
            async.each(docVisits, function (bvobj, callback) {
                arrBeacon.push(bvobj['minor']);
                callback(null);// must call once
            },
                function (err) {
                    if (err) {
                        console.error("error");
                    }
                    else {
                        beaconDao.find({ 'minor': { $in: arrBeacon } })
                        // .populate(opts)
                            .exec(function (err, docbeacon) {

                                if (err) {
                                    console.log(err);
                                    mongoose.connection.close();
                                };

                                var arrBea = docbeacon;

                                res.json(getNewArr(arrBea, docVisits));

                                mongoose.connection.close();
                            });
                    }
                });

        }
            );
    });

});

function getNewArr(oldArr, docVisits) {
    var rtArr = [];
    for (var i = 0, l = oldArr.length; i < l; i++) {
        var item = oldArr[i];
        var visit = docVisits.filter(function (docVisit) {
            return docVisit.minor === item.minor;
        });
        rtArr[i] = {
            beacon: item,
            visit: visit,
        };
    };
    return rtArr;

};

function deleteRefModle(req, res, next, objDao) {

    console.log("delete");

    mongoose.connect(mongo_url, function (err) {
        if (err) throw err;

        var qParam = req.query;

        objDao.remove(qParam, function (err) {

            if (err) {
                console.log(err);
                mongoose.connection.close();
            };
            res.json({ "statues": "200" });
            mongoose.connection.close();
        });
    });
};

function queryOptionsRefModle(req, res, next, objDao, popuName) {

    var qOptions = {};
    mongoose.connect(mongo_url, function (err) {
        if (err) throw err;
        var qParam = req.query;
        if (qParam["skip"] != "") {
            qOptions['skip'] = qParam["skip"];
            delete qParam["skip"];
        };
        if (qParam["limit"] != "") {
            qOptions['limit'] = qParam["limit"];
            delete qParam["limit"];
        };


        if (qParam["populate"] == "true") {
            delete qParam["populate"];
            objDao.find(qParam, null, qOptions).populate(popuName).exec(function (err, docs) {

                if (err) {
                    console.log(err);
                    mongoose.connection.close();
                };
                res.json(docs);
                mongoose.connection.close();
            });
        }
        else {
            delete qParam["populate"];
            objDao.find(qParam, null, qOptions).exec(function (err, docs) {

                if (err) {
                    console.log(err);
                    mongoose.connection.close();
                };
                res.json(docs);
                mongoose.connection.close();
            });
        }
    });
};

function queryRefModle(req, res, next, objDao, popuName) {

    mongoose.connect(mongo_url, function (err) {
        if (err) throw err;

        var qParam = req.query;
        if (qParam["populate"] == "true") {
            delete qParam["populate"];
            objDao.find(qParam).populate(popuName).exec(function (err, docs) {

                if (err) {
                    console.log(err);
                    mongoose.connection.close();
                };
                res.json(docs);
                mongoose.connection.close();
            });
        }
        else {
            delete qParam["populate"];
            objDao.find(qParam).exec(function (err, docs) {

                if (err) {
                    console.log(err);
                    mongoose.connection.close();
                };
                res.json(docs);
                mongoose.connection.close();
            });
        }
    });
}

function queryOptionsRefModleOpts(req, res, next, objDao, opts) {

    mongoose.connect(mongo_url, function (err) {
        if (err) throw err;

        var qParam = req.query;
        if (qParam["populate"] == "true") {
            delete qParam["populate"];

            objDao.find(qParam)
                .populate(opts)
                .exec(function (err, docs) {

                    if (err) {
                        console.log(err);
                        mongoose.connection.close();
                    };
                    res.json(docs);
                    mongoose.connection.close();
                });
        }
        else {
            delete qParam["populate"];
            objDao.find(qParam).exec(function (err, docs) {

                if (err) {
                    console.log(err);
                    mongoose.connection.close();
                };
                res.json(docs);
                mongoose.connection.close();
            });
        }
    });
}

server.get(// WEB API 的 URL // 这里注册了一个 URL '/server-time' 用于获取服务器时间 url: '/server-time',
    '/odata/server-time'
    , function (req, res, next) {
        console.log("RegFunction" + req);
        res.json({
            date: new Date()
        });
    }
    );

server.get(// WEB API 的 URL // 数据库初始化,
    '/odata/initialize'
    , function (req, res, next) {
        console.log("Intialize table");
        CrStructure.crdd();
        res.json({
            date: new Date()
        });
    }
    );
server.get(// WEB API 的 URL // 数据库初始化,
    '/odata/CrSapExhi'
    , function (req, res, next) {
        var CrSapExhi = require('./CrSapExhi');
        console.log("Intialize SapExhi");
        CrSapExhi.crdd();
        res.json({
            date: new Date()
        });
    }
    );


server.get(// WEB API 的 URL // 数据库初始化,
    '/odata/CrMixArt'
    , function (req, res, next) {
        console.log("mixArt");

        var mixArtDAO = CrStructure.mongoose.models.mixArt;
        mixArt(req, res, next, mixArtDAO);

        res.json({
            mixArt: "mixArt"
        });
    }
    );

function mixArt(req, res, next, objDao) {
    var exhiDAO = CrStructure.mongoose.models.exhibition;

    mongoose.connect(mongo_url, function (err) {
        if (err) throw err;
        exhiDAO.find({subject :'巴蜀文化'}).exec((function (err, docs) {
            docs.forEach(function (exhi, i) {
                exhi.Art.forEach(function (art, j) {
                    
                    var exhiMain = exhi;

                    console.log(exhi);

                    var mixArts = {
                        Exhi: {
                            _id: exhiMain['_id'],
                            subject: exhiMain['subject'],
                            decsription: exhiMain['decsription'],
                            major: exhiMain['major'],
                            vanue: exhiMain['vanue'],
                            city: exhiMain['city'],
                            curator: exhiMain['curator'],
                            startDate: exhiMain['startDate'],
                            startTime: exhiMain['startTime'],
                            endDate: exhiMain['endDate'],
                            endTime: exhiMain['endTime'],
                            posterURL: exhiMain['posterURL'],
                            posterThumbnailURL: exhiMain['posterThumbnailURL'],
                            address: exhiMain['address'],
                            artCategory: exhiMain['artCategory'],
                            Scene: exhiMain['Scene'], 
                        }
                        ,
                        Art: {
                            _id: art['_id'],
                            title: art['title'],
                            size: art['size'],
                            price: art['price'],
                            decsription: art['decsription'],
                            year: art['year'],
                            cateName: art['cateName'],
                            posterURL: art['posterURL'],
                            posterThumbnailURL: art['posterThumbnailURL'],
                            artist: { name: art['artist']['name'] },
                           // multiView: art['multiView']
                        }
                    };

                    if (i == 1 && j == 1) {
                        console.log(mixArts);
                    }

                    objDao.create(mixArts, function (err, docs) {
                        if (err) {
                            console.log(err);
                        };
                        //   console.log("-------mixArts----------");
                    });



                });
            });
        }
            ));


        setTimeout(done, 2000);

    });
};

server.get(// WEB API 的 URL // 数据库初始化,
    '/odata/MixArtDetail'
    , function (req, res, next) {
        console.log("MixArtDetail");

        var artDAO = CrStructure.mongoose.models.art;
        mixArtDetail(req, res, next, artDAO);

        res.json({
            mixArt: "MixArtDetail"
        });
    }
    );
    
function mixArtDetail(req, res, next, objDao) {

    mongoose.connect(mongo_url, function (err) {
        if (err) throw err;
        objDao.find().exec((function (err, docs) {
            var arts = docs;
            
                console.log('arts.length:' + arts.length);
            
                docs.forEach(function (art, j) {
                    
                console.log(art._id + ':'+ art.name);

                    var multiView = [];
                    var i = 1;
                    while (i <= 4) 
                    {
                        var n = Math.floor(Math.random() * arts.length + 1)-1;  
                        multiView.push({url:arts[n].posterURL});
                        i++;
                    };
                    
                    
                objDao.update({_id: art._id}, 
                    {$set:{
                        multiView : multiView
                    }}
                     , function(err) {
                        if (err) {
                            console.log(err);
                        }
                        else{
                        }
                    }
                 ); 

            });
        }
      ));


        setTimeout(done, 5000);

    });
};


server.get(// WEB API 的 URL // 数据库初始化,
    '/odata/mixExhiDetail'
    , function (req, res, next) {
        console.log("mixExhiDetail");

        var exhiDAO = CrStructure.mongoose.models.exhibition;
        mixExhiDetail(req, res, next, exhiDAO);

        res.json({
            mixArt: "mixExhiDetail"
        });
    }
    );
    
function mixExhiDetail(req, res, next, objDao) {

    mongoose.connect(mongo_url, function (err) {
        if (err) throw err;
        objDao.find().exec((function (err, docs) {
            var exhis = docs;
            
                console.log('exhis.length:' + exhis.length);
            
                docs.forEach(function (exhi, j) {
                    
                console.log(exhi._id + ':'+ exhi.subject);

                    var multiView = []; 
                    var i = 0;
                    var whilelen = exhi.Art.length;
                    if (exhi.Art.length <= 4) { whilelen = exhi.Art.length }
                    else { whilelen = 4 }                    ;
                    
                    while (i < whilelen) 
                    {
                        multiView.push({url:exhi.Art[i].posterURL});
                        i++;
                    };                    
                    
                objDao.update({_id: exhi._id}, 
                    {$set:{
                        Scene : multiView
                    }}
                     , function(err) {
                        if (err) {
                            console.log(err);
                        }
                        else{
                        }
                    }
                 ); 

            });
        }
      ));


        setTimeout(done, 5000);

    });
};

function done() {
    //关掉链接
    mongoose.connection.close();
    console.log('Connection is closed');
    /*
    // 删除DB
     mongoose.connection.db.dropDatabase(function () {
         mongoose.connection.close();
         console.log('Connection is closed');
    });
    */
}


server.set('prefix', 'odata');

var pre = server.get('prefix');

console.log(pre);

var app = require("./app");
server.use(app);

server.listen(port, function () {
    console.log('OData services has started, you can visit by http://localhost:18080/***');
});



