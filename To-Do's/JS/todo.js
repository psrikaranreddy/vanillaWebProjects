$("ul").on("click", "li", function() {
  $(this).toggleClass("done");
});

$("ul").on("click", "span", function() {
  $(this)
    .parent()
    .fadeOut("600", function() {
      $(this).remove();
    });
});
$("input[type='text']").keypress(function(e) {
  if (e.which === 13) {
    var content = $(this).val();
    $(this).val("");
    $("ul").append(
      "<li> <span><i class='fa fa-trash'></i></span> " + content + "</li>"
    );
  }
});
