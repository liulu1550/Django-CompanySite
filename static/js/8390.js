//interfaceFun接口函数，初始化入口
//indexMain  对应页面

// import ff_owl from './owl.carousel';
// {faf: include('../options/headerHover/headerHover.js')}
var options = {},
    newStyleContent = {
        insertCss: `
            .ff_bodyMask {
                position: fixed;
                z-index: 10000;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .3);
                display: none;
            }
            .ff_bodyMask-content {
                position: absolute;
                top: 50%;
                left: 50%;
                background: #fff;
                transform: translate3D(-50%, -60%, 0);
            }
        `
    },
    job = {};

(function (win, $) {

    $.fn.extend({
        simpleSlider: function simpleSlider(option) {
            
                        var _width = 0,
                            widths = [],
                            fullWidths = [],
                            heights = [],
                            fullHeights = [],
                            itemWidths = [],
                            pos = [],
                            initOption = {
                                style: 'top',
                                items: 3,
                                dir: true,
                                margin: 0,
                                speed: 800
                            },
                            currentItem,
                            $slider = $(this),
                            $sliderWrap = $slider.parent(),
                            sliderWrapPad = {
                                left: [parseInt($sliderWrap.css('padding-left')).toFixed(2), parseInt($sliderWrap.css('padding-right')).toFixed(2)],
                                top: [parseInt($sliderWrap.css('padding-top')).toFixed(2), parseInt($sliderWrap.css('padding-bottom')).toFixed(2)]
                            },
                            items = $slider.children(),
                            current = 0,
                            sliderNav;
            
                        var dirBtn = '\n                <div class="owl-nav">\n                    <div class="owl-prev">\n                        <i class="icon iconfont icon-back"></i>\n                    </div>\n                    <div class="owl-next">\n                        <i class="iconfont icon-more"></i>\n                    </div>\n                </div>';
            
                        items.eq(0).addClass('active');
                        items.wrapAll('<div class="simple-slider-outer"><div class="simple-slider-stage"></div></div>');
            
                        $slider = $(this).find('.simple-slider-stage');
                        $sliderWrap = $slider.parent();
            
                        $.extend(initOption, option, true);
            
                        if (initOption.dir) {
            
                            $(dirBtn).insertAfter($sliderWrap);
                        }
            
                        function gotoPos(index, page) {
                            var dataArr, dir;
                            if (initOption.style == 'left') {
                                dir = 'lr';
                                if (page) {
                                    dataArr = fullWidths;
                                } else {
                                    dataArr = widths;
                                }
                            } else if (initOption.style == 'top') {
                                console.log(heights, 'top 下高度数据集合')
                                dir = 'bt';
                                if (page) {
                                    dataArr = fullHeights;
                                } else {
                                    dataArr = heights;
                                }
                            }
                            if (page) {
                                if (index < current) {
                                    index = initOption.items * (Math.floor((index) / initOption.items)) - 1;
                                } else if (index > current) {
                                    console.log(index, 'downc')
                                    index = initOption.items * Math.ceil((index) / initOption.items);
                                    index = Math.min(index, items.length - initOption.items);
                                    console.log(index, 'downc')
                                }
                            }
            
                            index = Math.max(index, 0);
                            index = Math.min(index, items.length - 1);
            
                            var $currentItem = items.eq(index),
                                disBox = tools.getRelPos($currentItem, $sliderWrap),
                                disPar = tools.getRelPos($currentItem, $slider),
                                disInfor;
            
                            // if ($currentItem.hasClass('active')) return;
            
                            tools.tabActive(items.eq(index));
                            if (page) {
                                $slider.css({
                                    'transform': function () {
                                        var dis = -dataArr[index],
                                            str;
                                        if (dir == 'lr') {
                                            str = 'translate3D(' + dis + 'px, 0px, 0px)';
                                        } else if (dir == 'bt') {
                                            str = 'translate3D(0px, ' + dis + 'px, 0px)';
                                        }
                                        return str;
                                    }
                                });
                            } else if (items[index - 1] && tools.getRelPos($sliderWrap, items.eq(index - 1))[initOption.style] < 0) {
            
                                disInfor = tools.getRelPos(items.eq(index - 1), $slider);
            
                                $slider.css({
                                    'transform': function transform() {
                                        var disX = disInfor.left,
                                            disY = disInfor.top,
                                            str = 'translate3D(' + disX + 'px, ' + disY + 'px, 0px)';
                                        return str;
                                    }
                                });
                            } else if (dataArr[index + 1] && dataArr[index + 1] < 0) {
                                console.log('infor', Math.abs(dataArr[index + 1]), $sliderWrap.outerHeight());
                                console.log(dataArr, dataArr[index], index);
                                $slider.css({
                                    'transform': function () {
                                        var dis = dataArr[index + 1],
                                            str;
                                        if (dir == 'lr') {
                                            str = 'translate3D(' + dis + 'px, 0px, 0px)';
                                        } else if (dir == 'bt') {
                                            str = 'translate3D(0px, ' + dis + 'px, 0px)';
                                        }
                                        console.log(str);
                                        return str;
                                    }
                                });
                            }
            
                            current = index;
            
                            $sliderWrap.trigger('change-simpleSlider', [{
                                item: current
                            }]);
                        }
            
                        // 确认 一行显示几个
                        initOption.items = initOption.items ? initOption.items : Math.round($sliderWrap.width() / items.eq(0).width());
                        $sliderWrap.css({
                            overflow: 'hidden'
                        });
                        $slider.css({
                            'transition': initOption.speed / 1000 + 's'
                        });
            
                        if (initOption.style == 'left') {
                            initOption.margin = initOption.margin ? initOption.margin : -parseInt($(this).css('margin-right'));
                            items.each(function (i, n) {
                                $(n).css({
                                    width: function width() {
                                        _width += (($sliderWrap.width() + initOption.margin) / initOption.items).toFixed(3) - initOption.margin + initOption.margin;
                                        return (($sliderWrap.width() + initOption.margin) / initOption.items).toFixed(3) - initOption.margin;
                                    }
                                });
            
                                widths.push(Math.max(_width - $sliderWrap.width()));
                                fullWidths.push(_width);
                            });
                            fullWidths.unshift(0);
                            $slider.css({
                                width: _width
                            });
                            items.css({
                                float: 'left',
                                'margin-right': initOption.margin
                            });
                        } else if (initOption.style == 'top') {
                            initOption.margin = initOption.margin ? initOption.margin : parseInt($(this).css('margin-bottom'));
            
                            items.each(function (i, n) {
                                $(n).css({
                                    width: function width() {
                                        return $(this).outerWidth();
                                    },
                                    height: function height() {
                                        return $(this).outerHeight();
                                    }
                                });
                            });
            
                            var h = items.eq(0).height();
            
                            items.css({
                                float: 'none',
                                'margin-bottom': initOption.margin
                            });
                            $slider.css({
                                height: 'auto'
                            });
                            $sliderWrap.css({
                                height: function height() {
                                    return (items.eq(0).outerHeight() + initOption.margin) * initOption.items - initOption.margin;
                                }
                            });
            
                            items.each(function (i, n) {
                                var itemHeight = $(n).outerHeight(),
                                    disY = tools.getRelPos($(this), $sliderWrap).top,
                                    wraperHeight;
                                if (isNaN($sliderWrap.css('margin'))) {
            
                                    wraperHeight = $sliderWrap.height() - parseInt($sliderWrap.css('margin'));
                                } else {
            
                                    wraperHeight = $sliderWrap.height() - $sliderWrap.css('margin');
                                }
            
                                fullHeights.push((items.eq(0).outerHeight() + initOption.margin) * Math.min(items.length - initOption.items, i));
                                heights.push(Math.min(0, disY - itemHeight + wraperHeight));
            
                            });
            
                        }
            
                        items.on('click', function () {
                            gotoPos($(this).index());
                        });
                        $(this).find('.owl-prev').click(function (ev) {
                            gotoPos(current - 1, false);
                        });
                        $(this).find('.owl-next').click(function (ev) {
                            gotoPos(current + 1, false);
                        });
            
                        return {
                            el: $sliderWrap,
                            now: function now() {
                                return current;
                            },
                            to: function to(index) {
                                console.log(index);
                                gotoPos(index);
                            },
                            next: function next() {
                                this.to(current + 1);
                            },
                            prev: function prev() {
                                this.to(current - 1);
                            }
                        };
                    }
    });
})(window, jQuery);
options.videomplay = {
    name: "videomplay",
    css: '',
    fn: function videomplay() {
        var $videoArea = $('.videom'),
            $videoItem = $('.videom .content_list .item_block'),
            videoLinks = [],
            videoInfor = [];


        function getSingle(fn) {
            var result;

            return function () {
                return result ? result : (result = fn.apply(this, arguments));
            };
        }

        var singleVBg = getSingle(createVideoBg);

        function createVideoBg(obj) {
            var videoBg = $('<div class="videoBg" style="display: none"></div>').appendTo($('body')),
                initObj, config, result, timer;

            initObj = {
                initDo: function () {},
                outDo: function () {},
                inDo: function () {},
                hide: function () {
                    config.outDo.call(this, result);
                    videoBg.fadeOut();
                    $(videoBg).removeClass('deepView');
                    clearTimeout(timer);
                },
                show: function () {
                    timer = setTimeout(function () {
                        $(videoBg).addClass('deepView');
                    }, 4000);
                    config.inDo.call(this, result);
                    videoBg.fadeIn();
                }
            };
            config = $.extend(initObj, obj);

            videoBg.on({
                'click': function (ev) {

                    if ($(ev.target).hasClass('vPlayArea')) {

                        initObj.hide();
                    }
                },
                'mousewheel': function () {
                    return false;
                },
                'mousemove': function () {
                    var _this = this;
                    $(_this).removeClass('deepView');
                    if (timer) {
                        clearTimeout(timer)
                    }
                    timer = setTimeout(function () {
                        $(_this).addClass('deepView');
                    }, 4000);
                }
            });

            result = {
                bgJDOM: videoBg,
                hide: initObj.hide,
                show: initObj.show
            };

            initObj.initDo.call(this, result);

            return result;
        }


        var Videom = function (config, cd) {
            var cb = cb || {};
            this.initDo = false;
            this.evlist = {};
            this.initConfig = {
                link: []
            };
            this.cb = {};
            $.extend(true, this.initConfig, config);
            $.extend(true, this.cb, cb);
        };

        Videom.prototype = {
            construct: Videom,
            init: function (box, infor) {
                var videoInfor, v = this,
                    videoArea;

                if (typeof infor == 'number') {
                    videoInfor = this.initConfig.list[infor];
                } else {
                    videoInfor = {
                        videoLink: infor
                    };
                }

                if (this.initDo == true) {
                    this.tabTo(videoInfor);
                    this._trigger('initDo');
                    return;
                }

                this.initDo = true;
                var str = '<div class="vPlayArea">';

                str += `<div class="vPlayItem">
                            <video src="" autoplay controls="controls"> 您的浏览器不支持 video 标签。 </video>
                            <div class="videoInfor">
                                <div class="videoHeader">
                                    <p class="title"></p>
                                    <p class="subtitle"></p>
                                </div>
                                <div class="videoDes">
                                    <p class="description">
                                    </p>
                                </div>
                            </div>
                        </div>`;
                str += '</div>';


                $(str).on('click', function (ev) {
                    ev.stopPropagation();
                });
                videoArea = $(str).appendTo(box);

                v.box = box;
                v.videoArea = videoArea;
                v.video = videoArea.find('video');
                v.videoBox = videoArea.find('.vPlayItem');
                v.inforBox = videoArea.find('.videoInfor');
                v.desBox = videoArea.find('.videoDes');
                v.videoDom = v.video[0];

                // v._tabText(v.inforBox.find('.title'), videoInfor.title);
                // v._tabText(v.inforBox.find('.subtitle'), videoInfor.subtitle);
                // v._tabText(v.desBox.find('.description'), videoInfor.description);
                v._addControl(infor);

                this._bind('initDo', function () {
                    var _this = this;
                    this.video.on('click', function (ev) {
                        if (ev.which == 1) {
                            _this.tabState();
                        }
                    });
                });
                this._trigger('initDo');
                this.tabTo(videoInfor);
            },
            on: function (name, fn) {
                this._bind(name, fn);
            },
            tabTo: function (infor) {
                console.log(infor);
                var initInfor = {
                    index: 0,
                    description: "",
                    subtitle: "",
                    title: "",
                    videoLink: ""
                };
                $.extend(initInfor, infor);

                this._tabBtn(infor.index);
                this.video.attr('src', initInfor.videoLink);

                this._tabText(this.inforBox.find('.title'), initInfor.title);
                this._tabText(this.inforBox.find('.subtitle'), initInfor.subtitle);
                this._tabText(this.desBox.find('.description'), initInfor.description);
            },
            out: function () {
                this.stop();
                this._trigger('outvideo');
            },
            stop: function () {
                this.videoDom.pause();
            },
            play: function () {
                this.videoDom.play();
            },
            state: function () {
                var isPlay;

                if (this.videoDom.paused) {
                    isPlay = false;
                } else {

                    isPlay = true;
                }
                return isPlay;
            },
            tabState: function () {
                var isPlay = this.state();
                if (isPlay) {
                    this.stop();
                } else {
                    this.play();
                }
            },
            _addControl: function (num) {
                if (typeof num != 'number') return;
                var hasControl = false,
                    v = this,
                    prev, next, prevBtn, nextBtn;

                v.currentIndex = num;
                prev = {
                    index: num - 1,
                    className: (function () {
                        if (typeof v.initConfig.list[(num - 1)] == 'undefined') {
                            return 'disable';
                        } else {
                            return 'able';
                        }
                    })()
                };
                next = {
                    index: num + 1,
                    className: (function () {
                        if (typeof v.initConfig.list[(num + 1)] == 'undefined') {
                            return 'disable';
                        } else {
                            return 'able';
                        }
                    })()
                };

                if (hasControl) {

                    prevBtn.data('index', prev.index).addClass(prev.className);
                    nextBtn.data('index', next.index).addClass(next.className);
                    return;
                }
                hasControl = true;

                var tabControlStr, tabControl;
                tabControlStr = `
                    <div class="videoTabBtns">
                        <div class="videoTabBtn prev ${prev.className}" data-index="${prev.index}">
                            <p></p>
                            <i class="icon"></i>
                        </div>
                        <div class="videoTabBtn next ${next.className}" data-index="${next.index}">
                            <p></p>
                            <i class="icon"></i>
                        </div>
                    </div>
                `;


                tabControl = $(tabControlStr).appendTo(v.box);
                prevBtn = tabControl.find('.prev');
                nextBtn = tabControl.find('.next');

                tabControl.on('click', '.videoTabBtn', function (ev) {

                    ev.stopPropagation();
                    var btn = this;
                    if ($(btn).hasClass('disable') == false) {

                        v.tabTo(v.initConfig.list[$(btn).data('index')]);
                    }
                    return false;
                });

                v.tabControl = tabControl;
            },
            _tabBtn: function (index) {
                this._addControl(index);
            },
            _tabText: function (el, text) {
                if (typeof text == "undefined") {
                    $(el).css({
                        display: "none"
                    });
                } else {
                    $(el).text(text);
                }
            },
            _bindEv: function (name, fn) {
                var _this = this;
                this.cb[name] = fn;
                $.each(_this.cb, function (indexInArray, valueOfElement) {

                    $(_this).off(name).on(name, fn);
                });
            },
            _trigerEv: function (name, option) {

                if (typeof (this.cb[name]) != 'function') {
                    this._bindEv(name, function () {});
                }
                $(this).trigger(name, option);
            },
            _bind: function (name, fn) {
                var _self = this,
                    evlist = this.evlist;

                if (!evlist[name]) {
                    evlist[name] = [];
                } else if (fn in evlist[name]) {
                    return;
                }
                this.evlist[name].push(fn);
            },
            _trigger: function (name, context, arg) {
                var fns = this.evlist[name];

                if (!fns || fns.length === 0) {
                    return false;
                }

                if (!context) {

                    context = this;
                } else if (Object.prototype.toString.call(context) == '[object Array]') {

                    arg = context;
                    context = this;
                }

                $.each(fns, function (i, v) {
                    v.apply(context, arg);
                });
            },
        };

        $videoItem.each(function (i, e) {
            var infor = {};
            infor.index = i;
            infor.title = $(e).find('.item_info .title').text();
            infor.subtitle = $(e).find('.item_info .subtitle').text();
            infor.description = $(e).find('.description').text();
            infor.videoLink = $(e).data('href');
            videoInfor.push(infor);
            videoLinks.push($(e).data('href'));
        });

        var vPlayer = new Videom({
            list: videoInfor
        });
        var vBg = singleVBg({

                initDo: function (bg) {

                },
                inDo: function (bg) {

                    $('body').on('keydown.video', function (ev) {
                        if (ev.keyCode == 32) {
                            ev.stopPropagation();
                            ev.preventDefault();
                            vPlayer.tabState();
                        }
                    });
                },
                outDo: function (bg) {
                    vPlayer.out();

                    $('body').off('keydown.video');
                }
            }),
            mask = vBg.bgJDOM;
        vPlayer.on('initDo', function () {
            vBg.show();
            this.videoArea.addClass('vshow');
        });

        vPlayer.on('outvideo', function () {
            this.videoArea.removeClass('vshow');
        });

        $videoItem.on({
            'click.video': function () {
                var link = $(this).data('href'),
                    index = $(this).data('index');

                if (typeof link == 'undefined') return;
                vPlayer.init(mask, index);
            }
        });
    }
};
options.initThings = {
    name: "initThings",
    css: '',
    fn: function initThings() {
        
        $('.project.item_block').off('click');
        $('#topSlider .progress').remove();
        $('canvas').remove();
        $('#minOpenBtn').click(function (){
            $('body').toggleClass('openMenu')
        })
    }
};

