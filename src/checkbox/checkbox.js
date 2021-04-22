import React, { Component } from 'react'

class Checkbox extends Component {
    render() {
        return (
            <div>
                <label htmlFor="class1">Class: {this.props.value}</label>
                <input type="checkbox" value={this.props.value} checked={this.props.checked} onClick={e => this.props.handleClick(e)}/>
            </div>
        )
    }
}

export default Checkbox