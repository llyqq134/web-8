$('.open-popup').click(function(e) {
    e.preventDefault();
    $('.popup-bg').fadeIn(600);
    $('html').addClass('no-scroll')
});

$('.close-popup').click(function(evt) {
    $('.popup-bg').fadeOut(600);
    $('html').removeClass('no-scroll')
});

$('input[name="checkbox"]').on('change', function(){
    if($(this).is(':checked')) $('.button').attr('disabled', false);
    else $('.button').attr('disabled', true);
  });

$(".formcarryForm").submit(function(e){
    e.preventDefault();
    var href = $(this).attr("action");
    
    $.ajax({
        type: "POST",
        url: href,
        data: new FormData(this),
        dataType: "json",
        processData: false,
        contentType: false,
        success: function(response){
          if(response.status == "success"){
              alert("Ваши данные были отправлены");
          }
          else if(response.code === 422){
            alert("Неправильное заполнение полей");
            $.each(response.errors, function(key) {
              $('[name="' + key + '"]').addClass('formcarry-field-error');
            });
          }
          else{
            alert("Произошла ошибка: " + response.message);
          }
        },
        error: function(jqXHR, textStatus){
          const errorObject = jqXHR.responseJSON

          alert("Ошибка запроса, " + errorObject.title + ": " + errorObject.message);
        }
    });
});