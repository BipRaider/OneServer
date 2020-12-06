class FileStorage {
   constructor({ bucket, storage }) {
      this.bucket = bucket;
      this.storage = storage;
   }
   async listBuckets() {
      try {
         const [buckets] = await this.storage.getBuckets();

         return buckets.map(bucket => bucket.name);
      } catch (err) {
         console.error('ERROR:', err);
      }
   }

   async getFiles() {
      return this.bucket.getFiles().then(([files]) => {
         return files.map(file => file.name);
      });
   }

   async upload(pathToFile, finalFileName) {
      const info = await this.bucket.upload(__dirname + '/' + pathToFile);

      if (finalFileName) {
         await this.bucket.file(info[0].name).rename(finalFileName);
      }
      return true;
   }

   async exists(fileName) {
      const exists = await this.bucket.file(fileName).exists();

      return !!exists[0];
   }

   async download(fileName) {
      return (await this.bucket.file(fileName).download())[0];
   }
}

module.exports = { FileStorage };
