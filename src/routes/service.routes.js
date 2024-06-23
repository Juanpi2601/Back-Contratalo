import { Router } from "express";
import {
    createService,
    getAllServices,
    getServiceById,
    deleteServiceById,
    getServicesWithOptions,
    editServiceById,
    toggleFavorite
} from "../controllers/service.controllers.js"; 
import { ServiceValidation } from "../validators/serviceValidations.js"
import validateFields from "../validators/validateFields.js"

const router = Router();

router.post('/create', ServiceValidation.nombre, ServiceValidation.imagenUrl, ServiceValidation.descripcion, validateFields, createService);
router.get('/getAll', getAllServices);
router.get('/getById/:id', getServiceById);
router.get('/servicesWithOptions/search', getServicesWithOptions);
router.delete('/delete/:id', deleteServiceById);
router.patch('/edit/:id', ServiceValidation.nombre, ServiceValidation.imagenUrl, ServiceValidation.descripcion, validateFields, editServiceById);
router.patch('/favorite/:id', toggleFavorite);

export default router;
