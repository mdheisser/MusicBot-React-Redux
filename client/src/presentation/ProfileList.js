import React from 'react'

const ProfileList = ({list}) => (
  <div className="list-group">
    {list && list.map(data =>
        <div className="list-group-item" key={data.id}>
          <a href={data.spotify_url}>
            {data.name}
          </a>
        </div>
    )}
  </div>
)

export default ProfileList
