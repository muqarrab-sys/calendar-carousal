import type { Theme } from '@ant-design/cssinjs'
import { useCacheToken } from '@ant-design/cssinjs'
import React from 'react'
import getDerivativeTokens from './helpers/getDerivativeTokens'
import defaultDesignToken from './tokens/defaultDesignToken'
import { DerivativeToken, DesignToken } from './interface'

export const ThemeContext = React.createContext(getDerivativeTokens())

interface DesignTokenContext {
  token?: DesignToken
  hashed?: string | boolean
}
export const DesignTokenContext = React.createContext<DesignTokenContext>({
  token: defaultDesignToken,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useToken(): [Theme<any, any>, DerivativeToken, string] {
  const { token: rootDesignToken = {}, hashed } = React.useContext(DesignTokenContext)
  const theme = React.useContext(ThemeContext)

  const [token, hashId] = useCacheToken<DerivativeToken, DesignToken>(theme, [defaultDesignToken, rootDesignToken], {
    salt: typeof hashed === 'string' ? hashed : '',
  })
  return [theme, token, hashed ? hashId : '']
}
