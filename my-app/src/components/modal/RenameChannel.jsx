import React, { createRef, useEffect } from 'react';
import {
  Button, Modal, Form, FloatingLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFormik,
} from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../store/channelsSlice.js';
import useChatApi from '../../hooks/useChatApi.jsx';
import { hideModal } from '../../store/modalsSlice.js';

const RenameChannel = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'renameChannelModal' });
  const inputRef = createRef();
  const { renameCurrentChannel } = useChatApi();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((item) => item.name);
  const currentChannel = useSelector((state) => state.modals.item);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

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

  const validationSchema = yup.object({
    channelName: yup.string()
      .required('required', 'required')
      .notOneOf(channelsNames, 'alreadyExist'),
  });

  const f = useFormik({
    initialValues: { channelName: currentChannel.name },
    validationSchema,
    onSubmit: (values) => {
      const name = values.channelName;
      renameCurrentChannel({
        id: currentChannel.id,
        name,
      }, apiResponseHandle);
    },
  });

  return (
    <Modal show onHide={() => dispatch(hideModal())}>

      <Modal.Header closeButton>
        <Modal.Title>{t('modalTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form onSubmit={f.handleSubmit}>

          <FloatingLabel label={t('fieldLabel')} controlId="channelName">
            <Form.Control
              name="channelName"
              type="text"
              placeholder={t('fieldPlaceholder')}
              ref={inputRef}
              value={f.values.channelName}
              onChange={f.handleChange}
              isInvalid={(f.touched.channelName && !!f.errors.channelName)}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.channelName ? t(f.errors.channelName) : null}
            </Form.Control.Feedback>
          </FloatingLabel>

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
              className="mx-2"
            >
              {t('renameButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
