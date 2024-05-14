/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createPulumiProgram } from '@helpers/pulumiMethods';
import * as express from 'express';
const router = express.Router();
import multer, { Multer } from 'multer';
// import fs from 'fs';
// import * as path from 'path';
// import { LocalWorkspace } from '@pulumi/pulumi/automation';
// import { createPulumiProgram } from '@helpers/pulumiMethods';
// import { createPulumiProgram } from '@helpers/pulumiMethods';
// import { exportZipFile } from '@helpers/zipFileFunctions';

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original file name
  },
});
const upload: Multer = multer({ storage: storage });

const stackName = 'from-express2';
// const projectName = 'new-project2';

// create a static site
// post request
// /api/static-site/create
router.post('/create', upload.single('file'), async (req, res, next) => {
  try {
    // Handle the uploaded file
    const file = req.file;
    // Access the uploaded file information
    // const filename = req.file.originalname.slice(0, -4)

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Create a new stack
    // const stack = await LocalWorkspace.createStack({
    //   stackName: stackName,
    //   projectName: projectName,
    //   // Generate the Pulumi program dynamically from the POST body
    //   program: createPulumiProgram(file.buffer),
    // });
    // console.log('file ----- ', file)

    createPulumiProgram(file.buffer)
    // await stack.setConfig('gcp:project', { value: 'seismic-gecko-411212' });
    // await stack.setConfig('gcp:region', { value: 'us-central1' }); // Set your desired region
    // // Deploy the stack, tailing the logs to console
    // const upRes = await stack.up({ onOutput: console.info });
    res.json({ id: stackName, url: 'upRes.outputs.websiteUrl.value' });

    // Create a temporary directory to extract the files
    // const tempDir = path.join(__dirname, 'temp');
    // fs.mkdirSync(tempDir, { recursive: true });

    // // Extract the zip file
    // const extractedLocation = await exportZipFile(req.file.buffer, tempDir);

    // console.log('extracted loccation is, ', extractedLocation)

    // // Respond with the location of the extracted files
    // // res.status(200).json({ resp: extractedLocation, message: 'success' });

    // const { name } = req.body;
    // // create a new stack
    // // Deploy Pulumi program with file content
    // const pulumiProgram = createPulumiProgram({
    //   contentFolder: extractedLocation+"/"+filename,
    //   bucketName: name,
    // });
    // const result = await pulumiProgram();
    // return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export default router;
