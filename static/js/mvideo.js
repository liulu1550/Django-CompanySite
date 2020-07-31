function videomplay(dom) {
    var $videoArea = $(dom),
        $videoItem,
        videoLinks = [],
        videoInfor = [];

    if ($videoArea.hasClass("owl-carousel")) {
        $videoItem = $(".owl-item:not(.cloned) .item_block", dom);
    } else {
        $videoItem = $(".item_block", dom);
    }

    function getSingle(fn) {
        var result;

        return function() {
            return result ? result : (result = fn.apply(this, arguments));
        };
    }

    var singleVBg = getSingle(createVideoBg);

    function createVideoBg(obj) {
        var videoBg = $(
                '<div class="videoBg" style="display: none"></div>'
            ).appendTo($("body")),
            initObj,
            config,
            result,
            timer;

        initObj = {
            initDo: function initDo() {},

            outDo: function outDo() {},

            inDo: function inDo() {},

            hide: function hide() {
                config.outDo.call(this, result);

                videoBg.fadeOut();

                $(videoBg).removeClass("deepView");

                clearTimeout(timer);
            },

            show: function show() {
                timer = setTimeout(function() {
                    $(videoBg).addClass("deepView");
                }, 4000);

                config.inDo.call(this, result);

                videoBg.fadeIn();
            }
        };

        config = $.extend(initObj, obj);

        videoBg.on({
            click: function click(ev) {
                if ($(ev.target).hasClass("vPlayArea")) {
                    initObj.hide();
                }
            },

            mousewheel: function mousewheel() {
                return false;
            },

            mousemove: function mousemove() {
                var _this = this;

                $(_this).removeClass("deepView");

                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function() {
                    $(_this).addClass("deepView");
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

    var Videom = function Videom(config, cd) {
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

        init: function init(box, infor) {
            var videoInfor,
                v = this,
                videoArea;

            if (typeof infor == "number") {
                videoInfor = this.initConfig.list[infor];
            } else {
                videoInfor = {
                    videoLink: infor
                };
            }

            if (this.initDo == true) {
                this.tabTo(videoInfor);

                this._trigger("initDo");

                return;
            }

            this.initDo = true;

            var str = '<div class="vPlayArea">';

            str +=
                '<div class="vPlayItem">\n                           <iframe id="contentFrame" width="100%" height="540px" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes" src=""></iframe>                        <div class="videoInfor">\n                                <div class="videoHeader">\n                                    <p class="title"></p>\n                                    <p class="subtitle"></p>\n                                </div>\n                                <div class="videoDes">\n                                    <p class="description">\n                                    </p>\n                                </div>\n                            </div>\n                        </div>';

            str += "</div>";

            $(str).on("click", function(ev) {
                ev.stopPropagation();
            });

            videoArea = $(str).appendTo(box);

            v.box = box;

            v.videoArea = videoArea;

            v.video = videoArea.find("iframe");

            v.videoBox = videoArea.find(".vPlayItem");

            v.inforBox = videoArea.find(".videoInfor");

            v.desBox = videoArea.find(".videoDes");

            v.videoDom = v.video[0];

            // v._tabText(v.inforBox.find('.title'), videoInfor.title);

            // v._tabText(v.inforBox.find('.subtitle'), videoInfor.subtitle);

            // v._tabText(v.desBox.find('.description'), videoInfor.description);

            v._addControl(infor);

            this._bind("initDo", function() {
                var _this = this;

                this.video.on("click", function(ev) {
                    if (ev.which == 1) {
                        _this.tabState();
                    }
                });
            });

            this._trigger("initDo");

            this.tabTo(videoInfor);
        },

        on: function on(name, fn) {
            this._bind(name, fn);
        },

        tabTo: function tabTo(infor) {
            void 0;

            var initInfor = {
                index: 0,

                description: "",

                subtitle: "",

                title: "",

                videoLink: ""
            };

            $.extend(initInfor, infor);

            this._tabBtn(infor.index);

            this.video.attr("src", initInfor.videoLink);

            this._tabText(this.inforBox.find(".title"), initInfor.title);

            this._tabText(this.inforBox.find(".subtitle"), initInfor.subtitle);

            this._tabText(
                this.desBox.find(".description"),

                initInfor.description
            );
        },

        out: function out() {
            this._trigger("outvideo");
        },

        stop: function stop() {
            this.videoDom.src = "";
        },

        play: function play() {
            this.videoDom.src = "";
        },

        state: function state() {
            var isPlay;

            if (this.videoDom.paused) {
                isPlay = false;
            } else {
                isPlay = true;
            }

            return isPlay;
        },

        tabState: function tabState() {
            var isPlay = this.state();

            if (isPlay) {
                this.stop();
            } else {
                this.play();
            }
        },

        _addControl: function _addControl(num) {
            if (typeof num != "number") return;

            var hasControl = false,
                v = this,
                prev,
                next,
                prevBtn,
                nextBtn;

            v.currentIndex = num;

            prev = {
                index: num - 1,

                className: (function() {
                    if (typeof v.initConfig.list[num - 1] == "undefined") {
                        return "disable";
                    } else {
                        return "able";
                    }
                })()
            };

            next = {
                index: num + 1,

                className: (function() {
                    if (typeof v.initConfig.list[num + 1] == "undefined") {
                        return "disable";
                    } else {
                        return "able";
                    }
                })()
            };

            if (hasControl) {
                prevBtn.data("index", prev.index).addClass(prev.className);

                nextBtn.data("index", next.index).addClass(next.className);

                return;
            }

            hasControl = true;

            var tabControlStr, tabControl;

            tabControlStr =
                '\n                    <div class="videoTabBtns">\n                        <div class="videoTabBtn prev ' +
                prev.className +
                '" data-index="' +
                prev.index +
                '">\n                            <p></p>\n                            <i class="icon"></i>\n                        </div>\n                        <div class="videoTabBtn next ' +
                next.className +
                '" data-index="' +
                next.index +
                '">\n                            <p></p>\n                            <i class="icon"></i>\n                        </div>\n                    </div>\n                ';

            tabControl = $(tabControlStr).appendTo(v.box);

            prevBtn = tabControl.find(".prev");

            nextBtn = tabControl.find(".next");

            tabControl.on("click", ".videoTabBtn", function(ev) {
                ev.stopPropagation();

                var btn = this;

                if ($(btn).hasClass("disable") == false) {
                    v.tabTo(v.initConfig.list[$(btn).data("index")]);
                }

                return false;
            });

            v.tabControl = tabControl;
        },

        _tabBtn: function _tabBtn(index) {
            this._addControl(index);
        },

        _tabText: function _tabText(el, text) {
            if (typeof text == "undefined") {
                $(el).css({
                    display: "none"
                });
            } else {
                $(el).text(text);
            }
        },

        _bindEv: function _bindEv(name, fn) {
            var _this = this;

            this.cb[name] = fn;

            $.each(_this.cb, function(indexInArray, valueOfElement) {
                $(_this)
                    .off(name)

                    .on(name, fn);
            });
        },

        _trigerEv: function _trigerEv(name, option) {
            if (typeof this.cb[name] != "function") {
                this._bindEv(name, function() {});
            }

            $(this).trigger(name, option);
        },

        _bind: function _bind(name, fn) {
            var _self = this,
                evlist = this.evlist;

            if (!evlist[name]) {
                evlist[name] = [];
            } else if (fn in evlist[name]) {
                return;
            }

            this.evlist[name].push(fn);
        },

        _trigger: function _trigger(name, context, arg) {
            var fns = this.evlist[name];

            if (!fns || fns.length === 0) {
                return false;
            }

            if (!context) {
                context = this;
            } else if (
                Object.prototype.toString.call(context) == "[object Array]"
            ) {
                arg = context;

                context = this;
            }

            $.each(fns, function(i, v) {
                v.apply(context, arg);
            });
        }
    };

    $videoItem.each(function(i, e) {
        var infor = {};

        infor.index = i;

        infor.title = $(e)
            .find(".item_info .title")

            .text();

        infor.subtitle = $(e)
            .find(".item_info .subtitle")

            .text();

        infor.description = $(e)
            .find(".description")

            .text();

        infor.videoLink = $(e).data("href");

        videoInfor.push(infor);

        videoLinks.push($(e).data("href"));
    });

    var vPlayer = new Videom({
        list: videoInfor
    });

    var vBg = singleVBg({
            initDo: function initDo(bg) {},

            inDo: function inDo(bg) {
                $("body").on("keydown.video", function(ev) {
                    if (ev.keyCode == 32) {
                        ev.stopPropagation();

                        ev.preventDefault();

                        vPlayer.tabState();
                    }
                });
            },

            outDo: function outDo(bg) {
                vPlayer.out();

                $("body").off("keydown.video");
            }
        }),
        mask = vBg.bgJDOM;

    vPlayer.on("initDo", function() {
        vBg.show();

        this.videoArea.addClass("vshow");
    });

    vPlayer.on("outvideo", function() {
        this.videoArea.removeClass("vshow");

        setTimeout(() => {
            this.stop();
        }, 360);
    });

    $videoItem.off().on({
        "click.video": function clickVideo() {
            var link = $(this).data("href"),
                index = $(this).data("index");

            if (typeof link == "undefined") return;

            vPlayer.init(mask, index);
            return false;
        }
    });
}

if ($("html").hasClass("agent-pc")) {
    $("script").on("load", function() {
        setTimeout(() => {
            $(".videom .content_list .item_block").off();

            $(function() {
                $(".videom .content_list").each(function(i, e) {
                    videomplay(e);
                });
            });
        }, 1000);
    });
} else {
    if ($(".bodyvideom .item_box.videom-box").attr("data-href")) {
        $(".bodyvideom .item_box.videom-box").on("click", function() {
            window.open($(this).attr("data-href"));
            return false;
        });
    }
}
