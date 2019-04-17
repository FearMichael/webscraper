M.AutoInit();

const button = $("button");

$(document).on("click", ".commentButton", function(event) {
    selectedId = $(this).attr("data-id");
    $(this).hide();
    $(`.commentForm[data-id="${selectedId}"]`).show();
});

$(document).on("click", ".formPush", function(event) {
// console.log($(this).parent())
console.log($(this).parents("div.input-field.name"));
let commentForm = {
    author: $(this).siblings(".name").text(),
    blurb: $(this).siblings(".comment").text(),
    scrape: $(this).parent(".commentForm").attr("data-id")
};
console.log(commentForm);
    $.post("/api/comment", commentForm).then((data) => {

    })
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