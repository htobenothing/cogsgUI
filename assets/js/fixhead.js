$(document).ready(function () {
    'use strict'

    var tableOffset = $("#attendTable").offset().top;
    
    var header = $("#attendTable thead").clone();
    var fixedHeader = $("#header-fixed").append(header);

    var tableHeadCell = $("#attendTable thead tr th")
    
    var headerCell = $("#header-fixed thead tr th");
    
    tableHeadCell.each(function(index){
       console.log($(this).width())
        headerCell.eq(index).width($(this).width())
    })
    
    
    

    $(window).bind("scroll", function () {
        var offset = $(this).scrollTop();

        if (offset >= tableOffset && fixedHeader.is(":hidden")) {
            fixedHeader.show();
        } else if (offset < tableOffset) {
            fixedHeader.hide();
        }
    });

//     function moveScroll(){
//     var scroll = $(window).scrollTop();
//     var anchor_top = $("#attendTable").offset().top;
//     var anchor_bottom = $("#header-fixed").offset().top;
//     if (scroll>anchor_top && scroll<anchor_bottom) {
//     clone_table = $("#clone");
//     if(clone_table.length == 0){
//         clone_table = $("#attendTable").clone();
//         clone_table.attr('id', 'clone');
//         clone_table.css({position:'fixed',
//                         'pointer-events': 'none',
//                         top:0});
//         clone_table.width($("#attendTable").width());
//         $("#table-container").append(clone_table);
//         $("#clone").css({visibility:'hidden'});
//         $("#clone thead").css({visibility:'visible'});
//     }
//     } else {
//     $("#clone").remove();
//     }
// }
// $(window).scroll(moveScroll);
})