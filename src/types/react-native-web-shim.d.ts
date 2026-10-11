import 'react-native'

declare module 'react-native' {
  interface ViewProps {
    onClick?: (e: any) => void
    onKeyDown?: (e: any) => void
    role?: any
    "aria-role"?: any
  }
  interface PressableProps {
    onKeyDown?: (e: any) => void
  }
}