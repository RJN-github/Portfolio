import React from 'react'
import LightPillar from '../uicomponent/LightPillar'

const Bg = () => {
  return (
    <div className='fixed inset-0 -z-10'> 
  <LightPillar
    topColor="#000000"
    bottomColor="#964545"
    intensity={1}
    rotationSpeed={0.5}
    interactive={false}
    glowAmount={0.006}
    pillarWidth={3.7}
    pillarHeight={1}
    noiseIntensity={2.3}
    pillarRotation={26}
  />
    </div>
  )
}

export default Bg