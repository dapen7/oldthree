var secondMenus = avalon.define({
    $id: 'secondMenus',
    secondMenus: [] // 二级菜单
});

var mobile = window.location.href.indexOf('mobile') > -1 ? '.mobile' : '';
var githublocation  = "";
if(window.location.href.indexOf("github")!=-1){
    githublocation = "https://dapen7.github.io/oldthree"
}
var menus = avalon.define({
    $id: 'menus',
    active: null,
    width: '100%',
    location: [], // 当前位置
    menus: [
        {
            icon: githublocation +'/img/access/' + __themeName + '/home_home_icon.png',
            text: '首页',
            url: '/views/nav.' + __themeName + mobile + '.html',
            open: false,
            child: []
        },
        {
            icon: githublocation +'/img/access/' + __themeName + '/home_working_icon.png',
            text: '我的工作台',
            url: '/views/home.' + __themeName + mobile + '.html',
            open: false,
            child: []
        },
        {
            icon: githublocation +'/img/access/' + __themeName + '/home_organ_icon.png',
            text: '机构用户',
            url: '',
            open: false,
            child: [
                {
                    icon: '', text: '机构管理', url: '', open: false,
                    child: [
                        {
                            icon: '',
                            text: '机构信息',
                            url: '/views/organization/list.' + __themeName + mobile + '.html',
                            open: false
                        }
                    ]
                },
                {
                    icon: '',
                    text: '用户管理',
                    url: '/views/organization/add.' + __themeName + mobile + '.html',
                    open: false,
                    child: []
                },
                {
                    icon: '',
                    text: '质卡填报',
                    url: '/views/organization/add2.' + __themeName + mobile + '.html',
                    open: false,
                    child: []
                }
            ]
        },
        {
            icon: githublocation +'/img/access/' + __themeName + '/home_set_icon.png',
            text: '系统设置',
            url: '',
            open: false,
            child: [
                {
                    icon: '',
                    text: '字典管理',
                    url: '/views/dictionary/list.' + __themeName + mobile + '.html',
                    open: false,
                    child: []
                }
            ]
        },
        {
            icon: githublocation +'/img/access/' + __themeName + '/home_set_icon.png',
            text: '项目周期',
            url: '',
            open: false,
            child: [
                {
                    icon: '',
                    text: '策划目录',
                    url: '/views/project/add.' + __themeName + mobile + '.html',
                    open: false,
                    child: []
                },
                {
                    icon: '',
                    text: '策划目录2',
                    url: '/views/project/add2.' + __themeName + mobile + '.html',
                    open: false,
                    child: []
                },
                {
                    icon: '',
                    text: '图表',
                    url: '/views/project/chart.' + __themeName + mobile + '.html',
                    open: false,
                    child: []
                }
            ]
        }
    ],
    clickMenuCall: function (menu, index) {
        if (menu.url) {
            this.active = menu.url;
        }
        if (menu.child && menu.child.length) {
            menu.open = !menu.open;
            if (index === 2) {
                secondMenus.secondMenus = avalon.mix(true, [], menu.child);
            }
        } else {
            menu.open = false;
            secondMenus.secondMenus = avalon.mix(true, [], []);
        }
    }
});

// 初始化菜单选中
menus.$watch('onReady', function () {
    var pathname = window.location.pathname;
    var el = this.$element.childNodes;
    var widthNum = 0;
    for (var i = 0; i < el.length; i++) { // 移动端第二个主题重新计算宽度
        var t = el[i].offsetWidth;
        if (t) {
            widthNum += t;
        }
    }
    if (widthNum) {
        this.width = widthNum + 'px';
    }
    activeMenuByPath(pathname);
});

function activeMenuByPath(pathname) {
    var _this = menus;
    _this.active = pathname;
    _this.location = [];
    _this.menus.map(function (item, index) {
        if (item.child.length) {
            item.child.map(function (sItem, sIndex) {
                if (sItem.child.length) {
                    sItem.child.map(function (ssItem, ssIndex) {
                        if (pathname === ssItem.url) {
                            ssItem.open = true;
                            sItem.open = true;
                            item.open = true;
                            _this.location.push(item);
                            _this.location.push(sItem);
                            _this.location.push(ssItem);
                            secondMenus.secondMenus = avalon.mix(true, [], item.child);
                        }
                    });
                } else {
                    if (pathname === sItem.url) {
                        sItem.open = true;
                        item.open = true;
                        _this.location.push(item);
                        _this.location.push(sItem);
                        secondMenus.secondMenus = avalon.mix(true, [], item.child);
                    }
                }
            });
        } else {
            if (pathname === item.url) {
                item.open = true;
                _this.location.push(item);
            }
        }
    });
}
