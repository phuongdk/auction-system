import { createContext } from 'react'
import { UserInfo } from '../ultilities/interfaces'

const UserContext = createContext<UserInfo>({} as UserInfo)

export { UserContext }