import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { useStore } from '../../../App/stores/Store'
import { animateScroll } from 'react-scroll'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSideBar from './ActivityDetailedSideBar'

export default observer(function ActivityDetails() {
	const { activityStore } = useStore()
	const { selectedActivity, loadActivity, loadingInitial } = activityStore
	const { id } = useParams()

	useEffect(() => {
		if (id) loadActivity(id)
		animateScroll.scrollToTop({ duration: 0 })
	}, [id, loadActivity])

	if (loadingInitial || !selectedActivity) return <LoadingComponent />

	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityDetailedHeader activity={selectedActivity} />
				<ActivityDetailedInfo activity={selectedActivity} />
				<ActivityDetailedChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<ActivityDetailedSideBar />
			</Grid.Column>
		</Grid>
	)
})
