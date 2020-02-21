import express from 'express';
import Multer from 'multer';
import roomController from '../controllers/rooms';

const storage = Multer.diskStorage({
  destination: (_, file, callBack) => {
    callBack(null, './images/uploads');
  },
  filename: (_, file, callBack) => {
    callBack(null, Date.now() + file.originalname);
  },
});

const upload = Multer({ storage });
const router = express.Router();

router.post(
  '/images/:locationid/:workspaceid',
  upload.single('image'),
  roomController.addRoomImages,
);

router.post('/:locationid/:workspaceid/rooms', roomController.addRoom);

router.put('/:roomid', roomController.updateRoom);

router.delete('/:roomid', roomController.deleteRoom);

router.get('/:locationid/:workspaceid/rooms', roomController.getRooms);

export default router;
