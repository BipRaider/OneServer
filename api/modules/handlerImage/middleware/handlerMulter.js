// const { ImageError } = require('@helpers');

async function handlerMulter(req, res, next) {
   try {
      console.log('post-avatar req.body >>>', req.body);
      console.log('post-avatar req.params >>>', req.params);
      console.log('post-avatar req.query >>>', req.query);
      console.log('post-avatar req.file >>>', req.file);

      return res.status(200).send('post-avatar');
   } catch (error) {
      return res.status(403).send('Not valid data');
      next(error);
   }
}

module.exports = handlerMulter;
