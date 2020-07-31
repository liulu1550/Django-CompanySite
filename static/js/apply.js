function Apply() {
    var self = this
}

Apply.prototype.run = function () {
    var self = this
    self.listenImgCaptchaEvent();
    self.listenPageApplyEvent();
    self.listenIndexApplyEvent();
}


Apply.prototype.listenIndexApplyEvent = function(){
    var indexApplyGroup = $('#indexForm')
    var submitBtn = indexApplyGroup.find('#IndexSubmit')
    submitBtn.click(function (event) {
        event.preventDefault();
        var nameInput = indexApplyGroup.find("input[name='name']")
        var emailInput = indexApplyGroup.find("input[name='email']")
        var telephoneInput = indexApplyGroup.find("input[name='telephone']")
        var messageInput = indexApplyGroup.find("textarea[name='message']")

        var name = nameInput.val()
        var email = emailInput.val()
        var telephone = telephoneInput.val()
        var message = messageInput.val()

        webajax.post({
            url:'/',
            'data':{
                'name':name,
                'email':email,
                'telephone':telephone,
                'message':message,
            },
            'success':function (res) {
                if(res.code=='200'){
                    nameInput.val('')
                    emailInput.val('')
                    telephoneInput.val('')
                    messageInput.val('')
                    layer.msg('提交成功！请等待审核')
                }
            }
        })
    })
}


Apply.prototype.listenPageApplyEvent = function(){
    var pageApplyGroup = $("#pageForm")
    var submitBtn = pageApplyGroup.find("#submit")

    submitBtn.click(function (event) {
        event.preventDefault();
        var nameInput = pageApplyGroup.find("input[name='name']")
        var telephoneInput = pageApplyGroup.find("input[name='telephone']")
        var giftInput = pageApplyGroup.find("select[name='gift']")
        var baby_ageInput = pageApplyGroup.find("input[type='radio']:checked")
        var messageInput = pageApplyGroup.find("textarea[name='message']")
        var img_captchaInput = pageApplyGroup.find("input[name='img_captcha']")


        var name = nameInput.val()
        var telephone = telephoneInput.val()
        var gift = giftInput.val()
        var baby_age = baby_ageInput.val()
        var message = messageInput.val()
        var img_captcha = img_captchaInput.val()

        webajax.post({
            'url':'/apply/',
            'data':{
                'name':name,
                'telephone':telephone,
                'gift':gift,
                'baby_age':baby_age,
                'message':message,
                'img_captcha':img_captcha,
            },
            'success':function (res) {
                if (res.code == '200'){
                    nameInput.val('')
                    telephoneInput.val('')
                    giftInput.val('')
                    baby_ageInput.val('')
                    messageInput.val('')
                    img_captchaInput.val('')
                    layer.msg('提交成功！请等待审核')
                }
            }
        })

    })
}


Apply.prototype.listenImgCaptchaEvent = function () {
    var imgCaptcha = $('#pageForm .img-captcha');
    imgCaptcha.click(function () {
        imgCaptcha.attr("src", "/img_captcha/" + "?random=" + Math.random())
    });
};


$(function () {
    var apply = new Apply();
    apply.run();
});