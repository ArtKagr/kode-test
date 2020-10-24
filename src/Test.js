import React from 'react';
export class Test extends React.Component {
    constructor(props) {
        super(props)
        this.setNewValue = this.setNewValue.bind(this)
        this.state = { height: 10 }
    }

    setNewValue() {
        this.setState((state, props) => ({
            height: state.height + props.testing
        }))
    }

    render() {
        const height = this.state.height
        return (
            <div className="Test">
                <span>{height}</span>
                <button onClick={this.setNewValue}>Нажать</button>
            </div>
        )
    }
}