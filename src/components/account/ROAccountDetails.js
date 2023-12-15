/** @format */

import {
	Box,
	Card,
	CardContent,
	CardHeader,
	TextField,
	Unstable_Grid2 as Grid,
	Typography,
} from "@mui/material"

export const ROAccountDetails = ({ data }) => {
	console.log(data, "data")
	return (
		<Card>
			<CardHeader subheader={`${data.firstName}'s profile`} title='Profile' />
			<CardContent sx={{ pt: 2 }}>
				<Box sx={{ m: 2 }}>
					<Grid container spacing={3}>
						<Grid xs={12} md={6}>
							<TextField
								fullWidth
								label='First name'
								name='firstName'
								disabled={true}
								required
								value={data.firstName}>
								{data.firstName}
							</TextField>

							{/* <Typography component='span' variant='h4' color='secondary'>
								First Name :
							</Typography>
							<Typography component='span' variant='h4' color='primary'>
								{data.firstName}
							</Typography> */}
						</Grid>
						<Grid xs={12} md={6}>
							<TextField
								fullWidth
								label='Last name'
								name='lastName'
								disabled={true}
								required
								value={data.lastName}
							/>
						</Grid>
						<Grid xs={12}>
							<TextField
								fullWidth
								label='Email Address'
								name='email'
								disabled={true}
								required
								value={data.email}
							/>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	)
}
