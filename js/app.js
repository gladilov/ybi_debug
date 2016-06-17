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
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByName("red");
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
      
      // TEST EXIT APP
      $('#test-exit-app').on('click', function(){
        if (window.isphone) {
          function onConfirm(buttonIndex) {
            if (buttonIndex == "1") navigator.app.exitApp();
          }

          navigator.notification.confirm(
            'Exit app?', // message
             onConfirm, // callback to invoke with index of button pressed
            'Exit', // title
            ['Ok, exit','Cancel'] // buttonLabels
          );
        }
        else alert("Function work only mobile device.");
      });
      
      // TEST TOAST
      $('#toast-short-top').on('click', function(){
        if (window.isphone) { window.plugins.toast.showShortTop('Hello there!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)}); }
        else alert("Function work only mobile device.");
      });
      $('#toast-long-center').on('click', function(){
        if (window.isphone) { window.plugins.toast.show('Hello there!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)}); }
        else alert("Function work only mobile device.");
      });
      $('#toast-long-bottom').on('click', function(){
        if (window.isphone) { window.plugins.toast.showLongBottom('Hello there!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)}); }
        else alert("Function work only mobile device.");
      });
      
      // TEST SOCIALSHARING
      $('#test-socialsharing').on('click', function(){
        if (window.isphone) {
          // this is the complete list of currently supported params you can pass to the plugin (all optional)
          var options = {
            message: 'share this', // not supported on some apps (Facebook, Instagram)
            subject: 'the subject', // fi. for email
            files: ['', ''], // an array of filenames either locally or remotely
            url: 'http://www.y-b-i.com',
            chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
          }

          var onSuccess = function(result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
          }

          var onError = function(msg) {
            console.log("Sharing failed with message: " + msg);
          }

          window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        }
        else alert("Function work only mobile device.");
      });

    }

})(jQuery);
