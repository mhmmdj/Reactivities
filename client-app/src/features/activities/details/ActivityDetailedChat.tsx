import { observer } from 'mobx-react-lite'
import React from 'react'
import { Header, Segment, Comment, Form, Button } from 'semantic-ui-react'

export default observer(function ActivityDetailedChat() {
	return (
		<>
			<Segment
				textAlign='center'
				attached='top'
				inverted
				color='teal'
				style={{ border: 'none' }}
			>
				<Header>Chat about this event</Header>
			</Segment>
			<Segment attached>
				<Comment.Group>
					<Comment>
						<Comment.Avatar src='/assets/user.png' />
						<Comment.Content>
							<Comment.Author as='a'>Ali</Comment.Author>
							<Comment.Metadata>
								<div>today at 11:34AM</div>
							</Comment.Metadata>
							<Comment.Text>Great job!</Comment.Text>
							<Comment.Actions>
								<Comment.Action>Reply</Comment.Action>
							</Comment.Actions>
						</Comment.Content>
					</Comment>
					<Comment>
						<Comment.Avatar src='/assets/user.png' />
						<Comment.Content>
							<Comment.Author as='a'>Behnam</Comment.Author>
							<Comment.Metadata>
								<div>yesterday at 09:11PM</div>
							</Comment.Metadata>
							<Comment.Text>High Resolution, Thnks.</Comment.Text>
							<Comment.Actions>
								<Comment.Action>Reply</Comment.Action>
							</Comment.Actions>
						</Comment.Content>
					</Comment>
					<Form reply>
						<Form.TextArea />
						<Button
							content='Add Reply'
							labelPosition='left'
							icon='edit'
							primary
						/>
					</Form>
				</Comment.Group>
			</Segment>
		</>
	)
})
