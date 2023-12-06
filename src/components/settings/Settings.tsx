// app/page.tsx
'use client'
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { AddImageIcon } from "../icons/AddImageIcon"
import React from "react";

const themes = [
    { label: "Dark", value: "dark" },
    { label: "Light", value: "light" },
]

export default function Settings() {
    const [settingValue, setSettingValue] = React.useState<boolean>(true);
    const path = "Gestion des matches";
    return (
        <div className='flex lg:flex-row flex-col w-full lg:h-[75vh] lg:w-[85vw] bg-WT rounded-lg '>
            <div className="flex flex-col gap-[4vw] p-[2vw]">
                <div className="flex gap-[10vw] lg:gap-[2vw] lg:px-[2vw] px-[6vw]">
                    <span className={`${settingValue  ? "text-green" : "text-sub-title"} font-bold lg:text-[1.1vw] cursor-pointer`} onClick={() => setSettingValue(true)}>Reglage generaux</span>
                    <span className={`${!settingValue ? "text-green" : "text-sub-title"} font-bold lg:text-[1.1vw] cursor-pointer`} onClick={() => setSettingValue(false)}>Gestion image</span>
                </div>
                {settingValue &&
                    <div className="flex lg:flex-row flex-col gap-[7vw] items-start">
                        <div className="flex flex-col gap-[2vw] px-[2vw] py-[1.5vw] w-full lg:w-auto">
                            <Input type="text" labelPlacement="outside"
                                placeholder="Entrez titre" label="Meta-titre"
                                key="outside"
                                classNames={{
                                    base: " rounded-full ",
                                    inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                    label: "text-[3vw] lg:text-[0.8vw] text-title font-medium ",
                                    input: "rounded-none text-darck bg-search  text-[3vw] lg:text-[0.8vw] font-medium"
                                }} />
                            <Textarea
                                label="Balise meta description"
                                variant="bordered"
                                labelPlacement="outside"
                                key="outside"
                                classNames={{
                                    base: " rounded-full ",
                                    inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                    label: "text-[3vw] lg:text-[0.8vw]  text-title font-medium ",
                                    input: "rounded-none text-darck bg-search  text-[3vw] lg:text-[0.8vw] font-medium"
                                }}
                                placeholder="Entrez description"
                                className="lg:w-[50vw]"
                            />
                            <Input type="text" variant="bordered" labelPlacement="outside"
                                placeholder="Entrez titre" label="Meta mots-cles"
                                key="outside"
                                classNames={{
                                    base: " rounded-full ",
                                    inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                    label: "text-[3vw] lg:text-[0.8vw]  text-title font-medium ",
                                    input: "rounded-none text-darck bg-search  text-[3vw] lg:text-[0.8vw] font-medium"
                                }} />
                            <Select
                                labelPlacement="outside"
                                label="Theme"
                                key="outside"
                                classNames={{
                                    base: " rounded-full ",
                                    label: "text-[3vw] lg:text-[0.8vw] text-title font-medium ",
                                    value: "rounded-none text-darck  text-[3vw] lg:text-[0.8vw] font-medium"
                                }}
                                placeholder="Selectionner un theme"
                                defaultSelectedKeys={["Active"]}
                            >
                                {themes.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                        {s.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-col items-center gap-[8vw] w-full lg:w-auto">
                            <div className="flex flex-col items-start gap-[2vh]">
                                <span className="font-medium text-title">Logo</span>
                                <div className="lg:w-[15vw] lg:h-[12vw] w-[60vw] h-[40vw] border-3 border-dashed border-default-200 rounded-xl flex flex-col items-center justify-center">
                                    <AddImageIcon />
                                    <span className="text-sub-title font-medium">Ajouter un image</span>
                                </div>
                            </div>
                            <Button className="lg:h-[6vh] w-[60vw] lg:w-[15vw] bg-green">
                                <span className="text-WT font-medium text-[3vw] lg:text-[0.8vw]">Sauvegarder les modifications</span>
                            </Button>
                        </div>
                    </div>
} {!settingValue &&
                        <div className="flex flex-col mt-[-4vh]">
                        <div className="flex items-start gap-[5vw] p-[2vw]">
                            <div className="flex flex-col gap-[2vh]">
                            <span className="font-medium text-title">Image</span>
                            <div className="lg:w-[23vw] lg:h-[4vw] w-[60vw] h-[40vw] border-3 border-dashed border-default-200 rounded-xl flex flex-col items-center justify-center">
                                <AddImageIcon />
                                <span className="text-sub-title font-medium">Ajouter un image</span>
                            </div>
                            </div>
                            <div className="w-[23vw]">
                            <Input type="text" labelPlacement="outside"
                                placeholder="Entrez le nom" label="Nom"
                                key="outside"
                                classNames={{
                                    base: " rounded-full ",
                                    inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                    label: "text-[3vw] lg:text-[0.8vw] text-title font-medium mb-[1vh]",
                                    input: "rounded-none text-darck bg-search  text-[3vw] lg:text-[0.8vw] font-medium"
                                }} />
                             </div>
                             <div className="flex h-full items-center"> 
                             <Button className="lg:h-[5vh] w-[60vw] lg:w-[12vw] bg-green">
                                <span className="text-WT font-medium text-[3vw] lg:text-[0.8vw]">Ajouter un joueur</span>
                            </Button> 
                            </div> 
                        </div>
                        <div className="flex flex-col p-[2vw] ">
                          <span className="font-medium text-[0.95vw] text-darck">Ajouter une image</span>
                          <span className="font-base text-[0.65vw] text-text">
                            Telecharger une image ou selectionner parmi les images au dessus
                          </span>
                        </div>
                        </div>
                    }



            </div>
        </div>
    )
}