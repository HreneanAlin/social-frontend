import { Typography } from "@material-ui/core"

export const printErrors = errors => {
    console.log(errors)
   return Object.values(errors).flat().map((err, index) => (
      <Typography color="error" variant="subtitle1" key={index}>{err.message}</Typography>
  ))
  }