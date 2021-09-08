const usb = require('usb')



usb.on('attach', (device) => {

   const tree = makeUSBTree()
    console.log()
});

usb.on('detach', (device) => {

  const tree = makeUSBTree()
    console.log()
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
            usbTree.push(el);
            return;
        }
        const parentEl = deviceList[idMapping[el._parent.deviceDescriptor.idProduct]];

        parentEl.children = [...(parentEl.children || []), el];
    });
    return usbTree
}

const tree = makeUSBTree()
console.log()

