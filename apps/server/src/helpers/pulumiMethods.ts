// import * as gcp from '@pulumi/gcp';
// import * as pulumi from '@pulumi/pulumi';
// import * as fs from 'fs';
// import * as path from 'path';
import { LocalWorkspace } from '@pulumi/pulumi/automation';
import { exportZipFIle } from './zipFileFunctions';

// const stackName = 'from-express2';
// const projectName = 'new-project2';


// Install necessary GCP plugins once upon boot
export const ensurePlugins = async () => {
  const ws = await LocalWorkspace.create({});
  await ws.installPlugin('gcp', 'v4.0.0');
  console.log('Plugins installed');
};

// This function defines our Pulumi GCP Storage static website based on the content passed in the POST body.
export const createPulumiProgram = (zipFileBuffer) => async () => {
  // Create a bucket and expose a website index document
  // const siteBucket = new gcp.storage.Bucket(projectName, {
  //   location: 'US',
  //   website: {
  //     mainPageSuffix: 'index.html',
  //   },
  // });

  // Define the HTML content based on the caller's input.
  // const indexContent = content;

  // const acl = new gcp.storage.DefaultObjectAccessControl(projectName, {
  //   bucket: siteBucket.name,
  //   role: 'READER',
  //   entity: 'allUsers',
  // });


  // Extract the contents of the zip file
  const extractToDir = './temp'; // You can change the destination directory
  await exportZipFIle(zipFileBuffer, extractToDir);

  // // Upload extracted HTML files to the GCS bucket
  // const files = fs.readdirSync(extractToDir);
  // files.forEach((file) => {
  //   new gcp.storage.BucketObject(
  //     file,
  //     {
  //       bucket: siteBucket.name,
  //       source: new pulumi.asset.FileAsset(path.join(extractToDir, file)),
  //       contentType: 'text/html; charset=utf-8',
  //       name: file,
  //     },
  //     { dependsOn: acl }
  //   );
  // });

  return {
    websiteUrl: 'pulumi.interpolate`https://${siteBucket.url}`',
  };
};
