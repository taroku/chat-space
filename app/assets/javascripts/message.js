$(function(){
  function buildHTML(message){
    var image = '';
    if(message.image) {
      image = `<img src="${message.image}" class="lower-message__image">`;
    }
    var html = `<div class="chat-main__body" data-id="${message.id}">
                  <div class="chat-main__body--messages-list">
                      <div class="chat-main__message clearfix">
                        <div class="chat-main__message-name">
                          ${message.user_name}
                        </div>
                        <div class="chat-main__message-time">
                          ${message.timestamp}
                        </div>
                        <div class="chat-main__message-body">
                          <p class="lower-message__content">
                            ${message.text}
                          </p>
                        </div>
                      </div>
                  </div>
                </div>`
    return html;
  }
  // メッセージ送信
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
   setTimeout(function(){
      $('.submit').prop('disabled', false)
    }, 1000);
    // e.preventDefault();
    // console.log(this);
  })

  // 自動更新
  var path = location.pathname
  var group_id = $('.chat-main__header--group-name').data('id');
  if (path == `/groups/${group_id}/messages`) {
    setInterval(function(){
      var message_id = $('.chat-main__body:last').data('id');
        $.ajax({
          url: path,
          type: 'GET',
          data: {
            id: message_id
          },
          dataType: 'json'
        })
        .done(function(data){
          data.forEach(function(message){
            var html = buildHTML(message)
            $('.messages').append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          });
        })

        .fail(function(){
          alert('error');
        });
    }, 5000);
  }
});

