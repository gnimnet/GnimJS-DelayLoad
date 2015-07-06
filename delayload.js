/*
 *  This JavaScript file for Delay Load Images
 *  this component works for GnimJS
 *  Version 0.1.0
 *  Write by Ming
 *  Date 2015.07.06
 */
(function($, NULL, UNDEFINED) {
    /**
     * 延迟加载图片，可以为img标签或者其他标签（其他标签使用背景图）
     * 使用时给需要延迟加载的图片设置imgClass对应类名，并指定attrName的属性为需要加载的图片
     * 在IE678下会直接加载全部图片，未实现比较理想的状态
     * 
     * 调用代码在ready函数中如下：
     * new DelayLoad().init();
     * 
     * 参数可以为以下值：
     * imgClass - 指定延迟加载图片标签类名，默认值'delayload'
     * imgClassOk - 指定延迟加载图片已完成标签类名，默认值'delayload-ok'
     * imgClassWait - 指定延迟加载图片未开始标签类名，默认值'delayload-wait'
     * attrName - 图片路径属性名，默认为'imgsrc'
     * @param params
     */
    function DelayLoad(params) {
        $.inject(this, params || {});
        this.$imgs = [];
        this.imgClass = this.imgClass || 'delayload';
        this.imgClassOk = this.imgClassOk || 'delayload-ok';
        this.imgClassWait = this.imgClassWait || 'delayload-wait';
        this.attrName = this.attrName || 'imgsrc';
    }
    function _ie678() {
        var msie = $.broswer.msie;
        var version = parseInt($.broswer.version);
        return msie && version >= 6 && version <= 8;
    }
    function _position(node) {
        var current = node;
        var left = 0;
        var top = 0;
        var width = node.clientWidth;
        var height = node.clientHeight;
        while (current) {
            left += current.offsetLeft;
            top += current.offsetTop;
            current = current.offsetParent;
        }
        return {left: left, top: top, width: width, height: height};
    }
    function _insight($img) {
        var position = _position($img[0]);
        var left = document.body.scrollLeft || document.documentElement.scrollLeft;
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        var in1 = position.left + position.width >= left;
        var in2 = position.left <= left + width;
        var in3 = position.top + position.height >= top;
        var in4 = position.top <= top + height;
        return in1 && in2 && in3 && in4;
    }
    function _tryset($img, force) {
        var thisObj = this;
        if (!force && !_insight($img)) {
            return false;
        }
        var url = $img.attr(thisObj.attrName);
        if (url) {
            if ($img[0].tagName.toLowerCase() === 'img') {
                $img.attr('src', url);
            } else {
                $img.css({'background-image': 'url("' + url + '")'});
            }
            $img.removeClass(thisObj.imgClassWait).addClass(thisObj.imgClassOk);
        }
        return true;
    }
    function init() {
        var thisObj = this;
        $('.' + thisObj.imgClass).each(function(node) {
            var $img = $(node);
            if (_ie678()) {
                thisObj._tryset($img, true);
            } else {
                if (!thisObj._tryset($img)) {
                    $img.addClass(thisObj.imgClassWait);
                    thisObj.$imgs.push($img);
                }
            }
        });
        if (!_ie678()) {
            $(document).scroll(function() {
                if (thisObj.$imgs.length) {
                    var i = 0;
                    while (i < thisObj.$imgs.length) {
                        if (thisObj._tryset(thisObj.$imgs[i])) {
                            thisObj.$imgs.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }
            });
        }
    }
    DelayLoad.prototype = {
        _tryset: _tryset,
        init: init
    };
    window.DelayLoad = DelayLoad;
})(Gnim, null);
