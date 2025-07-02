import "yup";

declare module "yup" {
	interface StringSchema<_TType = string | undefined, _TContext = any> {
		customType(message: string, keyName: string): this;
	}
}
