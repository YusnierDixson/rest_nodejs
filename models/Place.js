const mongoose=require('mongoose');
const mongoosePaginate=require('mongoose-paginate');
const uploader=require('./Uploader');
const slugify=require('../plugins/slugify');

let placeSchema=new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  slug:{
    type:String,
    unique:true

  },
  description:String,
  address:String,
  acceptsCreditCard:{
    type:Boolean,
    default:false
  },
  coverImage:String,
  avatarImage:String,
  openHour:Number,
  closeHour:Number

});


placeSchema.methods.updateImage=function(path,imageType){
  //Primero subir la imagen
  //Segundo guardar el lugar donde esta guardada
  return uploader(path).then(secure_url=>this.saveImageUrl(secure_url,imageType));

}

placeSchema.methods.saveImageUrl=function(secureUrl,imageType){
  this[imageType+'Image']=secureUrl;//Para que diga si es avatarImage o coverImage
  return this.save();
}
//Utilizando Hook para antes de guardar
placeSchema.pre('save',function(next){
  if(this.slug) return next();
   generateSlugAndContinue.call(this,0,next);
})

//funcion static para verificar cantidad de slug repetidos
placeSchema.statics.validateSlugCount=function(slug){
  return Place.count({slug: slug}).then(count=>{
    if(count>0) return false;
    return true;
  })
}

//Generaremos los nuevos slug teniendo en cuenta si existen repetidos
function generateSlugAndContinue(count, next){
  this.slug=slugify(this.title);
  if(count != 0)
  this.slug=this.slug + "-"+count;

  Place.validateSlugCount(this.slug).then(isValid=>{
    if(!isValid)
      return generateSlugAndContinue.call(this,count+1,next);

      next();
  })
}

placeSchema.plugin(mongoosePaginate);
let Place = mongoose.model('Place',placeSchema);

module.exports=Place;
