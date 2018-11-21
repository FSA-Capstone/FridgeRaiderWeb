import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'

const NewRecipe = () => {
  return (
    <Fragment>
      <Typography variant="title" style={{marginTop: "10vh", marginBottom: "5vh", fontWeight: "bold"}}>
        New Recipe...
      </Typography>
    </Fragment>
  )
}

export default NewRecipe