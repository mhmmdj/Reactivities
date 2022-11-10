import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Activity } from '../../../App/Model/Activity'

interface Props {
	activity: Activity
	cancelSelectActivity: () => void
	openForm: (id: string) => void
}

export default function ActivityDetails({
	activity,
	cancelSelectActivity,
	openForm,
}: Props) {
	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span>{activity.date}</span>
				</Card.Meta>
				<Card.Description>{activity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths='2'>
					<Button
						onClick={cancelSelectActivity}
						basic
						content='Cancel'
						color='grey'
					/>
					<Button
						onClick={() => openForm(activity.id)}
						basic
						content='Edit'
						color='blue'
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	)
}
