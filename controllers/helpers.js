function buildParams(validParams,body){
        //Array con cada uno de los campos que se pueden actualizar
  let params={};

  validParams.forEach(attr=>{
    if(Object.prototype.hasOwnProperty.call(body,attr))
    params[attr]=body[attr];
  });

  return params;

}
module.exports={buildParams};