options.headerHover = {
    name: "headerHover",
    css: '',
    fn: function headerHover() {
        // $(function () {
        //     var activeNav = $('#navWrapper .nav > .navitem > a.active', '#header');
        //     console.log($('#navWrapper .nav .move'), activeNav.offset().left,  $('#navWrapper .content').offset().left);
        //     $('#navWrapper .nav .move').css({
        //         left: activeNav.offset().left - $('#navWrapper .content').offset().left,
        //         width: activeNav.outerWidth()
        //     });
        // });
        var _this = this,
            $listPar = $('#navWrapper .nav'),
            $moveEl,
            $moveShow,
            $headerNavList = $('#navWrapper .nav>.navitem', '#header'),
            $choiseItem = $('#navWrapper .nav>.navitem>.active', '#header').closest('.navitem');

        function getWidth(el) {

            return $(el).width();
        }

        function getPos(el) {

            return $(el).position();
        }

        (function createMoveEl($el) {

            $moveEl = $('<li class="jsMoveEl"><span></span></li>').appendTo('#navWrapper .nav');
            $moveShow = $moveEl.find('span');

            $listPar.css('position', 'relative');
            $moveEl.css({
                position: 'absolute',
                left: getPos($choiseItem).left,
                bottom: '0',
                width: getWidth($choiseItem),
                height: '2px',
                'z-index': -1
            });
            $moveShow.css({

                position: 'absolute',
                left: '0',
                right: 0,
                top: '0',
                margin: 'auto',
                width: '100%',
                height: '2px',
                'z-index': -1
            });
        })();

        $headerNavList.on('mouseenter', function () {

            var _this = this,
                $subNav = $(this).find('.subnav:not(:animated)');

            if ($subNav[0]) {

                $subNav.slideDown(200);
                $moveEl.stop().animate({

                    width: getWidth(_this),
                    left: getPos(_this).left,
                    // opacity: 0
                });
            } else {

                $moveEl.stop().animate({

                    width: getWidth(_this),
                    left: getPos(_this).left,
                    // opacity: 1
                });
            }
            $moveShow.stop().animate({

                width: '100%',
                opacity: '1'
            });
        });

        $headerNavList.on('mouseleave', function () {
            var $subNav = $(this).find('.subnav');
            if ($subNav.length) {

                $subNav.slideUp();
            }
        });

        $listPar.on('mouseleave', function () {
            $moveEl.stop().animate({

                width: getWidth($choiseItem),
                left: getPos($choiseItem).left
            });
        });
    }
};
options.npostSlider = {
    name: "npostSlider",
    css: '\n        #postSlider .tab_button .content_list {\n            width: 240px;\n        }\n    ',
    fn: function npostSlider() {
        var npostSliderApp = $('#postSlider .tab_content').addClass('owl-carousel owl-theme').owlCarousel({
            center: false,
            items: 1,
            loop: false,
            autoWidth: false,
            responsive: false,
            nav: true,
            dots: true,
            smartSpeed: 800,
            navText: ['<i class="icon iconfont icon-back"></i>', '<i class="iconfont icon-more"></i>']
        });
        // var npostSliderThumbApp = $('#postSlider .tab_button').addClass('owl-carousel owl-theme').owlCarousel({
        //     center: false,
        //     items: 3,
        //     loop: false,
        //     autoWidth: false,
        //     responsive: false,
        //     nav: false,
        //     dots: false,
        //     margin: 10
        // });
        // $('#postSlider .tab_button').find('.item_block[data-tab-index="0"]').addClass('current');
        // npostSliderApp.on('changed.owl.carousel', function (event) {
        //     var item = event.item.index;
        //     var $buttons = $('#postSlider .tab_button').find('.item_block');
        //     npostSliderThumbApp.trigger('to.owl.carousel', [item]);
        //     $('#postSlider .tab_button').find('.item_block').removeClass('current');
        //     $buttons.eq(item).addClass('current');
        // });
        // $('#postSlider .tab_button').find('.owl-item').click(function () {
        //     var index = $(this).index();
        //     npostSliderApp.trigger('to.owl.carousel', [index]);
        // });
    }
};
options.normalTeamTabs = {
    name: "normalTeamTabs",
    css: '',
    fn: function (option, haveBtn){
        var initOption = {
            center: false,
            items: 1,
            loop: false,
            autoWidth: false,
            responsive: false,
            nav: true,
            dots: true,
            smartSpeed: 800,
            navText: ['<i class="icon iconfont icon-back"></i>', '<i class="iconfont icon-more"></i>']
        };
        $.extend(initOption, option, true);
        var teamTabsSliderApp = $('.ff_indexPage .team_tabs .tab_content .content_list').addClass('owl-carousel owl-theme').owlCarousel(initOption);
        if (haveBtn) {
            $('.ff_indexPage .team_tabs .tab_button .item_block').click(function () {
                var _this = this;
                var index = $(this).index();
                teamTabsSliderApp.trigger('to.owl.carousel', [index]);
            });
        }
    }
};
options.searchForm = {
    name: "searchForm",
    css: '',
    fn: function searchForm(option) {
        var onOffBtn = $('#search-nav .searchOnOff');
        var searchEv = {
            searchShow: function searchShow() {
                var search_e = this,
                    timer,
                    logoW = $('#headTop').outerWidth(true);

                onOffBtn.click(function () {

                    $('#navWrapper .nav').addClass('navShow');
                    $('#search-nav').addClass('navShow');
                    $('.bodyMask').addClass('open');
                    $('.searchGroup input').off().click(function (ev) {

                        ev.cancelBubble = true;
                        return false;
                    });
                    $('body').off().on({
                        'mousewheel.stopScroll': function mousewheelStopScroll() {
                            return false;
                        }
                    });
                    timer = setInterval(function () {
                        console.log($('#navWrapper .nav').find('.navitem').eq(0).css('opacity'));
                        if ($('#navWrapper .nav').find('.navitem').eq(0).css('opacity') <= 0.02) {
                            $('#navWrapper .nav').addClass('navStop');
                            if (option.type == 'LR') {
                                $('#search-nav').css({
                                    left: logoW
                                });
                            }
                            $('#search-nav').addClass('navStop').find('input').focus();
                            $('body').off().on({
                                'click.hideSearch': function clickHideSearch() {
                                    search_e.searchHide();
                                }
                            });

                            clearInterval(timer);
                        }
                    }, 100);
                });
            },
            searchHide: function searchHide() {
                var search_e = this,
                    time;
                $('#navWrapper .nav').addClass('navHide');
                $('#search-nav').addClass('navHide');
                $('.bodyMask').removeClass('open');
                $('body').off('mousewheel.stopScroll');
                $('body').off('click.hideSearch');
                if (option.type == 'LR') {
                    $('#search-nav').css({
                        left: 'auto'
                    });
                }
                timer = setInterval(function () {
                    if ($('#search-nav.navHide').css('opacity') >= 0.98) {
                        $('#navWrapper .nav').removeClass('navShow navStop navHide');
                        $('#search-nav').removeClass('navShow navStop navHide');
                        clearInterval(timer);
                    }
                }, 100);
            },
            searchNormal: function searchNormal() {
                onOffBtn.click(function () {
                    $('#search-nav').toggleClass('search-open');
                });
            }
        };

        switch (option.style) {
            case 'one':

                searchEv.searchShow();
                break;
            case 'two':

                searchEv.searchNormal();
                break;
            default:
                break;
        }
    }
};
options.headerHoverBase = {
    name: "headerHoverBase",
    css: '',
    fn: function headerHoverBase(el) {
        $(el).find('.nav>.navitem').on({
            'mouseenter': function (){
                $(this).addClass('isHover');
            },
            'mouseleave': function (){
                $(this).removeClass('isHover');
            }
        });
        $(el).find('.subnav>li').on({
            'mouseenter': function (){
                $(this).closest('.navitem').addClass('isSubHover');
            },
            'mouseleave': function (){
                $(this).closest('.navitem').removeClass('isSubHover');
            }
        })
    }
};


