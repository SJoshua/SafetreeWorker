/* Safetree Worker of Fujian
 * Author: SJoshua
 */
/* function defines */
// Functions of Cookie
function getCookie(name) {
    var arr,
                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
function SetCookie(c_name, value, expiredays){  //3个参数，一个是cookie的名子，一个是值,一个是设置的天数
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";path=/;domain=.safetree.com.cn;expires=" + exdate.toGMTString());
}
function delCookie(name) {

    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";path=/;domain=.safetree.com.cn;expires=" + exp.toGMTString();
    }

}
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";path=/;domain=.safetree.com.cn;expires=" + exdate.toGMTString());
}
function getCookie_decode(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return decodeURIComponent(arr[2]); return null;
}
// CSEE Functions
var CSEE = {
    copy: function (data) {
        window.clipboardData.setData("Text", data);
    },
    userLogin: function (callback) {
        var name = $.trim($("#loginname").val());
        if (!name) {
            alert("请输入登录名");
            $("#loginname").focus();
            return;
        }
        var pwd = $.trim($("#password").val());
        if (!pwd) {
            alert("请输入密码");
            $("#password").focus();
            return;
        }
        var isremember = $("#remusrname").attr("checked");
        isremember = typeof (isremember) == 'undefined' ? "" : isremember;
        $.getJSON("/jiating/LoginHandler.ashx?jsoncallback=?", { userName: name, password: pwd, type: 'login', isremember: isremember, loginType: '2', r: Math.random() }, function (json) {
            if (json.ret == 1) {
                if (callback) {
                    callback(json.data);
                } else {
                    CSEE.showLogin(json.data);
                    if ($(".headertop .all_top_wp .headr").length != 0) {
                        CSEE.showLogin2(json.data, true);
                    }
                }
            }
            else {
                if (callback) {
                    callback(json.data);
                } else {
                    alert("登录失败，用户名或密码错误。请重新输！");
                }
                $("#loginname").focus();
                $("#loginpwd").select();
            }
        });
    },
    userLogin2: function (callback) {
        var name = $.trim($("#loginname2").val());
        if (!name) {
            alert("请输入登录名");
            $("#loginname2").focus();
            return;
        }
        var pwd = $.trim($("#password2").val());
        if (!pwd) {
            alert("请输入密码");
            $("#password2").focus();
            return;
        }
        var isremember = $("#remusrname").attr("checked");
        isremember = typeof (isremember) == 'undefined' ? "" : isremember;
        $.getJSON("/jiating/LoginHandler.ashx?jsoncallback=?", { userName: name, password: pwd, type: 'login', userType: isremember, loginType: '2', r: Math.random() }, function (json) {
            if (json.ret == 1) {
                if (callback) {
                    callback(json.data);
                } else {
                    CSEE.showLogin2(json.data);
                    CSEE.options.refresh = true;
                    if ($("#loginInfo").length != 0) {
                        CSEE.showLogin(json.data);
                    }
                }
                if (CSEE.options.refresh) {
                    var Path = window.location.pathname;
                    if (Path.toLowerCase() == "/safestore/productlist.aspx") {
                        return false;
                    }
                    location.reload();
                }
            }
            else {
                if (callback) {
                    callback(json.data);
                }
                else {
                    switch (json.ret) {
                        case -1:
                            alert("登录失败，用户名或密码错误。请重新输！");
                            break;
                        case -2:
                            alert("帐号不属于平台!");
                            break;
                        default:
                            alert("登录失败!");
                            break;
                    }
                }
                $("#loginname2").focus();
                $("#password2").select();
            }
        });

    },
    loadUserInfo: function(callback, isNotAnsy) {
        var u = getCookie('UserID');
        var uStr = getCookie_decode("_UStr");
        if (uStr == null || uStr == "") {
            if (isNotAnsy) {
                $.ajaxSettings.async = false;
            }
            $.getJSON("/jiating/LoginHandler.ashx?jsoncallback=?", { r: Math.random(), loginType: '1' }, function(json) {
                if (callback) {
                    callback(json.data);
                } else {
                    CSEE.showLogin2(json.data);
                }
            });
            if (isNotAnsy) {
                $.ajaxSettings.async = true;
            }
        } else {
            try {
                uStr = eval('(' + uStr + ')');
                if (uStr.data.UserId == u) {
                    if (callback) {
                        callback(uStr.data);
                    } else {
                        CSEE.showLogin2(uStr.data);
                    }
                } else {
                    $.getJSON("/jiating/LoginHandler.ashx?jsoncallback=?", { r: Math.random(), loginType: '1' }, function (json) {
                        if (callback) {
                            callback(json.data);
                        } else {
                            CSEE.showLogin2(json.data);
                        }
                    });
                }
            } catch (e) {
                location.href = "/login.html";
            }

        }
    },
    showLogin: function (info) {
        var html = "";
        if (info && info != "skip") {
            $("#logina").hide();
            $("#loginb").hide();
            $("#loginc").show();
            $("#loginc .top a:first").children("img").attr({ "src": info.UserPic, "alt": info.TrueName });
            $("#loginc .top .topr p:first").html(info.TrueName);
            $("#loginc .top .topr div:first").html(info.PrvName + "&nbsp;&nbsp;" + info.CityName);
        } else {
            if (info == "skip") {
                $("#logina").hide();
                $("#loginb").show();
                $("#loginb .bto a").attr("href", CSEE.LoginRedirect());
                $("#loginname").focus();
            } else {
                $("#logina").show();
                $("#logina .zcbtn").attr("href", CSEE.LoginRedirect());
                $("#loginb").hide();
                $("#loginc").hide();
            }
        }
    },
    showLogin2: function (info, display, EplatformUrl) {
        var html = "";
        if (info) {
            html = "欢迎你，" + info.TrueName + "&emsp;|&emsp;<a target='_blank' href=\"" + EplatformUrl + "/MainPage.html\">返回学校安全教育平台</a>&emsp;|&emsp;<a href=\"#\" onclick=\"CSEE.exit(function(){window.location.reload();})\" style=\"color:#333\">退出</a>";
            if ($("#div_userInfo").length != 0) {
                $("#div_userInfo").html(html);
            }
        } else {
            if (display == true) {
                if ($(".loginbody").length == 0) {
                    $("<div class=\"loginbody\" style=\"display:none\"></div>").prependTo("body");
                }
            } else {
                $(".logintc select").hide();
                $(".logintc").css("display", "block");
                $(".loginbody").css("display", "block");
                $("#loginname2").focus();
            }
        }
    },
    closeLoginLayer: function () {
        $("select").show();
        $(".loginbody").css("display", "none");
        $(".logintc").css("display", "none");
        var Path = window.location.pathname;
        if (Path.toLowerCase() == "/familyeducenter/seevideo.aspx") {
            window.location.href = "/familyeducenter/skilltest.aspx";
        }
    },
    needLogin: function () {
        var isLogin = false;
        if (typeof ($("#hprovince").val()) != 'undefined' && $("#hprovince").val() == 2) {
            CSEE.loadUserInfo(function (info) {
                if (info != 'undefined') {
                    this.isLogin = true;
                    CSEE.showLogin2(null, 2);
                }
            });
            if (isLogin) {
                return false;
            }
        }
        return true;
    },
    cookie: function (name, value, options) {
        if (typeof (value) != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires
			    && (typeof (options.expires) == 'number'
			        || options.expires.toUTCString)) {
                var date;
                if (typeof (options.expires) == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', escape(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = unescape(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },
    show: function (tag) {
        var light = document.getElementById(tag);
        var fade = document.getElementById('fade');
        if (light.style.display == 'none') {
            light.style.display = 'block';
        } else {
            light.style.display = 'none';
        }
        fade.style.display = 'block';
    },
    hide: function (tag) {
        var light = document.getElementById(tag);
        var fade = document.getElementById('fade');
        light.style.display = 'none';
        fade.style.display = 'none';
    },
    LoginRedirect: function (tag) {
        var url = "/member/regedit.aspx";
        var encodeCurUrl = encodeURIComponent(document.URL);
        if ($.trim(encodeCurUrl) != "") {
            url += "?c=" + encodeCurUrl;
        }
        return url;
    },
    addBookmark: function (title) {
        var url = parent.location.href;
        if (window.sidebar) {
            window.sidebar.addPanel(title, url, "");
        } else if (document.all) {
            window.external.AddFavorite(url, title);
        } else {
            alert("加入收藏失败，请使用CTRL + D进行添加");
        }
    }
};
// Util Function
function GetSiteUrl(ComeFrom) {
    var StrUrl = "";
    if (ComeFrom == null || ComeFrom == undefined)
        return "javascript:void(0)";
    switch (ComeFrom.toString()) {
        case "20002":
            StrUrl = "shaoxing";
            break;
        case "20003":
            StrUrl = "xuzhou";
            break;
        case "20004":
            StrUrl = "chengdu";
            break;
        case "20005":
            StrUrl = "linhai";
            break;
        case "20006":
            StrUrl = "qingdao";
            break;
    }
    return StrUrl != "" ? "http://" + StrUrl + ".safetree.com.cn/MainPage.html" : "javascript:void(0)";
}

/* Main */
// ID Defines
//usage: 第一个for用于专题，第二个for用于训练。
var id  =  ["account01", "account02"];
/********************************/
for (var k in id) {	
	$.getJSON(loginAsmx + "/SpecialLogin?jsoncallback=?", { r: Math.random(), account: id[k], password: "123456" });
	// Sign
	tijiao(0);
	// Do charts
	chooseList = LIST;
	alert("confirm."); // or sleep ... 
	submitQ();
}

/*********************************/
// Task Informations
var task = [
	["17102", "832", "1360", "189253", "920", "自觉抵制影响和危害社会公共安全的活动"] // for example
]

console.log("=== Informations ===");
console.log("The number of Accounts: " + id.length);
console.log("The number of Tasks: " + task.length);

for (var k in task) {
	console.log(" - Task #" + k + " - " + task[k][5] + " (" + task[k][2] + ");");
}

for (var k in id) {	
	console.log("Processing: account #" + k + " - " + id[k]); 
	var c = $.getJSON("/jiating/LoginHandler.ashx?jsoncallback=?", { userName: id[k] , password: "123456", type: 'login', userType: "", loginType: '2', r: Math.random() }, function (json) { if (json.ret == 1) { CSEE.showLogin2(json.data); if ($("#loginInfo").length != 0) { CSEE.showLogin(json.data); } } } );
	
	console.log("Accessing: retcode - " + c.readyState);
	
	for (var i in task) {
		SeeVideo.SkillCheckName(task[i][0], task[i][1], task[i][2]).value;
		var n = SeeVideo.TemplateIn2(task[i][3], task[i][4] , task[i][5], "", "", "", "0|0|0", "已掌握技能", 100, 1, "", "", "",task[i][2]).value;
		console.log(" - Task #" + i + " - retcode: " + n);
	}
}
