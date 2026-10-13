import React from 'react'

const Modal = ({ onclose }) => {
  return (

       <div onClick={onclose} style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            // zIndex: 1000
          }}>
  <div 
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
        zIndex: 1000
    }}
  >
    <div onClick={(e) => e.stopPropagation()}
      style={{
        background: "white",
        padding: "20px",
        width: "300px",
        margin: "100px auto",
        borderRadius: '10px',
      }}
    >
      <div className="modal" >
          <div className="modal-content">
            <span className="close" style={{ float: 'top-right', cursor: 'pointer', size: '20px' }}
             onClick={onclose}>&times;</span>
            <h2 style={{ textAlign: 'center' }}>Order Confirmation</h2>
            <p style={{ textAlign: 'center' }}>
                HEY GARIB TERE PASS TOH PAISE HAI NA, ABHI TOH MERE KO BHI DE DE, PHIR DEKHNA KYA HOTA HAI
            </p>
            <p>

              Thank you for your purchase! Your order has been placed successfully.
            </p>
          </div>
        </div>
    </div>
  </div>
</div>
  )
}

export default Modal
