//parallax functionality
//$(window).scroll(function(element){
//    parallax();
//});
//function parallax(){
//    var scrolled = $(window).scrollTop();
//    $('.bg').css('top',-(scrolled* .2)+'px');
//}

//onload functions
$(document).ready(function(){
    //floralModal();
    buildGallery();
    createImages();
    vendorListCreator();
    createVendorIcons();
});

//DOM creation for vendor images for bridal pages
function buildGallery(){
    var gallery= [
        {
            src: "images/vendorIcons/accessories2.jpg",
            text: "Accessories",
            vendor_id: 1

        },
        {
            src: "images/vendorIcons/makeup2.jpg",
            text: "Hair and Make-Up",
            vendor_id: 2
        },
        {
            src: "images/vendorIcons/cake2.jpg",
            text: "Cake",
            vendor_id: 3
        },
        {
            src: "images/vendorIcons/attire2.jpg",
            text: "Attire",
            vendor_id: 4
        },
        {
            src: "images/vendorIcons/floralVase2.jpg",
            text: "Flowers",
            vendor_id: 5
        },
        {
            src: "images/vendorIcons/photobooth2.jpg",
            text: "Entertainment",
            vendor_id: 6
        },
        {
            src: "images/vendorIcons/photographer2.jpg",
            text: "Photography",
            vendor_id: 7
        },
        {
            src: "images/vendorIcons/venue2.jpg",
            text: "Venue",
            vendor_id: 9
        },
        {
            src: "images/vendorIcons/videography2.jpg",
            text: "Videography",
            vendor_id: 10
        },
        {
            src: "images/vendorIcons/food2.jpg",
            text: "Food and Drink",
            vendor_id: 8
        },
        {
            src: "images/vendorIcons/personaltouch2.jpg",
            text: "Personal Touches",
            vendor_id: 11
        },
        {
            src: "images/vendorIcons/transportation2.jpg",
            text: "Transportation",
            vendor_id: 12
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
            class: 'text-cover',
            id:gallery[i].vendor_id
        });
        var text = $("<div>", {
            text: gallery[i].text,
            class: 'text',
        });

        cover.append(text);
        imgContainer.append(img,cover).appendTo(container);
        console.log(gallery[i].vendor_id);

        /*(function(){
            var divId = '#img-' + i;
            var thisCover = cover;
            //hover for category names
            container.on("mouseenter", divId, function(){
                thisCover.fadeIn(200);
                thisCover.css({
                    margin: '76px -5px -42px 43px',
                    width: '20.5vw',
                    height: '28.7vh',
                    'max-width': '100%',
                    'max-height': '100%'
                });
            }).on("mouseleave", divId, function(){
                thisCover.fadeOut(200);
            });
        })();
        */
    }
}

// DOM creation for bridal images under Featured Brides
function createImages() {
    var bridalImages = [
        {
            src: "images/AndyKing0312.jpg",
            text: "Nicole Fisher"

        },
        //{
        //    src: "images/AndyKing0319.jpg",
        //    text: "Chermaine Zimmerman"
        //},
        //{
        //    src: "images/AndyKing0326.jpg",
        //    text: "Rosanna Spence"
        //}
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

    });
    //Opens modal for vendor for category selected
    $('.text-cover').click(function () {
        //$('.modal-body').empty();
        var vendorId = this.id;
        console.log(this.id);
        getVendorImages(vendorId);
    });

}//Ajax call to just_married database in phpAdmin
function getVendorImages(vendor_id){
    $.ajax({
        url:'http://localhost:8888/lfz/Just-Married/get_images.php',
        dataType: 'json',
        method: 'post',
        data: {vendor: vendor_id},
        success: function(response) {
            if(!response.success){
                return;
            }
            console.log('Ajax success', response.images);
            $('#imagemodal').modal();
            makeCarouselPhotos(response.images, '#imagemodal');
        },
        error: function(){
            console.log('Modal for vendors did not work');
        }
    });
}
// Creates carousel for vendor modals
function makeCarouselPhotos(photo_array, carousel_id){
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
            href: photo_array[i].url,
            //class:'hoverButton',
        });
        $button = $('button'),
        photo_container.push($div);
        photo_indicator.push($indicator);
    }
    console.log(photo_container[0]);
    photo_container[0].addClass('active');
    photo_indicator[0].addClass('active');
    $('.modal-title').empty().append($title);
    $('button').append($link);
    $('modal-footer').append($button);

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

