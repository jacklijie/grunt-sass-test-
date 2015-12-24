;
(function ($) {

    var slider = function (poster, options) {
        var _this = this;
        this.seetings = {
            speed: 500,
            between: 2000,
            width: 600
        };

        this.slider = poster;
        this.sliderIcon = poster.find('.slider-icon');
        this.prev = poster.find('.slider-prev');
        this.next = poster.find('.slider-next');
        this.sliderImg = poster.find('.slider-img');
        this.item = poster.find('.slider-item');
        this.length = this.item.length;
        this.index = 0;
        this.left = 0;
        this.timer = '';

        $.extend(this.seetings, options);

        //创建切换小图标
        this.createSpan();

        //复制第一张和最后一张图片插入到指定位置
        this.cloneImg();

        //左右切换
        this.next.click(function () {
            _this.switchBtn('next');
        });
        this.prev.click(function () {
            _this.switchBtn('prev');
        });

        //底部切换小图标点击
        this.sliderIcon.delegate('span', 'click', function () {
            _this.switchSpan($(this));
        });

        //自动播放
        this.play();

        //鼠标移入停止自动播放
        this.slider.hover(function () {
            clearInterval(_this.timer);
        }, function () {
            _this.play();
        })

    };

    slider.prototype = {
        play: function () {
            var _this = this;
            this.timer = setInterval(function () {
                _this.next.click();
            }, _this.seetings.between);
        },
        switchSpan: function (self) {
            var _this = this;
            self.addClass('active').siblings().removeClass('active');
            this.index = self.index();
            this.sliderImg.animate({left: -((_this.index + 1) * _this.seetings.width)}, _this.seetings.speed)
        },
        switchBtn: function (dir) {
            var _this = this;
            if (dir == 'next') {
                if (this.sliderImg.is(':animated')) {
                    return;
                }
                this.index++;
                this.left = -((this.index + 1) * this.seetings.width);
                this.sliderImg.animate({left: _this.left}, _this.seetings.speed, function () {
                    if (_this.left < -(_this.seetings.width * _this.length)) {
                        _this.sliderImg.css('left', -(_this.seetings.width));
                        _this.index = 0;
                    }
                });
                if (this.index > this.length - 1) {
                    this.index = 0;
                }

                this.sliderIcon.find('span').eq(this.index).addClass('active').siblings().removeClass('active');
            } else if (dir == 'prev') {
                if (this.sliderImg.is(':animated')) {
                    return;
                }
                this.index--;
                this.left = -((this.index + 1) * this.seetings.width);
                this.sliderImg.animate({left: _this.left}, _this.seetings.speed, function () {
                    if (_this.left > -(_this.seetings.width)) {
                        _this.sliderImg.css('left', -(_this.seetings.width * _this.length));
                        _this.index = _this.length - 1;
                    }
                });
                if (this.index > this.length - 1) {
                    this.index = 0;
                }

                this.sliderIcon.find('span').eq(this.index).addClass('active').siblings().removeClass('active');
            }

        },
        cloneImg: function () {
            var lastImg = this.item.first().clone();
            var firstImg = this.item.last().clone();
            this.sliderImg.append(lastImg);
            this.sliderImg.prepend(firstImg);
            this.sliderImg.css('left', -this.seetings.width);
        },
        createSpan: function () {
            var length = this.length;
            var spanHtml = '';
            for (var i = 0; i < length; i++) {
                spanHtml += '<span></span>';
            }
            ;
            this.sliderIcon.html(spanHtml);
            this.sliderIcon.find('span:first').addClass('active');
            var width = this.sliderIcon.width();
            this.sliderIcon.css('margin-left', -(width / 2));
            this.index = this.sliderIcon.find('span.active').index();
        },
        getSettings: function () {
            var settings = this.slider.attr("data-settings");
            if (settings && settings != "") {
                return $.parseJSON(settings)
            } else {
                return {};
            }
        }
    };
    $.fn.slide = function (options) {
        var _this = this;
        $(_this).each(function () {
            new slider($(_this), options);
        });
    };

})(jQuery);