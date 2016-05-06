(function($){

    var deviceReadyDeferred = $.Deferred();
    var jqmReadyDeferred = $.Deferred();
    
    // are we running in native app or in a browser?
    window.isphone = false;
    if (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) {
      window.isphone = true;
    }

    if (window.isphone) {
      document.addEventListener('deviceready', deviceReady, false);
    } else {
      deviceReady();
    }
    
    //document.addEventListener("deviceReady", deviceReady, false);

    function deviceReady() {
      deviceReadyDeferred.resolve();
    }

    $(document).on('mobileinit', function() {
      $.support.cors = true;
      $.mobile.allowCrossDomainPages = true;
      
      jqmReadyDeferred.resolve();
    });

    $.when(deviceReadyDeferred, jqmReadyDeferred).then(doWhenBothFrameworksLoaded);

    function doWhenBothFrameworksLoaded() {
      // StatusBar
      if (window.isphone) {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByName("gray");
      }
      
      // Logic
      
      // TEST NOTIFICATION
      $('#test-notification').on('click', function(){
        alert('Test notification');
        
        // Notification
        if (window.isphone) {
          navigator.notification.alert(
            'Test',
            null,
            'Test notification',
            'Закрыть'
          );
        }
      });
      
      // TEST AJAX
      $('#test-ajax').on('click', function(){
        alert('Test ajax start');
        
        // post
        $.post("http://y-b-i.com/api/debug.php", {'test': 'post_test_ok'}, function (responseData) {
          data = $.parseJSON(responseData);
          alert('post');
          alert(data.data.test);
        });
        
        // get
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          jsonpCallback: 'userCreate',
          url: 'http://y-b-i.com/api/debug.php',
          data: {'method': 'POST', 'data': {'name': 'test', 'pass': '123'}},
          cache: false,
          async: true,
          crossDomain: true,
        })
        .done(function(data, textStatus, jqXHR){
          alert('get');
          alert("success");
          console.log(data);
          
          // Notification
          if (window.isphone) {
            navigator.notification.alert(
              data.status,
              null,
              'Test ajax jsonp - saccess',
              'Закрыть'
            );
          }
          
          alert('Test ajax stop');
        })
        .fail(function(jqXHR, textStatus, errorThrown){
          alert("error");
          console.log(data);
          
          // Notification
          if (window.isphone) {
            navigator.notification.alert(
              jqXHR.responseText,
              null,
              'Test ajax jsonp - error',
              'Закрыть'
            );
          }
          
          alert('Test ajax stop');
        });
        
        
      });

    }

})(jQuery);
