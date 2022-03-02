// searchbtn 
$('#btn-open-search').click(()=> {
    $('#search-container').slideToggle('slow');
    $('#search-container').toggleClass('z-index-search');
    $('.PageOverlay').toggleClass('PageOverlayIsVisible');
    $('#header').toggleClass('z-index');
})
$('#btn-close-search').click(()=> {
    $('#search-container').slideToggle('slow');
    $('#search-container').toggleClass('z-index-search');
    $('.PageOverlay').toggleClass('PageOverlayIsVisible');
    $('#header').removeClass('z-index')
})

$("#search").on('input', (e)=> {
    const valor = e.target.value.toLowerCase()
    document.querySelectorAll('.card').forEach((card)=> {
        nombre = card.getAttribute('nombre')
        marca = card.getAttribute('marca');
        categoria = card.getAttribute('categoria');
        isVisible = categoria.toLowerCase().includes(valor) || marca.toLowerCase().includes(valor) || nombre.toLowerCase().includes(valor)
        card.classList.toggle("hide", !isVisible)
    })
})
