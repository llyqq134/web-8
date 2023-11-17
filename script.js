window.onpopstate = function (e) {
  if (!history.state) {
    $(".popup-bg").fadeOut(600);
    $("html").removeClass("no-scroll");
    document.getElementById("popup-id").style.display = "none";
    document.getElementById("popup-bg-id").style.display = "none";
  } else {
    $(".popup-bg").fadeIn(600);
    $("html").addClass("no-scroll");
    document.getElementById("popup-id").style.display = "block";
    document.getElementById("popup-bg-id").style.display = "block";
  }
};

$(".open-popup").click(function (e) {
  e.preventDefault();
  history.pushState({ formOpen: true }, "", "?page=form");
  $(".popup-bg").fadeIn(600);
  $("html").addClass("no-scroll");
  document.getElementById("popup-id").style.display = "block";
  document.getElementById("popup-bg-id").style.display = "block";
});

$(".close-popup").click(function (e) {
  $(".popup-bg").fadeOut(600);
  $("html").removeClass("no-scroll");
  history.replaceState({ page: 1 }, "", "index.html");
});

$('input[name="checkbox"]').on("change", function (e) {
  if ($(this).is(":checked")) $(".button").attr("disabled", false);
  else $(".button").attr("disabled", true);
});

$(".formcarryForm").submit(function (e) {
  e.preventDefault();
  var href = $(this).attr("action");
  const data = new FormData(this);

  try {
    for (value of data.values()) {
      if (value == "") throw new Error("field validtaion error");
    }
  } catch (error) {
    alert("Не все данные заполнены");
    console.log(error);
    return;
  }

  $.ajax({
    type: "POST",
    url: href,
    data: data,
    dataType: "json",
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == "success") {
        alert("Ваши данные были отправлены");
        $(".close-popup").click();
      } else if (response.code === 422) {
        alert("Неправильное заполнение полей");
        $.each(response.errors, function (key) {
          $('[name="' + key + '"]').addClass("formcarry-field-error");
        });
      } else {
        alert("Произошла ошибка: " + response.message);
      }
    },
    error: function (jqXHR, textStatus) {
      const errorObject = jqXHR.responseJSON;

      alert(
        "Ошибка запроса, " + errorObject.title + ": " + errorObject.message
      );
    },
  });
});
