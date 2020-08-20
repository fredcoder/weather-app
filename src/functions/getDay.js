const getDay = (dt) => {

    var day = new Date(dt * 1000);

    let monthNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    let formattedDay = monthNames[day.getDay()];

    return formattedDay;
}

export default getDay;