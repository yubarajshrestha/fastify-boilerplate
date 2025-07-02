import { Readable } from "node:stream";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { BadRequestError } from "@/handlers/error.handler";

export const S3ClientInstance = new S3Client({
	endpoint: process.env.AWS_S3_ENDPOINT as string,
	region: process.env.AWS_REGION as string,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
	},
});

/*********************************
 * * Get media url from s3 bucket
 * @param {string} key
 * @returns {string} url
 * @throws {Error} Error
 *********************************/
export const getMediaUrl = (key: string): string => {
	return `${process.env.AWS_S3_ENDPOINT}/${process.env.AWS_S3_BUCKET}/${key}`;
};

/*********************************
 * * Read content of csv/xlsx file from s3 bucket
 * @param {string} key
 * @returns {object} content
 * @throws {Error} Error
 *********************************/
export const readContent = async (key: string): Promise<Readable> => {
	const isValidExtension = (key: string): boolean => {
		return key.endsWith(".csv") || key.endsWith(".xlsx");
	};

	if (!isValidExtension(key)) {
		throw new BadRequestError("Unsupported file format. Only .csv and .xlsx files are supported.");
	}

	try {
		const command = new GetObjectCommand({
			Bucket: process.env.AWS_S3_BUCKET as string,
			Key: key,
		});
		const { Body } = await S3ClientInstance.send(command);

		const streamToBuffer = (stream: any): Promise<Buffer> => {
			return new Promise((resolve, reject) => {
				const chunks: any[] = [];
				stream.on("data", (chunk) => chunks.push(chunk));
				stream.on("end", () => resolve(Buffer.concat(chunks)));
				stream.on("error", reject);
			});
		};

		const buffer = await streamToBuffer(Body);

		const bufferToStream = (buffer: Buffer): Readable => {
			const readable = new Readable();
			readable._read = () => {}; // _read is required but you can noop it
			readable.push(buffer);
			readable.push(null);
			return readable;
		};

		return bufferToStream(buffer);
	} catch (_) {
		throw new BadRequestError("Error reading file content.");
	}
};
