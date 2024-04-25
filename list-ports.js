const SerialPort = require('serialport');

SerialPort.list().then(ports => {
  if (ports.length === 0) {
    console.log('No serial ports found.');
  } else {
    ports.forEach(port => {
      console.log('Port: ' + port.path);
      console.log('Manufacturer: ' + (port.manufacturer || 'Unknown'));
      console.log('Serial Number: ' + (port.serialNumber || 'Not available'));
      console.log('Location ID: ' + (port.locationId || 'Not available'));
      console.log('Vendor ID: ' + (port.vendorId || 'Not available'));
      console.log('Product ID: ' + (port.productId || 'Not available'));
      console.log('PnP ID: ' + (port.pnpId || 'Not available'));
      console.log('----------------------------------');
    });
  }
}).catch(err => {
  console.error('Error listing serial ports:', err);
});
