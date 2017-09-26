$.fn.$qswiper = function(opts) {
    var options = {
        'el': "#qswiper",
        'width':'785px',
        'height':'413px',
        'interval': 3000, //播放间隔 ms
        'animate': 300
    }
    options = $.extend({}, this.options, opts);


    var sWidth = $(options.el).width(); //获取焦点图的宽度（显示面积）
    var pointsNum = $(options.el + " ul li").length; //获取焦点图个数
    var index = 0;
    var picTimer;

    //传入样式
    $(options.el).css({"width":options.width,"height":options.height});

    //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
    var btnNode = "<div class='qswiper-btnBg'></div><div class='qswiper-title'></div><div class='qswiper-btn'>";

    for (var i = 0; i < pointsNum; i++) {
        btnNode += "<span></span>";
    }
    btnNode += "</div><div class='qswiper-preNext qswiper-pre'></div><div class='qswiper-preNext qswiper-next'></div>";
    $(options.el).append(btnNode);
    $(options.el + " .qswiper-btnBg").css("opacity", 0.5);

    //为小按钮添加鼠标滑入事件，以显示相应的内容
    $(options.el + " .qswiper-btn span").css("opacity", 0.4).mouseover(function() {
        index = $(options.el + " .qswiper-btn span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseover");

    //上一页、下一页按钮透明度处理
    $(options.el + " .qswiper-preNext").css("opacity", 0.2).hover(function() {
        $(this).stop(true, false).animate({ "opacity": "0.5" }, options.animate);
    }, function() {
        $(this).stop(true, false).animate({ "opacity": "0.2" }, options.animate);
    });

    //上一页按钮
    $(options.el + " .qswiper-pre").click(function() {
        index -= 1;
        if (index == -1) { index = pointsNum - 1; }
        showPics(index);
    });

    //下一页按钮
    $(options.el + " .qswiper-next").click(function() {
        index += 1;
        if (index == pointsNum) { index = 0; }
        showPics(index);
    });

    //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    $(options.el + " ul").css("width", sWidth * (pointsNum));

    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $(options.el).hover(function() {
        clearInterval(picTimer);
    }, function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if (index == pointsNum) { index = 0; }
        }, options.interval);
    }).trigger("mouseleave");

    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) { //普通切换
        var nowLeft = -index * sWidth; //根据index值计算ul元素的left值
        //$(options.el+" ul").stop(true,false).animate({"left":nowLeft},options.animate); //通过animate()调整ul元素滚动到计算出的position
        $(options.el + " ul").stop(true, false).animate({ "left": nowLeft }, options.animate);
        $(options.el + " .qswiper-title").text($(options.el + " ul li").eq(index).contents("a").contents("img").attr("alt"));
        $(options.el + " .qswiper-btn span").stop(true, false).animate({ "opacity": "0.4" }, options.animate).eq(index).stop(true, false).animate({ "opacity": "1" }, options.animate); //为当前的按钮切换到选中的效果
    }
}