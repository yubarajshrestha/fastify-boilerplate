import multer from 'fastify-multer'
import multerS3 from 'multer-s3'
import { S3ClientInstance } from '@/src/configs/aws.config'
import path from 'path'
import { DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import fs from 'fs'
import { Readable } from 'stream'

/**********************************
 * * Storage Configuration
 **********************************/
const storage = multerS3({
	s3: S3ClientInstance,
	bucket: process.env.AWS_S3_BUCKET as string,
	acl: 'public-read',
	contentType: multerS3.AUTO_CONTENT_TYPE, // also can use: function (req, file, cb) { cb(null, file.mimetype) }
	metadata: function (req, file, cb) {
		cb(null, { fieldName: file.fieldname })
	},
	key: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
	},
})

const upload = multer({
	storage,
})

/**********************************
 * * Delete File
 **********************************/
const destroy = (key: string) => {
	S3ClientInstance.send(
		new DeleteObjectCommand({
			Key: key,
			Bucket: process.env.AWS_S3_BUCKET as string,
		})
	)
}

/**********************************
 * * Get signed media url from s3 bucket
 **********************************/
const signedURL = async (key: string) => {
	return await getSignedUrl(
		S3ClientInstance,
		new GetObjectCommand({
			Key: key,
			Bucket: process.env.AWS_S3_BUCKET as string,
		}),
		{ expiresIn: 3600 }
	)
}

/**********************************
 * * Download File
 * @param {string} key
 **********************************/
const download = async (key: string, location: string) => {
	const response = await S3ClientInstance.send(
		new GetObjectCommand({
			Key: key,
			Bucket: process.env.AWS_S3_BUCKET as string,
		})
	)
	const fileStream = fs.createWriteStream(path.join(location, key))
	await (response.Body as Readable).pipe(fileStream)
}

const FileManager = {
	upload,
	destroy,
	signedURL,
	download,
}

export default FileManager
