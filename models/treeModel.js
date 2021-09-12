
function mapTree(deviceList){
    const usbTree =[];

    deviceList.map(el => {
        if (el._parent === null) {
            const obj = {
                id: el.deviceDescriptor.idProduct,
                parentId: null,
                bDeviceClass: el.deviceDescriptor.bDeviceClass,
                label: ` Product: ${el.product},
                             Vendor: ${el.manufacturer}
                             Type: ${el.deviceDescriptor.bDeviceClass === 9 ? "Hub" : "Device"}`
            }
            usbTree.push(obj);
            return;
        }
        const obj = {
            id: el.deviceDescriptor.idProduct,
            parentId: el._parent.deviceDescriptor.idProduct,
            bDeviceClass: el.deviceDescriptor.bDeviceClass,
            label: `Product: ${el.product},
                         Vendor: ${el.manufacturer}
                          Type: ${el.deviceDescriptor.bDeviceClass === 9 ? "Hub" : "Device"}`
        }
        usbTree.push(obj);
    });
    return usbTree
}

module.exports = {
    mapTree:mapTree
}