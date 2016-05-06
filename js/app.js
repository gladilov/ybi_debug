(function($) {
    "use strict";
    
    
    var deviceReadyDeferred = $.Deferred();
    var jqmReadyDeferred = $.Deferred();

    document.addEventListener("deviceReady", deviceReady, false);

    function deviceReady() {
      deviceReadyDeferred.resolve();
    }

    $(document).on("mobileinit", function () {
      jqmReadyDeferred.resolve();
    });

    $.when(deviceReadyDeferred, jqmReadyDeferred).then(doWhenBothFrameworksLoaded);

    function doWhenBothFrameworksLoaded() {
      // StatusBar
      StatusBar.overlaysWebView( false );
      StatusBar.backgroundColorByName("gray");
      
      // Notification
      navigator.notification.alert(
        'Test',
        null,
        'Test notification',
        'Закрыть'
      );
      
      // Vars
      var tipPercent = 15.0;
      var calcTip = function() {
          var billAmt = Number( $('#billAmount').val() );
          var tipAmt =  billAmt * tipPercent/100 ;
          var totalAmt = billAmt + tipAmt;
          $('#tipAmount').text('$' + tipAmt.toFixed(2));
          $('#totalAmount').text('$' + totalAmt.toFixed(2));
      };
      var saveSettings = function() {
          try {
              var tipPct = parseFloat( $('#tipPercentage').val() );
              localStorage.setItem('tipPercentage', tipPct);
              tipPercent = tipPct;
              window.history.back();
          } catch (ex) {
              alert('Tip percentage must be a decimal value');
          }
      };
      
      
      // Logic
      $('#calcTip').on('click', calcTip);
      $('#saveSettings').on('click', saveSettings);
      var tipPercentSetting = localStorage.getItem('tipPercentage');
      if (tipPercentSetting) {
          tipPercent = parseFloat(tipPercentSetting);
      }
      $('#tipPercentage').val(tipPercent);
    }

}
)(jQuery);

