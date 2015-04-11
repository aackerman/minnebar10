import React from 'react';
import Adapter from './adapter';

let rest = new Adapter({
  host: 'https://api.github.com'
})

const PLACEKITTEN = 'https://placekitten.com/g/200/300';

let App = React.createClass({
  getInitialState() {
    return { img: PLACEKITTEN }
  },

  lookupUser(e) {
    e.preventDefault();
    let username = this.refs.username.getDOMNode().value;
    rest.find('users', username).then((res) => {
      this.setState({ img: res.avatar_url });
    }, (err) => {
      this.setState({ img: PLACEKITTEN });
    });
  },

  render() {
    let styles = {
      img: {
        width: 200
      },
      imgContainer: {
        width: 200,
        margin: '30px auto'
      },
      container: {
        width: 600,
        margin: '0 auto'
      }
    };

    return (
      <div style={styles.container}>
        <h1>Hello Minnebar!</h1>
        <form onSubmit={this.lookupUser}>
          <label>
            <span>Github Username </span>
            <input ref="username"/>
          </label>
          <button type="submit">Find</button>
        </form>
        <div style={styles.imgContainer}>
          <img src={this.state.img} style={styles.img}/>
        </div>
      </div>
    );
  }
});

export default App;
