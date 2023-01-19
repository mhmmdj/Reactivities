import React from 'react'
import { Message } from 'semantic-ui-react'

interface Props {
	errors: string[] | null
}

export default function ValidationErrors({ errors }: Props) {
	return (
		<>
			{errors && (
				<Message error>
					<Message.List>
						{errors.map((err, i) => (
							<Message.Item key={i}>{err}</Message.Item>
						))}
					</Message.List>
				</Message>
			)}
		</>
	)
}
