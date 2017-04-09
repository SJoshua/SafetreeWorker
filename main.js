/* SafetreeWork 
 * Au: SJoshua
 */

var accounts = ["account01", "account02", "account03"];

/* function work(type, next)
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

/* function goNext(current)
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

var accounts = ["account01", "account02", "account03"];

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
		var ret = SeeVideo.TemplateIn2(tasks[id][3], tasks[id][4] , tasks[id][5], "", "", "", "0|0|0", "已掌握技能", 100, 1, "", "", "", tasks[id][2]).value;
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

/* function goNext(current)
 * Au: SJoshua
 */
function goNext(current = 0) {
	if (current < accounts.length) {
		console.log("[login] " + accounts[current]);
		$.getJSON("https://fujianlogin.safetree.com.cn/LoginHandler.ashx?jsoncallback=?", { userName: accounts[current], password: "123456", checkcode: "", type: 'login', loginType: '1', r: Math.random() }, function (data) {
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
