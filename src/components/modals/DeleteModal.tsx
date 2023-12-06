import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Avatar,
  Input,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  SelectedItems,

} from '@nextui-org/react';
import { statusOptions, users } from '../../utils/data';
import LayoutIcon from '../icons/LayoutIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { WarningIcon } from '../icons/WarningIcon';
import { useDispatch } from 'react-redux';
import { deleteMatchAction } from '@/actions/matchActions';
import { deleteorderAction } from '@/actions/orderActions';
import { deleteplayerAction } from '@/actions/playerActions';
import { deleteUserAction } from '@/actions/userActions';



export default function DeleteModal({ name, func, detail, id }: { name: string, func: string, detail: boolean, id: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch<any>();

  const handleDelete = (id: string,onClose:any,name:string) => {
    // Dispatch the deleteMatchAsync action with the match ID

    switch (name) {
      case "le match":
      console.log("Deleting match:", id);
       dispatch(deleteMatchAction(id));
        break
      case "le joueur":
        dispatch(deleteplayerAction(id));
        break
      case "la commande":
        dispatch(deleteorderAction(id));
        break
      case "l'utilisateur":
        dispatch(deleteUserAction(id));
        break
      default:
        break;
    }
    onClose();
  };

  return (
    <>{detail ?
      <Button onClick={onOpen} className="bg-errer rounded-md py-5 w-[45vw] lg:w-[10vw]">
        <span className="font-medium text-WT lg:text-[0.75vw] text-[3vw]">{func} {name}</span>
      </Button>
      :
      <button onClick={onOpen} className='bg-none flex w-full justify-start'>
        <span className=" text-danger cursor-pointer active:opacity-50 group-hover:text-WT">
          Supprimer
        </span>
      </button>}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="md">
        <ModalContent>
          {(onClose) => (
            <div className=' flex flex-col gap-[4vh] items-center justify-center h-[35vh] '>
              <WarningIcon />
              <span className='text-center w-[50vw] text-gray-400 font-bold lg:text-[1vw] lg:w-[17vw]'>Vous voulez vraiment<span className='text-errer font-bold lg:text-[1vw]'> {func}</span> {name}</span>
              <div className='flex w-full justify-around'>
                <Button className='lg:w-[9vw] lg:h-[3vw] bg-green' onClick={()=>handleDelete(id,onClose,name)}><span className='text-WT font-medium lg:text-[1vw]'>Oui</span></Button>
                <Button onClick={onClose} className='lg:w-[9vw] lg:h-[3vw] bg-errer'><span className='text-WT font-medium lg:text-[1vw]'>Non</span></Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
