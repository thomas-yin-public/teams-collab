import React, { useState } from 'react'
import { requestUserLogin } from '../../request/requestFunction';

function LoginPlugin({ setUserToken, setUserId }) {
  const [userEmailInput, setUserEmailInput] = useState("")
  const [userPasswordInput, setUserPasswordInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const userLogin = (e) => {
    e.preventDefault();
    requestUserLogin(userEmailInput, userPasswordInput).then(res => {
      if (res.success) {
        setUserToken(res.token)
        setUserId(res.userId)
      }
      else
        setErrorMessage(res.err)
    })
  }

  return (
    <div className="container-fluid login-page">
      <form className="border p-3 bg-white login-box rounded shadow" onSubmit={e => userLogin(e)}>
        <label className="form-label">Email: </label>
        <input className="form-control" onChange={e => setUserEmailInput(e.target.value)}></input>

        <label className="form-label">Password: </label>
        <input className="form-control" onChange={e => setUserPasswordInput(e.target.value)}></input>
        <button className="btn btn-primary my-3 w-100" type="submit">Login</button>
      </form>
      <div>{errorMessage}</div>
    </div>
  )
}

export default LoginPlugin
