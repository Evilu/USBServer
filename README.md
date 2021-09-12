# Getting Started with USBServer

After activating the USB server, please use [usb-client](https://github.com/Evilu/usb-client)
To view your active USB devices.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs project's critical node_modules, make sure you run it first!


### `npm start`

Runs the app.

## Important message to Microsoft Windows users!


Use [Zadig](https://zadig.akeo.ie/)  to install the WinUSB driver for your USB device.
Otherwise, you will get ### `LIBUSB_ERROR_NOT_SUPPORTED` when attempting to open devices.

Using Unix based systems (Linux flavors,macOS) is highly recommended!