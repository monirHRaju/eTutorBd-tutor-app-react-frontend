import { BeatLoader, HashLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <HashLoader size={100} color='#ff6a16' />
    </div>
  )
}

export default LoadingSpinner
