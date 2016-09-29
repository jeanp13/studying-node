/*describe('ContatoController', function(){

    var ctrl,
        $scope,
        stubService,
        q;

    var data = [
        {_id: 1, nome: 'fulano 1', email: 'email1@teste.com'},
        {_id: 2, nome: 'fulano 2', email: 'email2@teste.com', emergencia: 1},
        {_id: 3, nome: 'fulano 3', email: 'email3@teste.com'}
    ];

    //inject $scope
    beforeEach(function () {
        module('studying-node');

        inject(function ($controller, $injector, $q) {
            $scope = $injector.get('$rootScope').$new();

            q = $q;

            stubService  = {
                findAll: sinon.stub(),
                findById: sinon.stub(),
                save: sinon.stub(),
                delete: sinon.stub()
            }

            console.log('aqui 1');
            //ctrl = $controller('ContatoListCtrl', {$scope: $scope, ContatoService: stubService});

        });
    });

    it('ContatoListCtrl', function () {

        stubService.findAll.returns(q.when(data));

        inject(function ($controller) {
            ctrl = $controller('ContatoListCtrl', {$scope: $scope, ContatoService: stubService});
        });

        console.log(stubService);

        $scope.$apply();
        expect($scope.contatos).to.be.lengthOf(3);

    });

    it('wtf', function () {

        var defer = q.defer();
        defer.reject("AQUI PQPQ");

        stubService.findAll.returns(defer.promise);

        inject(function ($controller) {
            ctrl = $controller('ContatoListCtrl', {$scope: $scope, ContatoService: stubService});
        });


        $scope.$apply();
        console.log($scope.mensagem);
        expect($scope.contatos).to.be.lengthOf(0);

    });


});*/