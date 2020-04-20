const mongoose=require('mongoose');
const mongoosePaginate=require('mongoose-paginate');
//Uso de enums para las recciones a las visitas
const REACTIONS=['like','love','disappoinment','yummy','anger','disgust'];

let visitSchema=new mongoose.Schema({
    _user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    _place:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Place',
        required:true
    },
    reaction:{
        type:String,
        enum:REACTIONS
    },
    observation:String
})

visitSchema.plugin(mongoosePaginate);

const Visit=mongoose.Model('Visit',visitSchema);

module.exports=Visit;
