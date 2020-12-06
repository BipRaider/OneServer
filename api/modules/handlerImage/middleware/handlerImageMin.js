const path = require('path');
const { promises: fsPromises } = require('fs');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

async function handlerImageMin(req, res, next) {
   try {
      const MINIFIED_DIR = path.join(process.cwd(), '/public/images');

      const { filename, path: tmpPath } = req.file;
      await imagemin([`tmp/${req.file.filename}`], {
         destination: MINIFIED_DIR, // Where the file will be added
         plugins: [
            await imageminJpegtran(),
            await imageminPngquant({
               quality: [0.6, 0.8],
            }),
         ],
      });

      await fsPromises.unlink(tmpPath); // удаляем файл по пути

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