function vendorListCreator(){
    var vendorList= [
        {
            title: "David's Bridal",
            url: "http://www.davidsbridal.com"
        },
        {
            title: "Beach Bridal Beauty",
            url: "http://www.beachbridalbeauty.com"
        },
        {
            title: "Andy King Photography",
            url: "http://www.andykingphotography.com"
        },
        {
            title: "It's All About the Cake",
            url: "http://www.itsallaboutthecake.com"
        },
        {
            title: "Florals by Jenny",
            url: "http://www.floralsbyjenny.com"
        },
        {
            title: "Talega Golf Club",
            url: "http://www.talegagolfclub"
        },
        {
            title: "Lisa Hadley Studios",
            url: "http://www.lisahadleystudios.com"
        },
        {
            title: "Chunk-N-Chip",
            url: "http://www.chunknchip.com"
        },
        {
            title: "Lake Forest Limousine",
            url: "http://www.lakeforestlimos.com/"
        },
        {
            title: "Etsy",
            url: "http://www.etsy.com"
        },
        {
            title: "Pro Frame Photobooth",
            url:"http://proframephotobooths.com/"
        }
];

    for(var i = 0; i<vendorList.length; i++){
        var vendorName = $('<h2>', {
            text: vendorList[i].title,
            class: 'vendorTitle'

        });
        var url = $('<a>',{
            href: vendorList[i].url,
            class: 'vendorUrlLogo'
            });
        $(url).append(vendorName);
        $('.back').append(url);
    }
var vendorFrontCardTitle = $('<h2>', {
        text:"The Vendors",
        class: 'vendorList'
});
$('.front').append(vendorFrontCardTitle);
}

function createVendorIcons(){
    var vendorIcons = [
        {
            src: "images/vendorLogos/andykinglogo.jpg",
            url: "http://www.andykingphotography.com"
        },
        {
            src: "images/vendorLogos/beachlogo.png",
            url: "http://www.beachbridalbeauty.com"
        },
        {
            src: "images/vendorLogos/cakelogo.gif",
            url: "http://www.itsallaboutthecake.com"
        },
        {
            src: "images/vendorLogos/chunknchiplogo.png",
            url: "http://www.chunknchip.com"
        },
        {
            src: "images/vendorLogos/davidsbridallogo.gif",
            url: "http://www.davidsbridal.com"
        },
        {
            src: "images/vendorLogos/etsylogo.png",
            url: "http://www.etsy.com"
        },
        {
            src: "images/vendorLogos/florallogo.jpg",
            url: "http://www.floralsbyjenny.com"
        },
        {
            src: "images/vendorLogos/limologo.jpg",
            url: "http://www.lakeforestlimos.com/"
        },
        {
            src: "images/vendorLogos/lisahadleylogo.jpg",
            url: "http://www.lisahadleystudios.com"
        },
        {
            src: "images/vendorLogos/talegalogo.gif",
            url: "http://www.talegagolfclub.com"
        },
        {
            src: "images/vendorLogos/wearhouselogo.jpeg",
            url: "http://www.menswearhouse.com"
        },
        {
            src: "images/vendorLogos/photoboothlogo.jpg",
            url: "http://proframephotobooths.com/"
        }
    ]
    for(var i = 0; i < vendorIcons.length; i++){
        var vendorDiv = $('<div>', {
            class: 'vendorLogoDiv'
        });
        var vendorIcon = $('<img>',{
            src: vendorIcons[i].src,
            class: 'vendorLogo'
        });
        var link = $('<a>', {
            href: vendorIcons[i].url,
        });
        $(link).append(vendorIcon);
        $(vendorDiv).append(link);
        $('.f2_container').append(vendorDiv);
    }
}

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