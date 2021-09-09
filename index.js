const usb = require('usb')
const io = require("socket.io")(3000);


io.on("connection", socket => {

    socket.emit("Connected!");



usb.on('attach', (device) => {

   const tree = makeUSBTree()
    socket.emit("tree",tree);
});

usb.on('detach', (device) => {

  const tree = makeUSBTree()
    socket.emit("tree",tree);
});


function makeUSBTree() {

  const  usbTree = []
     let usbList = usb.getDeviceList()


    usbList.forEach((item) => {
        item.parent
    })

    let deviceList = usbList.map(a => {return {...a}})

    const idMapping = deviceList.reduce((acc, el, i) => {
        acc[el.deviceDescriptor.idProduct] = i;
        return acc;
    }, {});


    deviceList.map(el => {
        if (el._parent === null) {
            const obj = {
                id : el.deviceDescriptor.idProduct,
                parentId : null,
                label: ` Product: ${el.deviceDescriptor.idProduct}, Vendor: ${el.deviceDescriptor.idVendor}`
            }
            usbTree.push(obj);
            return;
        }
        const obj = {
            id : el.deviceDescriptor.idProduct,
            parentId : el._parent.deviceDescriptor.idProduct,
            label: ` Product: ${el.deviceDescriptor.idProduct}, Vendor: ${el.deviceDescriptor.idVendor}`
        }
        usbTree.push(obj);
        el.id = el.deviceDescriptor.idProduct
        el.parentId = el._parent.deviceDescriptor.idProduct
    });
    return usbTree
}

const tree = makeUSBTree()

socket.emit("tree",tree);
console.log()

});