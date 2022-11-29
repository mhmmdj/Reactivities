import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { Activity } from '../Model/Activity'

export default class ActivityStore {
	activityRegistry = new Map<string, Activity>()
	selectedActivity: Activity | undefined = undefined
	editMode = false
	loading_List = false
	loading_Form = false
	loadingInitial = true

	constructor() {
		makeAutoObservable(this)
	}

	get activitiesByDate() {
		return Array.from(this.activityRegistry.values()).sort(
			(a, b) => Date.parse(a.date) - Date.parse(b.date)
		)
	}

	get groupedActivities() {
		return Object.entries(
			this.activitiesByDate.reduce((activities, activity) => {
				const date = activity.date
				activities[date] = activities[date]
					? [...activities[date], activity]
					: [activity]
				return activities
			}, {} as { [key: string]: Activity[] })
		)
	}

	loadActivities = async () => {
		this.loadingInitial = true
		try {
			const activities = await agent.activities.list()
			for (let activity of activities) {
				this.setActivity(activity)
			}
			this.setLoadingInitial(false)
		} catch (error) {
			console.log(error)
			this.setLoadingInitial(false)
		}
	}

	loadActivity = async (id: string) => {
		let activity = this.getActivity(id)
		if (activity) {
			this.setSelectedActivity(activity)
			return activity
		} else {
			this.setLoadingInitial(true)
			try {
				activity = await agent.activities.details(id)
				this.setActivity(activity)
				this.setSelectedActivity(activity)
				this.setLoadingInitial(false)
				return activity
			} catch (error) {
				console.log(error)
				this.setLoadingInitial(false)
			}
		}
	}

	private getActivity = (id: string) => {
		return this.activityRegistry.get(id)
	}

	private setActivity = (activity: Activity) => {
		activity.date = activity.date.split('T')[0]
		this.activityRegistry.set(activity.id, activity)
	}

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state
	}

	setSelectedActivity(activity: Activity) {
		this.selectedActivity = activity
	}

	createActivity = async (activity: Activity) => {
		this.loading_Form = true
		try {
			await agent.activities.create(activity)
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity)
				this.selectedActivity = activity
				this.editMode = false
				this.loading_Form = false
			})
		} catch (error) {
			console.log(error)
			runInAction(() => {
				this.loading_Form = false
			})
		}
	}

	updateActivity = async (activity: Activity) => {
		this.loading_Form = true
		try {
			await agent.activities.update(activity)
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity)
				this.selectedActivity = activity
				this.editMode = false
				this.loading_Form = false
			})
		} catch (error) {
			console.log(error)
			runInAction(() => {
				this.loading_Form = false
			})
		}
	}

	deleteActivity = async (id: string) => {
		this.loading_List = true
		try {
			await agent.activities.delete(id)
			runInAction(() => {
				this.activityRegistry.delete(id)
				this.loading_List = false
			})
		} catch (error) {
			console.log(error)
			runInAction(() => {
				this.loading_List = false
			})
		}
	}
}
