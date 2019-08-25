/* Sidebar slider */
function toggleContentTable() {
    var sidebar = document.getElementById("sidebar");
    var content_table = document.getElementById("content_table")
    var toggle = document.getElementById("toggle");
    if (sidebar.style.width != "350px") {  // Отталкиваемся от условия неравенства, так как проверяем параметр style, заданный в строке html, а его нет (он в css файле)
        sidebar.style.width = "350px";
        toggle.style.marginLeft = "360px";
        setTimeout(function(){content_table.style.display = "block";}, 350)  // Чтобы текст не перескакивал при развороте бокового меню, добавляем его через 0.3с после начала разворота
    } else {
        sidebar.style.width = "0px";
        toggle.style.marginLeft = "20px";
        content_table.style.display = "none";
    } 
}

/* Slider button animation (minified from http://www.transformicons.com) */
!function(r,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n():r.transformicons=n()}(this||window,function(){"use strict";var r={},n={transform:["click"],revert:["click"]},t=function(r){return"string"==typeof r?Array.prototype.slice.call(document.querySelectorAll(r)):void 0===r||r instanceof Array?r:[r]},o=function(r){return"string"==typeof r?r.toLowerCase().split(" "):r},e=function(r,e,f){var i=(f?"remove":"add")+"EventListener",s=t(r),a=s.length,u={};for(var l in n)u[l]=e&&e[l]?o(e[l]):n[l];for(;a--;)for(var d in u)for(var m=u[d].length;m--;)s[a][i](u[d][m],c)},c=function(n){r.toggle(n.currentTarget)};return r.add=function(n,t){return e(n,t),r},r.remove=function(n,t){return e(n,t,!0),r},r.transform=function(n){return t(n).forEach(function(r){r.classList.add("tcon-transform")}),r},r.revert=function(n){return t(n).forEach(function(r){r.classList.remove("tcon-transform")}),r},r.toggle=function(n){return t(n).forEach(function(n){r[n.classList.contains("tcon-transform")?"revert":"transform"](n)}),r},r});
transformicons.add('.tcon');

/* Content table expand/collapse */
CollapsibleLists.applyTo(document.getElementById('sect_list')); // Используем библиотеку