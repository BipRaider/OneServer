// const { ImageError } = require('@helpers');

async function handlerMulter(req, res, next) {
   try {
      console.log(' req.body >>>', req.body);
      console.log(' req.body >>>', req.params);
      console.log(' req.body >>>', req.query);
      return res.status(200).send(req.file);
   } catch (error) {
      return res.status(403).send('Not valid data');
      next(error);
   }
}

module.exports = handlerMulter;
