import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { Activity } from '../../../App/Model/Activity'
import { useStore } from '../../../App/stores/Store'
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {
	const { activityStore } = useStore()
	const {
		createActivity,
		updateActivity,
		loading_Form,
		loadActivity,
		loadingInitial,
		setLoadingInitial,
	} = activityStore
	const { id } = useParams()
	const navigate = useNavigate()

	const emptyActivity: Activity = {
		id: '',
		title: '',
		date: '',
		description: '',
		category: '',
		city: '',
		venue: '',
	}
	const [activity, setActivity] = useState(emptyActivity)

	useEffect(() => {
		if (id) loadActivity(id).then((activity) => setActivity(activity!))
		setLoadingInitial(false)
		animateScroll.scrollToTop()
	}, [id, loadActivity, setLoadingInitial])

	function HandleSubmit() {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid(),
			}
			createActivity(newActivity).then(() =>
				navigate(`/activities/${newActivity.id}`)
			)
		} else {
			updateActivity(activity).then(() =>
				navigate(`/activities/${activity.id}`)
			)
		}
	}

	function HandleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target
		setActivity({ ...activity, [name]: value })
	}

	if (loadingInitial) return <LoadingComponent content='Loading activity...' />

	return (
		<Segment>
			<Form onSubmit={HandleSubmit} autoComplete='off'>
				<Form.Input
					label='Title'
					placeholder='Title'
					onChange={HandleInputChange}
					value={activity.title}
					name='title'
				/>
				<Form.TextArea
					label='Description'
					placeholder='Discription'
					onChange={HandleInputChange}
					value={activity.description}
					name='description'
				/>
				<Form.Input
					label='Category'
					placeholder='Category'
					onChange={HandleInputChange}
					value={activity.category}
					name='category'
				/>
				<Form.Input
					type='date'
					label='Date'
					onChange={HandleInputChange}
					value={activity.date}
					name='date'
				/>
				<Form.Input
					label='City'
					placeholder='City'
					onChange={HandleInputChange}
					value={activity.city}
					name='city'
				/>
				<Form.Input
					label='Venue'
					placeholder='Venue'
					onChange={HandleInputChange}
					value={activity.venue}
					name='venue'
				/>
				<Button.Group widths='2'>
					<Button
						as={Link}
						to='/activities'
						basic
						type='button'
						color='grey'
						content='Cancel'
					/>
					<Button
						loading={loading_Form}
						basic
						type='submit'
						color='green'
						content='Submit'
					/>
				</Button.Group>
			</Form>
		</Segment>
	)
})
