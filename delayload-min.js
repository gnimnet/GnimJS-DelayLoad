/*
 *  This JavaScript file for Delay Load Images
 *  this component works for GnimJS
 *  Version 0.1.0
 *  Write by Ming
 *  Date 2015.07.06
 */
(function(c,m,n){function g(a){c.inject(this,a||{});this.$imgs=[];this.imgClass=this.imgClass||"delayload";this.imgClassOk=this.imgClassOk||"delayload-ok";this.imgClassWait=this.imgClassWait||"delayload-wait";this.attrName=this.attrName||"imgsrc"}function k(){var a=c.broswer.msie,b=parseInt(c.broswer.version);return a&&6<=b&&8>=b}g.prototype={_tryset:function(a,b){var d,c,e;if(e=!b){var h=a[0];d=h;var f=0;c=0;e=h.clientWidth;for(h=h.clientHeight;d;)f+=d.offsetLeft,c+=d.offsetTop,d=d.offsetParent;
d=f;var f=document.body.scrollLeft||document.documentElement.scrollLeft,g=document.body.scrollTop||document.documentElement.scrollTop,k=d<=f+document.documentElement.clientWidth,l=c<=g+document.documentElement.clientHeight;e=!(d+e>=f&&k&&c+h>=g&&l)}if(e)return!1;if(e=a.attr(this.attrName))"img"===a[0].tagName.toLowerCase()?a.attr("src",e):a.css({"background-image":'url("'+e+'")'}),a.removeClass(this.imgClassWait).addClass(this.imgClassOk);return!0},init:function(){var a=this;c("."+a.imgClass).each(function(b){b=
c(b);k()?a._tryset(b,!0):a._tryset(b)||(b.addClass(a.imgClassWait),a.$imgs.push(b))});k()||c(document).scroll(function(){if(a.$imgs.length)for(var b=0;b<a.$imgs.length;)a._tryset(a.$imgs[b])?a.$imgs.splice(b,1):b++})}};window.DelayLoad=g})(Gnim,null);
