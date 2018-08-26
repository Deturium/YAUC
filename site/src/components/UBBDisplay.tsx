import React from 'react'
import styled from 'styled-components'

import UBBReact from '@cc98/ubb-react'

const UBBCodeStyled = styled.div`
  padding: 15px 20px;
  margin-bottom: 20px;
  padding: 15px 20px;
  border: 2px solid #ccc;
  white-space: pre-wrap;
`

const UBBContainerStyled = styled.div`
  padding: 15px 20px;
  border: 2px solid #66ccff;
`

type Props = {
  text: string
}

const UBBDisplay: React.SFC<Props> = ({text}) => {
  let display: React.ReactNode

  try {
    display = UBBReact(text)
  } catch (_) {
    display = 'ERROR'
  }

  return (
    <>
      <UBBCodeStyled>
        {text}
      </UBBCodeStyled>
      <UBBContainerStyled>
        {display}
      </UBBContainerStyled>
    </>
  )
}

export default UBBDisplay
