var base_query = {
    select: 'Location',
    from: '1hSKp4BbrAUikm8H5k_deWghrrmaYupYE4phdAks'
};

$(document).on('ready', function () {
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

    var signChange = function () {
        var options = {
            query: $.extend({}, base_query)
        };
        options.query.where = $('#sign-select').val();
        ftLayer.setOptions(options);
    };

    $('#sign-select')
        .on('change', signChange)
        .trigger('change');
});
