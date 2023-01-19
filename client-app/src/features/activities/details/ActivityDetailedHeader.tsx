import { observer } from 'mobx-react-lite'
import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { Activity } from '../../../App/Model/Activity'

const activityImageStyle = {
	filter: 'brightness(30%)',
}

const activityImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white',
}

interface Props {
	activity: Activity
}
export default observer(function ActivityDetailedHeader({ activity }: Props) {
	return (
		<Segment.Group>
			<Segment basic attached='top' style={{ padding: '0' }}>
				<Image
					src={`/assets/categoryImages/${activity.category}.jpg`}
					fluid
					style={activityImageStyle}
				/>
				<Segment style={activityImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size='huge'
									content={activity.title}
									style={{ color: 'white' }}
								/>
								<p>{activity.date}</p>
								<p>
									Hosted by <strong>Mehdi</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing attached='bottom'>
				<Button color='teal' content='Join Activity' />
				<Button content='Cancel attendance' />
				<Button color='orange' content='Manage Event' floated='right' />
			</Segment>
		</Segment.Group>
	)
})
