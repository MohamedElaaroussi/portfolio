import Image from "next/image"
import React from "react"
import { Select, SelectItem, Avatar, Chip, SelectedItems, Input, Button, Textarea } from "@nextui-org/react";
import { MailIcon } from "../icons/MailIcon";
import { cities, nationalities, status, types } from "@/utils/data";
import { Type } from "@/utils/type";
import { AdressIcon } from "../icons/AdressIcon";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DeleteModal from "../modals/DeleteModal";
import Link from "next/link";
import { useRouter } from "next/navigation";


const initialValues = {
  name: '',
  // id_host: '',
  // id_coutry:'',
  // address:'',
  // description:'',
  // price: 0,
  // duration:0,
  // title:'',
  // status:'',
  // type:5,
  // images:[],
  // heure:'',
  // date:'',
};

export default function PlayerDetails() {
  const [file, setFile] = React.useState<String>('/stadium.png');
  const [imageData, setImageData] = React.useState('/omar.png');
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
  const [value, setValue] = React.useState("junior2nextui.org");

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    return validateEmail(value) ? false : true;
  }, [value]);

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={async (values) => {
        // Handle final submission here
        console.log('Form submitted:', values);

        // try {
        //   useRouter().push('/players')
        // } catch (error: any) {
        //   useRouter().push('/players')
        // }
      }
      }
    >
      {() => (
        <Form>
          <div className="flex flex-col lg:flex-row gap-[3vw] items-start py-[4vh] justify-between">
            <div className="flex flex-col gap-[3vh]">
              <div className="flex flex-col items-center p-[8vw] lg:p-[2vw] bg-WT rounded-lg gap-[1.5vh] justify-center shadow-lg ">
              <label htmlFor="file" >
                <div className="flex items-start">
                  <Image
                    src={imageData}
                    width={150}
                    height={150}
                    alt="omar"
                    className="rounded-lg object-fit w-[80vw] h-[30vh] lg:w-[17vw] lg:h-[14vw]"
                  />
                  <div className="p-[2vw] lg:p-[0.6vw] bg-WT rounded-3xl shadow-lg mx-[-8vw] my-[-2vh] lg:mx-[-1.2vw] lg:my-[-0.9vw]">
                    <Image
                      src="/image-update.svg"
                      width={0}
                      height={0}
                      className="w-[6vw] lg:w-[1.1vw] h-auto "
                      alt="image-update"
                    />
                  </div>
                </div>
                <input id="file" type="file" accept="image/*" className="hidden" onChange={handleChange} />
                </label>
                <span className="text-[3vw] text-center w-[70vw] lg:w-[20vw] lg:text-[0.7vw] font-medium text-text-mini-2">Définissez l&apos;image miniature. Seuls les fichiers image png jpg jpeg sont autorisés.</span>
              </div>
              <div className="flex p-[3.5vw] lg:p-[3.5vh] bg-WT rounded-lg justify-center shadow-sm">
                <Select
                  items={types}
                  label="Type"
                  isMultiline={true}
                  selectionMode="multiple"
                  placeholder="Selectionnez le type"
                  labelPlacement="outside"
                  classNames={{
                    base: "lg:max-w-xs",
                    trigger: "min-h-unit-12 py-2",
                    value: "rounded-none px-3 lg:text-[0.8vw] font-medium"
                  }}
                  renderValue={(items: SelectedItems<Type>) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item: any) => (
                          <Chip key={item.key}>{item.data.name}</Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {(type) => (
                    <SelectItem key={type.id} textValue={type.name}>
                      <div className="flex gap-[4vw] lg:gap-[1vw] items-center">
                        <Image alt={type.name} src={type.avatar}
                          width={0} // Set the desired width here
                          height={0} // Set the desired height here
                          className={`w-[10vw] h-[10vw] lg:w-[2vw] lg:h-[2vw]`} />
                        <div className="flex flex-col">
                          <span className="text-base font-medium text-default-500">{type.name}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-[2.5vh]">
              <div className="w-[90vw] lg:w-[50vw] flex bg-WT py-[3vh] lg:px-[2vw] px-[4vw] flex-col gap-[4vh] rounded-lg shadow-sm">
                <div className="flex gap-[9vw] lg:gap-[1.9vw]">
                  <Field
                    as={Input}
                    key="outside"
                    classNames={{
                      base: " rounded-full ",
                      inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                      // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                      input: "rounded-none text-darck bg-search px-3 lg:text-[0.8vw] font-medium"
                    }}
                    name="name"
                    type="text"
                    label="Nom du joueur"
                    labelPlacement="outside"
                    placeholder="Entrez le Nom"
                    className="max-w-xs"
                  />
                  <Select
                    labelPlacement="outside"
                    label="Status"
                    placeholder="status"
                    className="max-w-xs"
                    classNames={{
                      trigger: "h-[2.5vw] bg-search  rounded-lg border-none hover:!bg-search ",
                      value: "rounded-none px-3 lg:text-[0.8vw] font-medium"
                    }}
                  >
                    {status.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex gap-[9vw] lg:gap-[1.9vw]">
                  <Input
                    key="outside"
                    classNames={{
                      base: " rounded-full ",
                      inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                      // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                      input: "rounded-none text-darck bg-search px-3 lg:text-[0.8vw] font-medium"
                    }}
                    type="email"
                    label="Email"
                    isInvalid={isInvalid}
                    className="max-w-xs"
                    color={isInvalid ? "danger" : "success"}
                    errorMessage={isInvalid && "Vous pouvez entrer un email valide"}
                    onValueChange={setValue}
                    startContent={
                      <MailIcon className={`text-2xl ${isInvalid ? "text-danger" : "text-green"}  pointer-events-none flex-shrink-0`} />
                    }
                    labelPlacement="outside"
                    placeholder="Entrez un email"
                  />
                  <Input
                    key="outside"
                    classNames={{
                      base: " rounded-full ",
                      inputWrapper: "h-[2.5vw] bg-search text-darck rounded-lg border-none hover:!bg-search ",
                      // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                      input: "rounded-none text-darck bg-search px-3 lg:text-[0.8vw] font-medium"
                    }}
                    type="text"
                    label="Telephone"
                    className="max-w-xs"
                    labelPlacement="outside"
                    placeholder="Entrez le numero"
                  />
                </div>
              </div>
              <div className="w-[90vw] lg:w-[50vw] flex bg-WT py-[3vh] lg:px-[2vw] px-[4vw] flex-col gap-[2vh] rounded-lg shadow-sm">
                <div className="flex gap-[9vw] lg:gap-[1.9vw] items-end">
                  <Input
                    key="outside"
                    classNames={{
                      base: " rounded-full ",
                      inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                      // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                      input: "rounded-none text-darck bg-search px-3 lg:text-[0.8vw] font-medium"
                    }}
                    label="Age"
                    className="max-w-xs"
                    labelPlacement="outside"
                    placeholder="Entrez âge"
                    type="number"
                  />
                  <Select
                    items={nationalities}
                    className="max-w-xs"
                    label="Nationalité"
                    key="outside"
                    labelPlacement="outside"
                    classNames={{
                      trigger: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                      listboxWrapper: "max-h-[400px]",
                      value: "rounded-none text-darck  lg:text-[0.8vw] font-medium"
                    }}
                    listboxProps={{
                      itemClasses: {
                        base: [
                          "rounded-md",
                          "text-default-500",
                          "transition-opacity",
                          "data-[hover=true]:text-foreground",
                          "data-[hover=true]:bg-default-100",
                          "dark:data-[hover=true]:bg-default-50",
                          "data-[selectable=true]:focus:bg-default-50",
                          "data-[pressed=true]:opacity-70",
                          "data-[focus-visible=true]:ring-default-500",
                        ],
                      },
                    }}
                    popoverProps={{
                      classNames: {
                        base: "p-0 border-small border-divider bg-background",
                        arrow: "bg-default-200",

                      },
                    }}
                    renderValue={(items) => {
                      return items.map((item: any) => (
                        <div key={item.key} className="flex items-center gap-2">
                          <Avatar
                            alt={item.data.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={item.data.avatar}
                          />
                          <div className="flex flex-col">
                            <span>{item.data.name}</span>
                          </div>
                        </div>
                      ));
                    }}
                  >
                    {(nationality: any) => (
                      <SelectItem key={nationality.id} textValue={nationality.name}>
                        <div className="flex gap-2 items-center">
                          <Avatar alt={nationality.name} className="flex-shrink-0" size="sm" src={nationality.avatar} />
                          <div className="flex flex-col">
                            <span className="text-small">{nationality.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-[3vh]">
                    <Select
                      labelPlacement="outside"
                      label="Ville"
                      classNames={{
                        base: " rounded-full ",
                        trigger: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                        // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                        value: "rounded-none text-darck  px-3 lg:text-[0.8vw] font-medium"
                      }}
                      placeholder="Selectionnez la ville"
                      defaultSelectedKeys={["agadir"]}
                      className="lg:max-w-xs"
                    >
                      {cities.map((city: any) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      label="Adresse"
                      classNames={{
                        base: " rounded-full ",
                        inputWrapper: "lg:h-[4vw] h-[20vw] bg-search flex text-sub-title rounded-lg border-none hover:!bg-search pr-6",
                        // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                        input: "rounded-none text-darck bg-search px-3 lg:text-[0.8vw] font-medium"
                      }}
                      labelPlacement="outside"
                      endContent={<AdressIcon />}
                      placeholder="Entrez adresse"
                      className="w-[40vw] lg:w-[25vw]"
                    />
                  </div>
                  <div className="flex flex-col lg:gap-[1.5vw] gap-[5vw] items-end mt-[3vw] lg:mt-[5vh]">
                    <div className=" flex justify-center items-center gap-[1.2vw]">

                      <div className="lg:w-[7vw] w-[25vw] lg:h-[9vh] h-[15vw] bg-BG flex flex-col justify-center items-center rounded-lg"> <span className="font-bold lg:text-[0.8vw] text-[3vw] text-sub-title">Solde :</span><span className="font-bold lg:text-[1.4vw] text-[4vw] text-encoure">400 DH</span></div>
                    </div>
                    <div className=" flex justify-center items-center gap-[1.2vw]">

                      <div className="lg:w-[7vw] w-[25vw] lg:h-[9vh] h-[15vw] bg-BG flex flex-col justify-center items-center rounded-lg">
                      <span className="font-bold lg:text-[0.8vw] text-[3vw] text-sub-title text-center">Total depenser :</span>
                        <span className="font-bold lg:text-[1.4vw] text-[4vw] text-termine">600 DH</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-[1.2vw]">
              <DeleteModal name="le joueur" func="Supprimer" detail={true} id='w'/>
              <Link href={'/players'}>
                <Button className="bg-green rounded-md py-2 w-[45vw] lg:w-[15vw]" type="submit" href={'/players'}>
                  <span className="font-medium text-WT text-[3vw] lg:text-[0.7vw]" >Sauvegarder les modifications</span>
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </Form>)}
    </Formik>
  );
}

