(function($){

    //var deviceReadyDeferred = $.Deferred();
    var jqmReadyDeferred = $.Deferred();
    /*document.addEventListener("deviceReady", deviceReady, false);

    function deviceReady() {
      deviceReadyDeferred.resolve();
    }*/

    $(document).on('mobileinit', function() {
    //$(document).ready(function() {
      jqmReadyDeferred.resolve();
    });
    console.log(jqmReadyDeferred);

    //$.when(deviceReadyDeferred, jqmReadyDeferred).then(doWhenBothFrameworksLoaded);
    $.when(jqmReadyDeferred).then(doWhenBothFrameworksLoaded);

    function doWhenBothFrameworksLoaded() {
      // StatusBar
      //StatusBar.overlaysWebView( false );
      //StatusBar.backgroundColorByName("gray");
      
      // Notification
      /*navigator.notification.alert(
        'Test',
        null,
        'Test notification',
        'Закрыть'
      );*/
      
      // Logic
      $('#test-notification').on('click', function(){
        alert('Test notification');
      });
      $('#test-ajax').on('click', function(){
        alert('Test ajax');
      });

    }

})(jQuery);