options.teamTabPop = {
    name: "teamTabPop",
    css: '',
    fn: function teamTabPop() {
        $('.team_tabs .tab_content .item_block').on('click', 'a', function (ev){
            ev.preventDefault();
        });
        $('.team_tabs .tab_content .item_block').on('click', function (){
            var alertDom = $('<div class = "mlist" style="width:500px;"><div class="content_list"></div></div>');
            alertDom.find('.content_list').append($('.team_tabs .tab_content .item_block').clone().removeClass('wow'))
                
            tools.alertBx(alertDom, function (){
                alertDom.find('.content_list').addClass('owl-carousel owl-theme').owlCarousel({
                    center: false,
                    items: 1,
                    loop: false,
                    autoWidth: false,
                    responsive: false,
                    nav: true,
                    dots: false,
                    smartSpeed: 800,
                    navText: ['<i class="icon iconfont icon-back"></i>', '<i class="iconfont icon-more"></i>']
                });
            });
            
        });
    }
};






Math.tween = {
    Linear: function (x, t, b, c, d) {
        return c * t / d + b;
    },easeOut: function (x, t, b, c, d) { //减速曲线
        return -c * (t /= d) * (t - 2) + b;
    },
    mcsEaseOut: function (x, t, b, c, d) {
        var ts = (t /= d) * t,
            tc = ts * t;
        return b + c * (0.499999999999997 * tc * ts + -2.5 * ts * ts + 5.5 * tc + -6.5 * ts + 4 * t);
    }
}
// $.extend(jQuery.easing, Tween);


