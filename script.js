/**
 * Created by nicolespence on 11/25/15.
 */
//parallax functionality
$(window).scroll(function(element){
    parallax();
});
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('top',-(scrolled* .2)+'px');
}

//onload
$(document).ready(function(){
    createImages();
    vendorContainers();
});


//DOM creation for bridal images
function createImages(bridalImages) {
    var bridalImages= ["images/AndyKing0312.jpg", "images/AndyKing0319.jpg", "images/AndyKing0326.jpg", "images/AndyKing0312.jpg", "images/AndyKing0319.jpg", "images/AndyKing0326.jpg"];

    for (var i = 0; i <bridalImages.length; i++) {
        var image= $('<img>').addClass('bride').attr('src', bridalImages[i]).html("Bride "+[i]);
        $('.brideContainer').append(image);
    }
    $('img').click(function () {
        $('.modal-body').empty();
        $('#myModal').modal();
        var imgSource = $(this).attr('src');
        var fullImg = $('<img>').attr('src', imgSource).css('width', '100%').css('margin', 'auto', '0');
        $('.modal-body').append(fullImg);

    });
}

function vendorContainers(){
    var nicoleVendors = ["images/accessories.jpg", "images/bridesmaids.jpg", "images/cake.jpg", "images/dress.jpg", "images/floral.jpg", "images/photobooth.jpg", "images/photographer.jpg","images/venue.jpg", "images/videographer.jpg"];

    for(var i=0; i<nicoleVendors.length; i++){
        var vendorDiv = $('<div>').addClass('vendorDiv');
        var vendorImage= $('<img>').attr('src', nicoleVendors[i]).addClass('vendorImage').addClass('front');
        $(vendorDiv).append(vendorImage);
        $('.vendorContainer').append(vendorDiv);
    }
}