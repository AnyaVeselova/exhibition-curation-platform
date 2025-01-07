import React from 'react'

const Artwork = ({params}:{params:{artwork:number}}) => {
  
  return (
    <div>Artwork {params.artwork}</div>
  )
}

export default Artwork