import Service from "../models/service.model.js";

export const createService = async (req, res) => {
    const { nombre, imagenUrl, descripcion } = req.body;

    try {
        const newService = await Service.create({
            nombre: nombre,
            imagenUrl: imagenUrl,
            descripcion: descripcion
        });

        res.status(201).json({ _id: newService._id });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.status(200).json(service);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const deleteServiceById = async (req, res) => {
    const { id } = req.params;

    try {
        await Service.findByIdAndDelete(id);
        res.status(204).json({ message: "Servicio eliminado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const editServiceById = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const serviceUpdate = await Service.findByIdAndUpdate(id, payload, { new: true });

        if (!serviceUpdate) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }

        res.status(200).json({ message: "Servicio actualizado", serviceUpdate });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const getServicesWithOptions = async (req, res) => {
    const { nombre, descripcion } = req.query;
    const searchQuery = { visible: true };
    let sortQuery = {};

    if (nombre) {
        const partialMatchNombre = new RegExp(nombre, 'i');
        searchQuery.nombre = partialMatchNombre;
    }

    if (descripcion) {
        searchQuery.descripcion = descripcion;
    }

    try {
        const servicesFound = await Service.find(searchQuery).sort(sortQuery);

        if (servicesFound.length >= 1) {
            return res.status(200).json(servicesFound);
        }

        res.status(404).json({ message: 'Servicio no encontrado' });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const toggleFavorite = async (req, res) => {
    const { id } = req.params;
    const { isFavorite } = req.body;

    try {
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        service.isFavorite = isFavorite;
        await service.save();

        res.status(200).json({ message: 'Estado de favorito del servicio actualizado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
