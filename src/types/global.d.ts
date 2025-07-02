type Blog = {
	id: number;
	title: string;
	content: string;
};

type PaginatedData<T> = {
	data: T[];
	meta: {
		currentPage: number;
		perPage: number;
		total: number;
		lastPage: number;
		nextPage: number | null;
		prevPage: number | null;
	};
};

type PaginatedQueryType = {
	req?: any;
	associations?: Includeable[];
	attributes?: FindAttributeOptions;
	filters?: WhereOptions;
	sort?: Array<any>;
};

type SingleRecordQueryType = {
	req?: any;
	associations?: Includeable[];
	attributes?: FindAttributeOptions;
	sort?: Array<any>;
};
