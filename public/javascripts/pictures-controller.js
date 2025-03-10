//绑定按钮
$(function() {
  $("#searchPicture").on('click', function(e) {
    searchPictures();


  })
})

var searchPictures = function() {
  //alert(beacon._id);
  var host = window.location.host;
  var pictures = {};
  pictures.picName = $("#picName").val();
  pictures.picFolder = $("#picFolder").val();
  pictures.picType = $("#picType").val();
  console.log(pictures);

  var sendurl = "http://" + host + "/odata/pictures?$filter=";
  var picturesNum = 0;
  var picturesArr = [];
  if (pictures.picName) {
    picturesNum++;
    picturesArr.push({
      key: "picName",
      value: pictures.picName
    });
    // alert(art.downprice.trim());
    // sendurl = sendurl + "name eq " + "'" + pictures.name.trim() + "'";

  };

  if (pictures.picFolder) {
    picturesNum++;
    picturesArr.push({
      key: "picFolder",
      value: pictures.picFolder
    });
    // alert(art.upprice.trim());

    //alert(sendurl);
  };

  if (pictures.picType) {
    picturesNum++;
    picturesArr.push({
      key: "picType",
      value: pictures.picType
    });
    // alert(art.upprice.trim());

    //alert(sendurl);
  };
  if (picturesArr) {
    var glen = picturesArr.length;
    if (glen == 1) {
      sendurl = sendurl + picturesArr[0].key + " eq " + "'" + picturesArr[0].value + "'"
    } else if (glen > 1) {
      sendurl = sendurl + picturesArr[0].key + " eq " + "'" + picturesArr[0].value + "'"
      for (var i = 1; i < glen; i++) {
        sendurl = sendurl + " and " + picturesArr[i].key + " eq " + "'" + picturesArr[i].value + "'"
      }
    }


  } else sendurl = "http://" + host + "/odata/pictures";


  // alert(urlo);
  $.ajax({
    type: "get",
    //dataType: "json",
    //url: "http://smartgallery.duapp.com/odata/arts?$filter=price le"++"",
    url: sendurl,
    //data: beacon,
    success: function(data) {
      if (data != "") {

       // alert(data.value.length + "：成功");
        showpicturesData(data);

      }
    },
    statusCode: {

      551: function() {
        alert("跨域错误，稍后再试");
        //location.reload() ;
      }
    }
  });
}


//绑定数据
var showpicturesData = function(data) {
  var j = 0;
  $("#picLists").children("tbody").children("tr").remove();
  for (var i = 0; i <= data.value.length - 1; i++) {
    (function(i) {
      j = i + 1;


      //add multiView

      $("#picLists").children("tbody").append('<tr><th> <a href="' + data.value[i].picURL + '"  target="_blank" class="thumbnail" ><img style="width:80px;height:80px" src="' +
       data.value[i].picURL + '" alt="..."></a></th><td>' + data.value[i].picName + 
       '</td><td>' + data.value[i].picFolder + '</td><td>' + data.value[i].picType + 
       '</td>' + '<td><button class="btn btn-danger  btn-xs deletePic"  type="button">删除</button></td>' +

        '<td style="display:none" id="pid">' + data.value[i].id + '</td>' +

        '</tr>'

      );


    })(i);
  }
}
//delete btn 
$(function() {
  $(document).on("click", ".deletePic", function(e) {

    var id = $(this).parent().next().text();
    var data = {};
    data.id = id;
     var host = window.location.host;

    $.ajax({
        type: "delete",
        dataType: "json",
        //url: "http://smartgallery.duapp.com/odata/arts?$filter=price le"++"",
        url: "http://" + host + "/pictures",
        data: data,
        success: function(data) {
          if (data != "") {

            alert(data.msg);
            location.reload();


          }
        },
        error: function(data) {
          alert("服务器错误！");
        },
        statusCode: {

          551: function() {
            alert(data.msg);
            //location.reload() ;
          }
        }
      });

  })

});

//btn to add picture
$(function() {
  $(document).on("click", ".addPicture", function(e) {

    window.location.href = "/pictures/addPicture";
  })
})

//btn to mkdir
$(function() {
  $(document).on("click", "#submitMkdir", function(e) {
    var filename = $("#filename").val();
    var data = {};
    data.filename = filename;
    if (filename) {
      var host = window.location.host;
      var url = "http://" + host + "/pictures/mkdir";
      $.ajax({
        type: "post",
        //dataType: "json",
        //url: "http://smartgallery.duapp.com/odata/arts?$filter=price le"++"",
        url: url,
        data: data,
        success: function(data) {
          if (data != "") {

            alert(data.msg);
            location.reload();


          }
        },
        error: function(data) {
          alert("服务器错误！");
        },
        statusCode: {

          551: function() {
            alert(data.msg);
            //location.reload() ;
          }
        }
      });
    }
    else alert('非法文件名');

  })
})


//get catalog info 
$(function() {
 var host = window.location.host;
  $.ajax({
    type: "get",
    //dataType: "json",
    /*url: "http://smartgallery.duapp.com/odata/exhibitions",*/
    url: "http://"+host+"/pictures/catalog",
    //data: exhi,
    success: function(data) {
      if (data != "") {
        for (var i = 0; i <= data.catalog.length - 1; i++) {
          $("#selectDir").append('<option value = "' + data.catalog[i] + '" >' + data.catalog[i] + '</option>')

        }


      } else alert("跨域请求错误！");
    }
  });

});

