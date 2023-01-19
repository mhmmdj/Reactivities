import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar() {
	return (
		<Menu inverted fixed='top'>
			<Container>
				<Menu.Item hearder='true' as={NavLink} to='/'>
					<img
						src='/assets/logo.png'
						alt='logo'
						style={{ marginRight: '1rem' }}
					/>
					Reactivities
				</Menu.Item>
				<Menu.Item name='Activities' as={NavLink} to='activities' />
				<Menu.Item name='Errors' as={NavLink} to='errors' />
				<Menu.Item as={Link} to='createActivity'>
					<Button positive content='Create Activity' />
				</Menu.Item>
			</Container>
		</Menu>
	)
}
