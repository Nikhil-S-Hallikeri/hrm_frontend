import React from 'react'
import { Modal } from 'react-bootstrap'

const InterviewReviewModal = (props) => {
    const {show,setshow}=props
  return (
    show && <Modal>
        <Modal.Header>
            
        </Modal.Header>
    </Modal>
  )
}

export default InterviewReviewModal