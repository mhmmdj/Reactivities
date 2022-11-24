import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { useStore } from '../../../App/stores/Store'
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
			<Grid.Column width='10'>
				<ActivityList />
			</Grid.Column>
			<Grid.Column width='6'></Grid.Column>
			<Outlet />
		</Grid>
	)
})
