import Image from "next/image"
import React from "react"
import DeleteModal from "../modals/DeleteModal";
import CartIcons from "../icons/CartIcons";
import { Button } from "@nextui-org/react";
import { FactureIcon } from "../icons/FactureIcon";
import EnvoiIcon from "../icons/EnvoiIcon";
import Location from "../icons/Location";
import { users } from "@/utils/data";
import TicketIcon from "../icons/TicketIcon";
import CalendarIcon from "../icons/CalendarIcon";
import Timesquare from "../icons/Timesquare";
import LogoIcon from "../icons/LogoIcon";


export default function OrderDetails() {
  const [num, setNum] = React.useState<Number>(1);
  return (
    <div className="flex flex-col gap-[2vh] lg:gap-[1.5vw] items-end">
      <div className="flex flex-col w-[90vw] lg:w-auto lg:flex-row gap-[2vh] lg:gap-[2vw] lg:h-[25vh]">
        <div className="bg-WT h-full lg:w-[25vw] flex flex-col rounded-lg shadow-xl p-[6vw] lg:px-[2vw] lg:py-[1vw] gap-[1.5vh] lg:gap-[1vw]">
          <span className="text-darck font-bold text-[4vw] lg:text-[1vw]">Details de la commande (#1234567)</span>
          <div>
            <div className="flex justify-between py-[1vh] lg:py-[0.7vw] border-b-1 border-border">
              <span className="text-darck font-medium text-[3vw] lg:text-[0.8vw]">Date ajoutee</span>
              <span className="text-text font-medium text-[3vw] lg:text-[0.8vw]">Oct 10,2023</span>
            </div>
            <div className="flex justify-between py-[1vh] lg:py-[0.7vw] border-b-1 border-border">
              <span className="text-darck font-medium text-[3vw] lg:text-[0.8vw]">Date ajoutee</span>
              <span className="text-text font-medium text-[3vw] lg:text-[0.8vw]">Oct 10,2023</span>
            </div>
          </div>
        </div>
        <div className="bg-WT h-full lg:w-[25vw] flex flex-col rounded-lg shadow-xl p-[6vw] lg:px-[2vw] lg:py-[1vw] gap-[1.5vh] lg:gap-[1vw]">
          <span className="text-darck font-bold text-[4vw] lg:text-[1vw]">Details du joueur</span>
          <div>
            <div className="flex justify-between py-[1vh] lg:py-[0.7vw] border-b-1 border-border">
              <span className="text-darck font-medium text-[3vw] lg:text-[0.8vw]">Client</span>
              <span className="text-sub-title font-medium text-[3vw] lg:text-[0.8vw]">Amine El Farissi</span>
            </div>
            <div className="flex justify-between py-[1vh] lg:py-[0.7vw] border-b-1 border-border">
              <span className="text-darck font-medium text-[3vw] lg:text-[0.8vw]">E-mail</span>
              <span className="text-sub-title font-medium text-[3vw] lg:text-[0.8vw]">amineelfarissi@gmail.com</span>
            </div>
            <div className="flex justify-between py-[1vh] lg:py-[0.7vw]">
              <span className="text-darck font-medium text-[3vw] lg:text-[0.8vw]">Telephone</span>
              <span className="text-sub-title font-medium text-[3vw] lg:text-[0.8vw]">06 78 45 35 36</span>
            </div>
          </div>
        </div>
        <div className="bg-WT h-full lg:w-[25vw] flex flex-col rounded-lg shadow-xl p-[6vw] lg:px-[2vw] lg:py-[1vw] gap-[1.5vh] lg:gap-[1vw]">
          <span className="text-darck font-bold text-[4vw] lg:text-[1vw]">Document</span>
          <div>
            <div className="flex justify-between py-[1vh] lg:py-[0.7vw]">
              <span className="text-darck font-medium text-[3vw] lg:text-[0.8vw]">Facture</span>
              <span className="text-text font-medium text-[3vw] lg:text-[0.8vw]">#345678322</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-[2vh] lg:gap-[2vw] h-[70vh] lg:h-[35vh] ">
        <div className="bg-WT h-full w-[90vw] lg:w-[25vw] flex flex-col rounded-lg shadow-xl lg:gap-[1vh] overflow-hidden">
          <div className="absolute w-[90vw] lg:w-[25vw] h-[25vh] px-[5vw] py-[1vh] lg:px-[1vw] lg:py-[0.5vw] ">
            <div className=" h-full flex flex-col items-center justify-between ">
            <div className="flex w-full justify-between">
              <div className="bg-BG flex py-[0.5vh] px-[1vw] lg:py-[0.3vh] lg:px-[0.3vw] rounded-full shadow-lg items-center justify-center w-max">
                <div className="flex  bg-green rounded-full items-center justify-center w-[5vw] h-[5vw] lg:w-[1.3vw] lg:h-[1.2vw]">
                  <span className="font-medium text-WT text-[2.5vw] lg:text-[0.6vw]"> 5</span>
                </div>
                <div className="flex rounded-full items-center justify-center w-[5vw] h-[5vw] lg:w-[1.3vw] lg:h-[1.2vw]">
                  <span className="font-medium text-sub-title text-[2.5vw] lg:text-[0.6vw]"> 10</span>
                </div>
                <Image
                  src={"/places.svg"}
                  alt="places"
                  width={0} // Set the desired width here
                  height={0} // Set the desired height here
                  className={`relative w-[3vw] lg:w-[0.9vw] h-auto`}
                />
              </div>
              <div className="bg-green flex py-[0.5vh] px-[2vw] lg:py-[0.3vh] lg:px-[0.3vw] shadow-lg rounded-full items-center justify-center">
                <Location />
                <span className="font-medium text-WT text-[2.5vw] lg:text-[0.6vw]"> Agadir</span>
              </div>
            </div>
            <div className="flex gap-[1.5vw] lg:gap-[0.5vw]">
              {users.slice(0, 5).map((menu, key) => (
                <div className={`${num === key ? "bg-termine" : "bg-darck"} w-[3vw] h-[3vw] lg:w-[0.7vw] lg:h-[0.7vw] rounded-full cursor-pointer`} key={key} onClick={() => setNum(key)}></div>
                ))}
            </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={'/commande.png'}
              width={150}
              height={150}
              alt='commande'
              className='flex object-cover w-full h-[25vh] lg:h-[25vh] rounded-t-lg'
            />
          </div>
          <div className="flex flex-col gap-[1.5vh] lg:gap-[1vh] m-[0.6vh] lg:m-0 px-[2vw] lg:px-[1vw] ">
          <div className="flex items-center justify-between z-10">
          
          <span className="text-darck font-medium text-[3vw] lg:text-[0.8vw] ">Maroc line-up football ...</span>
          <div className="flex items-center gap-[0.5vw]">
            <TicketIcon/>
              <div className="flex items-start gap-1">
              <span className="text-green font-extrabold text-[3vw] lg:text-[1.1vw] ">50$</span>
              <span className="text-darck font-bold text-[3vw] lg:text-[0.7vw] ">/h</span>
              </div>
           </div>   
          </div>
          <div className="flex items-center justify-between z-10">
          <div className="flex items-end lg:items-center gap-[0.5vw]">
            <CalendarIcon/>
              <span className="text-darck font-bold text-[3vw] lg:text-[0.8vw] ">Oct 17, 2023</span>
           </div>  
           <div className="flex items-end lg:items-center gap-[0.5vw]">
            <Timesquare/>
              <span className="text-darck font-bold text-[3vw] lg:text-[0.8vw] ">15:30</span>
           </div>   
          </div>
          <div className="absolute z-1 mt-[-4vh] lg:mt-[-2vh] right-[5vw] lg:right-no"><div className="flex w-[17vw] lg:w-[24vw] justify-end opacity-20"><LogoIcon color="rgba(181, 181, 195, 1)"/></div></div>
          </div>
        </div>
        <div className="bg-WT h-full lg:w-[52vw] flex flex-col rounded-lg shadow-xl lg:px-[2vw] lg:py-[1vw] gap-[7vh] py-[2vh] px-[4vw] lg:gap-[2vw]">
          <div className="flex flex-col">
            <div className="flex justify-between p-[1.2vw] border-b-1 border-border ">
              <span className="text-darck font-base text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[5vw]">Match</span>
              <span className="text-darck font-base text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[5vw]">Prix</span>
              <span className="text-darck font-base text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[5vw]">Remise</span>
              <span className="text-darck font-base text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[5vw]">Total</span>
              <span className="text-darck font-base text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[7vw]">Methode</span>
            </div>
            <div className="flex justify-between p-[1.2vw]">
              <span className="text-darck font-bold text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[5vw]">Stade Reinne</span>
              <span className="text-title font-medium text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[5vw]">50.00</span>
              <span className="text-title font-medium text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[5vw]">00.00</span>
              <span className="text-title font-medium text-[3vw] lg:text-[0.8vw] w-[3vw] lg:w-[5vw]">50.00</span>
              <div className="flex items-center justify-between w-[5vw] lg:w-[7vw]">
                <CartIcons name="visa" /><span className="text-title font-medium text-[3vw] lg:text-[0.8vw]">Paye par carte</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-[1vw]">
              <Button className="bg-green rounded-md justify-around px-7 py-2 w-[10vw]" type="submit" endContent={<FactureIcon />}>
                <span className="font-medium text-WT text-[0.7vw]" >Generer la facture</span>
              </Button>
              <Button className="bg-darck rounded-md justify-around w-[13vw]" type="submit" endContent={<EnvoiIcon />}>
                <span className="font-medium text-WT text-[0.7vw]" >Envoyer facture par mail</span>
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-darck font-bold text-[1vw] ">Montant Paye</span>
              <span className="text-green font-extrabold text-[1.5vw] ">50.00 $</span>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal name="la commande" func="Annuler" detail={true} id="w" />
    </div>
  )
}
