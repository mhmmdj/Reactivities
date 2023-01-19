import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { Activity } from '../Model/Activity'
import { router } from '../router/Routes'
import { store } from '../stores/Store'

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay)
	})
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(
	async (response) => {
		await sleep(400)
		return response
	},
	(error: AxiosError) => {
		const { data, status, config } = error.response as AxiosResponse
		console.log('agent: ', error.response)
		switch (status) {
			case 400:
				if (config.method === 'get' && data.hasOwnProperty('ID')) {
					router.navigate('/not-found')
				}
				if (typeof data === 'object') {
					let ModelStateErrors = []
					for (let key in data) ModelStateErrors.push(data[key])
					throw ModelStateErrors.flat()
				} else {
					toast.error(data)
				}
				break
			case 401:
				toast.error('Unauthorised!')
				break
			case 404:
				router.navigate('/not-found')
				break
			case 500:
				store.commonStore.setServerError(data)
				router.navigate('/server-error')
				break
		}
		return Promise.reject(error)
	}
)

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const activities = {
	list: () => requests.get<Activity[]>('/activities'),
	details: (id: string) => requests.get<Activity>(`/activities/${id}`),
	create: (activity: Activity) => requests.post<void>('/activities', activity),
	update: (activity: Activity) =>
		requests.put<void>(`/activities/${activity.id}`, activity),
	delete: (id: string) => requests.del<void>(`/activities/${id}`),
}

const agent = {
	activities,
}

export default agent
