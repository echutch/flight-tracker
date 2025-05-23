import { Router, Request, Response } from 'express';
import { getAllAirports, getAirportByID, getAirportByName } from '../services/database';
import { Airport } from '../models/airport';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    if (!req.query.search) {
        try {
            const allAirports: Airport[] = await getAllAirports();
            res.status(200).json(allAirports);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving airports', error });
        }
    } else {
        const query = req.query.search as string;
        try {
            const airport: Airport | undefined = await getAirportByName(query);
            res.status(200).json(airport);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving airport', error });
        }
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    try {
        const airport: Airport | undefined = await getAirportByID(id);
        
        if (airport) {
            res.status(200).json(airport);
        } else {
            res.status(404).json({ message: `Airport not found with ID ${id}` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving airport', error });
    }
});

export default router; 