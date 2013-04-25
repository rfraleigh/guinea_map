var base_query = {
    select: 'Location',
    from: '1hSKp4BbrAUikm8H5k_deWghrrmaYupYE4phdAks'
};

$(document).on('ready', function () {
    var watching,
        car_marker;

    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(39.58642, -105.07710),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        panControl: false,
        scaleControl: false,
        zoomControl: false,
        streetViewControl: false
    });

    var ftLayer = new google.maps.FusionTablesLayer({
        map: map,
        query: $.extend({}, base_query)
    });

    var locateSuccess = function (position) {
        var ll = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        if (car_marker) {
            car_marker.setMap(map);
            car_marker.setPosition(ll);
        } else {
            car_marker = new google.maps.Marker({
                map: map,
                position: ll
            });
        }
    };

    var locateError = function () {

    };

    var signChange = function () {
        var options = {
            query: $.extend({}, base_query)
        };
        options.query.where = $('#sign-select').val();
        ftLayer.setOptions(options);
    };

    var locateMeChange = function () {
        var control = $('#locate-me-check'),
            checked = control.is(':checked');
        if (checked) {
            watching = navigator.geolocation.watchPosition(locateSuccess, locateError, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        } else {
            if (watching) {
                navigator.geolocation.clearWatch(watching);
                car_marker.setMap(null);
            }
        }
    };

    $('#sign-select')
        .on('change', signChange)
        .trigger('change');

    $('#locate-me-check').on('click', locateMeChange);
});
