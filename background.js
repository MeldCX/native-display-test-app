chrome.app.runtime.onLaunched.addListener(function () {
  chrome.system.display.getInfo({}, (displays) => {
    displays.forEach(display => {
      chrome.app.window.create("window.html", {
        outerBounds: display.bounds,
      });
    })
  });
});
