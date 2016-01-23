/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/serve-static/nodeserve-static.d.ts"/>
/// <reference path="../typings/mongoose/mongoose.d.ts"/>
/// <reference path="../typings/mime/mime.ts"/>

///user post 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var async = require('async');

//global.db = mongoose.createConnection();
console.log('Running mongoose version %s', mongoose.version);

var AdvertSchema = new Schema({
    posterURL: String,
    posterThumbnailURL: String,
    homeURL: String,
    title: String,
    subTitle: String,
    description: String
});

var UserSchema = new Schema({
    user: String,
    phone: String,
    name: String,
    password: String,
    token: String,
    favorCategory: String,
});

var ArtCategorySchema = new Schema({
    cateName: String,
});

var GallerySchema = new Schema({
    _id: String,
    name: String,
    description: String,
    address: String,
    longitude: String,
    latitude: String,
    posterURL: String,
    city: String,
});

var ArtistSchema = new Schema({
    _id: String,
    name: String,
    decsription: String,
    birthdate: String,
    deathdate: String
});

var ArtSchema = new Schema({
    _id: String,
    title: String,
    price: String,
    size: String,
    decsription: String,
    year: String,
    cateName: String,
    posterURL: String,
    posterThumbnailURL: String,
    artist: {
        _id: String,
        name: String
    },
    multiView: [{
        url: String
    }]
});

var ExhibitionSchema = new Schema({
    _id: String,
    subject: String,
    decsription: String,
    major: String,
    vanue: String,
    city: String,
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
    Art: [{
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
        },
        multiView: [{
            url: String
        }]
    }],
    Scene: [{
        url: String
    }]

});


var mixArtSchema = new Schema({
    Exhi: {
        _id: String,
        subject: String,
        decsription: String,
        major: String,
        vanue: String,
        city: String,
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
        Scene: [{
            url: String
        }]
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
        artist: {
            name: String
        },
        multiView: [{
            url: String
        }]
    }

});

var FavoriteSchema = new Schema({
    user: String,
    Art: {
        type: Schema.Types.ObjectId,
        ref: 'art'
    }
});

var PraiseSchema = new Schema({
    user: String,
    Art: {
        type: Schema.Types.ObjectId,
        ref: 'art'
    }
});


var JourneySchema = new Schema({
    user: String,
    date: String,
    exhibition: {
        type: Schema.Types.ObjectId,
        ref: 'exhibition'
    }
});


var beaconSchema = new Schema({
    _id: String,
    beaconUUID: String,
    major: String,
    minor: String,
    triggerDistance: String,
    //beacon停留时间
    triggerDuration: String,
    //触发信息
    triggerMessage: String,
    itemNum: String,
    Exhi: {
        type: Schema.Types.ObjectId,
        ref: 'exhibition'
    },
    Art: [{
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
        },
        multiView: [{
            url: String
        }]
    }]
});

var beaconVisitSchema = new Schema({
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
});

var notificationSchema = new Schema({
    _id: String,
    user: String,
    token: String,
    date: String,
    time: String,
    Exhi: {
        _id: String,
        major: String,
        subject: String,
        decsription: String,
        vanue: String,
        curator: String,
        startDate: String,
        startTime: String,
        endDate: String,
        endTime: String,
        artCategory: [{
            cateName: String
        }],
        posterURL: String,
        posterThumbnailURL: String,
        address: String,
    },
});



var fGallerySchema = new Schema({
    user: String,
    gallery: {
        type: Schema.Types.ObjectId,
        ref: 'gallery'
    }
});

var fExhibitionSchema = new Schema({
    user: String,
    exhibition: {
        type: Schema.Types.ObjectId,
        ref: 'exhibition'
    }
});

var pictureSchema = new Schema({
    _id:String,
    picName:String,
    picURL:String,
    picFolder:String,
    dateTime:String,
    picType:String,
    picFormat:String

});


var ArtCategoryDAO = mongoose.model('artcategory', ArtCategorySchema);
var GalleryDAO = mongoose.model('gallery', GallerySchema);
var AdvertDAO = mongoose.model('advert', AdvertSchema);
var UserDAO = mongoose.model('user', UserSchema);
var ArtistDAO = mongoose.model('artist', ArtistSchema);
var ArtDAO = mongoose.model('art', ArtSchema);
var ExhibitionDAO = mongoose.model('exhibition', ExhibitionSchema);
var FavoriteDAO = mongoose.model('favorite', FavoriteSchema);
var PraiseDAO = mongoose.model('praise', PraiseSchema);
var JourneyDAO = mongoose.model('journey', JourneySchema);
var fGalleryDAO = mongoose.model('fgallery', fGallerySchema);
var fExhibitionDAO = mongoose.model('fexhibition', fExhibitionSchema);
var beaconDao = mongoose.model('beacon', beaconSchema);
var beaconVisitDao = mongoose.model('beaconvisit', beaconVisitSchema);
var notificationDao = mongoose.model('notification', notificationSchema);
var mixArtDao = mongoose.model('mixArt', mixArtSchema);
var pictureDao = mongoose.model('picture',pictureSchema);


function crDD() {
    //数据库连接信息host,port,user,pwd
    var db_name = 'SnTPMJFRIcnMnJujtQId'; // 数据库名，从云平台获取
    var db_host = 'mongo.duapp.com'; // 数据库地址
    var db_port = '8908'; // 数据库端口
    var username = '4ea46a5d26bf4884b7a12de5f362f9cd'; // 用户名（API KEY）
    var password = '78e53609d14a4d0e89138a581504a466'; // 密码(Secret KEY)
    var mongo_url = "";

    /*
    if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
    var db_name = 'SnTPMJFRIcnMnJujtQId';                  // 数据库名，从云平台获取
    var db_host =  'mongo.duapp.com';      // 数据库地址
    var db_port =  '8908';   // 数据库端口
      var db_options = {
            server: {poolSize: 5},
            user: username,
            pass: password,
        };    
    } else {
        db_host = 'localhost';
        db_name = 'oDataTest';
        db_port = '27017';
    }
    */

    if (process.env.homeloc == "CN_CTUL") {

        db_host = 'localhost';
        db_name = 'oDataTest';
        db_port = '27017';
        mongo_url = 'mongodb://' + db_host + '/' + db_name;
    } else {
        db_name = 'SnTPMJFRIcnMnJujtQId'; // 数据库名，从云平台获取
        db_host = 'mongo.duapp.com'; // 数据库地址
        db_port = '8908'; // 数据库端口
        mongo_url = "mongodb://" + username + ":" + password + "@" + db_host + ':' + db_port + '/' + db_name;
    }

    mongoose.connect(mongo_url, function(err) {
        // if we failed to connect, abort
        if (err) throw err;

        // we connected ok        
        createData();

        // var itab = ExhibitionDAO.find()  
        /*
         JourneyDAO.find()
         .populate('exhibition')
         .exec(function (err, doc) {
                    console.log(doc) ;
                 });

        */

    });
}

