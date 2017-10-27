/**
 * Basically this function adds the offset to current GMT (UTC) time. It means
 * you can easily get date and time in any timezone, even in incorrect one.
 * @param offsetInHours offset of remote timezone (in hours) relative to GMT (UTC).
 * Any number (int, double) would do just fine, try +6 for Almaty, 3 for Moscow,
 * -7 for San Francisco. No quotations required.
 * @returns {Date} {@link Date} object storing date and time in remote time zone.
 * Since this is ordinary Javascript {@link Date} object, you can call any default
 * functions as well.
 */
function getRemoteDateTime(offsetInHours) {

    // Date and time in current location
    var localDateTime = new Date();

    // Zone offset of current location. Note: return time is negated and measured in minutes, eg it's -360 for UTC+6 (Almaty, Kazakhstan)
    var localTimezoneOffsetMinutes = localDateTime.getTimezoneOffset();

    // Same thing in milliseconds
    var localTimezoneOffsetMillis = localTimezoneOffsetMinutes * 60 * 1000;

    // Local time in milliseconds
    var localMillis = localDateTime.getTime();

    // UTC time in milliseconds
    var utcMillis = localMillis + localTimezoneOffsetMillis;

    // Time offset of remote time zone in milliseconds
    var remoteTimezoneOffsetMillis = offsetInHours * 60 * 60 * 1000;

    // Date and time in remote timezone
    return new Date(utcMillis + remoteTimezoneOffsetMillis);
}

/**
 * Usage:
 *     var eztz = require('eztz');
 *
 *     var timeAlmaty = eztz.get(+6);          // Javascript Date object containing time of Almaty (GMT +6)
 *     var timeMoscow = eztz.get(3);           // Javascript Date object containing time of Moscow (GMT +3)
 *     var timeSanFrancisco = eztz.get(-7);    // Javascript Date object containing time of San Francisco (GMT -7)
 *     var timeJustForLulz = eztz.get(+28);    // Obviously there is no timezone with such offset, but it still works (GMT +28)
 */
module.exports = {
    get: getRemoteDateTime
};