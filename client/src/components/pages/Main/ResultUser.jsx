import React, { Component } from 'react';
import UserItem from './UserItem';

export class ResultUser extends Component {

    render() {
        const users = this.props.users;
        const userStyle = {
            // display: 'grid',
            // gridTemplateColumns: 'repeat(4, 1fr)',
            // gridGap: '1rem'
            width: '100%',
            display: 'flex',
            'flexWrap': 'wrap',
            'justifyContent': 'center'
        
        }

        return (
            <div style={userStyle}>
                {users && users.length > 0 ? users.map((user, i) => <UserItem key={i} user={user}/>)
                : null}
            </div>
        )
    }
}

export default ResultUser
