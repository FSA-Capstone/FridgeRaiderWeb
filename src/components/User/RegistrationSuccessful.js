import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const RegistrationSuccessful = () => {
  return (
    <Fragment>
      <Typography variant="title" style={{marginTop: "10vh", marginBottom: "5vh", fontWeight: "bold"}}>
        Account successfully created.
      </Typography>
      <Typography variant="subheading">
        <Link to="/login">Login Here to proceed..</Link>
      </Typography>
    </Fragment>
  )
}

export default RegistrationSuccessful