'use client';

import {signOut} from 'next-auth/react'

const Users = () => {
    return ( 
        <div>
            <div>Hello users</div>
            <button onClick={() => signOut()}>Logout</button>
        </div>
     );
}
 
export default Users;