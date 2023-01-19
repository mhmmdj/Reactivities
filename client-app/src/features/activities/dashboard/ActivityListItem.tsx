import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/Model/Activity'

interface Props {
	activity: Activity
}

export default function ActivityItemList({ activity }: Props) {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size='tiny' circular src='/assets/user.png' />
						<Item.Content>
							<Item.Header as={Link} to={`/activities/${activity.id}`}>
								{activity.title}
							</Item.Header>
							<Item.Description>Hosted by Ahmad</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span className='spanDemo'>
					<Icon name='clock' /> {activity.date}
					<div></div>
					<Icon name='marker' /> {activity.venue}
				</span>
			</Segment>
			<Segment secondary>Attendees go here</Segment>
			<Segment clearing>
				<span>{activity.description}</span>
				<Button
					as={Link}
					to={`/activities/${activity.id}`}
					color='teal'
					floated='right'
					content='View'
				/>
			</Segment>
		</Segment.Group>
	)
}
