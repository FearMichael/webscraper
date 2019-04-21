$(document).ready(function() {
    M.AutoInit();
    // $(".modal-trigger").modal();
    $(".modal-trigger").modal({
        onCloseEnd: () => {
            console.log("Modal Closed");
            console.log(event);
            // location.reload(true);
        }
    });

// const button = $("button");
const modalText = $(".modalText");

const regex = /^[a-zA-Z\d\-_.,\s]+$/

const inputCleaner = (text) => {
    if (regex.test(text)) {
        return true
    } else {
        return false
    }
};

$(document).on("click", ".commentButton", function(event) {
    selectedId = $(this).attr("data-id");
    $(this).hide();
    console.log($(`<a>[data-id="${selectedId}]"`).parent());
    $(`<a>[data-id="${selectedId}]"`).parent().removeClass("l9").addClass("l3");
    $(this).parent().removeClass("l3").addClass("l9");
    $(`.commentForm[data-id="${selectedId}"]`).show();
});

$(document).on("click", ".formPush", function(event) {
let commentForm = {
    author: $(this).siblings().children(".name").val().trim(),
    blurb: $(this).siblings().children(".comment").val().trim(),
    scrape: $(this).parent(".commentForm").attr("data-id")
};
console.log(commentForm);
if (inputCleaner(commentForm.author) && inputCleaner(commentForm.blurb)){
    $.post("/api/comment", commentForm).then((data) => {
        console.log(data);
        $(this).siblings().children(".name").val("")
        $(this).siblings().children(".comment").val("")
        $(this).parent(".commentForm").hide();
        // modalText.text("Nice, you posted a comment!");
        M.toast({html: "Nice, you commented!", displayLength: 5000, inDuration: 150, outDuration: 300, classes: 'rounded blue', completeCallback: () => location.reload()
    })
    });
} else {
    M.toast({html: "No special characters allowed. Please try again.", displayLength: 5000, inDuration: 150, outDuration: 300, classes: 'rounded blue', });
    $(this).siblings().children(".name").val("")
    $(this).siblings().children(".comment").val("")
}
});

$(document).on("click", ".scraping", function(event) {
    console.log("button clicked")
    modalText.text("This may insert already loaded scrapes. Would you like to continue?");
    $("#modalContinue").click(() => {
        console.log("Continue!")
        $.get("/api/scrape", function() {
            // console.log(window.location)
            setTimeout(() => {
                location.reload(true)
            }, 1500);
            console.log("Scrapingggg");
            // console.log(window.location.reload(true));
            // window.location.reload(true);
            // $.get("/");
            // console.log("Scrape callback");
        });
    })
});

$(document).on("click", "#modalCancel", function(event) {
    console.log("Cancelled!")
    // location.reload(true);
});

});