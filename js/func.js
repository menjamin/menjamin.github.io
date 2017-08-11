function startPage(page){
    $('body').empty();
    $.get("html/" + page + ".html", function (data) {
        $("body").append(data);
            if(page === 'lobby'){
                $("#player1").toggleClass("grey", true);
                $("#player2").toggleClass("grey", true);
                }
    });
}





