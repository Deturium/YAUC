import React from 'react'
import styled from 'styled-components'

import UBBReact from 'ubb-react'

const TextareaStyled = styled.textarea`
  width: 100%;
  height: 160px;
  margin-bottom: 20px;
  padding: 15px 20px;

  border: 2px solid #ccc;
  outline: none;
  resize: none;
`

interface State {
  readonly text: string
}

export default class UBBPlayground extends React.Component<{}, State>{
  state: State = {
    text: ''
  }

  inputHandle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      text: event.target.value
    })
  }

  render() {
    return (
      <>
        <TextareaStyled
          autoFocus={true} spellCheck={false}
          onChange={(e) => this.inputHandle(e)}
        />
        <div>
          { UBBReact(this.state.text) }
        </div>
      </>
    )
  }
}

