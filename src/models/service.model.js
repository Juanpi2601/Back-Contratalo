import { Schema, model } from 'mongoose';
import { nameRegex, imageRegex, descriptionRegex } from '../helpers/serviceRegex.js';

const serviceSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Debe ingresar un nombre"],
        minLength: [4, "El nombre es demasiado corto"],
        maxLength: [60, "El nombre es demasiado largo"],
        match: [nameRegex, "El nombre ingresado es invalido"],
        unique: [true, "Un producto con este nombre ya existe"],
    },
  
    imagenUrl: {
        type: String,
        required: [true, "Debe ingresar una imagen"],
        match: [imageRegex, "La imagen ingresada es invalida"],
    },
    
   
    descripcion: {
        type: String,
        required: [true, "Debe ingresar una descripcion"],
        match: [descriptionRegex, "La descripcion ingresada es invalida"],
    },
    visible: {
        type: Boolean,
        default: true,
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default model("Service", serviceSchema);