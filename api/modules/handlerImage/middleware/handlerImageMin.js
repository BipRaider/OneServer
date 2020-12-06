const path = require('path');
const { promises: fsPromises } = require('fs');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

// const uploadFileOnCloud = require('../models/file_storage/google_cloud');

async function handlerImageMin(req, res, next) {
   try {
      const MINIFIED_DIR = path.join(process.cwd(), '/public/images');

      const { filename, path: draftPath } = req.file;
      await imagemin([`draft/${req.file.filename}`], {
         destination: MINIFIED_DIR, // Where the file will be added
         plugins: [
            await imageminJpegtran(),
            await imageminPngquant({
               quality: [0.6, 0.8],
            }),
         ],
      });

      // await uploadFileOnCloud(file[0].destinationPath, 'goit-hw-6');  сохранит на облаке

      await fsPromises.unlink(draftPath); // удаляем файл по пути
      // await fsPromises.unlink(file[0].destinationPath);// удаляем файл по пути

      req.file = {
         ...req.file,
         path: path.join(MINIFIED_DIR, filename),
         destination: MINIFIED_DIR,
      };
      next();
   } catch (error) {
      next(error);
   }
}

module.exports = handlerImageMin;
