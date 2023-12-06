import Image from "next/image"
import React from "react"
import { Select, SelectItem, Input, Button, Textarea } from "@nextui-org/react";
import { cities, keys, status } from "@/utils/data";
import { AdressIcon } from "../icons/AdressIcon";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DeleteModal from "../modals/DeleteModal";
import Link from "next/link";
import { Match } from "@/utils/types";


export default function MatchDetails({match}:{match:any}) {
  const [file, setFile] = React.useState<String>('/stadium.png');
  const [imageData, setImageData] = React.useState('/stadium-1.png');
  function handleChange(event:any) {
    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile)
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
          //@ts-ignore
          const base64Image = event.target.result as string;
          setImageData(base64Image);
      };

      reader.readAsDataURL(selectedFile);
  }
  }
  const initialValues = {
    name: match.address,
    // id_host: match.host.hostId,
    id_coutry: match.id_country,
    address: '',
    description: '',
    price: match.price,
    duration: match.duration,
    title: match.title,
    status: match.status,
    type: match.type,
    images: [],
    heure: match.time,
    date: match.time,
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={async (values) => {
        // Handle final submission here
        console.log('Form submitted:', values);

        // try {
        // } catch (error: any) {
        // }
      }
      }
    >
      {() => (
        <Form>
          <div className="flex gap-[3vw] items-start py-[4vh] justify-between">
            <div className="flex flex-col gap-[1.9vw]">
              <div className="flex flex-col items-center justify-center p-[1vw] bg-WT rounded-lg gap-[2vh] shadow-sm">
              <label htmlFor="file" >
                <div className="flex items-start">
                  <Image
                    src={imageData}
                    width={150}
                    height={150}
                    alt="omar"
                    className="rounded-lg object-fit w-[17vw] h-[14vw]"
                  />
                  <div className="p-[0.6vw] bg-WT rounded-3xl shadow-lg mx-[-1.2vw] my-[-0.9vw]">
                    <Image
                      src={"/image-update.svg"}
                      width={50}
                      height={50}
                      className="w-[1.1vw] h-auto cursor-pointer"
                      alt="image-update"
                    />
                  </div>
                  <input id="file" type="file" accept="image/*" className="hidden" onChange={handleChange} />
                </div>
               </label>
                <div className="flex gap-[0.7vw]">
                  {keys.map((key: number) => (
                    <Image
                      src={`/stadium-${key}.png`}
                      width={50}
                      height={50}
                      alt="stadium"
                      className="rounded-lg w-[4vw] h-[4vw] object-cover"
                      key={key}
                      onClick={()=>setImageData(`/stadium-${key}.png`)}
                    />
                  ))}
                </div>
                <span className="text-[0.7vw] font-medium text-text-mini-2">Definissez l&apos;image miniature. Seul les fichiers image png jpg jpeg</span>
              </div>
              <div className="flex p-[3.5vh] bg-WT rounded-lg justify-center shadow-sm">

              </div>
            </div>
            <div className="flex flex-col gap-[2.5vh]">
              <div className="w-[50vw] flex bg-WT py-[3vh] px-[2vw] flex-col gap-[4vh] rounded-lg shadow-sm">
                <div className="flex gap-[1.9vw]">
                  <Field
                    as={Input}
                    key="outside"
                    classNames={{
                      base: " rounded-full ",
                      inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                      // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                      input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                    }}
                    type="text"
                    label="Nom du joueur"
                    labelPlacement="outside"
                    placeholder="Entrez le Nom"
                    className="w-[20vw]"
                    name="name"
                  />
                  <Field
                    as={Select}
                    labelPlacement="outside"
                    label="Status"
                    name="status"
                    id="status"
                    placeholder="Select status"
                    className="w-[20vw]"
                    classNames={{
                      value: "rounded-none text-darck px-3 text-[0.8vw] font-medium",
                      // mainWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                      trigger: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                    }}
                    defaultValue={status[0].value} // Set the default value here
                  >
                    {status.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </Field>
                </div>
                <div className="flex gap-[1.9vw]">
                  <Field
                    as={Textarea}
                    isRequired
                    name="description"
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    className="max-w-3xl"
                    classNames={{
                      base: " rounded-full ",
                      inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                      // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                      input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                    }}
                  />
                </div>
              </div>
              <div className="w-[50vw] flex bg-WT py-[3vh] px-[2vw] flex-col gap-[2vh] rounded-lg shadow-sm">
                <div className="flex gap-[1.9vw] items-end">
                  <Field
                    as={Input}
                    key="outside"
                    classNames={{
                      base: " rounded-full ",
                      inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                      // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                      input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                    }}
                    label="Duree"
                    className="w-[20vw]"
                    labelPlacement="outside"
                    placeholder="Entrez âge"
                    type="number"
                    name="duration"
                  />
                  <Field
                    as={Select}
                    labelPlacement="outside"
                    label="Ville"
                    classNames={{
                      base: " rounded-full ",
                      // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                      value: "rounded-none text-darck  px-3 text-[0.8vw] font-medium",
                      trigger: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search "
                    }}
                    placeholder="Selectionnez la ville"
                    defaultSelectedKeys={["agadir"]}
                    className="w-[20vw]"
                  >
                    {cities.map((city: any) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </Field>

                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-[3vh]">

                    <div className="flex gap-[1vw]">
                      <Field
                        as={Input}
                        type="date"
                        label="Date de match"
                        labelPlacement="outside"
                        name="date"
                        className="w-[20vw]"
                        classNames={{
                          base: " rounded-full ",
                          inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                          // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                          input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                        }}
                        placeholder="Enter your user"
                      />
                      <p className="text-errer text-small">
                        <ErrorMessage name="date" />
                      </p>
                      <Field
                        as={Input}
                        type="time"
                        label="Heure du match"
                        labelPlacement="outside"
                        name="heure"
                        className="w-[20vw]"
                        // endContent={<SelectIcon color='rgba(17, 19, 66, 1)'/>}
                        classNames={{
                          base: " rounded-full ",
                          inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                          // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                          input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                        }}
                        placeholder="Enter your user"
                      />
                      <p className="text-errer text-small">
                        <ErrorMessage name="heure" />
                      </p>
                    </div>
                    <Input
                      label="Adresse"
                      classNames={{
                        base: " rounded-full ",
                        inputWrapper: "h-[4vw] bg-search flex text-sub-title rounded-lg border-none hover:!bg-search pr-6",
                        // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                        input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                      }}
                      labelPlacement="outside"
                      endContent={<AdressIcon />}
                      placeholder="Entrez adresse"
                      className="w-[25vw]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-[1.2vw]">
              <DeleteModal name="le match" func="Annuler" detail={true} id={match.id}/>
              <Link href={'/matches'}> <Button className="bg-green rounded-md py-2 w-[15vw]" type="submit">
                  <span className="font-medium text-WT text-[0.7vw]" >Sauvegarder les modifications</span>
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </Form>)}
    </Formik>
  )
}
