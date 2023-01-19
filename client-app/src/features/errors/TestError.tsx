import React, { useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'
import ValidationErrors from './ValidationErrors'
import { router } from '../../App/router/Routes'

export default function TestErrors() {
	const [errors, setErrors] = useState(null)
	const baseUrl = 'http://localhost:5000/api/'

	function handleNotFound() {
		axios
			.get(baseUrl + 'buggy/not-found')
			.catch((err) => console.log('TestError handleNotFound: ', err.response))
	}

	function handleBadRequest() {
		axios
			.get(baseUrl + 'buggy/bad-request')
			.catch((err) => console.log('TestError handleBadRequest: ', err.response))
	}

	function handleServerError() {
		axios
			.get(baseUrl + 'buggy/server-error')
			.catch((err) =>
				console.log('TestError handleServerError: ', err.response)
			)
	}

	function handleUnauthorised() {
		axios
			.get(baseUrl + 'buggy/unauthorised')
			.catch((err) => console.log(err.response.data.status))
	}

	function handleBadGuid() {
		axios.get(baseUrl + 'activities/notaguid').catch((err) => {
			setErrors(err)
			console.log(err)
		})
	}

	function handleValidationError() {
		axios.post(baseUrl + 'activities', {}).catch((err) => {
			console.log('TestError handleValidationError: ', err)
			setErrors(err)
		})
	}

	return (
		<>
			<Header as='h1' content='Test Error component' />
			<Segment>
				<Button.Group widths='7'>
					<Button onClick={handleNotFound} content='Not Found' basic primary />
					<Button
						onClick={handleBadRequest}
						content='Bad Request'
						basic
						primary
					/>
					<Button
						onClick={handleValidationError}
						content='Validation Error'
						basic
						primary
					/>
					<Button
						onClick={handleServerError}
						content='Server Error'
						basic
						primary
					/>
					<Button
						onClick={handleUnauthorised}
						content='Unauthorised'
						basic
						primary
					/>
					<Button onClick={handleBadGuid} content='Bad Guid' basic primary />
				</Button.Group>
			</Segment>
			<Segment secondary>
				<Button
					onClick={() => router.navigate('/server-error')}
					color='red'
					content='Navigate to /server-error'
				/>
			</Segment>
			<ValidationErrors errors={errors}></ValidationErrors>
		</>
	)
}
