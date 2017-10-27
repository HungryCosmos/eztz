var expect = require('chai').expect;
var eztz = require('../main/eztz');

describe('eztz', function () {

   it('should work', function () {
       // zoned time and offset
       var zoneOffset = -2.5;
       var zoneTime = eztz.get(zoneOffset).getTime();

       // local time and offset
       var localDate = new Date();
       var localOffset = localDate.getTimezoneOffset() / -60;
       var localTime = localDate.getTime();

       // calculated difference between local and zoned time
       var diff = Math.round(localTime - zoneTime) / (1000 * 60 * 60);

       // expecting calculated difference to equal preset
       expect(diff).to.equal(localOffset - zoneOffset);
   })
});