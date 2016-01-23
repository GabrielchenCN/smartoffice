//method put
var submitBeacon = function(beacon) {
    //alert(beacon._id);
    var host = window.location.host;

    $.ajax({
      type: "put",
      dataType: "json",
      url: "http://" + host + "/odata/beacons(" + beacon._id + ")",
      /* url: "http://127.0.0.1:18080/odata/beacons("+beacon._id+")",*/
      data: beacon,
      success: function(data) {
        if (data != "") {
          alert('success');
          location.reload();

        }
      }
    });
  }
  //method delete
var submitBeaconDelete = function(beacon) {
    var host = window.location.host;
    //alert(beacon._id);
    $.ajax({
      type: "delete",
      dataType: "json",
      url: "http://" + host + "/odata/beacons(" + beacon._id + ")",
      data: beacon,
      success: function(data) {
        if (data != "") {
          alert('delete success');
          location.reload();

        }
      },
      statusCode: {

        200: function() {
          alert("请求成功");
          location.reload();
        }
      }
    });
  }
  //method post
var submitBeaconPost = function(beacon) {
  var host = window.location.host;
  //alert(beacon._id);
  $.ajax({
    type: "post",
    dataType: "json",
    url: "http://" + host + "/odata/beacons",
    data: beacon,
    success: function(data) {
      if (data != "") {

        alert('success');
        location.reload();

      }
    }
  });
}

//get obj value by btnSubmitPost
var postclick = function() {
    /*alert(window.location.host);*/
    $(".btnSubmitPost").on('click', function(e) {
      var JSONObject = new Object();
      //$(this).parent().children('#ID')；
      JSONObject.beaconUUID = $(this).parent().children('#beaconUUID').val();
      JSONObject.major = $(this).parent().children('#major').val();
      JSONObject.minor = $(this).parent().children('#minor').val();
      JSONObject.triggerDistance = $(this).parent().children('#triggerDistance').val();
      JSONObject.itemNum = $(this).parent().children('#itemNum').val();
      JSONObject.Exhi = $(this).parent().children('#Exhi').val();
      JSONObject.Art = $(this).parent().children('#Art').val();
      //JSONObject._id=$(this).parent().children('#t_beacon_id').val();
      submitBeaconPost(JSONObject);
      //alert(JSONObject._id);

    })
  }
  //get obj value by btnSubmit
$(function() {
  $(".btnSubmit").on('click', function(e) {
    var JSONObject = new Object();
    //$(this).parent().children('#ID')；
    JSONObject.beaconUUID = $(this).parent().children().children('#beaconUUID').val();
    JSONObject.major = $(this).parent().children().children('#major').val();
    JSONObject.minor = $(this).parent().children().children('#minor').val();
    JSONObject.triggerDistance = $(this).parent().children().children('#triggerDistance').val();
    JSONObject.itemNum = $(this).parent().children().children('#itemNum').val();
    JSONObject.Exhi = $(this).parent().children().children('#Exhi').val();
    JSONObject.Art = $(this).parent().children().children('#Art').val();
    JSONObject._id = $(this).parent().children().children('#t_beacon_id').val();
    submitBeacon(JSONObject);
    alert(JSONObject._id);

  })

});
//get obj value by btnSubmitDelete
$(function() {
  $(".btnSubmitDelete").on('click', function(e) {
    var JSONObject = new Object();
    //$(this).parent().children('#ID')；
    JSONObject.beaconUUID = $(this).parent().children().children('#beaconUUID').val();
    JSONObject.major = $(this).parent().children().children('#major').val();
    JSONObject.minor = $(this).parent().children().children('#minor').val();
    JSONObject.triggerDistance = $(this).parent().children().children('#triggerDistance').val();
    JSONObject.itemNum = $(this).parent().children().children('#itemNum').val();
    JSONObject.Exhi = $(this).parent().children().children('#Exhi').val();
    JSONObject.Art = $(this).parent().children().children('#Art').val();
    JSONObject._id = $(this).parent().children().children('#t_beacon_id').val();
    submitBeaconDelete(JSONObject);
    alert(JSONObject._id);

  })

});
//create a beacon detail
$('document').ready(function() {
  $('#addBeacon').click(function(e) {

    $("body").append( /*value='+$("#ExhiID").text();+'*/
      '<p>新增Beacons</p><form name="beacon" method="delete" action="" enctype="application/json" id="beacon1">' + '<p>beacon配置</p>'
      /*+'<input id="t_beacon_id" ,type="hidden" placeholder="t_beacon_id" name="obj._id" value="">'*/
      /*+'<label>t_beaconId </label><input id="t_beaconId" type="text" placeholder="t_beaconId" name="artName" value="">'*/
      + '<label>ExhiId </label><input id="Exhi" type="text" placeholder="ExhiId" name="Exhi" value="' + $.trim($("#exhiID").text()) + '" disabled="disabled" >' + '<label>artId </label><input id="Art" type="text" placeholder="artId" name="Art" value="' + $.trim($("#artID").text()) + '" disabled="disabled"><br>' + '<label>itemNum </label><input id="itemNum" type="text" placeholder="itemNum" name="itemNum" value="">' + '<label>beaconUUID </label><input id="beaconUUID" type="text" placeholder="beaconUUID" name="beaconUUID" value=""><label>beaconMajor </label>' + '<input id="major" type="text" placeholder="beaconMajor" name="major" value=""><label>beaconMinor </label><input id="minor" type="text" placeholder="beaconMinor" name="minor" value="">' + '<label>triggerDistance </label><input id="triggerDistance" type="text" placeholder="triggerDistance" name="triggerDistance" value=""><br><button id="btnSubmit" type="button" class="btnSubmitPost btn btn-success">submit</button></form>'

    );

    postclick();
  });
});


