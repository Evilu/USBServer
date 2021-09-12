const usb = require("usb");
const mapTree = require("../models/treeModel").mapTree

async function makeUSBTree() {

    try {
        let usbList = usb.getDeviceList()

        usbList.forEach((item) => {
            item.parent
        })

        let deviceList = await descriptorLoop(usbList)

        return mapTree(deviceList)

    } catch (error) {
        console.log(error)
    }
}

async function descriptorLoop(usbList) {
    for await (let device of usbList) {
        device.open();
        const manufacturer = await getManufacturer(device);
        const product = await getProduct(device);
        device.manufacturer = manufacturer;
        device.product = product;
    }

    return usbList.map(a => {
        return {...a}
    })

}

async function getProduct(device) {
    return new Promise((resolve, reject) => {
        device.getStringDescriptor(device.deviceDescriptor.iProduct, (err, product) => {
            if (err) {
                reject(err);
            } else {
                resolve(product);
            }
        })
    });
}

async function getManufacturer(device) {
    return new Promise((resolve, reject) => {
        device.getStringDescriptor(device.deviceDescriptor.iManufacturer, (err, manufacturer) => {
            if (err) {
                reject(err);
            } else {
                resolve(manufacturer);
            }
        })
    });
}


module.exports = {
    makeUSBTree:makeUSBTree
}