import 'styled-components'
import { PartialTheme as NivoTheme } from '@nivo/theming'

declare module 'styled-components' {
    export interface DefaultTheme {
        id: string
        colors: {
            background: string
            text: string
            textLight: string
            codeText: string
            titleText: string
            link: string
            border: string
            borderLight: string
            accent: string
            accentLight: string
            accentDark: string
            accentDarker: string
            cardBackground: string
            cardAltBackground: string
            inputBackground: string
            inputBorder?: string
            gradientColor0: string
            gradientColor1: string
            neutralRange: string[]
            coloredRange: string[]
        }
        dimensions: {
            headerHeight: number
            contentMargin: number
            contentMarginSmall: number
            miniNavWidth: number
            miniNavItemSize: number
        }
        fontFamily: string
        fontFamilyMono: string
        cardShadow: string
        topCardShadow: string
        nivo: NivoTheme
        highlight: any
    }
}
