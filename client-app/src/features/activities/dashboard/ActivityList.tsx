import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect } from 'react'
import { animateScroll } from 'react-scroll'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../App/stores/Store'
import ActivityItemList from './ActivityListItem'

export default observer(function ActivityList() {
	const { activityStore } = useStore()
	const { groupedActivities } = activityStore

	useEffect(() => animateScroll.scrollToTop({ duration: 0 }), [])

	return (
		<>
			{groupedActivities.map(([date, activities]) => (
				<Fragment key={date}>
					<Header sub color='teal'>
						{date}
					</Header>
					{activities.map((activity, index) => (
						<ActivityItemList key={index} activity={activity} />
					))}
				</Fragment>
			))}
		</>
	)
})
