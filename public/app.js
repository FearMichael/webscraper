M.AutoInit();

const button = $("button");

$(document).on("click", ".commentButton", function(event) {
    selectedId = $(this).attr("data-id");
    $(this).hide();
    $(`.commentForm[data-id="${selectedId}"]`).show();
});

$(document).on("click", ".formPush", function(event) {
    // let selectedId = $(this).attr("data-id");
    console.log($(this).siblings().children())
    console.log($(this).siblings().children(".name").val());
let commentForm = {
    author: $(this).siblings().children(".name").val(),
    blurb: $(this).siblings().children(".comment").val(),
    scrape: $(this).parent(".commentForm").attr("data-id")
};
console.log(commentForm);
    $.post("/api/comment", commentForm).then((data) => {
        console.log(data);
    });
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