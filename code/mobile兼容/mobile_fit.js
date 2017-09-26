;
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            // 不同尺寸可以配置
            // if(clientWidth>=640){
            //     docEl.style.fontSize = '100px';
            // }else{
            //     docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            // }

            // iPhone6 为基准等比放大
            docEl.style.fontSize = (20 * (clientWidth / 375)) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