$.extend({
    miniAnimate: function (form, dis, time, fn) {

        var AniTimer, run, _this = this,
            t, nextPos, obj;
        if (!t) t = 0;
        // cancelAnimationFrame(AniTimer);
        run = function () {
            t += 17;
            nextPos = Math.tween.mcsEaseOut(null, t, form, dis, time);
            fn(nextPos);
            if (t >= time) {
                t = time;
                fn(form + dis);
            } else {
                AniTimer = requestAnimationFrame(run)
            }
        };
        obj =  {
            begin: function () {
                run();
            },
            stop: function () {
                cancelAnimationFrame(AniTimer);
                t = 0;
                console.log('stop')
            }
        };
        return obj;
    }
});















for (var key in options) {
    if (options.hasOwnProperty(key)) {
        var item = options[key];
        if (item.css) {
            newStyleContent[key] = item.css;
        }
        if (item.fn) {
            job[key] = item.fn;
        }
    }
}

var tools = {
    getRelPos: function getRelPos(el1, el2) {
        console.log(el1);
        var el1Pos = $(el1).offset(),
            el2Pos = $(el2).offset();
        return {
            left: Math.round(el2Pos.left - el1Pos.left),
            top: Math.round(el2Pos.top - el1Pos.top)
        };
    },
    hideEl: function hideEl(el, pos) {
        $(window).scroll(function (ev) {
            var scrollPos = $(window).scrollTop();
            if (pos < scrollPos) {
                $(el).removeClass('outPos').addClass('inPos');
            } else {
                $(el).removeClass('inPos').addClass('outPos');
            }
        });
    },
    tabActive: function tabActive($el, className) {
        className = className || 'active';
        $el.siblings().removeClass(className);
        $el.addClass(className);
    },
    getTransfrom: function (el, attr) {
        var str = el.style.transform;
        var pattern = new RegExp(attr + "\\((-?[0-9]+\\.?[0-9]{0,2}).*\\)");
        str.match(pattern);

        return RegExp.$1;
    },
    alertBx: function alertBx ($dom, fn) {
        var $el = $('<div class="ff_bodyMask"><div class="ff_bodyMask-content mlist"></div></div>');
        $el.find('.ff_bodyMask-content').append($dom);
        $el.appendTo($('body')).fadeIn()
        .on({
            'mousewheel.stopScroll': function mousewheelStopScroll() {
                return false;
            },
            'click.closeMask': function closeMask (ev) {
                if (ev.target == $(this)[0]) {
                    $(this).off().fadeOut();
                }
            }
        }).find('.ff_bodyMask-content');
        
        fn&&fn();
    },
    dragEl: function (el, evList, limit) {
        var endMove;
        var upDataLimit = function (newData) {
            limit.area = newData;
        };
        var initEv = {
            dragEv: function (ev)  {
                var tra,
                    endEv,
                    endPos = {},
                    toX = ev.changePos.x + ev.transformPos.x,
                    toY = ev.changePos.y + ev.transformPos.y;
                
                    console.log(toX, ev.changePos.x , ev.transformPos.x);
                if (limit.area.x) {
                    if (toX <= limit.area.x) {
                        toX = limit.area.x - Math.sqrt(2 * Math.abs(toX - limit.area.x) / 0.1);
                        endPos.x = limit.area.x;
                    }
                    console.log(limit.area.x);
                    if (toX >= 0) {
                        toX = Math.sqrt(2 * toX / 0.1);
                        endPos.x = 0;
                    }
                }
                
                if (limit.area.y) {
                    
                    if (toY <= limit.area.y) {toY = limit.area.y[0];}
                    if (toY >= 0) {toY = 0;}
                }
                if (limit.dir == 'x') {

                    tra = 'translateX('+ toX + 'px)';
                } else if (limit.dir == 'y'){

                    tra = 'translateY(' + toY +'px)';
                } else {

                    tra = 'translateX('+ toX + 'px) translateY(' + toY +'px)';
                };
                
                $(this).css({
                    transform: tra
                });
                return endPos;
            }
        };
        $(el).on({
            'mousedown': function (ev) {
                var changePos, endPos, endChangePos, drageTime, moveSpeed;
                var initPos = {
                    x: ev.clientX,
                    y: ev.clientY
                };
                var transformPos = {
                    x: +tools.getTransfrom($(el)[0], 'translateX'),
                    y: +tools.getTransfrom($(el)[0], 'translateY'),
                };
                ev.initPos = initPos;
                $(el).css({
                    transition: "0s"
                });
                if (typeof endMove != 'undefined') {
                    endMove.stop();
                    moveSpeed = 0;
                }
                evList.begin && evList.begin.call($(el)[0], ev);
                

                $('body').on({
                    'mousemove.drage': function (ev) {
                        moveSpeed = 0;
                        var movePos = {
                            x: ev.clientX,
                            y: ev.clientY
                        };
                        if (changePos){
                            endChangePos = {
                                x: changePos.x - (movePos.x - initPos.x)
                            };
                            moveSpeed = endChangePos.x / ((+new Date()) - drageTime);
                            // console.log(moveSpeed, 'moveSpeed');
                            // console.log(moveSpeed,endChangePos.x, (+new Date()) - drageTime, 'moveS');
                        }
                        changePos = {
                            x: movePos.x - initPos.x,
                            y: movePos.y - initPos.y
                        };
                        drageTime = +new Date();
                        ev.movePos = movePos;
                        ev.changePos = changePos;
                        ev.transformPos = transformPos;
                        endPos = initEv.dragEv.call($(el)[0], ev);
                        evList.change && evList.change.call($(el)[0], ev);
                    },
                    'mouseup.drage': function (ev) {
                        $(this).off('mousemove.drage');
                        $(this).off('mouseup.drage');
                        if (typeof endMove != 'undefined') {
                            endMove.stop();
                        }
                        var str = '';
                        if (endPos && typeof endPos.x != 'undefined') {
                            str += 'translateX('+ endPos.x + 'px)';
                        } 
                        if (endPos && typeof endPos.y != 'undefined'){
        
                            str += 'translateY(' + endPos.y +'px)';
                        }
                        if (str) {
                            $(el).css({
                                transition: '0.5s',
                                transform: str
                            });
                        } 
                        else {
                            $(el).css({
                                transition: '0s',
                            });
                            console.log(moveSpeed, 'moveSpeed')
                            if (Math.abs(changePos.x) < 50 || Math.abs(moveSpeed) <= 0.2) return;
                            var startPos = +tools.getTransfrom($(el)[0], 'translateX');
                            var dis = startPos > 0 ? +(moveSpeed * 400) : -(moveSpeed * 400);
                            endMove = $.miniAnimate( Math.floor(startPos), Math.floor(dis), 1000, function (a) {
                                var ceshi = Math.ceil(+a);
                                if (ceshi <= limit.area.x) {
                                    ceshi = limit.area.x;
                                }
                                if (ceshi >= 0) {
                                    ceshi = 0;
                                }
                                $(el).css({
                                    transform: 'translateX(' + ceshi + 'px)'
                                });
                            });
                            endMove.begin();
                        }
                    }
                });
            },
        })
        return upDataLimit;
    }
};


