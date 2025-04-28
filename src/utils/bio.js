import React from "react"

const Bio = () => {
  

  return (
    <div className="bio">

        
<img
  src={require('../images/profile_pic_1.jpg')}
  alt="Saul with dog on lap"
  width="50"
  height="50"
  style={{ objectFit: 'cover' }}
/>

        <p>
          Created by
          {` `}
          <a href="https://www.saulbelisle.com">
                 Saul Belisle
          </a>
          {` `}
          who lives and works in Boise, ID.
          {` `}
          You should connect with them on
          {` `}
          <a href="https://www.linkedin.com/in/saulbelisle/">
                 Linkedin.
          </a>
        </p>
    </div>
  )
}

export default Bio
