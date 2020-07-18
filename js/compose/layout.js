if (!document.getElementsByClassName) {                                                 //如果浏览器不支持document.getElementsByClassName
    document.getElementsByClassName = function (className, element) {                     //我们先将要写的方法封装成一个函数
        var children = (element || document).getElementsByTagName('*');                   //获取html中所有的DOM节点
        var elements = [];                                                                //用一个空数组存放要获取的class类名
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');                                    //将所有的class节点保存在一个数组之中
            for (var j = 0; j < classNames.length; j++) {                                 //遍历循环，将满足要求的class存入elements空数组中
                if (classNames[j] === className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;                                                                    //返回新的数组
    };
}

// 注册动画
avalon.effect('animate');

var layout = avalon.define({
    $id: 'layout',
    menuShow: true
//  action: 'enter',
//  enterCb: function(){
//    avalon.log('动画完成')
//  },
//  leaveCb: function(){
//    avalon.log('动画回到原点')
//  }
});

var layoutDom = document.getElementsByClassName('layout')[0];

function menuToggleShow() {
    layout.menuShow = !layout.menuShow;
    layoutDom.setAttribute('class', 'layout' + (layout.menuShow ? ' showMenu' : ''));
}

function toggleTheme() {
    var url = window.location.href;
    var themeName = /\.(\w+).+/.exec(url)[1];
    var newTheme = '';
    switch (themeName) {
        case 'first':
            newTheme = 'second';
            break;
        case 'second':
            newTheme = 'third';
            break;
        case 'third':
            newTheme = 'first';
            break;
    }
    url = url.replace(themeName, newTheme);
    window.location.href = url;
}