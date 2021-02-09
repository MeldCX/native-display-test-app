## Native Display Test App

This app was created when issues arose in setting various resolutions on devices via the dashboard.
The goal was to create an app that offers the same capabilities as the 'resolution' drop-down in the
meld dashboard.

This app launches on each display and lists all available modes for each display as well as a button to
apply each mode.

The `console` output is also visible on the right half of the screen.

There is already a version of this on the app store - details below.
```
ID: dknjjamaiigjiijpnpdmmjblhcdjgbbn
URL: https://dev-apps.meld.cx/v1/app/a7efb192-a149-4b71-b56c-33866ad7a465/update.xml
```
Please try to avoid uploading unecessary copies onto the meld dev appstore unless required.

#### TODO
 - highlight the row for the current mode for each display
 - fix reload button (app is not a webpage, window.location.reload() does not work)
 - add a display ID identifier that is fixed to the top-right of each screen
 - make 'Apply' buttons bigger