var selfTools = {
    bindPage: function bindPage(fn, pageList, parameter) {

        var fnName = fn.name;

        for (var i = 0; i < pageList.length; i++) {
            var doSome = fn;
            var item = pageList[i];

            YY.Page[item].prototype.things.push([doSome, parameter]);
        }
    },
    addStyle: function addStyle() {
        var newStyle = '<style id="ff_add">';
        for (var key in newStyleContent) {
            if (newStyleContent.hasOwnProperty(key)) {
                // console.log(config, key);
                // if (config[key].open) {
                    var style = newStyleContent[key];
                    newStyle += style;
                // }
            }
        }
        newStyle += '</style>';
        $(newStyle).insertBefore($('link')[0]);
    }
};

var pageConfig = {
    list: ['indexMain', 'baseMain', 'postMain']
};


var config = {
    initThings: {
        page: pageConfig.list,
        fn: job.initThings
    },
    headerHover: {
        page: pageConfig.list,
        fn: job.headerHover
    },
    parallax: {
        page: ['indexMain'],
        fn: job.parallax,
        parameter: ['#topSlider .content_list']
    },
    parallaxPage: {
        page: ['baseMain'],
        fn: job.parallaxPage,
        parameter: ['.npagePage #banner div']
    },
    sliderDotThemb: {
        page: ['indexMain'],
        fn: job.sliderDotThemb
    },
    sliderDirThemb: {
        page: ['indexMain'],
        fn: job.sliderDirThemb,
        parameter: ['LR']
    },
    sliderTitle: {
        page: ['indexMain'],
        fn: job.sliderTitle
    },
    npostSlider: {
        page: ['postMain'],
        fn: job.npostSlider
    },
    postTabHiden: {
        page: ['postMain'],
        fn: job.postTabHiden
    },
    specialModule: {
        page: ['indexMain'],
        fn: job.specialModule
    },
    teamTabs: {
        page: ['indexMain'],
        fn: job.teamTabs
    },
    teamTabsTwo: {
        page: ['indexMain'],
        fn: job.teamTabsTwo
    },
    ad01: {
        page: ['indexMain'],
        fn: job.ad01
    },
    normalTeamTabs: {
        page: ['indexMain'],
        fn: job.normalTeamTabs,
        parameter: [{}, true]
    },
    searchForm: {
        page: pageConfig.list,
        fn: job.searchForm,
        parameter: [{
            style: 'two',
            type: 'LR'
        }]
    },
    timeTurnEn: {
        page: pageConfig.list,
        fn: job.timeTurnEn,
        parameter: ['.service .item_block .date_wrap']
    },
    headerHoverBase: {
        page: pageConfig.list,
        fn: job.headerHoverBase,
        parameter: ['#header']
    },
    teamTabPop: {
        page: ['indexMain'],
        fn: job.teamTabPop
    },
    postSliderThemb: {
        page: ['postMain'],
        fn: job.postSliderThemb,
        parameter: ['LR']
    },
    moduleControl: {
        page: ['indexMain'],
        fn: job.moduleControl
    },
    privateproject: {
        page: ['indexMain', 'baseMain'],
        fn: job.privateproject
    },
    videomplay: {
        page: ['indexMain', 'baseMain'],
        fn: job.videomplay
    }
};

selfTools.addStyle();

(function () {

    for (var i = 0; i < pageConfig.list.length; i++) {
        var item = pageConfig.list[i];
        YY.Page[item].prototype.things = [];
        YY.Page[item].prototype.interfaceFun = function () {
            console.log(this)
            var _this = this;
            for (var i = 0; i < this.things.length; i++) {
                var fn = this.things[i][0];
                var arg = this.things[i][1];
                fn.apply(_this, arg);
            }
        };
    }

    // for (var key in this.config) {
    //     if (this.config.hasOwnProperty(key)) {
    //         var val = this.config[key];
    //         if (key) {
    //             selfTools.bindPage(val.fn, val.page, val.parameter);
    //         }
    //     }
    // }

    for (var key in job) {
        if (job.hasOwnProperty(key)) {
            var element = job[key];
            var val = this.config[key];
            selfTools.bindPage(val.fn, val.page, val.parameter);
        }
    }
})();

$(function () {
    console.log('read');
    $('.bodyindex .mlist.project .content_list .item_block').off('click');
});

