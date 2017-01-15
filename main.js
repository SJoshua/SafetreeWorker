/* SafetreeWork 
 * Au: SJoshua
 */

var accounts = ["yeyongzhao", "chenguqi1003500", "cengying1513", "chenshaoxin1803", "chenqigong6731", "chenshaolei3045", "huxiangyu1033", "linrongyu4001", "chenxiaowei2006189", "shiyichi", "zhangyiheng5003189", "chenshuyi2534", "lizhuoqin2031", "hubocheng1009", "wulingqi4000", "xiaoluying2006", "chenjingyuan1003", "linhuilin2517", "yanglintao1000", "caixinyi2055", "lvshufang2521", "qiuzhihong3065", "lijun1039788", "lvbingyan1522", "wujiaqi2510", "zhuhesen1502", "linyicheng3507", "zhenghongteng", "huangyujian5010", "chenxin2126", "huji1557", "chenjingyang1025", "juxian4006", "hzy82625", "linming1008880", "qiutingting2634", "huangyu3002980", "chenyajing2049", "chenshuyu1006", "xieguqi3548", "dingzhikun1003", "caijiaying4007", "zhengxufan7000", "xieyinchun1560", "xiaojianyu5525", "jiweitao1032", "lvjingwen2524", "chenjianfeng1543", "lvboli1520", "huangshiyi2553", "yangkai5528546", "linweiteng6230", "chenhejun5939", "chenjiaxuan3965", "chenrui5492", "wangyuhao6848", "songjunlin3124", "huangcaiqiong8769", "xushijia2662", "zengjiaxin3689"];

/* function work(current, type)
 * Au: SJoshua
 */
function work(type, next) {
	if (type < 3) {
		SpecialSign(type, function(res) {
			console.log("[part] " + type);
			if (res.Status != null) {
				console.log("> done.");
				return work(type + 1, next);
			} else {
				console.log("> retry;")
				return work(type, next);
			}
		});
	} else {
		return goNext(next);
	}
}

/* function goNext(current, type)
 * Au: SJoshua
 */
function goNext(current = 0) {
	if (current < accounts.length) {
		console.log("[login] " + accounts[current]);
		$.getJSON(loginAsmx + "/SpecialLogin?jsoncallback=?", { r: Math.random(), account: accounts[current], password: "123456" }, function(data) {
			if (data.userlogintype) {
				return work(1, current + 1);
			} else {
				console.log("> retry;")
				return goNext(current);
			}
		});
	} else {
		console.log("[done]");
	}
}

goNext();

/******************************************************************************/

var accounts = ["yeyongzhao", "chenguqi1003500", "cengying1513", "chenshaoxin1803", "chenqigong6731", "chenshaolei3045", "huxiangyu1033", "linrongyu4001", "chenxiaowei2006189", "shiyichi", "zhangyiheng5003189", "chenshuyi2534", "lizhuoqin2031", "hubocheng1009", "wulingqi4000", "xiaoluying2006", "chenjingyuan1003", "linhuilin2517", "yanglintao1000", "caixinyi2055", "lvshufang2521", "qiuzhihong3065", "lijun1039788", "lvbingyan1522", "wujiaqi2510", "zhuhesen1502", "linyicheng3507", "zhenghongteng", "huangyujian5010", "chenxin2126", "huji1557", "chenjingyang1025", "juxian4006", "hzy82625", "linming1008880", "qiutingting2634", "huangyu3002980", "chenyajing2049", "chenshuyu1006", "xieguqi3548", "dingzhikun1003", "caijiaying4007", "zhengxufan7000", "xieyinchun1560", "xiaojianyu5525", "jiweitao1032", "lvjingwen2524", "chenjianfeng1543", "lvboli1520", "huangshiyi2553", "yangkai5528546", "linweiteng6230", "chenhejun5939", "chenjiaxuan3965", "chenrui5492", "wangyuhao6848", "songjunlin3124", "huangcaiqiong8769", "xushijia2662", "zengjiaxin3689"];

var tasks = [
	["11927", "789", "1346", "244408", "809", "烟酒赌毒，要远离"],
	["18879", "789", "1347", "245280", "811", "正视自我开心生活"],
	["18882", "789", "1345", "229982", "806", "青春来敲门，一起谈谈“性”"],
]

console.log("=== Informations ===");

console.log("The number of Accounts: " + accounts.length);
console.log("The number of Tasks: " + tasks.length);

for (var i in tasks) {
	console.log(" - Task #" + i + " - " + tasks[i][5] + " (" + tasks[i][2] + ");");
}

/* function work(id, next)
 * Au: SJoshua
 */
function work(id, next) {
	if (id < tasks.length) {
		console.log("[task] #" + id);
		SeeVideo.SkillCheckName(tasks[id][0], tasks[id][1], tasks[id][2]);
		var ret = SeeVideo.TemplateIn2(tasks[id][3], tasks[id][4] , tasks[id][5], "", "", "", "0|0|0", "已掌握技能", 100, 1, "", "", "", tasks[i][2]).value;
		if (ret == 1 || ret == 4) {
			console.log("> done.")
			return work(id + 1, next);
		} else {
			console.log("> retry;");
			return work(id, next);
		}
	} else {
		console.log("> finished.")
		return goNext(next);
	}
}

/* function goNext(current, id)
 * Au: SJoshua
 */
function goNext(current = 0) {
	if (current < accounts.length) {
		console.log("[login] " + accounts[current]);
		$.getJSON("/jiating/LoginHandler.ashx?jsoncallback=?", { userName: accounts[current] , password: "123456", type: 'login', loginType: '2', r: Math.random() }, function (data) {
			if (data.ret == 1) {
				return work(0, current + 1);
			} else {
				console.log("> retry;");
				return goNext(current);
			}
		});
	} else {
		console.log("[done]");
	}
}

goNext();
