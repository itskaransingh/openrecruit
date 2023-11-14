
import { View, Image ,TouchableOpacity } from 'react-native'

import styles from './screenheader.style'

type Props = {
  iconUrl: string,
  onPress?: () => void
  dimension?: string
}

const ScreenHeaderBtn = ({
  iconUrl,
  dimension,
  onPress
}: Props) => {
  return (
     <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
       
         <Image source={iconUrl} resizeMode='cover' style={styles.btnImg(dimension)}/>
       
     </TouchableOpacity>
  )
}

export default ScreenHeaderBtn