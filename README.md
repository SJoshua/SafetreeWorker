# SafetreeWorker
这是一个用于完成[家庭安全教育中心](http://xiamen.safetree.com.cn/)的作业的自动化脚本。

我并没有做太多人性化设计，毕竟这只是用来削减工作量的东西（意外的不是一次性脚本）。

## Defines
`accounts`: 存放所有ID的数组。

`tasks`: 存放技能训练作业信息的数组。

## Usage
首先，你需要在对应的页面按F12打开Console。

对于**专题活动的模块一**（指的是需要签名的部分），把`accounts`和`goNext`复制进去，并执行`goNext(0);`即可。

对于**专题活动的模块二**（指的是需要答题的部分），把`accounts`和`answerNext`复制进去，并执行`answerNext(0);`即可。

对于**技能训练作业**，把`accounts`和`tasks`以及`doNext`复制进去，并执行`doNext(0);`即可。

## Note
我是边学JavaScript边写这个脚本的（好像拿起来就直接瞎用了），所以可能出现各种奇怪的错误。

这个脚本适用于厦门市的子站点，对于其它省市可能不适用。可供参考。

<del>我终于放弃用英文写README了，之前写的简直都是黑历史...</del>
