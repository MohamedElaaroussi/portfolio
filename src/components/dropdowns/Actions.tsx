import React from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import DeleteModal from "../modals/DeleteModal";
import { SelectIcon } from "../icons/SelectIcon";
import { desactivateMatchAction } from "@/actions/matchActions";
import { useDispatch } from "react-redux";
import { desactivatePlayerAction } from "@/actions/playerActions";
import { desactivateOrderAction } from "@/actions/orderActions";
import { desactivateUserAction } from "@/actions/userActions";

export default function Actions({name,func,id}:{name:string,func:string,id:string}) {
    const dispatch = useDispatch<any>();
    const handleCancelation = (id: string,name:string) => {
        // Dispatch the desactivateMatchAsync action with the match ID
    
        switch (name) {
          case "le match":
           dispatch(desactivateMatchAction(id));
            break
          // case "le joueur":
          //   dispatch(desactivatePlayerAction(id));
            break
          case "la commande":
            dispatch(desactivateOrderAction(id));
            break
          case "l'utilisateur":
            dispatch(desactivateUserAction(id));
            break
          default:
            break;
        }
      };
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="flat"
                    endContent={<SelectIcon className="text-sub-title" color="rgba(181, 181, 195, 1)"/>}
                    className="flex  rounded-md items-center justify-center group-hover:bg-darck"
                >
                <span className="text-sub-title font-medium">Actions</span>    
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" closeOnSelect={false}>
                <DropdownItem>Modifications</DropdownItem>
                <DropdownItem onPress={()=>handleCancelation(id,name)} >Desactiver</DropdownItem>
                <DropdownItem  className="group text-danger" color="danger">
                <DeleteModal name={name} func={func} detail={false} id={id}/>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        )
};