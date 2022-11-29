import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Label, List, Segment, Image } from 'semantic-ui-react'

export default observer(function ActivityDetailedSideBar() {
	return (
		<>
			<Segment
				textAlign='center'
				attached='top'
				secondary
				inverted
				color='teal'
				style={{ border: 'none' }}
			>
				3 People Going
			</Segment>
			<Segment attached>
				<List relaxed divided>
					<Item style={{ position: 'relative' }}>
						<Label
							style={{ position: 'absolute' }}
							color='orange'
							ribbon='right'
						>
							Host
						</Label>
						<Image size='tiny' src='/assets/user.png' />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={'#'}>Hassan</Link>
							</Item.Header>
							<Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
						</Item.Content>
					</Item>
					<Item style={{ position: 'relative' }}>
						<Image size='tiny' src='/assets/user.png' />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={'#'}>Milad</Link>
							</Item.Header>
							<Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
						</Item.Content>
					</Item>
					<Item style={{ position: 'relative' }}>
						<Image size='tiny' src='/assets/user.png' />
						<Item.Content verticalAlign='middle'>
							<Item.Header as='h3'>
								<Link to={'#'}>Reza</Link>
							</Item.Header>
						</Item.Content>
					</Item>
				</List>
			</Segment>
		</>
	)
})
