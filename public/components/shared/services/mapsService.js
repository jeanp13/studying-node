(function(){
    'use restrict'

    angular.module('studying-node')
        .factory('MapsService', [function(){

            var getAddressComponents;

            return {
                
                /**
                 * @name getAddressComponents
                 * @description
                 * Process address components returned from google maps API and return an Object
                 * @param addressComponents address components returned from google maps API
                 * @return {'street_number', 'route', 'locality', 'administrative_area_level_1','country', 'postal_code' }
                 */
                getAddressComponents: function(addressComponents){

                    var address = {};
                    var componentForm = {
                        street_number: 'short_name',
                        route: 'long_name',
                        locality: 'long_name',
                        administrative_area_level_1: 'short_name',
                        country: 'long_name',
                        postal_code: 'short_name'
                    };
                    for (var i = 0; i < addressComponents.length; i++) {
                        var addressType = addressComponents[i].types[0];
                        if (componentForm[addressType]) {
                            var val = addressComponents[i][componentForm[addressType]];
                            address[addressType] = val;
                        }
                    }
                    return address;
                }
            }

        }])

})();