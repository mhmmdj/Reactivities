import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { animateScroll } from 'react-scroll'

export default function NotFound() {
	useEffect(() => {
		animateScroll.scrollToTop({ duration: 0 })
	}, [])

	return (
		<Segment basic placeholder style={{ marginTop: '15rem' }}>
			<Header icon>
				<Icon name='search' style={{ marginBottom: '2rem' }} />
				Sorry, We Couldn't find this...
			</Header>
			<Segment.Inline>
				<Button
					as={Link}
					to='/activities'
					primary
					style={{ marginTop: '5rem' }}
				>
					Return to Activities page
				</Button>
			</Segment.Inline>
		</Segment>
	)
}
