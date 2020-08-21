const getDay = (dt,isShort) => {

    var day = new Date(dt * 1000);

    var monthNames = [];

    if(isShort){
        monthNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    }else{
        monthNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    } 

    let formattedDay = monthNames[day.getDay()];

    return formattedDay;
}

export default getDay;