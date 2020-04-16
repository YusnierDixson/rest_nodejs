const mongoose=require('mongoose');
const mongoosePaginate=require('mongoose-paginate');
const uploader=require('./Uploader');

let placeSchema=new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  description:String,
  acceptsCreditCard:{
    type:Boolean,
    default:false
  },
  coverImage:String,
  avatarImage:String,
  openHour:Number,
  closeHour:Number

});

placeSchema.methods.updateAvatar=function(path){
  //Primero subir la imagen
  //Segundo guardar el lugar donde esta guardada
  return uploader(path).then(secure_url=>this.saveAvatarUrl(secure_url));

}

placeSchema.methods.saveAvatarUrl=function(secureUrl){
  this.avatarImage=secureUrl;
  return this.save();
}
/*
placeSchema.methods.updateImage = function(path,imageType){
  // Primero subir la imagen
  // Guardar el lugar
  return uploader(path)
    .then(secure_url => this.saveImageUrl(secure_url,imageType));
}

placeSchema.methods.saveImageUrl = function(secureUrl,imageType){
  this[imageType+'Image'] = secureUrl;
  return this.save();
}*/

let Place = mongoose.model('Place',placeSchema);

module.exports=Place;
