var base_query = {
    select: 'Location',
    from: '1hSKp4BbrAUikm8H5k_deWghrrmaYupYE4phdAks'
};

$(document).on('ready', function () {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(39.58642, -105.07710),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 14
    });

    var ftLayer = new google.maps.FusionTablesLayer({
        map: map,
        query: $.extend({}, base_query)
    });

    /*
    var changeQuery = function () {
        var checkedInputs = $('.sign-type:checked'),
            options = {
                query: $.extend({}, base_query)
            };
        if (checkedInputs.length === 0) {
            options.query.where = '1=0';
        } else if (checkedInputs.length < 3) {
            var wheres = [];
            for (var i = 0; i < checkedInputs.length; i++) {
                var $input = $(checkedInputs[i]);
                wheres.push($input.data('field') + '=1');
            }
            options.query.where = wheres.join(' OR ');
            //console.log('wheres are');
            //console.log(options.query.where);
        }
        console.log('options are');
        console.log(options);
        ftLayer.setOptions(options);
    };
    */

    var signChange = function () {
        var options = {
            query: $.extend({}, base_query)
        };
        options.query.where = $('#sign-select').val();
        console.log('options are');
        console.log(options);
        ftLayer.setOptions(options);
    };

    //$('.sign-type').on('click', changeQuery);
    $('#sign-select')
        .on('change', signChange)
        .trigger('change');
});
