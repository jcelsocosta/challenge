import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from '@nextui-org/react'
import { notifyError, notifySuccess } from './notification/Notification'
import { movieController } from './MovieController'

export interface IReIndexModalProps extends React.ComponentPropsWithoutRef<'div'> {
  isOpen: any
  onOpenChange: any
}

export default function ReIndexModal({ isOpen, onOpenChange }: IReIndexModalProps) {
  const [selected, setSelected] = React.useState('release_date')

  async function handleOnClickConfirm(): Promise<void> {
    const { error } = await movieController.reIndexMovie(selected)

    if (error) {
      notifyError(error.message)
      return
    }
    notifySuccess('Index created successfully')
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Index</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-3">
                  <RadioGroup label="Select index" value={selected} onValueChange={setSelected}>
                    <Radio value="release_date">Release Date</Radio>
                    <Radio value="popularity">Popularity</Radio>
                    <Radio value="vote_average">Vote Average</Radio>
                  </RadioGroup>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-start border-t-1">
                <Button
                  color="primary"
                  onPress={async () => {
                    await handleOnClickConfirm()
                    onClose()
                  }}
                >
                  Confirm
                </Button>
                <Button color="danger" variant="solid" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
