  SC.initialize({
    client_id: '3c6613e009151a45089b3f0a7f94ac1b',
    redirect_uri: 'http://localhost:9393/me'
  });


$(document).ready(function() {

  $('.login').click(function(event){
    event.preventDefault();
    SC.connect(function() {
      SC.get('/me', function(me) {
        console.log(me);
        alert('Hello, ' + me.username);
      });
    });
  });

  $('.player').click(function(event){
    event.preventDefault();
    SC.get('/tracks/293', function(track) {
          SC.oEmbed(track.permalink_url, $('#player')[0]);
        });
  });

  $('body').on('click', '.track', function(event) {
    //if (event.metaKey || event.shiftKey) return;
    //debugger
    event.preventDefault();
    var trackId = $(this).data().trackId;
    SC.get('/tracks/'+trackId, function(track){
      SC.oEmbed(track.permalink_url, $('#player')[0]);
    });
  });

  $('.search').submit(function(event){
    event.preventDefault();
    $('.results').html('Loading…');
    SC.get('/tracks', { genres: $('.genre').val() }, function(tracks) {
      debugger
      var nodes = [];
      $(tracks).each(function(index, track) {
        var li = $('<li class="track"></li>')
        li.attr('data-track-id', track.id);
        var link = $('<a class="track"></a>');
        link.attr('href', track.permalink_url);
        link.text(track.title + ' - ' + track.genre);
        li.append(link);
        nodes.push(li);
      });
      $('.results').html(nodes);
    });
  });

});

//genres: $('.genre').val()
//, duration[to]: $('.duration').val()

