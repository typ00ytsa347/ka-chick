import stream from 'stream';
import express from 'express';
import multer from 'multer';
import driveService from '../services/driveService.js';

const router = express.Router();
const upload = multer();

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await driveService.files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ['14MRX1ibuk8cmh9gp_lw4QNG7-GwGj1ij']
    },
    fields: 'id,name',
    supportsAllDrives: true
  });
  console.log(`Uploaded file name: ${data.name} id: ${data.id}`);
  return data.id;
};

router.post('/upload', upload.any(), async (req, res) => {
  try {
    const { body, files } = req;

    let fileId = [];

    for (let f = 0; f < files.length; f++) {
      fileId = await uploadFile(files[f]);
    }

    res.json(fileId);
    // res.status(200).send('Image uploaded successfully');
  } catch (f) {
    res.send(f.message);
  }
});

export default router;