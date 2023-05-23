import type { CSSObject } from '@ant-design/cssinjs'
import type DerivativeToken from './DerivativeToken'
import type { ColorsMapToken, FontMapToken, SeedMapToken } from './maps'

export type GetStyle = (prefixCls: string, token: DerivativeToken) => CSSObject

export type DesignToken = ColorsMapToken & FontMapToken & SeedMapToken

export type { ColorsMapToken, FontMapToken, SeedMapToken, DerivativeToken }
