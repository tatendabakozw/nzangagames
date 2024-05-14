/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import * as path from 'path';
import yauzl from 'yauzl';
import progress from 'progress-stream';

export const exportZipFIle = async (zipFileBuffer, extractToDir) => {
  return new Promise((resolve, reject) => {
    const prog = progress({
      time: 100 /* ms */,
    });

    prog.on('progress', (info) => {
      console.log(`Unzipping: ${info.percentage.toFixed(2)}%`);
    });

    prog.on('end', () => {
      console.log('Unzipping complete.');
      resolve(extractToDir);
    });

    const stream = yauzl.fromBuffer(zipFileBuffer, { lazyEntries: true }, (err, zipfile) => {
      if (err) {
        reject(err);
        return;
      }

      zipfile.readEntry();
      zipfile.on('entry', (entry) => {
        if (/\/$/.test(entry.fileName)) {
          zipfile.readEntry();
        } else {
          const filePath = path.join(extractToDir, entry.fileName);
          const fileDir = path.dirname(filePath);
          fs.mkdirSync(fileDir, { recursive: true });

          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) {
              reject(err);
              return;
            }

            const writeStream = fs.createWriteStream(filePath);
            readStream.pipe(writeStream);

            readStream.on('end', () => {
              zipfile.readEntry();
            });

            writeStream.on('finish', () => {
              console.log(`Extracted: ${entry.fileName}`);
            });
          });
        }
      });

      zipfile.on('end', () => {
        prog.destroy(); // Close the progress stream when zip processing is complete
      });
    });

    // Pipe the zip file buffer through the progress stream and into yauzl
    stream.pipe(prog);
  });
};
