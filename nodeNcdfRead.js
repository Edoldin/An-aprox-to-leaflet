const fs = require('fs');
const NetCDFReader = require('netcdfjs');

// http://www.unidata.ucar.edu/software/netcdf/examples/files.html
const data = fs.readFileSync('medicion.nc');

var reader = new NetCDFReader(data); // read the header
//console.log(reader.getDataVariable('vo')); // go to offset and read it
console.log(reader.variables);