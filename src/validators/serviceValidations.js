import { body } from 'express-validator';
import Service from '../models/service.model.js';
import { nameRegex, imageRegex, descriptionRegex } from '../helpers/serviceRegex.js';

const nameValidation = async (value) => {
    if (!nameRegex.test(value)) {
        throw new Error('El nombre ingresado es inválido');
    }

    const nameExist = await Service.findOne({ nombre: value });
    if (nameExist) {
        throw new Error(`El nombre ${value} ya está registrado`);
    }

    return true;
};

const imageValidation = async (value) => {
    if (!imageRegex.test(value)) {
        throw new Error('La imagen ingresada es inválida');
    }

    const imageExist = await Service.findOne({ imagenUrl: value });
    if (imageExist) {
        throw new Error(`La imagen ${value} ya está registrada`);
    }

    return true;
};

const descriptionValidation = async (value) => {
    if (!descriptionRegex.test(value)) {
        throw new Error('La descripción ingresada es inválida');
    }

    return true;
};

export const ServiceValidation = {
    nombre: body("nombre")
        .notEmpty()
        .withMessage("El nombre no puede estar vacío")
        .bail() // Para detenerse si el campo está vacío
        .custom(nameValidation),

    imagenUrl: body("imagenUrl")
        .notEmpty()
        .withMessage("La URL de la imagen no puede estar vacía")
        .bail() // Para detenerse si el campo está vacío
        .custom(imageValidation),

    descripcion: body("descripcion")
        .notEmpty()
        .withMessage("La descripción no puede estar vacía")
        .bail() // Para detenerse si el campo está vacío
        .custom(descriptionValidation),
}
