import { Box, Modal } from '@mui/material';

const ModalFilters = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 1,
          width: '100%',
          maxWidth: 1000,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalFilters;
