import {type ColorValue, type StyleProp, type ViewStyle} from 'react-native'
import Svg, {Path, Rect, type SvgProps} from 'react-native-svg'

type LogoProps = Omit<
  SvgProps,
  'fill' | 'style' | 'viewBox' | 'width' | 'height'
> & {
  width?: number
  height?: number
  style?: StyleProp<ViewStyle>
  fill?: ColorValue
  allowVariants?: boolean
}

export function Logo({
  width = 36,
  height = width,
  style,
  fill: _fill,
  allowVariants: _allowVariants,
  ...props
}: LogoProps) {
  return (
    <Svg
      
      fill="none"
      viewBox="0 0 100 100"
      width={width}
      height={height}
      style={style}
      {...props}>
      <Rect x="0" y="0" width="100" height="100" rx="22" fill="#000" />
      <Path
        d="M22 74V26h10l18 26 18-26h10v48H67V43L50 67 33 43v31z"
        fill="#fff"
      />
    </Svg>
  )
}
