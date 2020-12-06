const path = require('path');
const { Storage } = require('@google-cloud/storage');

function uploadFileOnCloud(filename, bucketName = 'goit-hw-6') {
   async function uploadFile() {
      try {
         const storage = await new Storage({
            keyFilename: path.join(__dirname, 'goit-bip-cca58d87b62f.json'),
         });

         const image = await storage.bucket(bucketName).upload(filename, {
            gzip: true,
            metadata: {
               cacheControl: 'public, max-age=31536000',
            },
            public: true, // делает публичной картинку
         });
         console.log('image added on cloud', image);
      } catch (error) {
         throw error;
      }
   }

   uploadFile().catch(console.error);
}

module.exports = uploadFileOnCloud;

//IAM permissions for Cloud Storage
// storage.buckets.create	Create new buckets in a project.
// storage.buckets.delete	Delete buckets.
// storage.buckets.get	Read bucket metadata, excluding IAM policies.
// storage.buckets.getIamPolicy	Read bucket IAM policies.
// storage.buckets.list	List buckets in a project. Also read bucket metadata, excluding IAM policies, when listing.
// storage.buckets.setIamPolicy	Update bucket IAM policies.
// storage.buckets.update	Update bucket metadata, excluding IAM policies.

// Object permissions
// storage.objects.create	Add new objects to a bucket.
// storage.objects.delete	Delete objects.
// storage.objects.get	Read object data and metadata, excluding ACLs.
// storage.objects.getIamPolicy	Read object ACLs, returned as IAM policies.
// storage.objects.list	List objects in a bucket. Also read object metadata, excluding ACLs, when listing.
// storage.objects.setIamPolicy	Update object ACLs.
// storage.objects.update	Update object metadata, excluding ACLs.

// HMAC key permission name	Description
// storage.hmacKeys.create	Create new HMAC keys for service accounts in a project.
// storage.hmacKeys.delete	Delete existing HMAC keys.
// storage.hmacKeys.get	Read HMAC key metadata.
// storage.hmacKeys.list	List the metadata of HMAC keys in a project.
// storage.hmacKeys.update	Update HMAC key status.
