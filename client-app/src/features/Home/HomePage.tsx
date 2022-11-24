import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { Container } from 'semantic-ui-react'

export default function HomePage() {
	useEffect(() => animateScroll.scrollToTop({ duration: 0 }), [])

	return (
		<Container style={{ marginTop: '7em' }}>
			<h1>Home Page</h1>
			<h3>
				Go to <Link to='/activities'>Activities</Link>
			</h3>
		</Container>
	)
}
