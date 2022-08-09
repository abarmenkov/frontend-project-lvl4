import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import AddChannel from './AddChannel.jsx';

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
