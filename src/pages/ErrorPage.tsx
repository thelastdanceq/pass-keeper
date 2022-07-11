import React from 'react'
import { Link } from 'react-router-dom'
import { HOME_PAGE } from '../constants/urls/urls'

export const ErrorPage = () => {
  return (
    <h1>
      OOOOPS, something goes wrong, come here <Link to={HOME_PAGE}>HOME</Link>
    </h1>
  )
}