// 增加多张图片

$('document').ready(function() {
  $('#addPicture').click(function(e) {
       $("#multiPictureLabel").after('<input type="file" class="form-control multiPicture" name="multiPicture" id="multiPicture" placeholder="细节图"/>');

  
  });
});

//上传图片并且存储数据到数据库
$(function() {
  $(document).on("click", "#submitArtsecond", function(e) {
    var host = window.location.host;
    var folder =$("#selectDir").val();
     var picType =$("#selectType").val();
    //获取数据
    var JSONObject = new Object();
    JSONObject.picType = picType;
    

    if ($("#submitArtsecond").parent().parent().children('.modal-body').children().val() == "1") {
      //上传到服务器并且存储数据到数据库,不支持老IE
      var formData = new FormData($("#uploadForm")[0]);
      //var formData = new FormData($("#posterURL"));
      $.ajax({
        url: 'http://' + host + '/pictures/uploadPic/1/'+folder,
        type: 'POST',
        data: formData,
        async: true,//异步执行
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        beforeSend: function() {
          $('#submitArtsecond').attr('disabled', 'disabled');
          $('.modal-body').append('<div><progress><span id="objprogress">85</span>%</progress></div>')

        },
         completed:function(){
         

          },
        success: function(returndata) {


        },
        error: function(returndata) {

          $('#submitArtsecond').removeAttr('disabled');
          $('progress').remove();
          alert("error on upload picture,Please upload again!");
        },
        statusCode: {

 
          200: function(returndata) {
            JSONObject.folder = folder;
            JSONObject.multiPicture = returndata.multiPicture;
            savePicture(JSONObject);
          },
          //文件冲突
          203: function(data) {
             $('#submitArtsecond').removeAttr('disabled');
              $('progress').parent().remove();

            alert('File exists');

          }

        }
      });


      /*  $('#posterURL').ajaxfileupload({*/
      /*   $('input[type="file"]').ajaxfileupload({
      'action':'http://'+host+'/art/uploadPic/1'*/
      /* });*/


    } else if ($("#submitArtsecond").parent().parent().children('.modal-body').children().val() == "2") {
      //上传到cloudinary并且存储数据到数据库
       //上传到服务器并且存储数据到数据库,不支持老IE
      var formData = new FormData($("#uploadForm")[0]);
      alert("暂时不支持此方法");
      //var formData = new FormData($("#posterURL"));
/*      $.ajax({
        url: 'http://' + host +'/pictures/uploadPic/2/'+folder,
        type: 'POST',
        data: formData,
        async: true,//异步执行
        cache: false,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        beforeSend: function() {
          $('#submitArtsecond').attr('disabled', 'disabled');
          $('.modal-body').append('<div><progress><span id="objprogress">85</span>%</progress><p>正在上传</p></div>');

        },
        completed:function(){
          $('progress').parent().remove();

          },
        success: function(returndata) {


        },
        error: function(returndata) {

          $('#submitArtsecond').removeAttr('disabled');
          
            $('progress').parent().remove();
          alert("error on upload picture,Please upload again!");
        },
        statusCode: {

 
          200: function(returndata) {
            JSONObject.multiView=returndata.multiView;
            JSONObject.posterURL = returndata.posterURL;
            JSONObject.posterThumbnailURL = returndata.posterThumbnailURL;
            console.log(JSONObject);
            //savePicture(JSONObject);
        
          },
          //文件冲突
          203: function(data) {
             $('#submitArtsecond').removeAttr('disabled');
              $('progress').parent().remove();

            alert('upload failed!');

          }

        }
      });*/
    }


  })

});
//savePicture info into mongo
var savePicture = function(JSONObject){
    var host = window.location.host;
  var len = JSONObject.multiPicture.length;
  var picObj = [];

  for (var i = 0; i < len; i++){

      var picObjEle = {};
      picObjEle.picName =JSONObject.multiPicture[i].url.split("/")[6].split(".")[0];
      picObjEle.picURL =  JSONObject.multiPicture[i].url;
      picObjEle.picFolder = JSONObject.folder;
      picObjEle.dateTime = CurentTime();
      picObjEle.picType =JSONObject.picType;
      picObjEle.picFormat =JSONObject.multiPicture[i].url.split("/")[6].split(".")[1];

   picObj.push(picObjEle);

  }

  
  

      $.ajax({
              type: "post",
              dataType: 'json',
              url: "http://" + host + "/pictures/addPicture",

              data: JSON.stringify(picObj),
              beforeSend: function(){
                
              },
             
              success: function(data) {
                
                $('progress').attr('value', '100');
                $('progress').after('<p>上传已成功,继续上传,请<a href=""http://' + host + '/pictures/addPicture"">刷新</a></p>');
                alert("Save Successful");
                $('#myModel').modal('hide');
              },
              error: function(data) {
                //alert(' Can not enter Server' + url);
              },
              statusCode: {


                200: function(data) {
                  alert("save in the mongo "+ data.msg);
                   location.reload();
                },
                506: function(data) {
                  alert(' Server Internal Error ,' + data.msg + '');

                }

              },
              complete: function(msg) { console.log(JSON.stringify(picObj)) },
            })
}

function CurentTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        return(clock); 
    } 