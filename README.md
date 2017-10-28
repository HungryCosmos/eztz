# eztz

I just want to get current date and time in a timezone using ONLY it's offset in hours.
I'm so done looking for proper and 100% valid names.

## Project Setup

This project assumes you have [NodeJS v6](http://nodejs.org/) or greater installed. You should
also have [npm v3](https://www.npmjs.com/) or greater installed as well (this comes packaged
with Node 6). And you may need a recent version of [git](https://git-scm.com/) just in case.

## Installation

This package is distributed via npm:

```
npm install eztz
```

## Usage

```javascript
// Imports
var eztz = require('./eztz');


// Current time in various time zones
var timeUtc1 = eztz.get();                  // Javascript Date object containing time in UTC (GMT)
var timeUtc2 = eztz.get(0);                 // Another way to get UTC time is to explicitly call for it
var timeInAlmaty = eztz.get(+6);            // Javascript Date object containing time in Almaty (GMT +6)
var timeInMoscow = eztz.get(3);             // Javascript Date object containing time in Moscow (GMT +3)
var timeInSanFrancisco = eztz.get(-7);      // Javascript Date object containing time in San Francisco (GMT -7)
var justForLulz = eztz.get(+25.852);        // Obviously there is no timezone with such offset, but it still works

// Time difference in hours between specified Date objects; calculated by substracting right from left
var diffFromAlmatyToMoscow = eztz.diff(timeInAlmaty, timeInMoscow);  // +3, Almaty is 3h ahead of Moscow
var diffFromMoscowToAlmaty = eztz.diff(timeInMoscow, timeInAlmaty);  // -3, since Almaty is +6 and Moscow is +3; 3 - 6 = -3

// Specify number of decimals required to get required precision
var diffDefault1 = eztz.diff(justForLulz, timeUtc1, 1);    // 25.9   -   1 decimal place as requested
var diffDefault2 = eztz.diff(justForLulz, timeUtc1);       // 25.9   -   rounding to 1 decimal place by default
var diffRounded = eztz.diff(justForLulz, timeUtc1, 0);     // 26     -   0 decimals
var diffExact = eztz.diff(justForLulz, timeUtc1, 3);       // 25.852 -   3 decimals

// Shifted time of various time zones
var timeIn6hBehindLocal = eztz.get(-6, new Date());       // Returns time of a timezone located 6h behind local zone
var timeInAlmatyFromMoscow = eztz.get(+3, timeInMoscow);  // Returns time of a timezone located 3h ahead Moscow
var timeIn6hAheadUtc1 = eztz.get(6, timeUtc1);            // Returns time of a timezone located 6h ahead GMT
var timeIn6hAheadUtc1 = eztz.get(6);                      // Short way to do the same thing


// Note that value returned by this library is just a local date shifted to match the required timezone
console.log(timeUtc1.getTimezoneOffset() / -60);    // Prints 6 for me, as my local UTC offset is +6.

// Further manipulation may produce unexpected results, for example .getTime() should actually return the same value
console.log(timeInMoscow.getTime());                // Prints '1509138546929'
console.log(timeInAlmaty.getTime());                // Prints '1509149346929'

// However, in practice it does the job, see https://stackoverflow.com/a/11964609/8722066
console.log(timeInSanFrancisco.toLocaleString());   // Prints '2017-10-27 17:09:06'
console.log(timeInAlmaty.toLocaleString());         // Prints '2017-10-28 06:09:06'
console.log(timeInMoscow.toLocaleString());         // Prints '2017-10-28 03:09:06'
console.log(timeInMoscow.toLocaleString('en-US', {  // Prints 'Oct 28, 3:09 AM'
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute:'numeric',
    hour12: true }));
```

## Other
This library was developed by [me](https://twitter.com/HungryCosmos) to power up [my github page](https://hungrycosmos.github.io/)