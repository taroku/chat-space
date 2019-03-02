$(function(){
  $('#new_message').on('submit', function(e){
    var formData = new FormData(this);
    e.preventDefault();
    console.log(this);
  })
})
