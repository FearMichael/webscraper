M.AutoInit();

const button = $("button");
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
if (inputCleaner(commentForm.author) || inputCleaner(commentForm.blurb)){
    $.post("/api/comment", commentForm).then((data) => {
        console.log(data);
        $(this).siblings().children(".name").val("")
        $(this).siblings().children(".comment").val("")
        $(this).parent(".commentForm").hide();
        // modalText.text("Nice, you posted a comment!");
        M.toast({html: "Nice, you commented!", displayLength: 5000, inDuration: 150, outDuration: 300, classes: 'rounded blue', })
    });
} else {
    M.toast({html: "No special characters allowed. Please try again.", displayLength: 5000, inDuration: 150, outDuration: 300, classes: 'rounded blue', })
}
});



// $(document).on("click", function(event) {
//     console.log($(this).attr("class"));
//     selectedId = $(this).attr("data-id");
//     $(this).hide();
//     console.log($(this));
//     $(`.commentForm[data-id="${selectedId}"]`).show();
// });


// $(document).ready(() => {
//     $.get("/api/scrape");
// })