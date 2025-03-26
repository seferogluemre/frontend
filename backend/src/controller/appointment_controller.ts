import { createAppointment, deleteAppointment, getAppointmentByDoctor, getAppointments, getAppointmentsByPatient, updateAppointment } from "src/models/appointment_model";
import { Request, Response } from "express";

export const addAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const createdAppointment = await createAppointment(req.body);
        res.status(201).json({ message: "Appointment Created Successfully", data: createdAppointment });
    } catch (error) {
        console.error("Error log:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
};

export const editAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const updatedAppointment = await updateAppointment(Number(id), req.body);
        if (updatedAppointment) {
            res.status(200).json({ message: "Appointment Updated Successfully", data: updatedAppointment });
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }

    } catch (error) {
        console.error("Error log:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
};

export const removeAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Appointment ID not found" });
        }

        const deletedAppointment = await deleteAppointment(Number(id));
        res.status(200).json({ message: "Appointment Deleted Successfully", data: deletedAppointment });
    } catch (error) {
        console.error("Error log:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
};

export const listPatientAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Patient ID not found" });
        }

        const appointments = await getAppointmentsByPatient(Number(id));
        res.status(200).json({ message: "Appointment List", results: appointments });

    } catch (error) {
        console.error("Error log:", (error as Error).message);
        res.status(500).json({ error: (error as Error).message });
    }
};

export const listAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = req.query.status;

        const appointments = await getAppointments(status);
        res.status(200).json({ results: appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Could not fetch appointments." });
    }
}

export const listDoctorAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const appointments = await getAppointmentByDoctor(Number(id));
        res.status(200).json({ results: appointments });
    } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ error: "Could not fetch doctor appointments." });
    }
}
