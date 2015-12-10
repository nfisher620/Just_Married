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
    //floralModal();
    buildGallery();
    createImages();
});


//DOM creation for bridal images
function buildGallery(){
    var gallery= [
        {
            src: "images/accessories.jpg",
            text: "Accessories"

        },
        {
            src: "images/makeup.jpg",
            text: "Hair and Make-Up"
        },
        {
            src: "images/cake.jpg",
            text: "Cake"
        },
        {
            src: "images/dress.jpg",
            text: "Attire"
        },
        {
            src: "images/floralVase.jpg",
            text: "Flowers"
        },
        {
            src: "images/photobooth.jpg",
            text: "Extras"
        },
        {
            src: "images/photographer.jpg",
            text: "Photography"
        },
        {
            src: "images/venue.jpg",
            text: "Venue"
        },
        {
            src: "images/videographer.jpg",
            text: "Videography"
        }
    ];
    var container = $('.vendorContainer');

    for(var i=0; i<gallery.length; i++){

        var imgContainer = $("<div>", {
            class: 'img-container',
            id: 'img-' + i
        });

        var img = $("<img>", {
            src: gallery[i].src,
            class: 'gallery-img'
        });

        var cover = $("<div>", {
            class: 'text-cover'
        });

        var text = $("<div>", {
            text: gallery[i].text,
            class: 'text'
        });

        cover.append(text).hide();

        imgContainer.append(img,cover).appendTo(container);

        (function(){
            var divId = '#img-' + i;
            var thisCover = cover;

            container.on("mouseenter", divId, function(){
                thisCover.fadeIn(500);
                thisCover.css({
                    margin: '76px -5px -42px 43px',
                    width: '20.5vw',
                    height: '28.7vh',
                    'max-width': '100%',
                    'max-height': '100%'
                });
            }).on("mouseleave", divId, function(){
                thisCover.fadeOut(500);
            });
        })();
    }
}

// DOM creation for bridal images under Featured Brides
function createImages() {
    var bridalImages = [
        {
            src: "images/AndyKing0312.jpg",
            text: "Nicole Fisher"

        },
        {
            src: "images/AndyKing0319.jpg",
            text: "Chermaine Zimmerman"
        },
        {
            src: "images/AndyKing0326.jpg",
            text: "Rosanna Spence"
        }
        ];
    for (var i = 0; i < bridalImages.length; i++) {
        var image = $('<img>', {
            class: 'bride',
            src: bridalImages[i].src
        });
        image.attr('index', i);
        $('.brideContainer').append(image);
        console.log(image);
        console.log(bridalImages[i].text);
    }
    // Opens modal under Featured Brides
    $('.bride').click(function () {
        $('.modal-body').empty();
        $('#myModal').modal();
        var title = $('<h2>', {
                   text: bridalImages[$(this).attr('index')].text,
                   class: 'modal-title'
               });
            var imgSource = $(this).attr('src');
            var fullImg = $('<img>').attr('src', imgSource).css('width', '100%').css('margin', 'auto', '0');
            $('.modal-body').append(fullImg);
            $('.modal-title').html(title);
            //console.log(bridalImages[i].text);

    });
    console.log("moooooooo");
    $('.text-cover').click(function () {
        //$('.modal-body').empty();
        console.log('I can has working now?');
        get_vendor_images(5); //TODO: NO MAGIC NUMBERS RAWWWRR
    });

}
function get_vendor_images(vendor_id){
    $.ajax({
        url:'http://localhost:8888/lfz/Just-Married/get_images.php',
        dataType: 'json',
        method: 'post',
        data: {vendor: vendor_id},
        success: function(response) {
            if(!response.success){
                return;
            }
            console.log('it dun worked', response.images);
            $('#imagemodal').modal();
            //var imgSource = $(this).attr('src');
            //var fullImg = $('<img>').attr('src', imgSource).css('width', '100%').css('margin', 'auto', '0');
            //$('.modal-body').append(fullImg);
            //console.log('text cover working');
            make_carousel_photos(response.images, '#imagemodal');
        },
        error: function(){
            console.log('something dun fucked up');
        }
    });
}

function make_carousel_photos(photo_array, carousel_id){
    photo_container=[];
    photo_indicator=[];
    for(var i=0; i<photo_array.length;i++){
        $div = $("<div>",{
            class:"item"
        });
        $span = $("<span>",{
            text: photo_array[i].caption,
            class: 'white-text'
        });
        $photo = $("<img>",{
            src: 'images/'+ photo_array[i].file,
            alt: photo_array[i].caption
        });
        $div.append($photo,$span);
        $indicator = $("<li>",{
            'data-target': carousel_id,
            'data-slide-to':i
        });
        $title = $("<h4>", {
            text: photo_array[i].title,
            class: 'modal-title'
        });
        $link = $("<a>",{
            href: 'www.lisahadleystudios.com',
            class:'hoverButton',
        });
        $button = $('button'),
        photo_container.push($div);
        photo_indicator.push($indicator);
    }
    console.log(photo_container[0]);
    photo_container[0].addClass('active');
    photo_indicator[0].addClass('active');
    $('.modal-title').append($title);
    $('button')

    $(carousel_id).find('.carousel-indicators').empty().append(photo_indicator);
    $(carousel_id).find('.carousel-inner').empty().append(photo_container);

}

$('.img-container').on('click','.text-cover');
$('.text-cover').on('click', function(){
        console.log('onclick working');
    });


//function floralModal(){
//   var floralGallery = ['images/floral.jpg', 'images/aisle.jpg', 'images/aisle1.jpg','images/aisle2.jpg', 'images/floral1.jpg']
//   for(var i=0; i<floralGallery.length; i++){
//       var floralImg = $('<img>').attr('src', floralGallery[i]);
//
//    }
//}

//$('.img-container').click(function () {
//    //('.modal-body').empty();
//    //$('#imagemodal').modal();
//    //var imgSource = $(this).attr('src');
//    //var fullImg = $('<img>').attr('src', imgSource).css('width', '100%').css('margin', 'auto', '0');
//    //$('.modal-body').append(fullImg);
//    console.log('text cover working');
//});


// Flip bridal party card
$('#f1_card').click(function() {
    $('#f1_card').addClass('shadow')
    var frontFace = $('<div>').addClass('front').addClass('face');
    var backFace = $('<div>').addClass('back').addClass('face').addClass('center');
    $('#f1_card').append(frontFace);
    $('#f1_card').append(backFace);
});
$('.hover').mouseover(function() {
    $('.text').css("visibility","visible");
});

$('.hover').mouseout(function() {
    $('.text').css("visibility","hidden");
});


//function floralModal(){
//    var floralGallery = ['images/floral', 'images/aisle.jpg', 'images/aisle1.jpg','images/aisle2.jpg', 'images/floral1.jpg']
//    for(var i=0; i<floralGallery.length; i++){
//        var vendorDiv = $('<div>').addClass('vendorDiv');
//        var vendorTitle = $('<span>').addClass('text-content');
//        var vendorTitleContainer = $('<span>').text(vendorNames[i]);
//        var vendorImage= $('<img>').attr('src', nicoleVendors[i]).addClass('vendorImage');
//        $(vendorTitle).append(vendorTitleContainer);
//        $(vendorDiv).append(vendorImage).append(vendorTitle);
//        //$('.vendorTitle').append(vendorDiv);
//        $('.vendorContainer').append(vendorDiv);
//    }
//}