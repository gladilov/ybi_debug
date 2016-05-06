(function($){

    var deviceReadyDeferred = $.Deferred();
    var jqmReadyDeferred = $.Deferred();
    document.addEventListener("deviceReady", deviceReady, false);

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
      StatusBar.overlaysWebView( false );
      StatusBar.backgroundColorByName("gray");
      
      
      // Logic
      
      // TEST NOTIFICATION
      $('#test-notification').on('click', function(){
        alert('Test notification');
        // Notification
        navigator.notification.alert(
          'Test',
          null,
          'Test notification',
          'Закрыть'
        );
      });
      
      // TEST AJAX
      $('#test-ajax').on('click', function(){
        alert('Test ajax start');
        
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          jsonpCallback: 'userCreate',
          url: 'http://y-b-i.com/api/user.php',
          data: {'method': 'POST', 'data': {'name': 'test', 'pass': '123'}},
          cache: false,
          async: true,
          crossDomain: true,
        })
        .done(function(data, textStatus, jqXHR){
          alert("success");
          console.log(data);
          
          // Notification
          navigator.notification.alert(
            data.status,
            null,
            'Test ajax jsonp - saccess',
            'Закрыть'
          );
        })
        .fail(function(jqXHR, textStatus, errorThrown){
          alert("error");
          console.log(data);
          
          // Notification
          navigator.notification.alert(
            jqXHR.responseText,
            null,
            'Test ajax jsonp - error',
            'Закрыть'
          );
        });
        
        alert('Test ajax stop');
      });

    }

})(jQuery);
