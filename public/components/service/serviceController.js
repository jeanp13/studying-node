(function () {
    'use strict';

    angular.module('studying-node')
        .controller('ServiceCreateCtrl', ['$scope', 'NgMap', 'MapsService', function ($scope, NgMap, MapsService) {
            //config
            $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAn5ibHt2HA_j1gzit--kc1Uv21poNhotY&libraries=places";
            $scope.types = "['geocode']";

            $scope.addMarker = function(event){
                var ll = event.latLng;
                $scope.positions.push({lat:ll.lat(), lng: ll.lng()});
            }

            $scope.markerChanged = function(event){
                var geocoder = new google.maps.Geocoder;
                var ll = event.latLng;
                var latlng = {lat:ll.lat(), lng: ll.lng()};

                console.log(latlng);

                geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var address = MapsService.getAddressComponents(results[0].address_components);
                        address['lat'] = latlng.lat;
                        address['lng'] = latlng.lng;

                        console.log('OLD ADDRESS');
                        console.log($scope.service.address);

                        $scope.service.address =  address ;
                        $scope.$apply();

                        console.log('NEW ADDRESS');
                        console.log($scope.service.address);

                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            }

            $scope.placeChanged = function() {
                var place = this.getPlace();
                var address = MapsService.getAddressComponents(place.address_components);
                address['lat'] = place.geometry.location.lat();
                address['lng'] = place.geometry.location.lng();
                $scope.service = { 'address': address  };
                $scope.map.setCenter(place.geometry.location);
            }

            NgMap.getMap().then(function(map) {
                $scope.map = map;
            });

        }])

})();