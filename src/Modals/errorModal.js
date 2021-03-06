import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Row } from "reactstrap";

class ErrorModal extends React.Component {
    toggleModal = () => {
        this.props.onToggle(!this.props.open);
    };

    render() {
        const {
            bodyText,
            open,
            modalText,
        } = this.props;
        return (
            <Modal isOpen={open} size="md" toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>{modalText}</ModalHeader>
                <ModalBody>
                    <div>
                        <Row>
                            {bodyText}
                        </Row>
                    </div>
                </ModalBody>
                <ModalFooter>

                    <Button color="secondary" onClick={this.props.onCancel}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ErrorModal;
