
// lazyload Img
document.addEventListener('DOMContentLoaded', LoadImg('img-lazy'));
var lazyLoad = false;
function onLazyLoad(){
    if (lazyLoad === true) return;
    lazyLoad = true;
    document.removeEventListener('scroll', onLazyLoad);
    document.removeEventListener('mousemove', onLazyLoad);
    document.removeEventListener('mousedown', onLazyLoad);
    document.removeEventListener('touchstart', onLazyLoad);
}
document.addEventListener("scroll", onLazyLoad),
document.addEventListener("mousemove", onLazyLoad),
document.addEventListener("mousedown", onLazyLoad),
document.addEventListener("touchstart", onLazyLoad),
document.addEventListener("load", function() {
    document.body.clientHeight != document.documentElement.clientHeight && 0 == document.documentElement.scrollTop && 0 == document.body.scrollTop || onLazyLoad()
});
$(document).ready(function () {

    // active menu
    let urlActive = window.location.href
        urlActive = urlActive.split("/");
        urlActive = urlActive.filter(d=>{
            if(d == ""){
                return false
            }
            return true
        })
        urlActive = (urlActive.length <= 2 ) ? 'home' : urlActive[urlActive.length-1];
    let menu_right = $(".menu_right .item_right");
    let menu_left = $(".menu_left .item_right");
    let arrMenu = ["home","sprunki-games","incredibox-mod","favorite"];
    for(let i=0;i<arrMenu.length;i++){
        if(urlActive == arrMenu[i]){
            $(menu_right[i]).addClass("active")
        }
    }
    for(let i=0;i<arrMenu.length;i++){
        if(urlActive == arrMenu[i]){
            $(menu_left[i]).addClass("active")
        }
    }
// Load cookie notice
var cookieNotice = document.getElementById("cookie-notice-bar");
(cookieNotice) && !localStorage.cookieNotice && cookieNotice.classList.add("show"), document.getElementById("btn-accept-cookie").addEventListener("click", function(e){
    localStorage.cookieNotice=true;                
    cookieNotice.classList.remove("show");
});
//   search holder
$(".search-holder").click(function (e) {
if (e.target !== this) return;
$(this).toggleClass("open");
});

//   open nav 
$('.nmi-menu-toggle').click(function(){
            $('#wapMask').toggleClass('maskOpen')
        });
// $(".nmi-menu-toggle").click(function (e) {
//   let img = $(this).find("img");
//   if (img.attr("src").includes("fluent_list-16-filled")) {
//     img.attr("src", "/assets/imgs/ci_close-small.svg")
//   } else
//     img.attr("src", "/assets/imgs/fluent_list-16-filled.svg")
// })

// scroll to top
$("#btn-page-scroll").click(function () {
window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
});
});
$(window).scroll(function () {
var $this = $(this);
if ($this.scrollTop() >= 200) {
    $("#btn-page-scroll").addClass("show");
} else {
    $("#btn-page-scroll").removeClass("show");
}
});

