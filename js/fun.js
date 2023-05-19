var fun = function() {
    $('.qc-heading').click(function () {
        $(this).parent().find('.qc-description').toggle('slow');
        $(this).toggleClass('qc-active');
    });

    $('.gpc-heading').click(function (){
        if($('.gpc-heading').parent().find('.gpc-heading').hasClass("qpc-active")){
            $('.gpc-heading').parent().find('.gpc-heading').removeClass("qpc-active")
            $('.gpc-description').hide("slow");
            $(this).parent().find('.gpc-description').toggle('slow');
            $(this).toggleClass('qpc-active');
        } else {
            $(this).parent().find('.gpc-description').toggle('slow');
            $(this).toggleClass('qpc-active');
        }
    });

    $('.select-dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.select-dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.select-dropdown .dropdown-menu li').click(function () {
        $(this).parents('.select-dropdown').find('span').text($(this).text());
        $(this).parents('.select-dropdown').find('input').attr('value', $(this).attr('value'));
        $(this).parents('.select-dropdown').find('input').attr('data-name', $(this).text());
    });

    $('.section-five .dropdown-menu li').click(function(){
        let tab = $(this).attr('data-tab');
        $('.tabs').fadeOut();
        setTimeout(function(){
            $('.'+tab).fadeIn();
        },400);
        //console.log(tab);
    });

    $('a.navbtn-link').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top + 'px'
        }, {
            duration: 1000,
            easing: 'swing',
        });
        return false
    });

    $('.arrow-yakor a').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top + 'px'
        }, {
            duration: 1000,
            easing: 'swing',
        });
        return false
    });
};



$(document).ready(fun);



// $('.qc-heading').click(function (){
//     if($('.qc-heading').parent().find('.qc-heading').hasClass("qc-active")){
//         $('.qc-heading').parent().find('.qc-heading').removeClass("qc-active")
//         $('.qc-description').hide("slow");
//         $(this).parent().find('.qc-description').toggle('slow');
//         $(this).toggleClass('qc-active');
//     } else {
//         $(this).parent().find('.qc-description').toggle('slow');
//         $(this).toggleClass('qc-active');
//     }
// });
