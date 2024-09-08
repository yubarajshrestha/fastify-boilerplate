import { S3Client } from '@aws-sdk/client-s3'

export const S3ClientInstance = new S3Client({
	endpoint: process.env.AWS_S3_ENDPOINT as string,
	region: process.env.AWS_REGION as string,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
	},
})

/*********************************
 * * Get media url from s3 bucket
 * @param {string} key
 * @returns {string} url
 * @throws {Error} Error
 *********************************/
export const getMediaUrl = (key: string): string => {
	return `${process.env.AWS_S3_ENDPOINT}/basisthan/${key}`
}
