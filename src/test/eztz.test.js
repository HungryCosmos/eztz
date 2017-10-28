var expect = require('chai').expect;
var eztz = require('../main/eztz');

describe('eztz', function () {

    var testValue = -2.5;

    it('diff: should calculate correct time difference between two dates (measured in hours) with 1 decimal place by default (without third argument)', function () {
        var timeMoscow = eztz.get(+3);
        var timeIndia = eztz.get(+5.5);

        expect(eztz.diff(timeMoscow, timeIndia)).to.equal(-2.5); // Moscow is 2.5h behind India
    });

    it('diff: should calculate incorrect time difference between two dates (measured in hours) with 0 decimal place as third argument', function () {
        var timeMoscow = eztz.get(+3);
        var timeIndia = eztz.get(+5.5);

        expect(eztz.diff(timeMoscow, timeIndia, 0)).to.equal(-2); // Moscow is actually 2.5h behind India
    });

    it('diff: should calculate correct time difference between two dates (measured in hours) with 2 decimal places as third argument', function () {

        // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
        var localTime = new Date();
        var localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

        // some unusual timezone time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
        var unusualTimezoneUtcOffsetHours = -5.62;
        var timeUnusualTz = eztz.get(unusualTimezoneUtcOffsetHours);

        // manually calculating approximate difference
        var exactDiff = localUtcOffsetHours - unusualTimezoneUtcOffsetHours;
        var approximateDiff = Math.round(exactDiff * 100) / 100;

        expect(eztz.diff(localTime, timeUnusualTz, 2)).to.equal(approximateDiff);
    });

    it('diff: should calculate incorrect time difference between two dates (measured in hours) without 2 decimal places as third argument', function () {

        // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
        var localTime = new Date();
        var localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

        // some unusual timezone time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
        var unusualTimezoneUtcOffsetHours = -5.62;
        var timeUnusualTz = eztz.get(unusualTimezoneUtcOffsetHours);

        // manually calculating exact difference
        var hoursDiff = localUtcOffsetHours - unusualTimezoneUtcOffsetHours;

        // using built-in rounding with very cool eztz way
        var eztzDiff = eztz.diff(localTime, timeUnusualTz);

        // difference between two solutions
        var exactDiff = hoursDiff - eztzDiff;

        // using rounding specially <3 js
        var approximateDiff = Math.round(exactDiff * 100) / 100;

        expect(approximateDiff).to.equal(0.02);
    });

    it('get: should get current time in UTC without any arguments', function () {
        // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
        var localTime = new Date();
        var localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

        // utc time
        var utcTime = eztz.get();

        expect(eztz.diff(localTime, utcTime)).to.equal(localUtcOffsetHours);
    });

    it('get: should get current time in UTC with 0h offset', function () {
        // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
        var localTime = new Date();
        var localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

        // utc time
        var utcTime = eztz.get(0);

        expect(eztz.diff(localTime, utcTime)).to.equal(localUtcOffsetHours);
    });
    
    it('get: should get time in target timezone relative to UTC without second argument', function () {

        // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
        var localTime = new Date();
        var localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

        // zone time and offset relative to utc, it means target zone 2.5h behund utc
        var zoneUtcOffsetHours = testValue;
        var zoneTime = eztz.get(zoneUtcOffsetHours);

        // calculated difference between local and zoned time
        var diffHours = eztz.diff(localTime, zoneTime);

        // expecting calculated difference to equal preset
        expect(diffHours).to.equal(localUtcOffsetHours - zoneUtcOffsetHours);
    });

    it('get: should get time in target timezone relative to UTC as second argument', function () {

        // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
        var localTime = new Date();
        var localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

        // utc time
        var utcTime = eztz.get(0);

        // zone time and offset relative to utc, it means target zone 2.5h behund utc
        var zoneUtcOffsetHours = testValue;
        var zoneTime = eztz.get(zoneUtcOffsetHours, utcTime);

        // calculated difference between local and zoned time
        var diffHours = eztz.diff(localTime, zoneTime);

        // expecting calculated difference to equal preset
        expect(diffHours).to.equal(localUtcOffsetHours - zoneUtcOffsetHours);
    });

    it('get: should get time in target timezone relative to local timezone as second argument', function () {

        // local time
        var localTime = new Date();

        // zone time and offset relative to local zone, it means target zone 2.5h behund local zone
        var zoneOffsetHours = testValue;
        var zoneTime = eztz.get(zoneOffsetHours, localTime);

        // calculated difference between local and zoned time
        var diffHours = eztz.diff(localTime, zoneTime);

        // expecting calculated difference to equal preset
        expect(diffHours).to.equal(-zoneOffsetHours);
    });

    it('get: should get time in target timezone relative to any timezone as second argument', function () {

        // first timezone time relative to UTC, it means first zone 2.5h behind UTC
        var firstTzOffsetHours = -testValue;
        var firstTzTime = eztz.get(-firstTzOffsetHours);

        // second timezone time and offset relative to first zone, it means second zone 5h behind UTC
        var secondTzOffsetHours = testValue;
        var secondTzTime = eztz.get(secondTzOffsetHours, firstTzTime);

        // calculated difference between local and zoned time
        var diffHours = eztz.diff(firstTzTime, secondTzTime);

        // expecting calculated difference to equal preset
        expect(diffHours).to.equal(-secondTzOffsetHours);
    });
});