import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './successMessage.css';


function SuccessMessage(props) {
    const { show, setShow } = props
    const handleClose = () => setShow(false);
    return (
        <div>
            <Modal show={show} onHide={handleClose} className="modal-green">
                <Modal.Header className="modal-header-green">
                    <Modal.Title className="modal-title-green mx-auto">Vote Successfully Given</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="modal-footer-green">
                    <Button variant="secondary" className="mx-auto" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default SuccessMessage