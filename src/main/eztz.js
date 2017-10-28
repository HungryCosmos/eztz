/**
 * Calculates time in timezone UTC(GMT). The resulting utc object isn't really an UTC date,
 * but a local date shifted to match the UTC time. However, in practice it does the job.
 * See https://stackoverflow.com/a/11964609/8722066
 * This method is left private to simplify it's API for the user.
 * @returns converted {Date} object containing time in UTC.
 * Note that return value is not 100% valid and based on your local timezone.
 * Further manipulation may produce unexpected results, as using .getTimezoneOffset()
 * on return value will return your local timezone offset.
 */
function getUtcDateTime() {
    var now = new Date();
    return getRemoteDateTime(now.getTimezoneOffset() / 60, now);
}

/**
 * Adds specified offset to current UTC time if no 2nd argument provided,
 * Adds the offset to given {@link Date} otherwise.
 * @param offsetInHours optional {number} offset of remote timezone (in hours) relative to
 * GMT (UTC). Any number (int, double) would do just fine, try +6 for Almaty, 3 for Moscow,
 * -7 for San Francisco, 0 for UTC. No quotation mark required.
 * @param baseDateTime optional {@link Date} object. If present, remote date and time
 * will be calculated based on provided baseDateTime. Default to current UTC time
 * (calculated by adding local timezone offset to local time). offsetInHours must be specified
 * to use this parameter.
 * @returns {Date} {@link Date} object storing date and time in remote time zone.
 * Since this is ordinary Javascript {@link Date} object, you can call any default
 * functions as well.
 * Note that return value is not 100% valid and based on your local timezone.
 * Further manipulation may produce unexpected results, as using .getTimezoneOffset()
 * on return value will return your local timezone offset.
 */
function getRemoteDateTime(offsetInHours, baseDateTime) {

    // Time offset of remote time zone in milliseconds
    var remoteTimezoneOffsetMillis = (!!offsetInHours ? offsetInHours : 0) * 60 * 60 * 1000;

    // Basis for addition: provided Date if possible, current UTC time otherwise
    var basis = !!baseDateTime ? baseDateTime : getUtcDateTime();

    // Date and time in remote timezone
    return new Date(basis.getTime() + remoteTimezoneOffsetMillis);
}

/**
 * Returns approximate time difference between two {@link Date} objects measured in hours.
 * Basically it substracts milliseconds of thisDate from milliseconds of thatDate and
 * converts it to hours with given number of decimals (if provided: default to 1 decimal place)
 * @param thisDate minuend, date which is subtracted from
 * @param thatDate subtrahend, date being subtracted
 * @param decimals optional number of decimals after converting milliseconds to hours. Default to 1.
 * @returns {number} with specified number of decimal places representing difference between two
 * {@link Date} objects measured in hours. It is positive when thatDate is bigger than thisDate.
 */
function getTimeDifferenceHours(thisDate, thatDate, decimals) {
    var exactValue = (thisDate.getTime() - thatDate.getTime()) / (1000 * 60 * 60);
    var precision = Math.pow(10, (decimals == null || typeof decimals !== 'number' || decimals < 0) ? 1 : Math.round(decimals));

    return Math.round(exactValue * precision + Number.EPSILON) / precision;
}


module.exports = {
    get: getRemoteDateTime,
    diff: getTimeDifferenceHours
};