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
      
      //$.mobile.hashListeningEnabled = false;/* temp */
      $.mobile.pushStateEnabled = false;/* temp */
      
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
      var $message = $('#message');
      
      // TEST NOTIFICATION
      $('#test-notification').on('click', function(){
        // Notification
        if (window.isphone) {
          navigator.notification.alert(
            'Test',
            null,
            'Test notification',
            'Закрыть'
          );
        }
        else alert('Test notification');
      });
      
      // TEST AJAX
      $('#test-ajax').on('click', function(){
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          jsonpCallback: 'userCreate',
          contentType: "application/json; charset=utf-8",
          url: 'http://y-b-i.com/api/debug.php',
          data: {'method': 'POST', 'data': {'name': 'test', 'pass': '123'}},
          cache: false,
          async: true,
          crossDomain: true,
        })
        .done(function(data, textStatus, jqXHR){
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
          else alert("Success. Test ajax stop");
        })
        .fail(function(jqXHR, textStatus, errorThrown){
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
          else alert("Error. Test ajax stop");
        });
      });
      
      // TEST SPLASHSCREEN
      $('#test-splashscreen').on('click', function(){
        // Splashscreen
        if (window.isphone) {
          navigator.splashscreen.show();
          setTimeout(function () {
              navigator.splashscreen.hide();
          }, 3000);
        }
        else alert("Function work only mobile device.");
      });
      
      // TEST DEVICE UUID
      $('#test-device-uuid').on('click', function(){
        if (window.isphone) {
          navigator.notification.alert(
            'UUID: ' + device.uuid,
            null,
            'Device uuid',
            'Закрыть'
          );
        }
        //else alert('UUID: ' + device.uuid);
        else alert("Function work only mobile device.");
      });
      
      // TEST IOS NAVIGATION BETWEEN OTHER HTML FILES
      $('#test-goto-page4').on('click', function(){
        $.mobile.pageContainer.pagecontainer("change", '#page4', {reload: false, transition: 'slide'});

      });
      $('#test-goto-page5').on('click', function(){
        $(':mobile-pagecontainer').pagecontainer("change", 'page5.html', {reload: true});
      });

    }

})(jQuery);
