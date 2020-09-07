const getDay = (dt,isShort) => {

    var day = new Date(dt * 1000);

    var DayNames = [];

    if(isShort){
        DayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    }else{
        DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    } 

    let formattedDay = DayNames[day.getDay()];

    return formattedDay;
}

export default getDay;