// show more
$('.showmore').click(function (e) {

    let post = $(this).closest(".description-m").find(".ct-contents");
    if (post.hasClass("max-h")) {
    $('.showmore').html('Show more');
    $([document.documentElement, document.body]).animate({
        scrollTop: $(post).offset().top-100
    }, 100);
    }else{
    $('.showmore').html('Show left');
    }
    post.toggleClass("max-h");

})
$('#frm-login').submit(function(e) {
e.preventDefault();
var url = $(this).attr("action");
var $frm = $(this);
$.ajax({
    type: "POST",
    url: url,
    data: $(this).serialize(),
    beforeSend: function(){
        $frm.find("button").prop("disabled", true);
        $frm.find(".fg-popup-error").html('<div class="text-center"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
    },
    success: function(data) {
        if (data.code == 1) {
            location.reload();
        }
        $frm.find(".fg-popup-error").html('<div class="alert alert-danger">' + data.message + '</div>');
    }
}).done(function(){
    $frm.find("button").prop("disabled", false);
})
});

loadUserBar();
function loadUserBar(){
var adBar = $("#adminBar"),
    pt = adBar.data("ptype") || "",
    pi = adBar.data("pid") || 0;
$.ajax({
    url: `${ldomain}/account/nonecache`,
    method: "GET",
    data: {
    ptype: pt,
    pid: pi,
    },
    success: function(rs){           
    if(rs.code==1){
    
        adBar.html(rs.html.adbar);
    }
    },
    error: function(error){}
});
}
});
// Search
var timeSearch = 0, tsearch = "";
$('.form-search input[name=s]').on('input', function(e) {
    clearTimeout(timeSearch);
    $this = $(this);
    timeSearch = setTimeout(function() {
        var strInput = $this.val(),
            query = strInput.toLowerCase();
        if (query.length > 0) {
            $.ajax({
                url: `${domain}/suggest`,
                data: { s: query },
                method: "POST",
                success: function(rs) {
                    var rsSuggestText = "",
                        suggestText = "";
                    query = rs.keyword;
                   
                    rs.data.forEach(function(s, index) {
                        var title = s.title.toLowerCase();
                        var tmp = title.replace(new RegExp(`${query}`, "g"), `<strong>${query}</strong>`);
                        rsSuggestText += `<p id="${index+1}" class="s-item">${tmp}</p>`;
                        if(index==0){
                            suggestText = title;
                        }
                    });
                   
                    rsSuggestText = (rsSuggestText.length > 0) ? `<div class="suggestions-holder">${rsSuggestText}</div>` : "";
                    $this.closest("form").find("#suggestions").html(rsSuggestText);
                    var match = suggestText.match(new RegExp(`^${query}`,"g"));
                    suggestText = (match) ? suggestText : "";
                    suggestText = (suggestText!="")? `${strInput}${suggestText.substr(query.length)}`: "";
                   
                    $this.closest("form").find("#suggest-text").html(suggestText);
                    $this.closest("form").addClass("searching");
                }
            });
        } else {                
            $this.closest("form").find("#suggestions").html("");
            $this.closest("form").find("#suggest-text").html("");
        }
    }, 300);
});

$('.form-search input[name=s]').on('keyup', function(e) {
    var $this = $(this),
        $frm = $this.closest("form"),
        suggestText = "";
    if (e.keyCode == 38 || e.keyCode == 40) {
        e.preventDefault();
        var $suggestions = $frm.find("#suggestions .s-item"),
            $sItemActive = $frm.find("#suggestions .s-item.active"),
            curIndex = parseInt($sItemActive.attr("id") || 0),
            maxLength = $suggestions.length;

        if (e.keyCode == 38) {
            curIndex -= 1;
        }
        if (e.keyCode == 40) {
            curIndex += 1;
        }
        curIndex = (curIndex == -1) ? maxLength : curIndex;
        if (curIndex >= 1 && curIndex <= maxLength) {
            $frm.find("#suggestions .s-item").removeClass("active");
            $frm.find(`#suggestions #${curIndex}`).addClass("active");
            var textSearch = $frm.find(`#suggestions #${curIndex}`).html().trim();
            textSearch = textSearch.replace(/<strong>|<\/strong>/g, "");
            $frm.find('input[name="s"]').val(textSearch);
            $this.closest("form").find("#suggest-text").html("");
            suggestText = "";
        } else {                
            $frm.find("#suggestions .s-item").removeClass("active");
            $frm.find('input[name="s"]').val(tsearch);
            suggestText = $frm.find("#suggestions .s-item:nth-child(1)").text() || "";
        }
    } else {
        tsearch = $(this).val();
        suggestText = $frm.find("#suggestions .s-item:nth-child(1)").text() || "";        
    }        
    suggestText = suggestText.replace(/<strong>|<\/strong>/g, "");
    suggestText = (suggestText!="")? `${tsearch}${suggestText.substr(tsearch.length)}`: "";
    $frm.find("#suggest-text").html(suggestText);
});

$('.form-search').click(function(e) {
    var $this = $(this);
    setTimeout(function(){
        $this.closest(".form-search").addClass("searching");
    }, 1);
});

$('#header').on("click",".toggle_menu, .close_menu",function(){
    $('#header').toggleClass('show_menu')
})

$('#header').on("click",".toggle_search, .close_search",function(){
    $('#header').toggleClass('show_search')
})

$('.form-search input[name=s]').focusout(function(e) {
    var $this = $(this);
    setTimeout(function(){
        $this.closest(".form-search").removeClass("searching");
    }, 300);
});

$(".form-search #suggestions").on("click", ".s-item", function(e) {
    e.preventDefault();
    $(this).closest("form").find(".s-item").removeClass("active");
    $(this).addClass("active");
    $(this).closest("form").submit();
});

