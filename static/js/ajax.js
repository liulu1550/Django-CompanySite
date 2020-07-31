function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var webajax = {
    'get': function (args) {
        args['method'] = 'get';
        this.ajax(args);
    },
    'post': function (args) {
        args['method'] = 'post';
        this._ajaxSetup();
        this.ajax(args);
    },
    'ajax': function (args) {
        var success = args['success'];
        args['success'] = function (res) {
            if (res.code == '200') {
                if (success) {
                    success(res)
                }
            } else {
                var messageObject = res['message']
                if (typeof messageObject == 'string' || messageObject.constructor == String) {
                    layer.msg(messageObject)
                } else {
                    for (var key in messageObject) {
                        var messages = messageObject[key];
                        var message = messages[0];
                        layer.msg(message)
                        break
                    }
                }
                if (success) {
                    success(res)
                }
            }
        };
        args['fail'] = function (erro) {
            console.log(erro)
            layer.msg('服务器内部错误')
        }
        $.ajax(args);
    },
    '_ajaxSetup': function () {
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
                layer.load(1, {
                    shade: [0.7, '#000'] //0.1透明度的白色背景
                });
            },
            complete: function () {
                layer.closeAll('loading')
            },
        });
    }
};