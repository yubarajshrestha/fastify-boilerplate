import { FastifyRequest } from 'fastify'

const getPage = (req) => parseInt(req.query.page as string) || 1
const getPerPage = (req) => parseInt(req.query.perPage as string) || 10

/**********************************
 * * Paginate data
 * @param req Fastify Request
 * @param perPage Number of items per page
 * @returns {object}
 **********************************/
const paginated = (req: FastifyRequest, perPage: number | null = null) => {
	const page = getPage(req)
	const limit = perPage ?? getPerPage(req)
	return {
		limit,
		offset: page * limit - limit,
	}
}

/**********************************
 * * Paginated data response with meta
 * @param data - data to paginate
 * @param req Fastify Request
 * @returns {PaginatedData<T>}
 **********************************/
const paginatedData = (data: {} | any, req: FastifyRequest) => {
	const { count: total, rows: items } = data
	const page = getPage(req)
	const perPage = getPerPage(req)
	const totalItems = Array.isArray(total) ? total.reduce((acc, curr) => acc + curr.count, 0) : total
	return {
		data: items,
		meta: {
			currentPage: page,
			perPage,
			total: totalItems,
			lastPage: Math.ceil(totalItems / perPage),
			nextPage: Math.ceil(totalItems / perPage) > page ? page + 1 : null,
			prevPage: page > 1 ? page - 1 : null,
		},
	}
}

export { paginated, paginatedData }
