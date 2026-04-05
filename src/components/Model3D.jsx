import React, { useEffect } from 'react'

const Model3D = ({ modelPath = '/model.glb' }) => {
    useEffect(() => {
        // Load model-viewer script
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer/dist/model-viewer.min.js'
        script.type = 'module'
        document.head.appendChild(script)

        return () => {
        }
    }, [])

    return (
        <div className='w-full h-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out'>
            <model-viewer
                src={modelPath}
                alt="3D Model"
                auto-rotate
                camera-controls
                environment-image="neutral"
                auto-rotate-delay="0"
                rotation-per-second="15deg"
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                }}
                shadow-intensity="2"
                exposure="1"
            ></model-viewer>
        </div>
    )
}

export default Model3D
