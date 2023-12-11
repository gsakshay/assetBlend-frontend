/** @format */

import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material"

export const AccountProfile = ({ username, logout }) => {
	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}>
					<Avatar
						sx={{
							height: 80,
							mb: 2,
							width: 80,
						}}
					/>
					<Typography gutterBottom variant='h5'>
						{username}
					</Typography>
				</Box>
			</CardContent>
			<CardActions>
				<Button
					onClick={() => {
						logout()
					}}
					fullWidth
					variant='outlined'
					color='secondary'>
					Logout
				</Button>
			</CardActions>
		</Card>
	)
}
