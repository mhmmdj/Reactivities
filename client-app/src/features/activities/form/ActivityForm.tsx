import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/Model/Activity'

interface Props {
	selectedActivity: Activity | undefined
	closeForm: () => void
	createOrEdit: (activity: Activity) => void
	submitting: boolean
}

export default function ActivityForm({
	selectedActivity,
	closeForm,
	createOrEdit,
	submitting
}: Props) {
	const emptyActivity: Activity = {
		id: '',
		title: '',
		date: '',
		description: '',
		category: '',
		city: '',
		venue: '',
	}

	const initialState = selectedActivity ?? emptyActivity

	const [activity, setActivity] = useState(initialState)

	function HandleSubmit() {
		createOrEdit(activity)
	}

	function HandleInputChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = event.target
		setActivity({ ...activity, [name]: value })
	}

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
					placeholder='Date'
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
						onClick={closeForm}
						basic
						type='button'
						color='grey'
						content='Cancel'
					/>
					<Button loading={submitting} basic type='submit' color='green' content='Submit' />
				</Button.Group>
			</Form>
		</Segment>
	)
}
