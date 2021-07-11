var currentDate = new Date();


$(document).ready(function(){
    createCaneldar();
});

function getCalendar(yyyymm){
    var result = [] ; 
    if ( yyyymm != undefined && yyyymm != null ) {
        var d = new Date(yyyymm.substr(0,4),Number(yyyymm.substr(4,2)) - 1);
        
        var currentMonth = d.getMonth();

        while ( d.getDay() != 0 ) {
            d.setDate(d.getDate() - 1)
        }

        var len = 35 ; 

        var temp = new Date(d);
        for ( var i = 0 ; i < 36 ; i ++ ) {
            temp.setDate(temp.getDate() + 1)
        }

        if ( temp.getMonth() == currentMonth ) {
            len = 45 ; 
        }

        for ( var i = 0 ; i < len ; i ++ ) {
            var yyyy = d.getFullYear();
            var mm = d.getMonth() + 1 ;
            var dd = d.getDate() ; 
            var day = d.getDay();

            var obj = {
                d: new Date(d),
                yyyy:yyyy,
                mm:mm,
                dd:dd,
                day:day 
            }

            result.push(obj);
            d.setDate(d.getDate() + 1)
        }

        console.log(d.getMonth());
    }
    return result ; 
}

function today(){
    currentDate = new Date();
    createCaneldar();
}

function back(){
    currentDate.setMonth(currentDate.getMonth()-1);
    createCaneldar();
}

function next(){
    currentDate.setMonth(currentDate.getMonth()+1);
    createCaneldar();
}

function makeCalendarTd(obj){
    var dd = obj.dd ; 
    var day = obj.day ; 

    var current = new Date();

    var td = $('<td></td>')
    td.css("text-align","center")
    td.css("width","14%")
    td.css('border','1px solid white')
    td.css("border-radius",'10px')
    
    if ( day == 0 ){
        td.addClass('sunday-text')
    } else if ( day == 6 ){
        td.addClass('saturday-text')
    }

    if ( currentDate.getMonth() != obj.d.getMonth() ){
        td.addClass('calendar-prev')
    }

    td.addClass('calendar-td')

    td.append(dd)

    return td ; 
}

function createCaneldar (){
    var yyyy = '' + currentDate.getFullYear();
    var mm = '' + ( 
        currentDate.getMonth() + 1 >= 10 ? 
        '' + ( currentDate.getMonth() + 1 ) : 
        '0' + ( currentDate.getMonth() + 1 )
    ) ;

    $('.yyyy').html(yyyy);
    $('.mm').html(mm);


    var list = getCalendar( yyyy + mm );
    
    $('.calendar-row').remove();
    $('.calendar-empty').remove();

    var target = $('#calendar') ;
    
    for ( var i = 0 ; i < list.length / 7 ; i ++ ) {
        var tr = $('<tr></tr>')
        tr.addClass('calendar-row')

        for ( var j = 0 ; j < 7 ; j ++ ) {
            var obj = list[7*i+j];
            var td = makeCalendarTd(obj)

            tr.append(td);
        }

        target.append(tr);
    }

    target.append('<tr class="calendar-empty" style="height:10px"><td colspan="7"></td></tr>')
    
}