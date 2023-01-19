import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { useStore } from '../../../App/stores/Store'
import ActivityFilters from './ActivityFilters'
import ActivityList from './ActivityList'

export default observer(function ActivityDashboard() {
	const { activityStore } = useStore()
	const { activityRegistry, loadActivities } = activityStore

	useEffect(() => {
		if (activityRegistry.size <= 1) loadActivities()
	}, [activityRegistry.size, loadActivities])

	if (activityStore.loadingInitial)
		return <LoadingComponent content='Loading...' />

	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList />
			</Grid.Column>
			<Grid.Column width={6}>
				<ActivityFilters />
			</Grid.Column>
		</Grid>
	)
})
