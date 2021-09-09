const usb = require('usb')
const io = require("socket.io")(3005);

(async () => {


io.on("connection", async socket => {

    socket.emit("Connected!");

    usb.on('attach', (device) => {
        (async () => {
            const tree = await makeUSBTree()
            socket.emit("tree", tree);
        })();
    });

    usb.on('detach', (device) => {
        (async () => {
            const tree = await makeUSBTree()
            socket.emit("tree", tree);
        })();
    });


    async function makeUSBTree() {

        const usbTree = []
        let usbList = usb.getDeviceList()


        usbList.forEach((item) => {
            item.parent
        })

        let deviceList = await descriptorLoop(usbList)


        deviceList.map(el => {
            if (el._parent === null) {
                const obj = {
                    id: el.deviceDescriptor.idProduct,
                    parentId: null,
                    label: ` Product: ${el.product}, Vendor: ${el.manufacturer}`
                }
                usbTree.push(obj);
                return;
            }
            const obj = {
                id: el.deviceDescriptor.idProduct,
                parentId: el._parent.deviceDescriptor.idProduct,
                label: ` Product: ${el.product}, Vendor: ${el.manufacturer}`
            }
            usbTree.push(obj);
            el.id = el.deviceDescriptor.idProduct
            el.parentId = el._parent.deviceDescriptor.idProduct
        });
        return usbTree
    }

    const tree = await makeUSBTree()

    socket.emit("tree", tree);
    console.log()
});

})();

async function descriptorLoop(usbList){
    for await (let device of usbList) {
        const manufacturer = await getManufacturer(device)
        const product = await getProduct(device)
        device.manufacturer = manufacturer
        device.product = product
    }

    return usbList.map(a => {return {...a}})

}

async function getProduct(device){
   return new Promise((resolve, reject) => {
       device.open()
       device.getStringDescriptor(device.deviceDescriptor.iProduct,  (err, product)=> {
         if(err){
             reject(err)
         } else {
             resolve(product)
             device.close()
         }
       })
    });
}

async function getManufacturer(device){
    return new Promise((resolve, reject) => {
        device.open()
        device.getStringDescriptor(device.deviceDescriptor.iManufacturer,  (err, manufacturer)=> {
            if(err){
                reject(err)
            } else {
                resolve(manufacturer)
                device.close()
            }
        })
    });
}

