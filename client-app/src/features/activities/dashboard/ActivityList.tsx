import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../App/stores/Store'

export default observer(function ActivityList() {
	const { activityStore } = useStore()
	const { activitiesByDate, deleteActivity, loading_List } = activityStore

	const [target, setTarget] = useState('')

	function HandleDeleteActivity(
		e: SyntheticEvent<HTMLButtonElement>,
		id: string
	) {
		setTarget(e.currentTarget.name)
		deleteActivity(id)
	}

	useEffect(() => animateScroll.scrollToTop({ duration: 0 }), [])

	return (
		<Segment>
			<Item.Group divided>
				{activitiesByDate.map(
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
										as={Link}
										to={`${id}`}
										floated='right'
										content='View'
										color='blue'
									/>
									<Button
										name={id}
										loading={loading_List && target === id}
										onClick={(e) => HandleDeleteActivity(e, id)}
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
})
