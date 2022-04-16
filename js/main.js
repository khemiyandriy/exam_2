"use strict";
$(document).ready(function(){
    $('.header__slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
    });
  });

  $(document).ready(function(){
      $('.news__slider').slick({
          dots: true,
          slidesToShow: 3,
          speed:1000,
          autoplay:true,
          autoplaySpeed:3000,
          responsive:[
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                }},{
                 breakpoint: 1200,
                settings: {
                    arrows: false,
                }    
                }
        ]
      });
  });


  function slowScroll(id){
      let offset = 0;
      $('html, body').animate({
          scrollTop: $(id).offset().top - offset
      }, 1000);
      return false;
  }

  function showMore(clas){
      document.querySelector(`${clas}`).classList.toggle('active')
  }

  const form = document.querySelector('#form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      let  formData = new FormData(form);


      if (error === 0) {
           let response = await fetch('sendmail.php', {
               method: 'POST',
               body: formData
           });
           if(response.ok) {
               let rezult = await response.json();
               alert(rezult.message);
               form.reset();
           } else{
                alert('Помилка відправки форми');
           }
      } else {
          alert('Заповніть поля форми');
      }

  }

  function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let index = 0; index<formReq.length; index++) {
          const input = formReq[index];

          formRemoveError(input);
          
          if (input.value === '') {
              formAddError(input);
              error++;
          }
      }
      return error;
  }
  function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

window.addEventListener('scroll', animScroll)

function animScroll() {
    let top = scrollY;
    if(top >  800){
       document.querySelector('.project__img_trade').classList.add("trade_moow");
    }
    if(top >  1500){
        document.querySelector('.project__img_commerc').classList.add("commerc_moow")
     }
}

function initMap() {
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    const styledMapType = new google.maps.StyledMapType(
      [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ],
      
      { name: "Styled Map" }
    );
    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.694608720911845, lng: -73.99085009662011 }, 
      zoom: 11,
      mapTypeControlOptions: {
        mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
      },
    });
    const svgMarker = './img/map_point.svg' /* {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    } */
  
    new google.maps.Marker({
      position: map.getCenter(),
      icon: svgMarker,
      map: map,
    });
  
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");
  }
  