function createData() {

    var arrArtist = [{
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }
        //size =13
    ];

    var arrArt = [{
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }, {
            obj: new ObjectId()
        }
        //size = 38
    ];
    var arrExhi = [{
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, ];

    var arrBeacon = [{
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, ];

    var arrGallery = [{
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, {
        obj: new ObjectId()
    }, ];

    //art category
    var artcategorys = [{
        cateName: "国画-山水画"
    }, {
        cateName: "国画-花鸟画"
    }, {
        cateName: "国画-人物画"
    }, {
        cateName: "水粉画"
    }, {
        cateName: "油画"
    }, {
        cateName: "版画"
    }, {
        cateName: "书法"
    }, ];

    ArtCategoryDAO.create(artcategorys, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
        // console.log(docs);
    });


    // gallery
    var gallerys = [{
        name: "成都美术馆",
        city: "成都",
        address: "成都光华村",
        _id: arrGallery[0].obj,
        posterURL: "http://smartgallery.duapp.com/images/3000-1.png",
        longitude: "11.11",
        latitude: "44.66"
    }, {
        _id: arrGallery[1].obj,
        city: "成都",
        name: "四川美术馆",
        address: "成都市人民西路6号",
        posterURL: "http://smartgallery.duapp.com/images/3000-1.png",
        longitude: "11.11",
        latitude: "44.66"
    }, {
        _id: arrGallery[2].obj,
        city: "成都",
        name: "成都蓉城美术馆",
        address: "成都市温江区天乡路888号",
        posterURL: "http://smartgallery.duapp.com/images/3000-1.png",
        longitude: "11.11",
        latitude: "44.66"
    }, ];

    GalleryDAO.create(gallerys, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
        console.log(docs);
    });


    //users         
    var users = [];

    users.push({
        user: "15378177988",
        name: "Lambert Chen",
        password: "123456",
        favorCategory: "国画-花鸟画,油画"
    })
    users.push({
        user: "15828401441",
        name: "Li Haiyang",
        password: "123456",
        favorCategory: "国画-山水画,国画-花鸟画"
    });

    UserDAO.create(users, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
        // console.log(docs);
    });


    //artists         
    var artists = [{
            _id: arrArtist[0].obj,
            name: "齐白石",
        }, {
            _id: arrArtist[1].obj,
            name: "列宾",
        }, {
            _id: arrArtist[2].obj,
            name: "克拉姆斯柯依",
        }, {
            _id: arrArtist[3].obj,
            name: "瓦西里耶夫",
        }, {
            _id: arrArtist[4].obj,
            name: "吴湖帆",
        }, {
            _id: arrArtist[5].obj,
            name: "孙大莉",
        }, {
            _id: arrArtist[6].obj,
            name: "张琪",
        }, {
            _id: arrArtist[7].obj,
            name: "王枕美",
        }, {
            _id: arrArtist[8].obj,
            name: "佚名",
        }, {
            _id: arrArtist[9].obj,
            name: "易天也",
        }, {
            _id: arrArtist[10].obj,
            name: "李国生",
        },

        {
            _id: arrArtist[11].obj,
            name: "杨飞云",
        }, {
            _id: arrArtist[12].obj,
            name: "白狼",
        }

    ];


    ArtistDAO.create(artists, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
        // console.log(docs);
    });


    //adverts
    var adverts = [];

    adverts.push({
        title: "百度欢迎你",
        posterURL: "http://smartgallery.duapp.com/images/1000-1.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/1000-1.png",
        homeURL: "www.baidu.com",
        subTitle: "内事问百度",
        description: "全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。",
    });

    adverts.push({
        title: "搜狐欢迎你",
        posterURL: "http://smartgallery.duapp.com/images/1000-2.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/1000-2.png",
        homeURL: "www.sohu.com",
        subTitle: "全球最大的中文门户网站",
        description: "搜狐网是全球最大的中文门户网站,为用户提供24小时不间断的最新资讯,及搜索、邮件等网络服务。内容包括全球热点事件、突发新闻、时事评论、热播影视剧、体育赛事",
    });

    adverts.push({
        title: "QQ欢迎你",
        posterURL: "http://smartgallery.duapp.com/images/1000-4.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/1000-4.png",
        homeURL: "www.qq.com",
        subTitle: "中国浏览量最大的中文门户网站",
        description: "腾讯网(www.QQ.com)是中国浏览量最大的中文门户网站,是腾讯公司推出的集新闻信息、互动社区、娱乐产品和基础服务为一体的大型综合门户网站。",

    });

    AdvertDAO.create(adverts, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
        // console.log(docs);
    });

    //art         
    var arts = [];

    arts.push({
        _id: arrArt[0].obj,
        title: "水盆里的虾",
        size: "",
        price: "5000",
        decsription: "3条小虾",
        year: "1940",
        cateName: "国画-花鸟画",
        posterURL: "http://smartgallery.duapp.com/images/B-1.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/S-1.png",
        artist: {
            _id: arrArtist[0].obj,
            name: "齐白石"
        }
    });
    arts.push({
        _id: arrArt[1].obj,
        title: "夜色里的莫斯科",
        size: "",
        price: "2000",
        decsription: "莫斯科郊外的晚上",
        year: "1990",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/B-2.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/S-2.png",
        artist: {
            _id: arrArtist[1].obj,
            name: "列宾"
        }
    });
    arts.push({
        _id: arrArt[2].obj,
        title: "荷塘月色",
        size: "",
        price: "3000",
        decsription: "朱自清的荷塘",
        year: "2000",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/B-3.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/S-3.png",
        artist: {
            _id: arrArtist[9].obj,
            name: "易天也"
        }
    });
    arts.push({
        _id: arrArt[3].obj,
        title: "民工",
        size: "",
        price: "3500",
        decsription: "IT民工",
        year: "2015",
        cateName: "国画-人物画",
        posterURL: "http://smartgallery.duapp.com/images/B-2.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/S-4.png",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });
    //Exh2 - 9 items
    arts.push({
        _id: arrArt[4].obj,
        title: "夏日山居图",
        size: "66X220cm",
        price: "3500",
        decsription: "夏日山居图",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/夏日山居图.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/夏日山居图.jpg",
        artist: {
            _id: arrArtist[7].obj,
            name: "王枕美"
        }
    });

    arts.push({
        _id: arrArt[5].obj,
        title: "梦游太虚",
        size: "298x153cm",
        price: "3500",
        decsription: "亚麻油色2013",
        year: "2013",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/孙大莉梦游太虚298cmx153cm亚麻油色2013.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/孙大莉梦游太虚298cmx153cm亚麻油色2013.jpg",
        artist: {
            _id: arrArtist[5].obj,
            name: "孙大莉"
        }
    });

    arts.push({
        _id: arrArt[6].obj,
        title: "过山风",
        size: "169X115CM",
        price: "2500",
        decsription: "过山风,亚麻油色",
        year: "2012",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/孙大莉过山风169cmx115cm亚麻油色2012.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/孙大莉过山风169cmx115cm亚麻油色2012.jpg",
        artist: {
            _id: arrArtist[5].obj,
            name: "孙大莉"
        }
    });

    arts.push({
        _id: arrArt[7].obj,
        title: "江山多娇(屏风)",
        size: "100×200×13cm",
        price: "4500",
        decsription: "西伯利亚红松",
        year: "2012",
        cateName: "国画-人物画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/李国生江山多娇(屏风)100×200×13cm西伯利亚红松2012.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/李国生江山多娇(屏风)100×200×13cm西伯利亚红松2012.jpg",
        artist: {
            _id: arrArtist[10].obj,
            name: "李国生"
        }
    });

    arts.push({
        _id: arrArt[8].obj,
        title: "菩提心",
        size: "43×33×6cm",
        price: "6500",
        decsription: "菩提心,椴木",
        year: "2014",
        cateName: "国画-人物画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/李国生菩提心43×33×6cm椴木2014.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/李国生菩提心43×33×6cm椴木2014.jpg",
        artist: {
            _id: arrArtist[10].obj,
            name: "李国生"
        }
    });

    arts.push({
        _id: arrArt[9].obj,
        title: "西北的云",
        size: "90×75cm",
        price: "1500",
        decsription: "西北的云,亚麻布",
        year: "2015",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/杨飞云西北的云亚麻布90×75cm.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/杨飞云西北的云亚麻布90×75cm.jpg",
        artist: {
            _id: arrArtist[11].obj,
            name: "杨飞云"
        }
    });

    arts.push({
        _id: arrArt[10].obj,
        title: "老画家",
        size: "68X78cm",
        price: "5500",
        decsription: "老画家",
        year: "2015",
        cateName: "国画-人物画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/老画家宣纸中国画68X78cm.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/老画家宣纸中国画68X78cm.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[11].obj,
        title: "藏族姑娘",
        size: "68X78cm",
        price: "6500",
        decsription: "藏族姑娘",
        year: "2015",
        cateName: "国画-人物画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/藏族姑娘宣纸中国画68X78cm.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/藏族姑娘宣纸中国画68X78cm.jpg",
        artist: {
            _id: arrArtist[6].obj,
            name: "张琪"
        }
    });

    arts.push({
        _id: arrArt[12].obj,
        title: "雁荡山揽胜图",
        size: "",
        price: "3500",
        decsription: "雁荡山揽胜图",
        year: "2015",
        cateName: "国画-人物画",
        posterURL: "http://smartgallery.duapp.com/images/Exh2/雁荡山揽胜图.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/雁荡山揽胜图.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });


    //Ehx3 - 11 items
    arts.push({
        _id: arrArt[13].obj,
        title: "师生绘画作品展1",
        size: "",
        price: "3500",
        decsription: "师生绘画作品展1",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展1.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展1.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[14].obj,
        title: "师生绘画作品展2",
        size: "",
        price: "3500",
        decsription: "师生绘画作品展2",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展2.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展2.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[15].obj,
        title: "师生绘画作品展3",
        size: "",
        price: "3500",
        decsription: "师生绘画作品展3",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展3.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展3.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[16].obj,
        title: "师生绘画作品展4",
        size: "",
        price: "3500",
        decsription: "师生绘画作品展4",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展4.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展4.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[17].obj,
        title: "师生绘画作品展5",
        size: "",
        price: "3500",
        decsription: "师生绘画作品展5",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展5.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展5.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[18].obj,
        title: "师生绘画作品展6",
        size: "",
        price: "3500",
        decsription: "师生绘画作品展6",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展6.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展6.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[19].obj,
        title: "师生绘画作品展7",
        size: "",
        price: "3500",
        decsription: "师生绘画作品展7",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展7.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展7.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[20].obj,
        title: "师生绘画作品展8",
        size: "",
        price: "3500",
        decsription: "师生绘画作品展8",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展8.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展8.jpg",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[21].obj,
        title: "荷花",
        size: "50X18cm",
        price: "4500",
        decsription: "这幅作品，是在“创格初成”展厅当中最重要的一张作品，是吴湖帆先生，自己对着一盆荷花所做的一幅图叫《荷花》。用吴湖帆先生自己说，是他“创格第一帧”。也就是说这种画法是他自己所创造的，因此这张画在整个吴湖帆先生的艺术生涯当中，它非常重要，是他花卉作品当中的代表作之一。",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/荷花.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/荷花.jpg",
        artist: {
            _id: arrArtist[4].obj,
            name: "吴湖帆"
        }
    });

    arts.push({
        _id: arrArt[22].obj,
        title: "梅影三生",
        size: "50X118cm",
        price: "4500",
        decsription: "这幅作品叫《梅影三生》，它非常的有趣。这幅作品是吴湖帆先生画的背景，中间的人物，他请了当时有名的人物画家孔小瑜创作的，画的是梅景书屋里的三位主人。月中人是他去世的前妻潘静淑，一位是他的继室顾抱真。后面的小房子就是梅景书屋和他本人。因此，这种画法和想法，我觉得都是在民国的书画当中很少有的，是他晚年的力作。他的笔墨非常好，我们所谓的吴湖帆先生的画，有“云山雾罩”的感觉，这是近现代山水当中最好的，最高明的一种画法。同样的，这幅画也是当中运用到了他很多绘画上的，个人独特的技法。那种云雾的感觉，如果你仔细观察的话，会觉得非常震憾。",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/梅影三生.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/梅影三生.jpg",
        artist: {
            _id: arrArtist[4].obj,
            name: "吴湖帆"
        }
    });

    arts.push({
        _id: arrArt[23].obj,
        title: "云表奇峰",
        size: "40X110cm",
        price: "6500",
        decsription: "这幅作品就是他最有名的《云表奇峰》，画的是山水。当时的叶恭绰先生在上面题词“为湖帆成名之作，精力弥满，万象在旁”，就说这张画以后，吴湖帆先生从早期的学明清为主，开始上溯到唐宋元三代，真正成为一个中国山水画大家的开始，是由这张画开始。",
        year: "2015",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh3/云表奇峰.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/云表奇峰.jpg",
        artist: {
            _id: arrArtist[4].obj,
            name: "吴湖帆"
        }
    });

    arts.push({
        _id: arrArt[24].obj,
        title: "蜻蜓",
        size: "50X18cm",
        price: "3500",
        decsription: "这是画家野外写生的作品之一。他使用了有节制的色彩，依然给人以丰富多彩的感觉，使画面充满阳光和空气感。列宾的这类室外写生作品，尽量保持人物的自然灵性，以非同寻常的技法，真实朴素地描绘了与自己亲近的人物形象。画中这位活泼可爱的女孩是画家的女儿列宾娜，她在父亲面前没有任何矫揉造作之神态",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh4/蜻蜓.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/蜻蜓.jpg",
        recommended: true,
        artist: {
            _id: arrArtist[1].obj,
            name: "列宾"
        }
    });

    arts.push({
        _id: arrArt[25].obj,
        title: "荒野中的基督",
        size: "50X118cm",
        price: "",
        decsription: "克拉姆斯柯依是位关心社会疾苦、善于思考社会人生的画家。在这幅画中，画家借用基督的形象，影射当时的知识分子在真理与名利诱惑之下难以抉择的境况。这个基督身处荒野的孤立之中，他在四十天断食期间，受到恶魔的诱惑，思想十分深沉，百思难解的困惑，压得他透不过气来。画家通过陷入苦苦思索的基督姿态，表现了一个思想家愿献身于社会的精神和毅力，同时也流露出他对罪恶社会的万般无奈，这正是当时进步知识分子的心理状态。画面近景乱石铺陈，远景空旷无垠。黎明时光，地平线上升起一抹朝霞。这清冷的色调，烘托出基督的内心的痛苦与孤独，同时也隐含着俄国社会的黑暗与没落。",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh4/荒野中的基督.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/荒野中的基督.jpg",
        recommended: true,
        artist: {
            _id: arrArtist[2].obj,
            name: "克拉姆斯柯依"
        }
    });

    arts.push({
        _id: arrArt[26].obj,
        title: "蒙特尔肖像",
        size: "107X115CM",
        price: "",
        decsription: "肖像主人是匈牙利著名钢琴家李斯特最钟爱的学生索菲亚•罗西菲芙娜•门特尔（1846-1918）。1887年，列宾在漫游欧洲时，曾经到访她位于巴伐利亚的住处。索菲亚•门特尔的美貌和鲜明、自然的音乐气质征服了列宾。画面中，美貌的青年女子身穿白色皱领盛装，在钢琴旁专注地凝望。钢琴盖上有一大捧盛开的鲜花，无声地证明了她刚刚获得演出成功。在这件作品中，列宾展示了色彩大师的技巧，大胆使用红色的玫瑰花，与挂在椅背斗篷上的红色裘皮交相辉映。",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh4/列宾《蒙特尔肖像》.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/列宾《蒙特尔肖像》.jpg",
        recommended: true,
        artist: {
            _id: arrArtist[3].obj,
            name: "瓦西里耶夫"
        }
    });

    arts.push({
        _id: arrArt[27].obj,
        title: "伏尔加河回响1",
        size: "",
        price: "",
        decsription: "伏尔加河回响1",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响1.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响1.png",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[28].obj,
        title: "伏尔加河回响2",
        size: "",
        price: "",
        decsription: "伏尔加河回响2",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响2.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响2.png",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[29].obj,
        title: "伏尔加河回响3",
        size: "",
        price: "",
        decsription: "伏尔加河回响3",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响3.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响3.png",
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[30].obj,
        title: "养蜂人",
        size: "",
        price: "",
        decsription: "养蜂人",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh4/克拉姆斯柯依《养蜂人》.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/克拉姆斯柯依《养蜂人》.jpg",
        artist: {
            _id: arrArtist[2].obj,
            name: "克拉姆斯柯依"
        }
    });

    arts.push({
        _id: arrArt[31].obj,
        title: "巴维尔·米哈伊洛维奇·特列恰科夫肖像",
        size: "",
        price: "",
        decsription: "巴维尔·米哈伊洛维奇·特列恰科夫肖像",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh4/列宾《巴维尔·米哈伊洛维奇·特列恰科夫肖像》.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/列宾《巴维尔·米哈伊洛维奇·特列恰科夫肖像》.jpg",
        artist: {
            _id: arrArtist[1].obj,
            name: "列宾"
        }
    });

    arts.push({
        _id: arrArt[32].obj,
        title: "荷叶",
        size: "50X18cm",
        price: "",
        decsription: "",
        year: "",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览6.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览6.jpg",
        recommended: true,
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[33].obj,
        title: "修路者",
        size: "50X118cm",
        price: "",
        decsription: "",
        year: "",
        cateName: "版画",
        posterURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览2.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览2.jpg",
        recommended: true,
        artist: {
            _id: arrArtist[8].obj,
            name: "佚名"
        }
    });

    arts.push({
        _id: arrArt[34].obj,
        title: "一诺千金",
        size: "107X115CM",
        price: "",
        decsription: "",
        year: "",
        cateName: "书法",
        posterURL: "http://smartgallery.duapp.com/images/Exh5/白狼3.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/白狼3.jpg",
        recommended: true,
        artist: {
            _id: arrArtist[12].obj,
            name: "白狼"
        }
    });

    arts.push({
        _id: arrArt[35].obj,
        title: "台湾美术展览1",
        size: "",
        price: "",
        decsription: "台湾美术展览1",
        year: "",
        cateName: "油画",
        posterURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览1.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览1.jpg",
        artist: {
            _id: arrArtist[12].obj,
            name: "白狼"
        }
    });

    arts.push({
        _id: arrArt[36].obj,
        title: "祥鹤排云上九重",
        size: "50X18cm",
        price: "",
        decsription: "仙鹤在古代是“一鸟之下,万鸟之上”,仅次于凤凰的“一品鸟”,明清一品官吏的官服编织的图案就是“仙鹤”。同时鹤因为仙风道骨，为羽族之长，自古被称为「一品鸟」，寓意第一。一品是古代最高官阶的名称，皇帝以下文武百官共分九级，一品最高。仙鹤也是鸟类中最高贵的一种鸟，代表长寿、富贵。传说它享有几千年的寿命. 仙鹤独立,翘首远望,姿态优美,色彩不艳不娇,高雅大方。",
        year: "",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh6/祥鹤排云上九重.jpeg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh6/祥鹤排云上九重.jpeg",
        recommended: true,
        artist: {
            _id: arrArtist[9].obj,
            name: "易天也"
        }
    });

    arts.push({
        _id: arrArt[37].obj,
        title: "江山多娇",
        size: "50X18cm",
        price: "",
        decsription: "该画作风格古朴，墨色浓郁，笔墨线条流畅细腻，达到了一种近工远写的艺术效果。画中重山叠翠，云雾飘渺，与近处瀑布飞溅的水雾融为一体，似奔腾的江流一般环绕于山峦之间，颇有一种蓬莱仙境之感，蔚为壮观，同时也展现了大自然的勃勃生机。是一幅非常具有观赏性与艺术收藏价值的精品山水画作。",
        year: "",
        cateName: "国画-山水画",
        posterURL: "http://smartgallery.duapp.com/images/Exh6/江山多娇.jpeg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh6/江山多娇.jpeg",
        recommended: true,
        artist: {
            _id: arrArtist[9].obj,
            name: "易天也"
        }
    });

    ArtDAO.create(arts, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
        // console.log(docs);
    });

    //  exhibitions
    var exhibitions = [];

    exhibitions.push({
        _id: arrExhi[0].obj,
        major: "1",
        subject: "2016年新锐艺术家展",
        decsription: "7月9日下午4点，隋建国的最新个展“触手可及”在佩斯北京画廊正式开幕，展出他过去两年间创作的最新作品。隋建国一直是中国当代雕塑的领军人物，被评论家誉为“在观念主义方向上走得最早也最远的中国雕塑家”。他的雕塑将观念与形式巧妙地结合在一起，在艺术探索中对创作观念、作品形式、媒介选择、处理方法、时空经验等多个方面都有独特的理解和认识。此次个展距离艺术家上次的中国个展已过去3年，在此期间，隋建国于纽约、洛杉矶、法兰克福、威尼斯、伦敦等地举办并参与了多个重要个展及群展。　　纵观隋建国近三十年的创作生涯，会发现他每个阶段作品的特征变化背后一直可以感受到一种一以贯之的精神。从早期的“材料”时期作品如《地罣》，到后来的“符号”时期作品如《衣钵》、《中国制造》，再到现在的新作系列，隋建国的创作正在不断触及对物本身的哲学性思考，以及与“物”对应的自身身体与世界关系的反思。隋建国新作的创作始于两年前，并于2014年在洛杉矶L.A. Louver画廊为其举行的个展中首次亮相。该展览被《洛杉矶时报》评价为“具有煽动力且生机勃勃”。展览中名为“黑森林”的新作品占据了展厅的重要位置，这座闪着石墨光泽的高耸铜墙透露出了艺术家创作的某些微妙变化。",
        vanue: "日本东京都美术馆",
        curator: "从 “Best Selection 2015” 的出品艺术家中挑选数名具有发展前途的新锐艺术家以个展的形式联合举办的展览。尽请欣赏艺术家们极具个性的作品。",
        startDate: "2016-02-19",
        startTime: "10:00",
        endDate: "2016-03-15",
        endTime: "18:00",
        artCategory: [{
            cateName: "雕刻"
        }, {
            cateName: "版画"
        }],
        posterURL: "http://smartgallery.duapp.com/images/1000-1.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/1000-1.png",
        address: "成都市高新区天府大道天府软件园C1楼",
        Art: [{
                _id: arrArt[0].obj,
                title: "水盆里的虾",
                price: "5000",
                decsription: "3条小虾",
                year: "1940",
                cateName: "国画-花鸟画",
                posterURL: "http://smartgallery.duapp.com/images/B-1.png",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/S-1.png",
                recommended: true,
                artist: {
                    _id: arrArtist[0].obj,
                    name: "齐白石"
                }
            }, {
                _id: arrArt[1].obj,
                title: "夜色里的莫斯科",
                price: "2000",
                decsription: "莫斯科郊外的晚上",
                year: "1990",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/B-2.png",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/S-2.png",
                artist: {
                    _id: arrArtist[1].obj,
                    name: "列宾"
                }
            },

        ]
    });


    exhibitions.push({
        _id: arrExhi[1].obj,
        major: "2",
        subject: "“写意忘情谷”浙江中青年画家写生作品展",
        decsription: "写意当代美术联盟由一群不同职业、职务、职称、年龄却有着共同艺术追求的美术玩家自愿结盟，通过微信平台交流各自的艺术作品和观念。联盟聘请浙江师范大学美术学院宋永进教授为学术主持，并在全国各地组建若干个学术部落，不定期通过联盟公众平台举办各类微展。这种微展方式受众面广，交流深且真，打破了传统实体展览的桎梏。微展方式本身也是一种艺术行为，通过信息化手段展现艺术家对当代文明的思考。此次联盟组织浙江各学术部落走入黄岩“忘情谷”写生基地进行写生创作活动，艺术家以一种＂玩艺术”的自在状态创作各自的作品，呈现的作品形式多样、风格各异。这次活动第一次将美术玩家从网络交流转为面对面交流，是一次对信息化媒体交流的有效补充。。",
        vanue: "四川美术馆",
        curator: "宋永进",
        startDate: "2015-07-10",
        startTime: "9:30",
        endDate: "2015-07-19",
        endTime: "21:00",
        artCategory: [{
            cateName: "油画"
        }, {
            cateName: "国画-山水画"
        }, {
            cateName: "国画-花鸟画"
        }],
        posterURL: "http://smartgallery.duapp.com/images/3000-1.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/1000-2.png",
        address: "成都市人民西路6号",
        Art: [{
                _id: arrArt[2].obj,
                title: "荷塘月色",
                price: "3000",
                decsription: "朱自清的荷塘",
                year: "2000",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/B-3.png",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/S-3.png",
                recommended: true,
                artist: {
                    _id: arrArtist[9].obj,
                    name: "易天也",
                },
            }, {
                _id: arrArt[3].obj,
                title: "民工",
                size: "",
                price: "3500",
                decsription: "IT民工",
                year: "2015",
                cateName: "国画-人物画",
                posterURL: "http://smartgallery.duapp.com/images/B-2.png",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/S-4.png",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            },

        ]
    });

    //Exh2
    exhibitions.push({
        _id: arrExhi[2].obj,
        major: "3",
        subject: "2015年四川艺术博览会参展精品赏析",
        decsription: "2015年四川艺术博览会即将于8月2-10日在成都当代美术馆举行。已有100多家美术机构、艺术画廊确定展位，来自台湾的宝铼国际画廊、汉乡画廊和乌克兰的DARA ART CENTER画廊，美国Beiming Art Studio（北溟艺术)、Leona Craig Art（美国LC艺廊）等20多家欧亚国家的优秀画廊参展本次艺博会,将展出朱德群、丁绍光、何家英、罗中立、许江、苏新平、何多苓、庞茂琨等当代名家经典作品",
        vanue: "成都当代美术馆",
        curator: "不详",
        startDate: "2015-08-02",
        startTime: "9:30",
        endDate: "2015-08-10",
        endTime: "21:00",
        artCategory: [{
            cateName: "油画"
        }, {
            cateName: "国画-山水画"
        }, {
            cateName: "国画-花鸟画"
        }],
        posterURL: "http://smartgallery.duapp.com/images/Exh2/夏日山居图.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/夏日山居图.jpg",
        address: "成都市高新区天府大道 天府软件园C1楼",
        Art: [{
                _id: arrArt[4].obj,
                title: "夏日山居图",
                size: "66X220cm",
                price: "3500",
                decsription: "夏日山居图",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/夏日山居图.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/夏日山居图.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[7].obj,
                    name: "王枕美"
                },
            }, {
                _id: arrArt[5].obj,
                title: "梦游太虚",
                size: "298x153cm",
                price: "3500",
                decsription: "亚麻油色2013",
                year: "2013",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/孙大莉梦游太虚298cmx153cm亚麻油色2013.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/孙大莉梦游太虚298cmx153cm亚麻油色2013.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[5].obj,
                    name: "孙大莉"
                },
            },

            {
                _id: arrArt[6].obj,
                title: "过山风",
                size: "169X115CM",
                price: "2500",
                decsription: "过山风,亚麻油色",
                year: "2012",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/孙大莉过山风169cmx115cm亚麻油色2012.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/孙大莉过山风169cmx115cm亚麻油色2012.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[5].obj,
                    name: "孙大莉"
                }
            },

            {
                _id: arrArt[7].obj,
                title: "江山多娇(屏风)",
                size: "100×200×13cm",
                price: "4500",
                decsription: "西伯利亚红松",
                year: "2012",
                cateName: "国画-人物画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/李国生江山多娇(屏风)100×200×13cm西伯利亚红松2012.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/李国生江山多娇(屏风)100×200×13cm西伯利亚红松2012.jpg",
                artist: {
                    _id: arrArtist[10].obj,
                    name: "李国生"
                }
            }, {
                _id: arrArt[8].obj,
                title: "菩提心",
                size: "43×33×6cm",
                price: "6500",
                decsription: "菩提心,椴木",
                year: "2014",
                cateName: "国画-人物画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/李国生菩提心43×33×6cm椴木2014.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/李国生菩提心43×33×6cm椴木2014.jpg",
                artist: {
                    _id: arrArtist[10].obj,
                    name: "李国生"
                }
            },

            {
                _id: arrArt[9].obj,
                title: "西北的云",
                size: "90×75cm",
                price: "1500",
                decsription: "西北的云,亚麻布",
                year: "2015",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/杨飞云西北的云亚麻布90×75cm.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/杨飞云西北的云亚麻布90×75cm.jpg",
                artist: {
                    _id: arrArtist[11].obj,
                    name: "杨飞云"
                }
            }, {
                _id: arrArt[10].obj,
                title: "老画家",
                size: "68X78cm",
                price: "5500",
                decsription: "老画家",
                year: "2015",
                cateName: "国画-人物画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/老画家宣纸中国画68X78cm.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/老画家宣纸中国画68X78cm.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            },

            {
                _id: arrArt[11].obj,
                title: "藏族姑娘",
                size: "68X78cm",
                price: "6500",
                decsription: "藏族姑娘",
                year: "2015",
                cateName: "国画-人物画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/藏族姑娘宣纸中国画68X78cm.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/藏族姑娘宣纸中国画68X78cm.jpg",
                artist: {
                    _id: arrArtist[6].obj,
                    name: "张琪"
                }
            },

            {
                _id: arrArt[12].obj,
                title: "雁荡山揽胜图",
                size: "",
                price: "3500",
                decsription: "雁荡山揽胜图",
                year: "2015",
                cateName: "国画-人物画",
                posterURL: "http://smartgallery.duapp.com/images/Exh2/雁荡山揽胜图.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh2/雁荡山揽胜图.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            },



        ]
    });
    //Exh3
    exhibitions.push({
        _id: arrExhi[3].obj,
        major: "4",
        subject: "“梅景书屋”师生绘画作品展",
        decsription: "成都当代美术馆将于9月1日开始，展出声明显赫的“梅景书屋”师生重要绘画作品60余件。这些原作，既是承载着清晰而重要的20世纪海派绘画历史价值的文物，更是散发鲜明活力的艺术珍品。包括吴湖帆、王季迁、徐邦达、朱梅邨、陆抑非、张守成、俞子才、潘静淑等近现代书画名家的作品。其中展览中的吴湖帆先生绘画、书法作品，从风格上大致囊括了各个时期的典型面貌，有不少重要作品都是极其罕见的孤品。其他几位画家的作品也都精彩纷呈。由于得到了著名美术评论家徐建融先生、吴湖帆嫡孙吴元京先生等众多学界前辈顾问的指导帮助，我们这次画展，对于关注和收藏海派绘画重要作品，尤其是梅景书屋作品的观者而言，是一次绝佳的时机.A. Louver画廊为其举行的个展中首次亮相。该展览被《洛杉矶时报》评价为“具有煽动力且生机勃勃”。展览中名为“黑森林”的新作品占据了展厅的重要位置，这座闪着石墨光泽的高耸铜墙透露出了艺术家创作的某些微妙变化。",
        vanue: "成都当代美术馆",
        curator: "不详",
        startDate: "2015-09-01",
        startTime: "10:00",
        endDate: "2015-09-04",
        endTime: "18:00",
        artCategory: [{
            cateName: "国画-山水画"
        }],
        posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展1.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展1.jpg",
        address: "成都市高新区天府大道天府软件园C1楼",
        Art: [{
                _id: arrArt[13].obj,
                title: "师生绘画作品展1",
                size: "",
                price: "3500",
                decsription: "师生绘画作品展1",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展1",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展1",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[14].obj,
                title: "师生绘画作品展2",
                size: "",
                price: "3500",
                decsription: "师生绘画作品展2",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展2.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展2.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[15].obj,
                title: "师生绘画作品展3",
                size: "",
                price: "3500",
                decsription: "师生绘画作品展3",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展3.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展3.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[16].obj,
                title: "师生绘画作品展4",
                size: "",
                price: "3500",
                decsription: "师生绘画作品展4",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展4.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展4.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[17].obj,
                title: "师生绘画作品展5",
                size: "",
                price: "3500",
                decsription: "师生绘画作品展5",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展5.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展5.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            },

            {
                _id: arrArt[18].obj,
                title: "师生绘画作品展6",
                size: "",
                price: "3500",
                decsription: "师生绘画作品展6",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展6.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展6.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[19].obj,
                title: "师生绘画作品展7",
                size: "",
                price: "3500",
                decsription: "师生绘画作品展7",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展7.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展7.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[20].obj,
                title: "师生绘画作品展8",
                size: "",
                price: "3500",
                decsription: "师生绘画作品展8",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展8.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展8.jpg",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            },

            {
                _id: arrArt[21].obj,
                title: "荷花",
                size: "50X18cm",
                price: "4500",
                decsription: "这幅作品，是在“创格初成”展厅当中最重要的一张作品，是吴湖帆先生，自己对着一盆荷花所做的一幅图叫《荷花》。用吴湖帆先生自己说，是他“创格第一帧”。也就是说这种画法是他自己所创造的，因此这张画在整个吴湖帆先生的艺术生涯当中，它非常重要，是他花卉作品当中的代表作之一。",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/荷花.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/荷花.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[4].obj,
                    name: "吴湖帆"
                }
            }, {
                _id: arrArt[22].obj,
                title: "梅影三生",
                size: "50X118cm",
                price: "4500",
                decsription: "这幅作品叫《梅影三生》，它非常的有趣。这幅作品是吴湖帆先生画的背景，中间的人物，他请了当时有名的人物画家孔小瑜创作的，画的是梅景书屋里的三位主人。月中人是他去世的前妻潘静淑，一位是他的继室顾抱真。后面的小房子就是梅景书屋和他本人。因此，这种画法和想法，我觉得都是在民国的书画当中很少有的，是他晚年的力作。他的笔墨非常好，我们所谓的吴湖帆先生的画，有“云山雾罩”的感觉，这是近现代山水当中最好的，最高明的一种画法。同样的，这幅画也是当中运用到了他很多绘画上的，个人独特的技法。那种云雾的感觉，如果你仔细观察的话，会觉得非常震憾。",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/梅影三生.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/梅影三生.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[4].obj,
                    name: "吴湖帆"
                }
            },

            {
                _id: arrArt[23].obj,
                title: "云表奇峰",
                size: "40X110cm",
                price: "6500",
                decsription: "这幅作品就是他最有名的《云表奇峰》，画的是山水。当时的叶恭绰先生在上面题词“为湖帆成名之作，精力弥满，万象在旁”，就说这张画以后，吴湖帆先生从早期的学明清为主，开始上溯到唐宋元三代，真正成为一个中国山水画大家的开始，是由这张画开始。",
                year: "2015",
                cateName: "国画-山水画",
                posterURL: "http://smartgallery.duapp.com/images/Exh3/云表奇峰.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/云表奇峰.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[4].obj,
                    name: "吴湖帆"
                }
            }
        ]
    });


    //Exh4
    exhibitions.push({
        _id: arrExhi[4].obj,
        major: "5",
        subject: "伏尔加河回响—特列恰科夫画廊巡回画派精品展",
        decsription: "“伏尔加河回响—特列恰科夫画廊巡回画派精品展”是国内有史以来最系统的巡回画派展览，全面展示19 世纪俄罗斯巡回展览画派的创作倾向与艺术成就。展品共计64 幅油画作品，包括克拉姆斯柯依（4 幅）、列宾（7 幅）、苏里科夫（2 幅）、彼罗夫、萨符拉索夫、希施金、列维坦、波列诺夫、马科夫斯基、谢罗夫等35 位俄罗斯艺术大师的绘画精品。其中，克拉姆斯柯依的《列宾肖像》，列宾的《晚会》、《集会》、《特列季亚科夫肖像》，苏里科夫的《公主访问女修道院》，别罗夫的《溺亡的妇女》，萨符拉索夫的《霜降树林》，列维坦的《春天-大水》，谢罗夫的《在窗边》等画作，都是具有代表性的巡回画派杰作。",
        vanue: "四川美术馆",
        curator: "不详",
        startDate: "2015-08-11",
        startTime: "10:00",
        endDate: "2015-08-14",
        endTime: "18:00",
        artCategory: [{
            cateName: "油画"
        }],
        posterURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响2.png",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响2.png",
        address: "成都市人民西路6号",
        Art: [{
                _id: arrArt[24].obj,
                title: "蜻蜓",
                size: "50X18cm",
                price: "3500",
                decsription: "这是画家野外写生的作品之一。他使用了有节制的色彩，依然给人以丰富多彩的感觉，使画面充满阳光和空气感。列宾的这类室外写生作品，尽量保持人物的自然灵性，以非同寻常的技法，真实朴素地描绘了与自己亲近的人物形象。画中这位活泼可爱的女孩是画家的女儿列宾娜，她在父亲面前没有任何矫揉造作之神态",
                year: "",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh4/蜻蜓.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/蜻蜓.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[1].obj,
                    name: "列宾"
                }
            }, {
                _id: arrArt[25].obj,
                title: "荒野中的基督",
                size: "50X118cm",
                price: "",
                decsription: "克拉姆斯柯依是位关心社会疾苦、善于思考社会人生的画家。在这幅画中，画家借用基督的形象，影射当时的知识分子在真理与名利诱惑之下难以抉择的境况。这个基督身处荒野的孤立之中，他在四十天断食期间，受到恶魔的诱惑，思想十分深沉，百思难解的困惑，压得他透不过气来。画家通过陷入苦苦思索的基督姿态，表现了一个思想家愿献身于社会的精神和毅力，同时也流露出他对罪恶社会的万般无奈，这正是当时进步知识分子的心理状态。画面近景乱石铺陈，远景空旷无垠。黎明时光，地平线上升起一抹朝霞。这清冷的色调，烘托出基督的内心的痛苦与孤独，同时也隐含着俄国社会的黑暗与没落。",
                year: "",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh4/荒野中的基督.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/荒野中的基督.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[2].obj,
                    name: "克拉姆斯柯依"
                }
            },

            {
                _id: arrArt[26].obj,
                title: "蒙特尔肖像",
                size: "107X115CM",
                price: "",
                decsription: "肖像主人是匈牙利著名钢琴家李斯特最钟爱的学生索菲亚•罗西菲芙娜•门特尔（1846-1918）。1887年，列宾在漫游欧洲时，曾经到访她位于巴伐利亚的住处。索菲亚•门特尔的美貌和鲜明、自然的音乐气质征服了列宾。画面中，美貌的青年女子身穿白色皱领盛装，在钢琴旁专注地凝望。钢琴盖上有一大捧盛开的鲜花，无声地证明了她刚刚获得演出成功。在这件作品中，列宾展示了色彩大师的技巧，大胆使用红色的玫瑰花，与挂在椅背斗篷上的红色裘皮交相辉映。",
                year: "",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh4/列宾《蒙特尔肖像》.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/列宾《蒙特尔肖像》.jpg",
                recommended: true,
                artist: {
                    _id: arrArtist[3].obj,
                    name: "瓦西里耶夫"
                }
            }, {
                _id: arrArt[27].obj,
                title: "伏尔加河回响1",
                size: "",
                price: "",
                decsription: "伏尔加河回响1",
                year: "",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响1.png",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响1.png",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[28].obj,
                title: "伏尔加河回响2",
                size: "",
                price: "",
                decsription: "伏尔加河回响2",
                year: "",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响2.png",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响2.png",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[29].obj,
                title: "伏尔加河回响3",
                size: "",
                price: "",
                decsription: "伏尔加河回响3",
                year: "",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响3.png",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响3.png",
                artist: {
                    _id: arrArtist[8].obj,
                    name: "佚名"
                }
            }, {
                _id: arrArt[30].obj,
                title: "养蜂人",
                size: "",
                price: "",
                decsription: "养蜂人",
                year: "",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh4/克拉姆斯柯依《养蜂人》.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/克拉姆斯柯依《养蜂人》.jpg",
                artist: {
                    _id: arrArtist[2].obj,
                    name: "克拉姆斯柯依"
                }
            }, {
                _id: arrArt[31].obj,
                title: "巴维尔·米哈伊洛维奇·特列恰科夫肖像",
                size: "",
                price: "",
                decsription: "巴维尔·米哈伊洛维奇·特列恰科夫肖像",
                year: "",
                cateName: "油画",
                posterURL: "http://smartgallery.duapp.com/images/Exh4/列宾《巴维尔·米哈伊洛维奇·特列恰科夫肖像》.jpg",
                posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/列宾《巴维尔·米哈伊洛维奇·特列恰科夫肖像》.jpg",
                artist: {
                    _id: arrArtist[1].obj,
                    name: "列宾"
                }
            },
        ]
    });

    //Exh5
    exhibitions.push({
        _id: arrExhi[5].obj,
        major: "6",
        subject: "“台湾美术展览”台湾近现代名家经典作品展",
        decsription: "此次展览是两岸交流以来规模最大的一次台湾美术展览。本展包括渡海三家的张大千、黄君壁与溥心畬等140位参展艺术家，总计展出166件经典名作，并由台北艺术大学廖仁义教授担任策展人。选择从1911到2011年，是为了回溯过去一个世纪台湾美术进入现代时期的历史。这样的历史范围，既可以是以民国史的观点去看待日本殖民时期的台湾美术，也可以让观众看见1949这个分水岭，进一步延伸到1990年代以来，两岸建立交流以后至今将近20年的时间脉络。作品形式主要以水墨、胶彩、版画、油画、水彩等平面媒材为主。期望能将这个时代范围之中最好的艺术家及其代表作品做出最高质量的呈现，达成主办单位自我期许的历史使命。",
        vanue: "四川美术馆",
        curator: "不详",
        startDate: "2015-08-21",
        startTime: "10:00",
        endDate: "2015-08-24",
        endTime: "18:00",
        artCategory: [{
            cateName: "国画-山水画"
        }],
        posterURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览10.jpg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览10.jpg",
        address: "成都市人民西路6号",
        Art: [{
            _id: arrArt[32].obj,
            title: "荷叶",
            size: "50X18cm",
            price: "",
            decsription: "",
            year: "",
            cateName: "国画-山水画",
            posterURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览6.jpg",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览6.jpg",
            recommended: true,
            artist: {
                _id: arrArtist[8].obj,
                name: "佚名"
            }
        }, {
            _id: arrArt[33].obj,
            title: "修路者",
            size: "50X118cm",
            price: "",
            decsription: "",
            year: "",
            cateName: "版画",
            posterURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览2.jpg",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览2.jpg",
            recommended: true,
            artist: {
                _id: arrArtist[8].obj,
                name: "佚名"
            }
        }, {
            _id: arrArt[34].obj,
            title: "一诺千金",
            size: "107X115CM",
            price: "",
            decsription: "",
            year: "",
            cateName: "书法",
            posterURL: "http://smartgallery.duapp.com/images/Exh5/白狼3.jpg",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/白狼3.jpg",
            recommended: true,
            artist: {
                _id: arrArtist[12].obj,
                name: "白狼"
            }
        }, {
            _id: arrArt[35].obj,
            title: "台湾美术展览1",
            size: "",
            price: "",
            decsription: "台湾美术展览1",
            year: "",
            cateName: "油画",
            posterURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览1.jpg",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh5/台湾美术展览1.jpg",
            artist: {
                _id: arrArtist[12].obj,
                name: "白狼"
            }
        }]
    });

    //Exh6
    exhibitions.push({
        _id: arrExhi[6].obj,
        major: "7",
        subject: "国画大师易天也最新字画作品欣赏",
        decsription: "易天也，出生于吉林，自幼酷爱书画，秉承家学。其花鸟作品清雅秀逸、典雅脱俗，山水作品风格多样，笔墨苍润，画风朴拙，境界深远。易天也，研习易经多年，颇有心得，创作了多幅风水佳作。观其作品，让人仿佛置身于美妙的仙境之中，浑朴清穆",
        vanue: "成都蓉城美术馆",
        curator: "不详",
        startDate: "2015-08-01",
        startTime: "10:00",
        endDate: "2015-08-04",
        endTime: "18:00",
        artCategory: [{
            cateName: "国画-山水画"
        }],
        posterURL: "http://smartgallery.duapp.com/images/Exh6/春到家山.jpeg",
        posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh6/春到家山.jpeg",
        address: "成都市温江区天乡路888号",
        Art: [{
            _id: arrArt[36].obj,
            title: "祥鹤排云上九重",
            size: "50X18cm",
            price: "",
            decsription: "仙鹤在古代是“一鸟之下,万鸟之上”,仅次于凤凰的“一品鸟”,明清一品官吏的官服编织的图案就是“仙鹤”。同时鹤因为仙风道骨，为羽族之长，自古被称为「一品鸟」，寓意第一。一品是古代最高官阶的名称，皇帝以下文武百官共分九级，一品最高。仙鹤也是鸟类中最高贵的一种鸟，代表长寿、富贵。传说它享有几千年的寿命. 仙鹤独立,翘首远望,姿态优美,色彩不艳不娇,高雅大方。",
            year: "",
            cateName: "国画-山水画",
            posterURL: "http://smartgallery.duapp.com/images/Exh6/祥鹤排云上九重.jpeg",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh6/祥鹤排云上九重.jpeg",
            recommended: true,
            artist: {
                _id: arrArtist[9].obj,
                name: "易天也"
            }
        }, {
            _id: arrArt[37].obj,
            title: "江山多娇",
            size: "50X18cm",
            price: "",
            decsription: "该画作风格古朴，墨色浓郁，笔墨线条流畅细腻，达到了一种近工远写的艺术效果。画中重山叠翠，云雾飘渺，与近处瀑布飞溅的水雾融为一体，似奔腾的江流一般环绕于山峦之间，颇有一种蓬莱仙境之感，蔚为壮观，同时也展现了大自然的勃勃生机。是一幅非常具有观赏性与艺术收藏价值的精品山水画作。",
            year: "",
            cateName: "国画-山水画",
            posterURL: "http://smartgallery.duapp.com/images/Exh6/江山多娇.jpeg",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh6/江山多娇.jpeg",
            recommended: true,
            artist: {
                _id: arrArtist[9].obj,
                name: "易天也"
            }
        }, {
            _id: arrArt[31].obj,
            title: "春到家山",
            size: "40X17cm",
            price: "",
            decsription: "让人仿佛置身于美妙的仙境之中，浑朴清穆。山间简屋、溪中帆舟、松树红叶、云海拱桥，如此人间仙境绘制的让人感叹。",
            year: "",
            cateName: "国画-山水画",
            posterURL: "http://smartgallery.duapp.com/images/Exh6/春到家山.jpg",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh6/春到家山.jpg",
            recommended: true,
            artist: {
                _id: arrArtist[9].obj,
                name: "易天也"
            }
        }]
    });



    ExhibitionDAO.create(exhibitions, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
        // console.log(docs);

    });



    //journeys
    var journeys = [];

    journeys.push({
        user: '15378177988',
        date: "2016-02-19",
        exhibition: {
            _id: arrExhi[0].obj
        }
    });

    journeys.push({
        user: '15378177988',
        date: "2015-07-10",
        exhibition: {
            _id: arrExhi[1].obj
        }
    });

    JourneyDAO.create(journeys, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-----------------");
        // console.log(docs);
    });


    //favorites
    var favorites = [{
        user: '15378177988',
        Art: {
            _id: arrArt[0].obj,
        }
    }, {
        user: '15828401441',
        Art: {
            _id: arrArt[1].obj,
        }
    }];

    FavoriteDAO.create(favorites, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("--------favorites---------");
        // console.log(docs);
    });

    //praises
    var praises = [{
        user: '15378177988',
        Art: {
            _id: arrArt[2].obj,
        }
    }, {
        user: '15828401441',
        Art: {
            _id: arrArt[3].obj,
        }
    }];

    PraiseDAO.create(praises, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-------praises----------");
        // console.log(docs);
    });


    //beacons
    var beacons = [{
        _id: arrBeacon[0].obj,
        beaconUUID: "BK001",
        major: "5",
        minor: "1",
        triggerDistance: "1",
        Art: {
            _id: arrArt[26].obj
        },
        Exhi: {
            _id: arrExhi[4].obj
        },
    }, {
        _id: arrBeacon[1].obj,
        beaconUUID: "BK002",
        major: "5",
        minor: "4",
        triggerDistance: "0.2",
        Art: {
            _id: arrArt[27].obj
        },
        Exhi: {
            _id: arrExhi[4].obj
        },
    }, {
        _id: arrBeacon[2].obj,
        beaconUUID: "BK003",
        major: "5",
        minor: "7",
        triggerDistance: "0.5",
        Art: {
            _id: arrArt[27].obj
        },
        Exhi: {
            _id: arrExhi[4].obj
        },
    }];
    beaconDao.create(beacons, function(err, docs) {
        if (err) {
            console.log(err);
        };
        console.log("-------beacons----------");
        console.log(docs);
    });


    //beaconVisits
    var beaconVisits = [{
        user: "15378177988",
        beaconUUID: "BK001",
        major: "5",
        minor: "1",
        date: "20150728",
        startTime: "09:00",
        endTime: "09:10",
        duration: "600",
        title: "第一次访问",
        description: "人生若只如初见",
    }, {
        user: "15378177988",
        beaconUUID: "BK003",
        major: "5",
        minor: "7",
        date: "20150728",
        startTime: "09:20",
        endTime: "09:21",
        duration: "60",
        title: "看了一眼",
        description: "何事秋风悲画扇",
    }, ];
    beaconVisitDao.create(beaconVisits, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-------beaconVisits----------");
        // console.log(docs);
    });


    //notifications
    var notifications = [{
        user: "15378177988",
        token: "15378177988_token",
        date: "20150720",
        startTime: "10:00",
        Exhi: {
            _id: arrExhi[3].obj,
            major: "4",
            subject: "“梅景书屋”师生绘画作品展",
            decsription: "成都当代美术馆将于9月1日开始，展出声明显赫的“梅景书屋”师生重要绘画作品60余件。这些原作，既是承载着清晰而重要的20世纪海派绘画历史价值的文物，更是散发鲜明活力的艺术珍品。包括吴湖帆、王季迁、徐邦达、朱梅邨、陆抑非、张守成、俞子才、潘静淑等近现代书画名家的作品。其中展览中的吴湖帆先生绘画、书法作品，从风格上大致囊括了各个时期的典型面貌，有不少重要作品都是极其罕见的孤品。其他几位画家的作品也都精彩纷呈。由于得到了著名美术评论家徐建融先生、吴湖帆嫡孙吴元京先生等众多学界前辈顾问的指导帮助，我们这次画展，对于关注和收藏海派绘画重要作品，尤其是梅景书屋作品的观者而言，是一次绝佳的时机.A. Louver画廊为其举行的个展中首次亮相。该展览被《洛杉矶时报》评价为“具有煽动力且生机勃勃”。展览中名为“黑森林”的新作品占据了展厅的重要位置，这座闪着石墨光泽的高耸铜墙透露出了艺术家创作的某些微妙变化。",
            vanue: "成都当代美术馆",
            curator: "不详",
            startDate: "2015-09-01",
            startTime: "10:00",
            endDate: "2015-09-04",
            endTime: "18:00",
            artCategory: [{
                cateName: "国画-山水画"
            }],
            posterURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展1.jpg",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh3/“梅景书屋”师生绘画作品展1.jpg",
            address: "成都市高新区天府大道天府软件园C1楼",
        }
    }, {
        user: "15378177988",
        token: "15378177988_token",
        date: "20150716",
        startTime: "09:00",
        Exhi: {
            _id: arrExhi[4].obj,
            major: "5",
            subject: "伏尔加河回响—特列恰科夫画廊巡回画派精品展",
            decsription: "“伏尔加河回响—特列恰科夫画廊巡回画派精品展”是国内有史以来最系统的巡回画派展览，全面展示19 世纪俄罗斯巡回展览画派的创作倾向与艺术成就。展品共计64 幅油画作品，包括克拉姆斯柯依（4 幅）、列宾（7 幅）、苏里科夫（2 幅）、彼罗夫、萨符拉索夫、希施金、列维坦、波列诺夫、马科夫斯基、谢罗夫等35 位俄罗斯艺术大师的绘画精品。其中，克拉姆斯柯依的《列宾肖像》，列宾的《晚会》、《集会》、《特列季亚科夫肖像》，苏里科夫的《公主访问女修道院》，别罗夫的《溺亡的妇女》，萨符拉索夫的《霜降树林》，列维坦的《春天-大水》，谢罗夫的《在窗边》等画作，都是具有代表性的巡回画派杰作。",
            vanue: "四川美术馆",
            curator: "不详",
            startDate: "2015-08-11",
            startTime: "10:00",
            endDate: "2015-08-14",
            endTime: "18:00",
            artCategory: [{
                cateName: "油画"
            }],
            posterURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响2.png",
            posterThumbnailURL: "http://smartgallery.duapp.com/images/Exh4/伏尔加河回响2.png",
            address: "成都市人民西路6号",
        }
    }, ];
    notificationDao.create(notifications, function(err, docs) {
        if (err) {
            console.log(err);
        };
        //console.log("-------notifications----------");
        // console.log(docs);
    });


    setTimeout(done, 5000);
}

function done() {
    //关掉链接
    mongoose.connection.close();
   // console.log('Connection is closed');
    /*
    // 删除DB
     mongoose.connection.db.dropDatabase(function () {
         mongoose.connection.close();
         console.log('Connection is closed');
    });
    */
}

exports.crdd = crDD;

exports.mongoose = mongoose;



//crDD();