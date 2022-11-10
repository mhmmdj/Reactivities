import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/Model/Activity'

interface Props {
	activities: Activity[]
	selectActivity: (id: string) => void
	deleteActivity: (id: string) => void
}

export default function ActivityList({
	activities,
	selectActivity,
	deleteActivity,
}: Props) {
	return (
		<Segment>
			<Item.Group divided>
				{activities.map(
					({ title, date, description, city, venue, id, category }, i) => (
						<Item key={i}>
							<Item.Content>
								<Item.Header as='a' className='list_title'>
									{title}
								</Item.Header>
								<Item.Meta>{date}</Item.Meta>
								<Item.Description>
									<div>{description}</div>
									<div>
										{city}, {venue}
									</div>
								</Item.Description>
								<Item.Extra>
									<Button
										onClick={() => selectActivity(id)}
										floated='right'
										content='View'
										color='blue'
									/>
									<Button
										onClick={() => deleteActivity(id)}
										basic
										floated='right'
										content='Delete'
										color='red'
									/>
									<Label basic content={category} />
								</Item.Extra>
							</Item.Content>
						</Item>
					)
				)}
			</Item.Group>
		</Segment>
	)
}
