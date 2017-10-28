import {expect} from 'chai';
import eztz from '../main/eztz';

describe('eztz', function () {

    let TEST_VALUE = -2.5;

    describe('diff', function () {

        it('should calculate correct time difference between two dates (measured in hours) with 1 decimal place by default (without third argument)', function () {
            let timeMoscow = eztz.get(+3);
            let timeIndia = eztz.get(+5.5);

            expect(eztz.diff(timeMoscow, timeIndia)).to.equal(-2.5); // Moscow is 2.5h behind India
        });

        it('should calculate incorrect time difference between two dates (measured in hours) with 0 decimal place as third argument', function () {
            let timeMoscow = eztz.get(+3);
            let timeIndia = eztz.get(+5.5);

            expect(eztz.diff(timeMoscow, timeIndia, 0)).to.equal(-2); // Moscow is actually 2.5h behind India
        });

        it('should calculate correct time difference between two dates (measured in hours) with 2 decimal places as third argument', function () {

            // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
            let localTime = new Date();
            let localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

            // some unusual timezone time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
            let unusualTimezoneUtcOffsetHours = -5.62;
            let timeUnusualTz = eztz.get(unusualTimezoneUtcOffsetHours);

            // manually calculating approximate difference
            let exactDiff = localUtcOffsetHours - unusualTimezoneUtcOffsetHours;
            let approximateDiff = Math.round(exactDiff * 100) / 100;

            expect(eztz.diff(localTime, timeUnusualTz, 2)).to.equal(approximateDiff);
        });

        it('should calculate incorrect time difference between two dates (measured in hours) without 2 decimal places as third argument', function () {

            // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
            let localTime = new Date();
            let localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

            // some unusual timezone time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
            let unusualTimezoneUtcOffsetHours = -5.62;
            let timeUnusualTz = eztz.get(unusualTimezoneUtcOffsetHours);

            // manually calculating exact difference
            let hoursDiff = localUtcOffsetHours - unusualTimezoneUtcOffsetHours;

            // using built-in rounding with very cool eztz way
            let eztzDiff = eztz.diff(localTime, timeUnusualTz);

            // difference between two solutions
            let exactDiff = hoursDiff - eztzDiff;

            // using rounding specially <3 js
            let approximateDiff = Math.round(exactDiff * 100) / 100;

            expect(approximateDiff).to.equal(0.02);
        });
    });


    describe('get', function () {
        it('should get current time in UTC without any arguments', function () {
            // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
            let localTime = new Date();
            let localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

            // utc time
            let utcTime = eztz.get();

            expect(eztz.diff(localTime, utcTime)).to.equal(localUtcOffsetHours);
        });

        it('should get current time in UTC with 0h offset', function () {
            // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
            let localTime = new Date();
            let localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

            // utc time
            let utcTime = eztz.get(0);

            expect(eztz.diff(localTime, utcTime)).to.equal(localUtcOffsetHours);
        });

        it('should get time in target timezone relative to UTC without second argument', function () {

            // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
            let localTime = new Date();
            let localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

            // zone time and offset relative to utc, it means target zone 2.5h behund utc
            let zoneUtcOffsetHours = TEST_VALUE;
            let zoneTime = eztz.get(zoneUtcOffsetHours);

            // calculated difference between local and zoned time
            let diffHours = eztz.diff(localTime, zoneTime);

            // expecting calculated difference to equal preset
            expect(diffHours).to.equal(localUtcOffsetHours - zoneUtcOffsetHours);
        });

        it('should get time in target timezone relative to UTC as second argument', function () {

            // local time and offset relative to utc, as this zone is UTC+localUtcOffsetHours
            let localTime = new Date();
            let localUtcOffsetHours = localTime.getTimezoneOffset() / -60;

            // utc time
            let utcTime = eztz.get(0);

            // zone time and offset relative to utc, it means target zone 2.5h behund utc
            let zoneUtcOffsetHours = TEST_VALUE;
            let zoneTime = eztz.get(zoneUtcOffsetHours, utcTime);

            // calculated difference between local and zoned time
            let diffHours = eztz.diff(localTime, zoneTime);

            // expecting calculated difference to equal preset
            expect(diffHours).to.equal(localUtcOffsetHours - zoneUtcOffsetHours);
        });

        it('should get time in target timezone relative to local timezone as second argument', function () {

            // local time
            let localTime = new Date();

            // zone time and offset relative to local zone, it means target zone 2.5h behund local zone
            let zoneOffsetHours = TEST_VALUE;
            let zoneTime = eztz.get(zoneOffsetHours, localTime);

            // calculated difference between local and zoned time
            let diffHours = eztz.diff(localTime, zoneTime);

            // expecting calculated difference to equal preset
            expect(diffHours).to.equal(-zoneOffsetHours);
        });

        it('should get time in target timezone relative to any timezone as second argument', function () {

            // first timezone time relative to UTC, it means first zone 2.5h behind UTC
            let firstTzOffsetHours = -TEST_VALUE;
            let firstTzTime = eztz.get(-firstTzOffsetHours);

            // second timezone time and offset relative to first zone, it means second zone 5h behind UTC
            let secondTzOffsetHours = TEST_VALUE;
            let secondTzTime = eztz.get(secondTzOffsetHours, firstTzTime);

            // calculated difference between local and zoned time
            let diffHours = eztz.diff(firstTzTime, secondTzTime);

            // expecting calculated difference to equal preset
            expect(diffHours).to.equal(-secondTzOffsetHours);
        });
    });
});