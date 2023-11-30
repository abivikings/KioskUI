/////////////////////////////////////////////////////////////////
/// HARD RELOAD ISSUE NOT SOLVED ////////////////////////////////
/// Auth LAB  - Shahadat Trying  ////////////////////////////////
/////////////////////////////////////////////////////////////////


// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios, { Axios } from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

import jwt from 'jsonwebtoken'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      let response = [200, {}]

      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const storedUserData = JSON.parse(window.localStorage.getItem('userData'))
      if (storedToken) {
        console.log('Stored Token ->', storedToken)
        // setLoading(true)
        console.log('Stored User Data ==> ', storedUserData)

        // ** Checks if the token is valid or expired
        jwt.verify(storedToken, jwtConfig.secret, (err, decoded) => {
          // ** If token is expired
          if (err) {
            // ** If onTokenExpiration === 'logout' then send 401 error
            if (authConfig.onTokenExpiration === 'logout') {
              // ** 401 response will logout user from AuthContext file
              response = [401, { error: { error: 'Invalid User' } }]
            } else {
              // ** If onTokenExpiration === 'refreshToken' then generate the new token
              // const oldTokenDecoded = jwt.decode(storedToken, { complete: true })

              // Removing surrounding quotes
              const token = storedToken.replace(/^"(.*)"$/, '$1')
              const oldTokenDecoded = jwt.decode(token, { complete: true })
              console.log('Decode Token ==> ', oldTokenDecoded)

              // ** Get user id from old token
              // @ts-ignore
              const userId =
                oldTokenDecoded.payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']

              // ** Get user that matches id in token
              const user = storedUserData.userId

              // ** Sign a new token
              const accessToken = jwt.sign({ userId: userId }, jwtConfig.secret, {
                expiresIn: jwtConfig.expirationTime
              })

              // ** Set new token in localStorage
              window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
              const obj = { userData: { ...user, password: undefined } }
              setLoading(false)

              // ** return 200 with user data
              response = [200, obj]
            }
          } else {
            // ** If token is valid do nothing
            // @ts-ignore
            const userId = decoded.id

            // ** Get user that matches id in token
            const userData = storedUserData.userId
            delete userData.password
            setLoading(false)

            // ** return 200 with user data
            response = [200, { userData }]
          }
        })
      } else {
        setLoading(false)
      }

      return response
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    console.log('public url', process.env.NEXT_PUBLIC_BASE_URL)

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}api/token`, {
        email: params.email,
        password: params.password
      })
      .then(async response => {
        response.data.userData.role = response.data.userData.userrole
        console.log('user login Data => ', response.data)

        const accessTokenX = JSON.stringify(response.data.accessToken)
        const userDataX = JSON.stringify(response.data.userData)

        window.localStorage.setItem('accessToken', accessTokenX)
        window.localStorage.setItem('userData', userDataX)

        const params = new URLSearchParams([['UserId', response.data.userData.userId]])
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/GetUserInfoByUserId`, { params })

        console.log('Res from URL Search Param -> ', res)
        console.log('Res from URL Search Param -> ', res.data)

        response.data.userData.Member = res.data.Member
        response.data.userData.fullname = res.data.fullname

        console.log('Auth Config Storage Token Key Name -> ', authConfig.storageTokenKeyName)

        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        console.log('error', err)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setLoading(false), window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
