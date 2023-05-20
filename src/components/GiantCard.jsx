import { useContext } from 'react'
import { StylesContext } from '@/contexts/StylesContext';

export default function GiantCard() {

    const { GiantCardStyles } = useContext(StylesContext);


  return (
    <div className={GiantCardStyles.container}>
        GiantCard
    </div>
  )
}
