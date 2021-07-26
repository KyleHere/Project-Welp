import React, { useState } from "react";
import { Modal } from '../../context/Modal'
import CreateNewBusiness from "../CreateBusinessForm";

import './NewBusinessModal.css'
function NewBusinessModal() {
  const [showNewModal, setShowNewModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowNewModal(true)}
        className="modal-button"
      >Add a new business!</button>
      {showNewModal && (
        <Modal onClose={() => setShowNewModal(false)}>
          <CreateNewBusiness />
        </Modal>
      )}
    </div>
  )
}

export default NewBusinessModal;
