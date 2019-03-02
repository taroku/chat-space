$(function(){
  function buildHTML(message){
    var html = `<div class="chat-main__body">
                <div class="chat-main__body--messages-list">
                <div class="chat-main__message clearfix">
                <div class="chat-main__message-name">
                ${message.name}
                </div>
                <div class="chat-main__message-time">
                ${message.created_at}
                </div>
                <div class="chat-main__message-body">
                <p class="lower-message__content">
                ${message.content}
                </p>
                </div>
                </div>
                </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.textbox').val('')
      $("html,body").animate({scrollTop:$('#chat-main__footer').offset().top});
    })
    .fail(function(){
      alert('error');
    })
    // e.preventDefault();
    // console.log(this);
  })
})