//in the addExhi.ejs view

//search arts by odata service 

var searchArts = function(art) {
  //alert(beacon._id);
  var host = window.location.host;
  /* var urlo= "http://smartgallery.duapp.com/odata/arts?$filter=price le "+art.upprice.trim()+" and price ge "++
   " and title eq '"+art.artTitle.trim()+"' and artist.name eq '"+art.artist.trim()+"' and cateName eq '"+art.cateName.trim()+"'";*/
  var urlo = "http://"+host+"/odata/arts?$filter=price ge " + art.downprice.trim() + " and price le " + art.upprice.trim() +
    " and title eq '" + art.artTitle.trim() + "' and artist.name eq '" + art.artist.trim() + "' and cateName eq '" + art.cateName.trim() + "'";
  var sendurl = "http://"+host+"/odata/arts?$filter=";
  if (art.downprice) {

    // alert(art.downprice.trim());
    sendurl = sendurl + "price ge " + art.downprice.trim() + "";

  } else alert("必须填入最低价格");
  if (art.upprice) {
    // alert(art.upprice.trim());
    sendurl = sendurl + "and price le " + art.upprice.trim();
    //alert(sendurl);
  }
  if (art.artTitle) {
    // alert(art.upprice.trim());
    sendurl = sendurl + " and title eq '" + art.artTitle.trim() + "'";
    //alert(sendurl);
  }

  if (art.artist) {
    // alert(art.upprice.trim());
    sendurl = sendurl + " and artist.name eq '" + art.artist.trim() + "'";
    //alert(sendurl);
  }

  if (art.cateName) {
    // alert(art.upprice.trim());
    sendurl = sendurl + " and cateName eq '" + art.cateName.trim() + "'";
    alert(sendurl);
  }

  // alert(urlo);
  $.ajax({
    type: "get",
    //dataType: "json",
    //url: "http://smartgallery.duapp.com/odata/arts?$filter=price le"++"",
    url: sendurl,
    //data: beacon,
    success: function(data) {
      if (data != "") {

        alert(data.value.length);
        searchData(data);

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

$('document').ready(function() {
  $('#searchArt').click(function(e) {
    var art = [];
    art.artTitle = $("input[id='artTitle']").val();
    art.downprice = $("input[id='downprice']").val();
    art.upprice = $("input[id='upprice']").val();
    art.cateName = $("input[id='cateName']").val();
    art.artist = $("input[id='artist']").val();
    //alert(art.artTitle)
    searchArts(art);
  });
});



  /*
   beforeSsend: function(xhr) {
            xhr.setRequestHeader("Content-Type" , "application/json" );
            xhr.setRequestHeader("X-Ionic-Application-Id" , "dfde4e1d" );
            xhr.setRequestHeader("Authorization" , "Basic NWE3YWJlNDkyY2YxMTg0NTY3ZmMyYTlkYWUxZjBjMzQwOTRhYTlkYjU5OGE3ZTI4Og==" );},
 

    $.ajax({
        type: "post",
        dataType: "json",
        url: "https://push.ionic.io/api/v1/push",
        data: testDt,
        headers: pubHead ,
            success: function (data) {
             if (data != "") {
                 
                alert('success');
                location.reload() ;
                
            }
        }
    });	
    

} */






//Handle return data
var searchData = function(data) {
    var searchDateArr = [];
    var searchDateArrEle = [];
    
   
    $("#searchtable").children("tbody").children("tr").remove();
    for (var i = 0; i <= data.value.length - 1; i++) {
      (function(i) {
          var multiView = '';
         var len = data.value[i].multiView.length;
     for(var j=0 ;j<len;j++){
      multiView = multiView +data.value[i].multiView[j].url+",";
    }

        searchDateArrEle[0] = data.value[i].title;
        searchDateArrEle[1] = data.value[i].price;
        searchDateArrEle[2] = data.value[i].cateName;
        searchDateArrEle[3] = data.value[i].artist.name; //author name
        searchDateArrEle[4] = i + 1;
        searchDateArrEle[5] = data.value[i].size;
        searchDateArrEle[6] = data.value[i].decsription;
        searchDateArrEle[7] = data.value[i].posterURL;
        searchDateArrEle[8] = data.value[i].posterThumbnailURL;
        searchDateArrEle[9] = data.value[i].artist._id; //author id
        searchDateArrEle[10] = data.value[i].id; //art id
        searchDateArrEle[11] = data.value[i].year;
        //add multiView
        searchDateArrEle[12] = multiView;
        searchDateArr.push(searchDateArrEle);
        $("#searchtable").children("tbody").append('<tr><th scope = "row">' + searchDateArr[i][4] + '</th><td>' + searchDateArr[i][0] + '</td><td>' + searchDateArr[i][1] + '</td><td>' + searchDateArr[i][2] + '</td><td>' + searchDateArr[i][3] + '</td><td><button class="btn btn-info  btn-xs addsearch"  type="button">add</button></td>' +

          '<td style="display:none">' + searchDateArr[i][5] + '</td>' +
          '<td style="display:none">' + searchDateArr[i][6] + '</td>' +
          '<td style="display:none">' + searchDateArr[i][7] + '</td>' +
          '<td style="display:none">' + searchDateArr[i][8] + '</td>' +
          '<td style="display:none">' + searchDateArr[i][9] + '</td>' +
          '<td style="display:none">' + searchDateArr[i][10] + '</td>' +
          '<td style="display:none">' + searchDateArr[i][11] + '</td>' +
          '<td style="display:none">' + searchDateArr[i][12] + '</td>' +
          '</tr>'

        );


      })(i);
    }
  }
  //Hidden extra information
  /*$(function(){
    $(document).on("change",".addsearch",function(e){
     $("#hidden_td").hide();     
      })

  });
  */
  //add search data ele into upload data
  // $(document).on("click",".addsearch",function(e) very import in   $(document)!!!
$(function() {
  $(document).on("click", ".addsearch", function(e) {
   
    /* $(".addsearch").on("click",function(e){*/
    var title = $(this).parent().parent().children("td:eq(0)").text();
    var price = $(this).parent().parent().children("td:eq(1)").text();
    var cateName = $(this).parent().parent().children("td:eq(2)").text();
    var artist = $(this).parent().parent().children("td:eq(3)").text();
    //extra information
    var size = $(this).parent().parent().children("td:eq(5)").text();
    var decsription = $(this).parent().parent().children("td:eq(6)").text();
    var posterURL = $(this).parent().parent().children("td:eq(7)").text();
    var posterThumbnailURL = $(this).parent().parent().children("td:eq(8)").text();
    var artist_id = $(this).parent().parent().children("td:eq(9)").text();
    var art_id = $(this).parent().parent().children("td:eq(10)").text();
    var year = $(this).parent().parent().children("td:eq(11)").text();
//add multiView
     var multiView=$(this).parent().parent().children("td:eq(12)").text();


    $("#uploadtable").children("tbody").append('<tr><th scope = "row"></th><td>' + title + '</td><td>' + price + '</td><td>' + cateName + '</td><td>' + artist + '</td><td><button class="btn btn-danger  btn-xs deletesearch" >delete</button></td>' +
      '<td class="size" style="display:none">' + size + '</td>' +
      '<td class="decsription" style="display:none">' + decsription + '</td>' +
      '<td class="posterURL" style="display:none">' + posterURL + '</td>' +
      '<td class="posterThumbnailURL" style="display:none">' + posterThumbnailURL + '</td>' +
      '<td class="artist_id" style="display:none">' + artist_id + '</td>' +
      '<td class="art_id" style="display:none">' + art_id + '</td>' +
      '<td class="year" style="display:none">' + year + '</td>' +
      '<td class="multiView" style="display:none">' + multiView + '</td>' +
      '</tr>');


  });
});

//delete upload data from upload table
$(function() {
  $(document).on("click", ".deletesearch", function(e) {
    /*$(".deletesearch").on("click",function(e){*/
    $(this).parent().parent().remove();


  })

});


//get artcategories info 
$(function() {
 var host = window.location.host;
  $.ajax({
    type: "get",
    //dataType: "json",
    /*url: "http://smartgallery.duapp.com/odata/exhibitions",*/
    url: "http://"+host+"/odata/artcategories",
    //data: exhi,
    success: function(data) {
      if (data != "") {
        for (var i = 0; i <= data.value.length - 1; i++) {
          $("#artcate").append('<label class="checkbox-inline">' +
            '<input type="checkbox" id="artcate' + i + '" name ="catebox"  value="' + data.value[i].cateName + '">' + data.value[i].cateName +
            '</label>' +

            '<input type="hidden" id="artcateid' + i + '" value="' + data.value[i].id + '">')

        }


      } else alert("跨域请求错误！");
    }
  });

});




//artCategory auto check
$(function() {
  $(document).on("change", "#uploadtable", function(e) {
    /* $(".addsearch").on("click",function(e){*/



  });
});