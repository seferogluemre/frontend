import { Request, Response } from "express"
import { createClinic, deleteClinic, getClinicById, getClinics, updateClinic } from "src/models/clinic_model"
export const addClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const createdClinic = await createClinic(req.body)

        res.status(201).json({ message: "Clinic Created Successfully", data: createdClinic });
    } catch (error) {
        console.error("Error log:", (error as Error).message)
        res.status(500).json({
            erorr: (error as Error).message
        })
    }
}

export const editClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const clinicExists = await getClinicById(Number(id))

        if (!clinicExists) {
            res.status(404).json({ message: "Clinic not found" });
        }

        const updatedClinic = await updateClinic(Number(id), req.body)

        res.status(200).json({
            message: "Clinic updated successfully",
            data: updatedClinic
        });
    } catch (error) {
        console.error("Error log:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
}

export const removeClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const clinicExists = await getClinicById(Number(id))

        if (!clinicExists) {
            res.status(404).json({ message: "Clinic not found" });
        }

        const deletedClinic = await deleteClinic(Number(id))

        res.status(200).json({ message: "Clinic deleted successfully", data: deletedClinic });
    } catch (error) {
        console.error("Error log:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getClinic = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const clinic = await getClinicById(Number(id))

        if (!clinic) {
            res.status(404).json({ message: "Clinic not found" });
        }

        res.status(200).json({
            message: "Clinic fetched successfully",
            data: clinic
        });
    } catch (error) {
        console.error("Error log:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
}

export const listClinic = async (req: Request, res: Response): Promise<void> => {
    try {

        const clinics = await getClinics()

        if (!clinics) {
            res.status(404).json({ message: "Clinics not found" });
        }

        res.status(200).json({
            results: clinics
        });
    } catch (error) {
        console.error("Error log:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
}