$('.form-search').submit(function(e) {
    var textSearch = $(this).find('input[name="s"]').val(),
        suggestText = $(this).find(".s-item.active").html() || "";
    textSearch = ((suggestText != "") ? suggestText : textSearch).trim();
    textSearch = textSearch.replace(/<strong>|<\/strong>/g, "");
    if (textSearch.length > 0) {
        $(this).closest("form").find('input[name="s"]').val(textSearch);
    } else {
        e.preventDefault();
    }
});

$('#search-holder').on('click', function(e) {
    if (e.target !== this)
        return;
    $(this).toggleClass("open");
});

$('.iconMenuMobile').on('click', function(e) {
  let isShow = $('#dropdownMenuMobile').css('display');
  let display = isShow =="none" ? "block" :"none"
  $('#dropdownMenuMobile').css('display',display);
});

//FULL SRCEEN
let ori = $('.wrap-game').data('orientation');
$('.btplaygame ').click(function(){
$('.link-game').css('display','block');
$('.closegame').css('display','block');
$('.link-game').addClass('playopen');
    openFullscreen();
    if (ori == 'landscape-primary')
        screen.orientation
    .lock('landscape-primary')
    .then(function () {})
    .catch(function (error) {});
    });


  

$("#pagePopup").on("click",function(){
    $(this).removeClass("open")
})
// comment
$(".submit_comment").on("click", function(e) {
    e.preventDefault();
    var popup = $("#pagePopup");
    var bigText = popup.find(".bigText");
    var subText = popup.find(".subText");
    var $this = $(this);
    let comment_form = $("#comment_form")
    const formData = new FormData($("form#comment_form")[0]);
    let action = comment_form.attr("action")
    var data = {
        name:formData.get('name'),
        email:formData.get('email'),
        content:formData.get('content'),
        rating:formData.get('rating'),
        postid:formData.get('postid'),
    }
    $.ajax({
        url: action,
        data: data,
        method: 'POST',
        success: function (rs) {
            let smgClass = rs.code == 1 ? 'text-success' : 'text-danger';
            if (rs.code == 1 || rs.code == 0) {
                bigText.text(rs.message);
                subText.html(rs.button);
            }
            popup.addClass("open");
        },
        error: function () {},
    });
});

$("#sort_by_comment").on("change",function(e){
    let val_active =$(this).val();
    let list = $('.comment_list');
    for (i = 0; i < list.length; i++) {
        list[i].style.display = "none";  
        if(list[i].id == val_active){
            list[i].style.display = "block"; 
        }
    }
})

$('.more_game').on("click",function(){
    $("#loading_img").removeClass("hidden")
    let url = window.location.href;

    if(!url.includes("page")){
        url = url+ "page/1";
    }
    url = url.split("/");
    url[url.length - 1] = parseInt(url[url.length - 1]) + 1
    url = url.join("/")

    $.ajax({
        url: url,
        success: function (rs) {
            let new_data = $(rs).find("#append-game").html();
            let old_data = $("#append-game")
            old_data.empty()
            old_data.append(new_data)
            const img_data = $(old_data).find("img");
            for(let i =0 ; i < img_data.length ; i++){
                let data_src = $(img_data[i]).attr("data-src");
                $(img_data[i]).attr("src", data_src);
            }
            $("#loading_img").addClass("hidden")
        },
        error: function (err) {
        },
    });
    window.history.pushState(null,"",url);
})

//full sreen ifreme
$('.fullscreen').on("click touchstart tap",function () {
    let getUserAgent = navigator.userAgent.toLocaleLowerCase();

    if (getUserAgent.indexOf('safari') != -1) { 
        if (getUserAgent.indexOf('chrome') > -1) {
            $(".link-game").addClass("playopen");
            openFullscreen();
        } else {
            $(".link-game").addClass("playsafari");
            $("body").addClass("hiddenOverflow");
        }
    }
});

$('.closegame').on("click touchstart tap",".close",function(){
    let getUserAgent = navigator.userAgent.toLocaleLowerCase();
    if (getUserAgent.indexOf('safari') != -1) { 
        if (getUserAgent.indexOf('chrome') > -1) {
            $(".link-game").removeClass("playopen");
            closeFullscreen()
        } else {
            $(".link-game").removeClass("playsafari");
            $("body").removeClass("hiddenOverflow");
        }
    }
});
$('.closegame').on("click",".hideClose",function(){
    $(this).parent().toggleClass("hideCl")
});

var elem = document.querySelector(".link-game");
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
    }
}


