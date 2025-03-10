/* eslint-disable react/prop-types */

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={type === 'success' ? 'success' : 'error'}>
        {message}
      </div>
    )
  }

export default Notification