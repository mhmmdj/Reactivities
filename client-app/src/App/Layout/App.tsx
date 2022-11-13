import React, { Fragment, useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'
import { Container } from 'semantic-ui-react'
import { Activity } from '../Model/Activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
	const [activities, setActivities] = useState<Activity[]>([])
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined)
	const [editMode, setEditMode] = useState(false)
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)

	/**
	 * let axiosInstance = axios.createInstance({
	 * 	baseUrl: "http://localhost:5000/api"
	 * });
	 * await axiosInstance.get('/activities');
	 */
	useEffect(() => {
		agent.activities.list().then((response) => {
			let activities: Activity[] = []
			response.forEach((activity) => {
				activity.date = activity.date.split('T')[0]
				activities.push(activity)
			})
			setActivities(response)
			setLoading(false)
		})
	}, [])

	function HandleSelectActivity(id: string) {
		setSelectedActivity(activities.find((a) => a.id === id))
		animateScroll.scrollToTop({
			duration: 500,
			smooth: 'easeOutCubic',
		})
	}

	function HandleCancelSelectActivity() {
		setSelectedActivity(undefined)
	}

	function HandleOpenForm(id?: string) {
		id ? HandleSelectActivity(id) : HandleCancelSelectActivity()
		setEditMode(true)
	}

	function HandleCloseForm() {
		setEditMode(false)
	}

	function HandleCreateOrEditActivity(activity: Activity) {
		setSubmitting(true)
		if (activity.id) {
			agent.activities.update(activity).then(() => {
				setActivities([
					...activities.filter((a) => a.id !== activity.id),
					activity,
				])
				setSelectedActivity(activity)
				setEditMode(false)
				setSubmitting(false)
			})
		} else {
			activity.id = uuid()
			agent.activities.create(activity).then(() => {
				setActivities([...activities, activity])
				setSelectedActivity(activity)
				setEditMode(false)
				setSubmitting(false)
			})
		}
	}

	function HandleDeleteActivity(id: string) {
		setSubmitting(true)
		agent.activities.delete(id).then(() => {
			setActivities([...activities.filter((a) => a.id !== id)])
			setSubmitting(false)
		})
	}

	if (loading) return <LoadingComponent content='Loading...' />

	return (
		<Fragment>
			<NavBar openForm={HandleOpenForm} />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					selectActivity={HandleSelectActivity}
					cancelSelectActivity={HandleCancelSelectActivity}
					editMode={editMode}
					openForm={HandleOpenForm}
					closeForm={HandleCloseForm}
					createOrEdit={HandleCreateOrEditActivity}
					deleteActivity={HandleDeleteActivity}
					submitting={submitting}
				/>
			</Container>
		</Fragment>
	)
}
export default App
// function Test() {
// 	let [name, setName] = useState('jksdfgjkdgsf')
// 	let changeName = () => setName('TTEESSTT')
// 	function ChangeName() {
// 		setName('Test')
// 	}
// 	return <div onClick={changeName}>{name}</div>
// }
// export default Test
