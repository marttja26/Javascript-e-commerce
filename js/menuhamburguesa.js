$('#hamburgerMenu').click(()=>{
    $('#hamburgerMenu').hide('slow');
    $('#nav, #cross').show('slow');
    $('#nav, #cross').toggleClass('z-index-menu');
    $('.PageOverlay').toggleClass('PageOverlayIsVisible');
    $('#header').toggleClass('z-index');
    $('#cross').addClass('rotate-center');
    setTimeout(()=>{
        $('#cross').removeClass("rotate-center");
    },500);
})

$('#cross').click(()=>{
    $('#nav, #cross').hide('slow');
    $('#nav, #cross').toggleClass('z-index-menu');
    $('#hamburgerMenu').show('slow');
    $('.PageOverlay').toggleClass('PageOverlayIsVisible');
    $('#header').toggleClass('z-index');
    $('#cross').addClass('rotate-center-reverse');
    setTimeout(()=>{
        $('#cross').removeClass("rotate-center-reverse");
    },500);
})

