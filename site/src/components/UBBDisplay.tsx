import React from 'react'
import styled from 'styled-components'

import UBBReact from 'ubb-react'

const UBBCodeStyled = styled.div`
  padding: 15px 20px;
  margin-bottom: 20px;
  padding: 15px 20px;
  border: 2px solid #ccc;
`

const UBBContainerStyled = styled.div`
  padding: 15px 20px;
  border: 2px solid #66ccff;
`

type Prop = {
  text: string
}

const UBBDisplay: React.SFC<Prop> = ({text}) => {
  return (
    <>
      <UBBCodeStyled>
        {text}
      </UBBCodeStyled>
      <UBBContainerStyled>
        {UBBReact(text)}
      </UBBContainerStyled>
    </>
  )
}

export default UBBDisplay
