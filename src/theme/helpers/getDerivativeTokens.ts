import { createTheme } from '@ant-design/cssinjs'
import { DerivativeToken, DesignToken } from '../interface'

function getDerivativeTokens(userToken: Partial<DesignToken> = {}) {
  return createTheme((designToken: DesignToken): DerivativeToken => {
    const token = { ...designToken, ...userToken }

    return {
      ...token,
      animationDistance: token.calenderCardSize + token.calenderCardGap,
    }
  })
}

export default getDerivativeTokens
