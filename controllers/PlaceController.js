const Place=require('../models/Place');
const upload=require('../config/upload');
const uploader=require('../models/Uploader');

function find(req,res,next) {
  Place.findById(req.params.id)
  .then(place=>{
    req.place=place;
    next();
  }).catch(err=>{
    next(err);
  });
  
}

function index(req,res) {
    //Todos los lugares
    //?query=#, sort=-1 descendente  paginate({},{page:req.query.page||1,limit:1,sort:{'_id':-1}})
Place.find({}).then(docs=>{
    res.json(docs)
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function create(req,res) {
    //Crear nuevos lugares
    Place.create({
        title:req.body.title,
        description:req.body.description,
        acceptsCreditCard:req.body.acceptsCreditCard,
        openHour:req.body.openHour,
        closeHour:req.body.closeHour
      }).then(doc=>{
        res.json(doc)
      }).catch(err=>{
        console.log(err);
        res.json(err);
      });
}

function show(req,res) {
    //Búsqueda individual, usando middleware find
    res.json(req.place);
}

function update(req,res) {
    //Actualizar un recurso
      //Array con cada uno de los campos que se pueden actualizar
  let attributes=['title','description','acceptsCreditCard','openHour','closeHour'];
  let placeParams={};
  attributes.forEach(attr=>{
    if(Object.prototype.hasOwnProperty.call(req.body,attr))
    placeParams[attr]=req.body[attr];
  })
  req.place=Object.assign(req.place,placeParams);
  req.place.save().then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res) {
    //Eliminar un recurso
req.place.remove().then(doc=>{
    res.json({})
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}
//Para recibir más de un objeto sino se utliza single, maxcout cantidad de archivos que se necesitan
function multerMiddleware(){
  return upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'cover', maxCount: 1}
  ]);
}
/*
function saveImage(req,res){
  if(req.place){
    const files = ['avatar','cover'];
    const promises = [];

    files.forEach(imageType=>{
      if(req.files && req.files[imageType]){
        const path = req.files[imageType][0].path;
        promises.push(req.place.updateImage(path,imageType));
      }
    })

    Promise.all(promises).then(results=>{
      console.log(results);
      res.json(req.place);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });

,multerMiddleware,saveImage
  }else{
    res.status(422).json({
      error: req.error || 'Could not save place'
    });
  }
}*/


module.exports={index,show,create,update,destroy,find,multerMiddleware};
