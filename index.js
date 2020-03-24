"use strict";

var con = [];

// スタート
document.getElementById("str").onclick = function() {
  // 演算子選択
  const enzansi = document.getElementsByName("enzansi");
  for (var e = 0; e < enzansi.length; e++) {
    if (enzansi[e].checked) {
      var enza = enzansi[e].value;
      break;
    }
  }

  con.length = 0;
  var seiton = [];
  var list = [];

  // 式
  for (var kai = 0; kai < 10; kai++) {
    for (var i = 0; i < 2; i++) {
      var random = Math.ceil(Math.random() * 100);
      seiton.push(random);
    }

    const mainasu = document.getElementsByName("mainasu");
    for (var m = 0; m < mainasu.length; m++) {
      if (mainasu[m].checked) {
        var mai = mainasu[m].value;
        break;
      }
    }

    var kotae = null;
    if (enza == "+") {
      kotae = seiton[0] + seiton[1];
    } else if (enza == "-") {
      // 最大＋最少
      if (mai == "off") {
        seiton.sort(function(a, b) {
          if (a > b) return -1;
          if (a < b) return 1;
          return 0;
        });
      }
      kotae = seiton[0] - seiton[1];
    } else if (enza == "*") {
      kotae = seiton[0] * seiton[1];
    } else if (enza == "/") {
      var round = (seiton[0] / seiton[1]) * 100;
      kotae = Math.round(round) / 100;
    }
    // console.log(kotae);
    con.push(kotae);

    // 式の右寄せ＆空白埋め
    var mae = ("   " + seiton[0]).substr(-3);
    var usiro = ("   " + seiton[1]).substr(-3);
    var matome = mae + " " + String(enza) + usiro + " =";

    // まとめる
    var item =
      matome +
      '<input  class="nyuryoku" type="text" value=""></input>' +
      '<span class="toumei">' +
      kotae +
      "</span>" +
      "<br>";
    list.push(item);

    // seitonリストを空のする
    seiton.length = 0;
  }
  // 式表示
  document.getElementById("siki").innerHTML = list.join("");
};

// 答え
var sai = [];
document.getElementById("hyouji").onclick = function() {
  var aka = document.getElementsByClassName("nyuryoku");
  for (var a = 0; a < aka.length; a++) {
    sai.push(aka[a].value);
  }

  var to = document.getElementsByClassName("toumei");
  for (var i = 0; i < to.length; i++) {
    // 空文字
    if (!sai[i]) {
      to[i].style.opacity = 100;
      to[i].style.color = "#f00";
      // 正解
    } else if (sai[i] == con[i]) {
      to[i].style.opacity = 100;
      to[i].innerHTML = "OK";
      to[i].style.color = "#0f0";
      // 不正解
    } else if (sai[i] != con[i]) {
      to[i].style.opacity = 100;
      to[i].style.color = "#f00";
    }
  }
  // リストを空にする
  sai.length = 0;
  con.length = 0;
};
