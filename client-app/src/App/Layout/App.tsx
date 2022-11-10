import React, { Fragment, useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { Activity } from '../Model/Activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid'

function App() {
	const [activities, setActivities] = useState<Activity[]>([])
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined)
	const [editMode, setEditMode] = useState<boolean>(false)
	/**
	 * let axiosInstance = axios.createInstance({
	 * 	baseUrl: "http://localhost:5000/api"
	 * });
	 * await axiosInstance.get('/activities');
	 */
	useEffect(() => {
		axios
			.get<Activity[]>('http://localhost:5000/api/activities')
			.then((response) => {
				setActivities(response.data)
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
		activity.id
			? setActivities([
					...activities.filter((a) => a.id !== activity.id),
					activity,
			  ])
			: setActivities([...activities, { ...activity, id: uuid() }])
		setEditMode(false)
		setSelectedActivity(activity)
	}

	function HandleDeleteActivity(id: string) {
		setActivities([...activities.filter(a => a.id !== id)]);
	}

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
