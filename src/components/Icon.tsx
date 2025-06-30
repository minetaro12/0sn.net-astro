import { IconData } from './IconData'

const Icon = ({
  name,
  size = '1em'
}: {
  name: keyof typeof IconData
  size?: number | `${number}px` | `${number}rem` | `${number}em`
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
    >
      <path d={IconData[name]}></path>
    </svg>
  )
}

export default Icon
