/** @format */

import * as React from "react"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"

// const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
// 	color: theme.status.danger,
// 	"&.Mui-checked": {
// 		color: theme.status.danger,
// 	},
// }))

const theme = createTheme({
	palette: {
		secondary: {
			main: "#FF9209",
		},
	},
})

export default theme
