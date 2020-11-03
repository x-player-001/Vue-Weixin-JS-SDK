import {wxRequest} from './request.js'
import wx from 'weixin-js-sdk'

getTicket();


function getTicket() {
  wxRequest({
    url: "/cgi-bin/get_jsapi_ticket",
    params: {
      access_token: "KHTmjqmZx8u_oeRXR_YD514P7CGALelXg3IkFJ7R2Bz0hJpQfzXHPZ3HwyLXGyBDZq9P3lEUCMBQ34SQiZKf438c0elfrYf5Q9_U5f3Geq9kSWFzJ5owwZv74l8tkKQlI1w12uwjo0-7sF2RGhaurmLX6vI22XpRFFxRPCdrS3TjRwSKd__mjFzac1P2xP_FpquC3DkBDPXgVKEl3ikKSw"
    }
  }).then(res => {
    wxSign(res.data.ticket);
  })
}


function wxSign(jsapi_ticket) {
  let noncestr = randomString(17);
  let timestamp = Date.parse(new Date()) / 1000;
  let url = window.location.href.split('#')[0];
  let params = {
    "jsapi_ticket": jsapi_ticket,
    "noncestr": noncestr,
    "timestamp": timestamp,
    "url": url
  };

  let signstr = "";
  for (let item in params) {
    signstr += item + "=" + params[item] + "&"
  }
  signstr = signstr.substr(0, signstr.length - 1);

  wx.config({
    beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'ww7e8059cb2ab35355', // 必填，企业微信的corpID
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: noncestr, // 必填，生成签名的随机串
    signature: sha1(signstr), // 必填，签名，见 附录-JS-SDK使用权限签名算法
    jsApiList: ["selectEnterpriseContact"] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
  });

  wx.ready(function () {
    choosePerson();
    console.log('success');
  })

  wx.error(res => {
    console.log(res);
  })

  // jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value
}

function choosePerson() {
  wx.invoke("selectEnterpriseContact", {
    "fromDepartmentId": -1, // 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
    "mode": "multi", // 必填，选择模式，single表示单选，multi表示多选
    "type": ["department", "user"], // 必填，选择限制类型，指定department、user中的一个或者多个
    "selectedDepartmentIds": ["2", "3"], // 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
    "selectedUserIds": ["lisi", "lisi2"] // 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
  }, function (res) {
    if (res.err_msg == "selectEnterpriseContact:ok") {
      if (typeof res.result == 'string') {
        res.result = JSON.parse(res.result) //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
      }
      var selectedDepartmentList = res.result.departmentList; // 已选的部门列表
      for (var i = 0; i < selectedDepartmentList.length; i++) {
        var department = selectedDepartmentList[i];
        var departmentId = department.id; // 已选的单个部门ID
        var departemntName = department.name; // 已选的单个部门名称
      }
      var selectedUserList = res.result.userList; // 已选的成员列表
      for (var i = 0; i < selectedUserList.length; i++) {
        var user = selectedUserList[i];
        var userId = user.id; // 已选的单个成员ID
        var userName = user.name; // 已选的单个成员名称
        var userAvatar = user.avatar; // 已选的单个成员头像
      }
    }
  });
}


function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}


function encodeUTF8(s) {
  var i, r = [],
    c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
  else {
    if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
      c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
      r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
    else r.push(0xE0 + (c >> 12 & 0xF));
    r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
  };
  return r;
}

// 字符串加密成 hex 字符串
function sha1(s) {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16,
    s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [],
    f = [
      function () {
        return m[1] & m[2] | ~m[1] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      },
      function () {
        return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      }
    ],
    rol = function (n, c) {
      return n << c | n >>> (32 - c);
    },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
      t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
      m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");
  return hex;
}