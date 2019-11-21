import React from 'react';

class AllPoliticians extends React.Component {
    state = {
        politicians: []
      }
    
      componentDidMount() {
        this.getPoliticians()
      }
    
      getPoliticians = () => {
        axios({
          url: `${databaseUrl}/politicians`,
          method: 'get'
        })
          .then(response => {
            console.log(response)
            // this.setState({ politicians })
          })
      }
      
    render() {
        return (

        )
    }
}

export default AllPoliticians