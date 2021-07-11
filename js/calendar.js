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
            len = 42 ; 
        }

        for ( var i = 0 ; i < len ; i ++ ) {
            var yyyy = d.getFullYear();
            var mm = numChangeStr2 ( d.getMonth() + 1 ) ;
            var dd = numChangeStr2 ( d.getDate() ) ; 
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

function clickCalendarTd(obj,e){
    
    // e.preventDefault()
    e.stopPropagation()
    $('#addScheduleDiv').css("display","block")
    console.log(obj.yyyy + '/' + obj.mm + '/' + obj.dd);

    var target = $('#calendar-'+obj.yyyy+''+obj.mm+''+obj.dd);
    var position = target.position();

    var top = position.top;
    var left = 0 ; 
    
    if ( Number(target.attr("day")) <= 1 ){
        left = target.width() + position.left ; 
    } else {
        left = position.left - 200 ; 
    }

    $('#addScheduleDiv').css("left",left).css("top",top);
}

function makeCalendarTd(obj){
    
    try {
        var dd = obj.dd ;     
    } catch (error) {
        console.log(obj);
        console.log(error);
    }
    var dd = obj.dd ; 
    var day = obj.day ; 

    var current = new Date();

    var td = $('<td></td>')
    
    td.attr("id","calendar-"+obj.yyyy + '' + obj.mm + '' + obj.dd);
    td.attr("yyyy",obj.yyyy);
    td.attr("mm",obj.mm);
    td.attr("dd",obj.dd);
    td.attr("day",obj.day);

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

    td.on('click',function(e){
        clickCalendarTd(obj,e)
    })

    td.append(dd)

    return td ; 
}

function createCaneldar (){
    var yyyy = '' + currentDate.getFullYear();
    var mm = numChangeStr2 ( currentDate.getMonth() + 1 ) ;

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
            if (obj != undefined ) {
                var td = makeCalendarTd(obj)

                tr.append(td);
            }
        }

        target.append(tr);
    }

    target.append('<tr class="calendar-empty" style="height:10px"><td colspan="7"></td></tr>')
    
}

function clearModal(){
    console.log("clearModal")
    $('#addScheduleDiv').css("display","none")
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

function numChangeStr2(input){
    var result = '' ; 
    if ( Number(input) < 10 ) {
        result = '0' + input ; 
    } else {
        result = input ; 
    }
    return result ; 
}