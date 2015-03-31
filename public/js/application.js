


$(document).ready(function() {
  SC.initialize({
    client_id: '3c6613e009151a45089b3f0a7f94ac1b',
    redirect_uri: 'http://localhost:9393/me'
  });

  $('.login').click(function(event){
    event.preventDefault();
    SC.connect(function() {
      SC.get('/me', function(me) {
        console.log(me);
        alert('Hello, ' + me.username);
      });
    });
  });

});
