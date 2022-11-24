import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { useStore } from '../../../App/stores/Store'
import { animateScroll } from 'react-scroll'
export default observer(function ActivityDetails() {
	const { activityStore } = useStore()
	const { selectedActivity, loadActivity, loadingInitial } = activityStore
	const { id } = useParams()

	useEffect(() => {
		if (id) loadActivity(id)
		// console.log(`id: ${id}`)
		animateScroll.scrollToTop({ duration: 0 })
	}, [id, loadActivity])

	// console.log(`loadingInitial: ${loadingInitial}`)
	// console.log('activity:', selectedActivity)

	if (loadingInitial || !selectedActivity) return <LoadingComponent />

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{selectedActivity.title}</Card.Header>
				<Card.Meta>
					<span>{selectedActivity.date}</span>
				</Card.Meta>
				<Card.Description>{selectedActivity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths='2'>
					<Button
						as={Link}
						to='..'
						relative='path'
						basic
						content='Cancel'
						color='grey'
					/>
					<Button
						as={Link}
						to={`/manage/${selectedActivity.id}`}
						basic
						content='Edit'
						color='blue'
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	)
})
