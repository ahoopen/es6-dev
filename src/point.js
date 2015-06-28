import React from 'react';

class Point extends React.Component {

    //static propTypes = {
    //    initialCount: React.PropTypes.number
    //};

    static defaultProps = {
        initialCount: 0
    };

    state = {
        count: this.props.initialCount
    };

    myProp = {someValue: 42};

    constructor(props) {
        super(props);
    }

    tick() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return (
            <div onClick={this.tick.bind(this)}>
                Clicks: { this.state.count}
            </div>
        );
    }
}
export default Point;
