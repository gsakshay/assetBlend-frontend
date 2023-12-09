/** @format */

import { useCallback, useState } from "react"
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material"

export const SelectAssets = () => {
	return (
		<Card>
			<CardHeader subheader='Choose your next asset' title='Stocks' />
			<CardContent sx={{ pt: 2 }}>
				<Box sx={{ m: 2 }}>Here goes the search</Box>
			</CardContent>
			<Divider />
			<CardContent sx={{ pt: 2 }}>
				<Box sx={{ m: 2 }}>Here goes the search results</Box>
			</CardContent>
		</Card>
	)
}
