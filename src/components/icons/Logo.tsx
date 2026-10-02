import Svg, {Path} from 'react-native-svg'

import {type Props, useCommonSVGProps} from './common'

// Futuristic ORBIS Celestial Orbit & Sphere
export function Mark(props: Props) {
  const {fill, size, style, gradient, ...rest} = useCommonSVGProps(props)
  return (
    <Svg
      fill="none"
      {...rest}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={[style]}>
      {gradient}
      <Path
        d="M3 21V3h4.5L12 10.5 16.5 3H21v18h-4v-11l-5 8-5-8v11z"
        fill={fill}
      />
    </Svg>
  )
}

export function Full(
  props: Omit<Props, 'fill' | 'size' | 'height'> & {
    markFill?: Props['fill']
    textFill?: Props['fill']
  },
) {
  const {fill, size, style, gradient, ...rest} = useCommonSVGProps(props)
  const ratio = 32 / 120

  return (
    <Svg
      fill="none"
      {...rest}
      viewBox="0 0 120 32"
      width={size}
      height={size * ratio}
      style={[style]}>
      {gradient}
      <Path
        d="M2 29V2h6l8 12 8-12h6v27h-6V12L16 24 8 12v17z"
        fill={props.markFill ?? fill}
      />
      {/* ORBIS Text Branding */}
      <Path
        d="M42 22V10h6c2.5 0 4.5 1.5 4.5 3.8 0 1.6-.9 2.9-2.2 3.4l2.8 4.8h-2.8l-2.4-4.2h-3.5V22H42zm2.4-6.2h3.5c1.2 0 2.2-.7 2.2-1.9s-1-1.9-2.2-1.9h-3.5v3.8zM60 22.3c-3.6 0-6.2-2.7-6.2-6.3s2.6-6.3 6.2-6.3 6.2 2.7 6.2 6.3-2.6 6.3-6.2 6.3zm0-2.3c2.2 0 3.7-1.8 3.7-4s-1.5-4-3.7-4-3.7 1.8-3.7 4 1.5 4 3.7 4zM70 22V10h6c2.5 0 4.5 1.5 4.5 3.8 0 1.6-.9 2.9-2.2 3.4l2.8 4.8h-2.8l-2.4-4.2h-3.5V22H70zm2.4-6.2h3.5c1.2 0 2.2-.7 2.2-1.9s-1-1.9-2.2-1.9h-3.5v3.8zM84 22V10h2.4v12H84zM90 20.2l1.6-1.7c1.3 1.2 2.7 1.8 4.2 1.8 1.4 0 2.2-.6 2.2-1.5 0-.9-.6-1.3-2.5-1.8-2.6-.7-4.1-1.6-4.1-3.6 0-2.2 1.8-3.7 4.4-3.7 1.8 0 3.4.6 4.6 1.7l-1.5 1.7c-1.1-.9-2.3-1.4-3.3-1.4-1.2 0-2 .6-2 1.4 0 .8.6 1.2 2.3 1.6 2.8.7 4.3 1.7 4.3 3.8 0 2.3-1.8 3.8-4.7 3.8-2.1 0-4-0.8-5.4-2.1z"
        fill={props.textFill ?? fill}
      />
    </Svg>
  )
}
