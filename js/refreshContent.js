var all_site_status = "{";
var count = 0;
var site = [101,102,103,104,105,106,107,108,109,110,
            111,112,113,114,115,116,117,118,119,120,
            121,122,123,124,
            201,202,203,204,205,206,207,208,209,210,
            211,212,213,214,
            999];//39
var cht_site = ["小港","高雄國際機場","草衙","前鎮高中","凱旋",
                "獅甲","三多商圈","中央公園","美麗島","高雄車站",
                "後驛","凹子底","巨蛋","生態園區","左營",
                "世運","油廠國小","楠梓加工區","後勁","都會公園",
                "青埔","橋頭糖廠","橋頭火車站","南崗山",
                "西子灣","鹽埕埔","市議會","美麗島","信義國小",
                "文化中心","五塊厝","技擊館","衛武營","鳳山西站",
                "鳳山","大東","鳳山國中","大寮",
                "美麗島"
];
var all_site_status_saved = {};
var currentSite = 999;
var newSendRequest = function(theSite){
  var request = new XMLHttpRequest();
  request.open('GET', "https://data.kaohsiung.gov.tw/Opendata/MrtJsonGet.aspx" + "?site=" + theSite, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
        var resp = request.responseText;
        var temp = (resp.indexOf("<"));
        var temp2 = resp.slice(0, temp).trim();
        var temp2 = temp2.slice(1, temp2.length - 1).trim();
        temp2 = temp2.replace("MRT",theSite);
        all_site_status+=temp2;
        if (count < 38){
          all_site_status+=",";
        }
        count++;
        sequential_get(count);
    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();
};

var parseJSON = function (resp, marker){
  // console.log("in ParseJSON : " + resp);
  resp = JSON.parse(resp);
  //取得目前選取的Marker，沒有的話預設999
  var title = currentSite;
  if (marker) {
    title = parseInt(marker.getTitle());
    currentSite = title;
  }

  if (title <= 124 ) {
    document.getElementById("mainPanel").classList.remove("setDisplayNone");
    document.getElementById("subPanel").classList.add("setDisplayNone");

    document.getElementById("cht_site").firstChild.nodeValue = cht_site[site.indexOf(title)];
    document.getElementById("oneDirection").firstChild.nodeValue = resp[title][1].descr;
    document.getElementById("oneNextMinute").firstChild.nodeValue = isMRTend(resp[title][1].arrival);
    document.getElementById("oneNextNextMinute").firstChild.nodeValue = isMRTend(resp[title][1].next_arrival);
    document.getElementById("twoDirection").firstChild.nodeValue = resp[title][0].descr;
    document.getElementById("twoNextMinute").firstChild.nodeValue = isMRTend(resp[title][0].arrival);
    document.getElementById("twoNextNextMinute").firstChild.nodeValue = isMRTend(resp[title][0].next_arrival);
  } else if (title <= 214 && title > 124) {
    document.getElementById("subPanel").classList.remove("setDisplayNone");
    document.getElementById("mainPanel").classList.add("setDisplayNone");

    document.getElementById("subcht_site").firstChild.nodeValue = cht_site[site.indexOf(title)];
    document.getElementById("suboneDirection").firstChild.nodeValue = resp[title][1].descr;
    document.getElementById("suboneNextMinute").firstChild.nodeValue = isMRTend(resp[title][1].arrival);
    document.getElementById("suboneNextNextMinute").firstChild.nodeValue = isMRTend(resp[title][1].next_arrival);
    document.getElementById("subtwoDirection").firstChild.nodeValue = resp[title][0].descr;
    document.getElementById("subtwoNextMinute").firstChild.nodeValue = isMRTend(resp[title][0].arrival);
    document.getElementById("subtwoNextNextMinute").firstChild.nodeValue = isMRTend(resp[title][0].next_arrival);
  } else if (title === 999){
    document.getElementById("mainPanel").classList.remove("setDisplayNone");
    document.getElementById("subPanel").classList.remove("setDisplayNone");

    document.getElementById("cht_site").firstChild.nodeValue = cht_site[site.indexOf(title)];
    document.getElementById("oneDirection").firstChild.nodeValue = resp[title][1].descr;
    document.getElementById("oneNextMinute").firstChild.nodeValue = isMRTend(resp[title][1].arrival);
    document.getElementById("oneNextNextMinute").firstChild.nodeValue = isMRTend(resp[title][1].next_arrival);
    document.getElementById("twoDirection").firstChild.nodeValue = resp[title][0].descr;
    document.getElementById("twoNextMinute").firstChild.nodeValue = isMRTend(resp[title][0].arrival);
    document.getElementById("twoNextNextMinute").firstChild.nodeValue = isMRTend(resp[title][0].next_arrival);

    document.getElementById("cht_site").firstChild.nodeValue = cht_site[site.indexOf(title)];
    document.getElementById("suboneDirection").firstChild.nodeValue = resp[title][3].descr;
    document.getElementById("suboneNextMinute").firstChild.nodeValue = isMRTend(resp[title][3].arrival);
    document.getElementById("suboneNextNextMinute").firstChild.nodeValue = isMRTend(resp[title][3].next_arrival);
    document.getElementById("subtwoDirection").firstChild.nodeValue = resp[title][2].descr;
    document.getElementById("subtwoNextMinute").firstChild.nodeValue = isMRTend(resp[title][2].arrival);
    document.getElementById("subtwoNextNextMinute").firstChild.nodeValue = isMRTend(resp[title][2].next_arrival);
  }
}

//處理特殊字符
var isMRTend = function (token) {
  if (isNaN(token)) {
    return (token === "e") ? "已結束" : "";
  } else {
    return (token === "0") ? "進站中" : token;
  }
};

function sequential_get(siteIndex){
  if (siteIndex < 39){
    count = siteIndex;
    newSendRequest(site[siteIndex]);
  } else {
    count = 0;
    all_site_status+="}";
    all_site_status_saved = all_site_status;
    // parseJSON(all_site_status);
    parseJSON(all_site_status_saved);
    all_site_status = "{";
  }
}

// This is for direct request to Opendata
sequential_get(0); // invoke immediately
setInterval((() => sequential_get(0)), 30000);
