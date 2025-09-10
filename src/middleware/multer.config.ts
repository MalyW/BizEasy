import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';


const uploadsPath = process.env.UPLOADS_PATH || path.join(__dirname, '../uploads');


fs.ensureDirSync(uploadsPath);


const getUniqueFileName = (originalname: string) => {
  const ext = path.extname(originalname);
  const base = path.basename(originalname, ext).replace(/\s+/g, '_');
  const timestamp = Date.now();
  return `${base}_${timestamp}${ext}`;
};


const storage = multer.diskStorage({

  destination: async (req, file, cb) => {
    cb(null, uploadsPath);
  },

  filename: (req, file, cb) => {
    cb(null, getUniqueFileName(file.originalname));
  }

});

const fileTypeMimeMap: Record<string, string[]> = {
  pdf: ['application/pdf'],
  jpg: ['image/jpeg', 'image/jpg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
  gif: ['image/gif'],
  doc: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ppt: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  csv: ['text/csv', 'application/csv'],
  txt: ['text/plain'],
  xls: ['application/vnd.ms-excel'],
  rtf: ['application/rtf'],
  json: ['application/json'],
  xml: ['application/xml', 'text/xml']
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const ext = path.extname(file.originalname).replace('.', '').toLowerCase();
  const allowedMimeTypes = fileTypeMimeMap[ext];

  if (!allowedMimeTypes) {
    console.log(`File type not allowed ext: ${ext}`);
    console.log('mime types:', file.mimetype);
    return cb(new Error('File type not allowed') as unknown as null, false);
  }


  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Mime type does not match file type') as unknown as null, false);
  }

  cb(null, true);
};


export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10)
  }
});
