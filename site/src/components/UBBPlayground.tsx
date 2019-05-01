import React from 'react'
import styled from 'styled-components'

import UBBReact from '@cc98/ubb-react'

const TextareaStyled = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  padding: 15px 20px;

  border: 2px solid #ccc;
  outline: none;
  resize: none;
`

const UBBContainerStyled = styled.div`
  padding: 15px 20px;
  border: 2px solid #66ccff;
`

type Props = {
  initText?: string
}

type State = {
  readonly text: string
}

class UBBPlayground extends React.Component<Props, State>{
  state: State = {
    text: this.props.initText || ''
  }

  inputHandle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      text: event.target.value
    })
  }

  render() {

    const { text } = this.state
    return (
      <>
        <TextareaStyled
          value={text}
          placeholder="UBB CODE"
          autoFocus={true} spellCheck={false}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.inputHandle(e)}
        />
        {
          text && <UBBContainerStyled>
            {UBBReact(text)}
          </UBBContainerStyled>
        }
      </>
    )
  }
}

export default UBBPlayground
