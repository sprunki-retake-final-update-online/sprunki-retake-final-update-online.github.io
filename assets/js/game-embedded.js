$(".pageOnlyIframe").on("click",".btn_playgame",function(){
    $(".bg_game").addClass("hide")
    $(".loading_game").removeClass("hide")
    let urlIframe = $(".pageOnlyIframe").attr("data-embed");
    // create iframe
    var iframe = document.createElement("iframe");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("border", "0");
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("height", "100%");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("src", `${urlIframe}`);
        $(".pageOnlyIframe").append(iframe)
        iframe.addEventListener('load', () => $(".loading_game").addClass("hide"));

})


