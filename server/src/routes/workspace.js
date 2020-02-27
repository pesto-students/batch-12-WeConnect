import express from 'express';
import Multer from 'multer';
import workspaceController from '../controllers/workspace';
import auth from '../middleware/auth';

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

router.get('/owner/', auth, workspaceController.getWorkspacesOfOwner);

router.post('/', auth, workspaceController.addWorkspace);
router.post(
  '/images/:locationid/:workspaceid',
  upload.single('image'),
  auth,
  workspaceController.addWorkspaceImages,
);

router.put('/:locationid/:workspaceid', workspaceController.updateWorkspace);

router.delete('/:locationid/:workspaceid', workspaceController.deleteWorkspace);

router.get('/:qLocation/:page?/:count?', workspaceController.getWorkspaces);

export default router;
