// $(function() {
//   var search_user = $("#user-search-result");

//   function appendUser(user) {
//     var html = `<div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">${user.name}</p>
//                   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
// </div>`
//     search_user.append(html);
//   }

//   function appendNoUser(user) {
//     var html = `<input class="chat-group-form__input" id="user-search-field"placeholder="${user}" type="text">`
//     search_user.append(html);
//   }
//   $("#user-search-field").on("keyup", function() {
//     var input = $("#user-search-field").val();
//     $("#user-search-result").empty();

//     $.ajax({
//       type: 'GET',
//       url: '/users',
//       data: { keyword: input },
//       dataType: 'json'
//     })
//     .done(function(users) {
//       if(input == ""){
//         $("#user-search-result").empty();
//       }
//       else{
//         if (users.length !== 0) {
//          users.forEach(function(user){
//            appendUser(user);
//          });
//         }
//         else {
//            appendNoUser("一致するユーザーはいません");
//           }
//       }
//     })
//     .fail(function() {
//       alert('ユーザー検索に失敗しました');
//     })
//   });
// });
$(function() {

  var search_user = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
</div>`
    search_user.append(html);
  }

  function appendNoUser(user) {
    var html = `<input class="chat-group-form__input" id="user-search-field"placeholder="${user}" type="text">`
    search_user.append(html);
  }

  function appendGroupUser(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
</div>`
  $('#chat-group-users').append(html);
  }

  $(document).on("click", ".chat-group-user__btn--add", function(){
    var user_id = $(this).attr("data-user-id")
    var user_name = $(this).attr("data-user-name")

    appendGroupUser(user_id, user_name);
    $(this).parent().remove();

  })

  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  })

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $("#user-search-result").empty();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      if(input == ""){
        $("#user-search-result").empty();
      }
      else{
        if (users.length !== 0) {
         users.forEach(function(user){
           appendUser(user);
         });
        }
        else {
           appendNoUser("一致するユーザーはいません");
          }
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
