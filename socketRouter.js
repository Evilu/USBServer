const usb = require('usb')
const io = require("socket.io")(3005);

const makeUSBTree = require('./services/usbService').makeUSBTree;

(async () => {
    io.on("connection", async socket => {

        socket.emit("Connected!");

        const tree = await makeUSBTree()

        socket.emit("tree", tree);

        usb.on('attach', () => {
            (async () => {
                const tree = await makeUSBTree()
                socket.emit("tree", tree);
            })();
        });

        usb.on('detach', () => {
            (async () => {
                const tree = await makeUSBTree()
                socket.emit("tree", tree);
            })();
        });

    });

})();


