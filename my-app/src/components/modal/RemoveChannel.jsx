import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { hideModal } from '../../store/modalsSlice.js';
import useChatApi from '../../hooks/useChatApi.jsx';

const RemoveChannel = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'removeChannel' });
  const { removeCurrentChannel } = useChatApi();
  const currentChannel = useSelector((state) => state.modals.item);
  const dispatch = useDispatch();

  const apiResponseHandle = (response) => {
    if (response.status === 'ok') {
      toast.success(t('successMessage'), {
        position: 'top-center',
      });
      dispatch(hideModal());
    } else {
      toast.error(t('networkError'), {
        position: 'top-center',
      });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    removeCurrentChannel(currentChannel, apiResponseHandle);
  };

  return (
    <Modal show onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modalTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {t('description')}
      </Modal.Body>

      <Modal.Footer>
        <Form onSubmit={onFormSubmit}>
          <div className="d-flex mt-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => dispatch(hideModal())}
            >
              {t('cancel')}
            </Button>

            <Button
              type="submit"
              variant="danger"
              className="mx-2"
            >
              {t('removeButton')}
            </Button>
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
