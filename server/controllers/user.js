// module.exports = function (app) {

//     var User = app.models.user;

//     var controller = {}

//     controller.profile = function (req, res) {
//         console.log('AQUI PROFILE');
//         console.log();
//         res.status(404).json("aaaaaaaaaaaaaaaaa");
//     };
//     controller.findAll = function (req, res) {

//         User.find().exec().then(
//             function(response){
//                 res.json(response);
//             },
//             function (error) {
//                 res.status(500).json(error);
//             }
//         );

//     };
//     controller.findOne = function (req, res) {
//         var id = req.params.id;

//         User.findById(id).exec().then(
//             function(response){
//                 if(!response){
//                     res.status(404).json({message: "User not found"});
//                 }
//                 res.json(response);
//             },
//             function(error){
//                 res.status(404).json(error);
//             }
//         );
//     };
//     controller.delete = function (req, res) {
//         var id = req.params.id;

//         User.remove({"_id": id}).exec().then(
//             function(){
//                 // 204 means no content
//                 res.status(204).end();
//             },
//             function(error){
//                 res.status(500).json(error);
//             }
//         );

//     };
//     controller.create = function(req, res){

//         //to do
//         // - create an user validation

//         User.create(req.body).then(
//             function(response) {
//                 // 201 means that post was created
//                 res.status(201).json(response);
//             },
//             function(error) {
//                 console.log(error);
//                 res.status(500).json(error);
//             }
//         );
//     };
//     controller.update = function(req, res){
//         var _id = req.body._id;

//         User.findByIdAndUpdate(_id, req.body).exec().then(
//             function(response) {
//                 res.json(response);
//             },
//             function(error) {
//                 res.status(500).json(error);
//             }
//         );
//     };
//     return controller;

// }