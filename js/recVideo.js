function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
}
  
var theStream;
  
  function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
  
    var constraints = {
      video: true
    };
  
    getUserMedia(constraints, function(stream) {
      var mediaControl = document.querySelector('video');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      theStream = stream;
    }, function(err) {
      alert('Error: ' + err);
    });
  }
  
  function takePhoto() {
    if (!('ImageCapture' in window)) {
      alert('ImageCapture is not available');
      return;
    }
  
    if (!theStream) {
      alert('Grab the video stream first!');
      return;
    }
  
    var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
    console.log(theImageCapturer);
    localStorage['icon'] = theImageCapturer;
  
    theImageCapturer.takePhoto()
      .then(blob => {
        var theImageTag = document.getElementById("imageTag");
        theImageTag.src = URL.createObjectURL(blob);
        toDataURL(theImageTag.src, function(dataUrl) {
          //console.log('RESULT:', dataUrl)
          localStorage['icon'] = dataUrl;
        })
  
        //localStorage['icon'] = theImageTag.src;
        //document.getElementById("myicon").src = localStorage['icon'];
  
      })
      .catch(err => alert('Error: ' + err));
  }
  
  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  
  
  function loadPhoto() {

    //document.querySelector("#myicon").src = imageUrl;
    document.getElementById("myicon").src = localStorage['icon'];
  }

  // Speicherung

if ('localStorage' in window || 'sessionStorage' in window) {
    var selectedEngine;
  
    var logTarget = document.getElementById('target');
    var valueInput = document.getElementById('value');
  
    var reloadInputValue = function () {
    console.log(selectedEngine, window[selectedEngine].getItem('myKey'))
      valueInput.value = window[selectedEngine].getItem('myKey') || '';
    }
    
    var selectEngine = function (engine) {
      selectedEngine = engine;
      reloadInputValue();
    };
  
    function handleChange(change) {
      var timeBadge = new Date().toTimeString().split(' ')[0];
      var newState = document.createElement('p');
      newState.innerHTML = '' + timeBadge + ' ' + change + '.';
      logTarget.appendChild(newState);
    }
    
    selectEngine('localStorage');
  
    valueInput.addEventListener('keyup', function () {
      window[selectedEngine].setItem('myKey', this.value);
    });
  
    var onStorageChanged = function (change) {
      var engine = change.storageArea === window.localStorage ? 'localStorage' : 'sessionStorage';
      handleChange('External change in ' + engine + ': key ' + change.key + ' changed from ' + change.oldValue + ' to ' + change.newValue + '');
      if (engine === selectedEngine) {
        reloadInputValue();
      }
    }
  
    window.addEventListener('storage', onStorageChanged);
  };