'use client';

import {Card, CardHeader, Modal, ModalContent, ModalHeader} from '@heroui/react';

const Search = ({}) => {
  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      backdrop='transparent'
      className='overflow-auto'
      style={{
        backgroundColor: 'var(--aside-background)',
        maxHeight: '600px',
      }}
    >
      <ModalContent><ModalHeader>
        </ModalHeader>
      </ModalContent>{' '}
    </Modal>
  );
};
export default Search;
