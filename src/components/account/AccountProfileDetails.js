/** @format */

import { useCallback, useState } from "react"
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	Unstable_Grid2 as Grid,
} from "@mui/material"

export const AccountProfileDetails = ({ data, action, updateProfile }) => {
	const {
		updateFirstName,
		updateLastName,
		updateEmail,
		updatePhone,
		updateAddress,
	} = action

	return (
		<Card>
			<CardHeader subheader='Manage your profile' title='Profile' />
			<CardContent sx={{ pt: 2 }}>
				<Box sx={{ m: 2 }}>
					<Grid container spacing={3}>
						<Grid xs={12} md={6}>
							<TextField
								fullWidth
								helperText='Please specify the first name'
								label='First name'
								name='firstName'
								onChange={(e) => updateFirstName(e.target.value)}
								required
								value={data.firstName}
							/>
						</Grid>
						<Grid xs={12} md={6}>
							<TextField
								fullWidth
								label='Last name'
								name='lastName'
								onChange={(e) => updateLastName(e.target.value)}
								required
								value={data.lastName}
							/>
						</Grid>
						<Grid xs={12} md={6}>
							<TextField
								fullWidth
								label='Email Address'
								name='email'
								onChange={(e) => updateEmail(e.target.value)}
								required
								value={data.email}
							/>
						</Grid>
						<Grid xs={12} md={6}>
							<TextField
								fullWidth
								label='Phone Number'
								name='phone'
								onChange={(e) => updatePhone(e.target.value)}
								type='number'
								value={data.phone}
							/>
						</Grid>
						<Grid xs={12}>
							<TextField
								fullWidth
								label='Address'
								name='address'
								onChange={(e) => updateAddress(e.target.value)}
								required
								value={data.address}
							/>
						</Grid>
					</Grid>
				</Box>
			</CardContent>
			<Divider />
			<CardActions sx={{ justifyContent: "flex-end" }}>
				<Button onClick={updateProfile} variant='contained'>
					Save details
				</Button>
			</CardActions>
		</Card>
	)
}
