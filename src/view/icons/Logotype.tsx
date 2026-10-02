import Svg, {Path, type SvgProps} from 'react-native-svg'

import {useTheme} from '#/alf'

export function Logotype({
  width = 80,
  fill,
  ...props
}: Omit<SvgProps, 'width' | 'height'> & {
  width?: number
  fill?: SvgProps['fill']
}) {
  const t = useTheme()
  const color = fill ?? t.atoms.text.color
  const height = (width * 28) / 100

  return (
    <Svg
      fill="none"
      viewBox="0 0 100 28"
      width={width}
      height={height}
      {...props}>
      {/* ORBIS Bold Modern Typo */}
      <Path
        d="M14 24C7.37 24 2 19.52 2 14S7.37 4 14 4s12 4.48 12 10-5.37 10-12 10zm0-4.5c4.14 0 7.5-2.46 7.5-5.5s-3.36-5.5-7.5-5.5-7.5 2.46-7.5 5.5 3.36 5.5 7.5 5.5zM30 23.5V4.5h8c3.5 0 6 2.1 6 5.2 0 2.2-1.3 4-3.2 4.8L45 23.5h-4.2l-3.8-8.2h-3v8.2H30zm4-11.8h4c1.7 0 2.8-.9 2.8-2.2 0-1.4-1.1-2.2-2.8-2.2h-4v4.4zM49 23.5V4.5h7.5c3.2 0 5.5 1.5 5.5 3.8 0 1.5-.9 2.7-2.3 3.3 1.8.6 3 2 3 3.9 0 2.6-2.4 4.5-6 4.5H49zm4-11.2h3.2c1.2 0 2-.6 2-1.6 0-1-.8-1.6-2-1.6H53v3.2zm0 7.4h3.6c1.4 0 2.2-.7 2.2-1.8 0-1.1-.8-1.8-2.2-1.8H53v3.6zM69 23.5V4.5h4v19H69zm9 0V4.5h4v19H78z"
        fill={color}
      />
    </Svg>
  )
}
