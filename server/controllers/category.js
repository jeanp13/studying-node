// module.exports = function (app) {

//     var CategoryModel = app.models.category;
//     var controller = {};
    
//     controller.create = function (req, res) {

//         console.log(req.body.category);
//         var obj = req.body.category || null;
//         if(obj){
//             var category = new CategoryModel({name: obj.name});
//             category.save(function (err, result) {
//                 if(err){
//                     console.log('categoryController -> Create -> '+error);
//                     res.status(500).json(error);
//                 } else {
//                     // 201 means that post was created
//                     res.status(201).json(response);
//                 }
//             });
//         }
//     }

//     controller.findOne = function (req, res) {
//         var path = req.params.path;
//         console.log(req.params);
//         console.log(req.body);


//         res.json(path);
//     };

//     controller.findByPath = function (req, res) {
//         var path = req.params.path || null;
//         if(path){
//             console.log(path);
//             res.json(null);
//         }

//         var t = {path: path};

//         res.json(t);
//     }

//     return controller;

// }