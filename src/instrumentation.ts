// This file only allowed to be run on server side
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import Bluebird from 'bluebird';
import { promises as fs } from 'fs';
import mime from 'mime-types';
import path from 'path';

if (typeof window !== 'undefined') {
  throw new Error('This file should only be used on the server side.');
}

const S3_CDN_PREFIX = process.env.S3_CDN_PREFIX || '';
const VERSION = process.env.VERSION || process.env.RAILWAY_GIT_COMMIT_SHA;

export function register() {
  // Only run CDN upload in production build, not in development
  if (VERSION && S3_CDN_PREFIX) {
    setupCDN();
  }
}

export async function setupCDN(): Promise<void> {
  if (!VERSION || !S3_CDN_PREFIX || S3_CDN_PREFIX === '/') {
    console.warn('Invalid configuration: VERSION or S3_CDN_PREFIX is missing.');
    return;
  }

  try {
    // In production with standalone: __dirname is like /app/server
    // We need /app/.next/static (where static files are)
    const entry =
      process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '..')
        : process.cwd();

    const ns = 'cdn-uploader';
    console.log(ns, 'Entry point:', entry);

    const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

    // Upload static assets from .next/static (standalone copies them here)
    const staticDir = path.resolve(entry, '.next/static');

    // Check if static directory exists
    try {
      await fs.access(staticDir);
    } catch {
      console.warn('CDN upload skipped: .next/static directory does not exist.');
      console.warn('Run "pnpm build" first to generate the build output.');
      return;
    }

    const bucketBase = `midwess/midwess/web/commit-${VERSION}`;
    const acl = 'public-read';

    const fileExistsInS3 = async (
      bucket: string,
      key: string,
    ): Promise<boolean> => {
      try {
        await s3.send(
          new HeadObjectCommand({
            Bucket: bucket,
            Key: key,
          }),
        );
        return true;
      } catch (error: unknown) {
        const err = error as { name?: string };
        if (err.name === 'NotFound') {
          return false;
        }
        throw error;
      }
    };

    const uploadDirectory = async (
      dirPath: string,
      s3Path: string,
    ): Promise<void> => {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });

      await Bluebird.map(
        entries,
        async (entry: unknown) => {
          const e = entry as { name: string; isDirectory: () => boolean };
          const fullPath = path.join(dirPath, e.name);
          const s3Key = `${s3Path}/${e.name}`;

          if (e.isDirectory()) {
            await uploadDirectory(fullPath, s3Key);
          } else {
            const fileAlreadyExists = await fileExistsInS3(
              process.env.AWS_S3_BUCKET_NAME!,
              s3Key,
            );

            if (fileAlreadyExists) {
              return;
            }

            const contentType =
              mime.lookup(fullPath) || 'application/octet-stream';

            const fileContent = await fs.readFile(fullPath);

            const command = new PutObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET_NAME!,
              Key: s3Key,
              Body: fileContent,
              ACL: acl,
              ContentType: contentType,
            });

            await s3.send(command);
            console.log(
              ns,
              `Uploaded: ${s3Key} with Content-Type: ${contentType}`,
            );
          }
        },
        { concurrency: 30 },
      );
    };

    await uploadDirectory(staticDir, `${bucketBase}/_next/static`);
    console.log(ns, 'Upload completed successfully.');
  } catch (error) {
    console.error('Error uploading to CDN:', error);
    throw error;
  }
}
