import { Router } from 'express';
import {
    getRetailers,
    getRetailerById,
    createRetailer,
    updateRetailer,
    deleteRetailer
} from '../../../controllers/masters/users/retailer.controller';
import { paginationData } from '../../../middleware/pagination';
import { imageFolder } from '../../../middleware/createUploadFolders';
import { uploadImage } from '../../../middleware/uploadMiddleware';

const router = Router();

router.get('/', paginationData(["Retailer_Name"]), getRetailers);
router.get('/:id', getRetailerById);
router.post('/', uploadImage(imageFolder.retailer), createRetailer);
router.put('/:id', uploadImage(imageFolder.retailer), updateRetailer);
router.delete('/:id', deleteRetailer);

export default router;
