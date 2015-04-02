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

  // SC.stream('/tracks/293', {
  //   autoPlay: true,
  //   ontimedcomments: function(comment) {
  //     console.log(comment[0].body);
  //     var list = $('<li></li>')
  //     list.text(comment[0].body)
  //     $('.comments').append(list);
  //   }
  // });

  // $('.player').click(function(event){
  //   event.preventDefault();
  //   SC.get('/tracks/293', function(track) {
  //         SC.oEmbed(track.permalink_url, $('#player')[0]);
  //       });
  // });

  $('body').on('click', '.track', function(event) {
    //if (event.metaKey || event.shiftKey) return;
    //debugger
    event.preventDefault();
    var trackId = $(this).data().trackId;
  //   SC.stream('/tracks/'+trackId, {
  //   autoPlay: true,
  //   ontimedcomments: function(comment) {
  //     console.log(comment[0].body);
  //     var list = $('<li></li>')
  //     list.text(comment[0].body)
  //     $('.comments').append(list);
  //    }
  //  });
    SC.get('/tracks/'+trackId, {}, function(track){
      SC.oEmbed(track.permalink_url, {}, $('#player')[0]);
    });
  });

  $('.search').submit(function(event){
    event.preventDefault();
    $('.results').html('Loading…');
    SC.get('/tracks', { genres: $('.genre').val(), embeddable_by: 'all' }, function(tracks) {
      //debugger
      var nodes = [];
      $(tracks).each(function(index, track) {
        var li = $('<li></li>')
        //li.attr('data-track-id', track.id);
        var link = $('<a class="track"></a>');
        link.attr('data-track-id', track.id);
        link.attr('href', track.permalink_url);
        link.text(track.title + ' - ' + track.genre);
        li.append(link);
        nodes.push(li);
      });
      $('.results').html(nodes);
    });
  });

  $('.startRecording a').click(function(event) {
    event.preventDefault();
    updateTimer(0);
    SC.record({
      progress: function(ms) {
        updateTimer(ms);
      }
    });
    $('.startRecording').hide();
    $('.stopRecording').show();
  });

  $('.stopRecording a').click(function(event) {
    event.preventDefault();
    $('.playBack').show();
    $('.stopRecording').hide();
    $('.upload').show();
    SC.recordStop();
  });

  $('.playBack a').click(function(event) {
    event.preventDefault();
    updateTimer(0);
    SC.recordPlay({
      progress: function(ms) {
        updateTimer(ms)
      }
    });
  });
});

function updateTimer(ms) {
  $('.time').text(SC.Helper.millisecondsToHMS(ms));
}

//genres: $('.genre').val()
//, duration[to]: $('.duration').val()

