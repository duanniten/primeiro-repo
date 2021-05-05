import './styles.css'
import { Component } from 'react'

export class Button extends Component {
  render(){
    const {disabled, onClick} = this.props

    return (
      <button 
        onClick = {onClick} 
        className = 'button'
        disabled = {disabled}
        >
        Load More POSTS
      </button>
    )
  }
}