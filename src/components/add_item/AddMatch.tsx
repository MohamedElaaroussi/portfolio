import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldAttributes } from 'formik';
import * as Yup from 'yup';
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
  Checkbox,
  cn,
  Radio,
  RadioGroup,
  Textarea,
  SelectedItems,
  User
} from '@nextui-org/react';
import { PlusIcon } from '../icons/PlusIcon';
import { users, utilisateurs } from '@/utils/data';
import { ArrowIcon } from '../icons/ArrowIcon';
import { SelectIcon } from '../icons/SelectIcon';
import axios from 'axios'
import { AdressIcon } from '../icons/AdressIcon';
import Step3 from '../icons/Step3';
import Step1 from '../icons/Step1';
import { addMatch } from '@/actions/matchActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setError } from '@/reducers/matchSlice';
import { db, serverTimestamp } from '@/firebase';
import { useDispatch } from 'react-redux';
import { String } from 'lodash';
const initialValues = {
  name: '',
  id_host: '',
  id_country: '',
  address: '',
  description: '',
  price: 0,
  duration: 0,
  title: '',
  status: '',
  type: 5,
  images: [],
  heure: '',
  time: '',
  city: ''
};

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Nom est requis '),
//   prix: Yup.number().required('prix est requis'),
//   age: Yup.number().required('Age est requis'),

// });


const stepLabels = ['Choisir l identité', 'Information du joueur'];

export default function AddMatch(hosts: { hosts: any }) {
  const dispatch = useDispatch<any>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(0);
  const [isSelected, setIsSelected] = React.useState(false);
  const playersArray: any[] = [hosts];

  console.log(playersArray)
  const Step1Schema = Yup.object().shape({
    name: Yup.string().required('Nom est requis'),
    prix: Yup.number().required('prix est requis'),
    // age: Yup.number().required('Age est requis'),
  });

  const Step2Schema = Yup.object().shape({
    duree: Yup.number().required('Duree est requise'),
    user: Yup.string().required('Nationalite est requise'),
    ville: Yup.string().required('Ville est requise'),
    adress: Yup.string().required('Adresse est requise'),
    date: Yup.date().required('Date de match est requise'),
    heure: Yup.string().required('Heure du match est requise'),
    description: Yup.string().required('Description est requise'),
  });
  // Utility function to combine date and time into a timestamp
  const combineDateAndTime = (date: any, time: any) => {
    const combinedDateTimeString = `${date}T${time}`;
    return new Date(combinedDateTimeString);
  };

  return (
    <>
      <button onClick={onOpen} className="flex px-[0.8vw] bg-green font-base items-center justify-center rounded-md  w-full lg:h-auto h-[6vh] lg:w-auto">
        <PlusIcon color="white" /> <span className="text-WT font-base xl:text-[1vw] 2xl:text-[0.8vw]">Ajouter un match</span>
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="4xl">
        <ModalContent>
          {(onClose) => (
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                if (step < 2) {
                  setStep((current) => current + 1);
                } else {
                  // Handle final submission here
                  console.log('Form submitted:', values);

                  const inserted_at = combineDateAndTime(values.time, values.heure);
                  const newMatchData = {
                    address: values.address,
                    city: values.city,
                    duration: values.duration,
                    description: values.description,
                    created_at: serverTimestamp(),
                    id_host: values.id_host,
                    type: values.type,
                    price: values.price,
                    inserted_at,
                  };

                  await dispatch(addMatch(newMatchData));
                  setStep(0);
                  onClose();
                }
              }}
            >
              {/* <Formik
              initialValues={initialValues}
              // validationSchema={step === 0 ? Step1Schema : step === 1 ? Step2Schema : null}
              onSubmit={ (values) => {
                // if (step === 0) {
                //   // Validation for Step 1
                //   try {
                //     await Step1Schema.validate(values, { abortEarly: false });
                //     setStep((current) => current + 1);
                //   } catch (error) {
                //     // Display toast notifications for validation errors
                //     if (error instanceof Yup.ValidationError) {
                //       error.errors.forEach((validationError: any) => {
                //         toast.error(validationError.message);
                //       });
                //     }
                //   }
                // } else if (step === 1) {
                //   // Validation for Step 2
                //   try {

                //     await Step2Schema.validate(values, { abortEarly: false });
                //     // Your form submission logic here
                //     setStep((current) => current + 1);
                //     // Display success toast

                //   } catch (error) {
                //     if (error instanceof Yup.ValidationError) {
                //       // Display toast notifications for validation errors
                //       error.inner.forEach((validationError: any) => {
                //         toast.error(validationError.message);
                //       });
                //     }
                //   }
                // } else {
                //   toast.success('Form submitted successfully!');
                //   setStep(0);

                //   onClose();
                // }
                if (step < 2) {
                  setStep((current) => current + 1);
                } else {
                  // Handle final submission here
                  console.log('Form submitted:', values);


                    const inserted_at = combineDateAndTime(values.date, values.heure);
                    const newMatchData = { address: values.address, city: values.city, duration: values.duration, description: values.description, created_at: serverTimestamp, id_host: values.id_host, type: values.type, price: values.price, inserted_at };
                     dispatch(addMatch(newMatchData))
                    setStep(0);

                    onClose();

                }
                }
              }
            > */}
              {({ values, handleChange, setFieldValue, handleSubmit }) => (
                <Form>
                  {step === 0 && (
                    <>
                      <ModalHeader className="flex flex-col lg:flex-row lg:gap-[3vw] items-center lg:items-start">
                        <div className="flex flex-col gap-[0.5vw] items-center lg:items-start">
                          <h1 className="text-[5vw] lg:text-[1.2vw] font-semibold text-darck">Ajouter un match</h1>
                          <span className="font-base text-base text-text-mini-2 text-center lg:text-start text-[4vw] lg:text-[0.85vw] ">
                            Remplissez les informations ci-dessous pour ajouter un match
                          </span>
                        </div>
                        <Step1 />
                      </ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col lg:gap-[1.3vw] gap-[3vh] items-center lg:items-start">
                          <span className="font-medium text-[3.5vw] lg:text-[0.95vw] text-darck">Choisir l&apos;identité</span>
                          <RadioGroup name="type" defaultValue="5" className='flex text-green' color='success' classNames={{
                            base: "text-green"
                          }}>
                            <div className="flex gap-[9vw] lg:gap-[2vw]">
                              <Radio
                                value="5"
                              >
                                <div className="w-[25vw] lg:w-[8vw] h-auto py-[1vh] flex flex-col justify-center items-center shadow-md rounded-md">
                                  <Image
                                    src="/5vs5.png"
                                    width={0}
                                    height={0}
                                    className="w-[20vw] lg:w-[7vw] h-auto"
                                    alt="5vs5"
                                  />
                                  <span className='font-medium text-sub-title'>5 vs 5</span>
                                </div>
                              </Radio>
                              <Radio value="6">
                                <div className="w-[25vw] lg:w-[8vw] h-auto flex flex-col py-[1vh] justify-center items-center shadow-md rounded-md">
                                  <Image
                                    src="/6vs6.png"
                                    width={0}
                                    height={0}
                                    className="w-[20vw] lg:w-[7vw] h-auto"
                                    alt="6vs6"
                                  />
                                  <span className='font-medium text-sub-title'>6 vs 6</span>
                                </div>
                              </Radio>
                            </div>
                          </RadioGroup>
                          <div className="flex gap-[2vw] pr-[4vw] pt-[1.5vw]">
                            <div className="flex flex-col lg:gap-[0.9vw] gap-[2vh] mb-[3vw] items-center lg:items-start">
                              <h1 className='font-medium text-[3.5vw] lg:text-[0.95vw] text-darck'>Informations du match</h1>
                              <div className='flex gap-[4vw] lg:gap-[2vw]'>
                                <Field
                                  as={Input}
                                  labelPlacement="outside"
                                  autoFocus
                                  type="text"
                                  label="Nom du match"
                                  name="address"
                                  id="address"
                                  key="outside"
                                  classNames={{
                                    base: " rounded-full ",
                                    inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                    label: "lg:text-[0.8vw] text-[3vw] ",
                                    input: "rounded-none text-darck bg-search px-3 text-[3vw] lg:text-[0.8vw] font-medium"
                                  }}
                                  placeholder="Enter your nom"
                                  className="lg:w-[10vw] w-[25vw]"
                                  onChange={handleChange}

                                  value={values.address}
                                />
                                <Field name="id_host">
                                  {({ field }: FieldAttributes<any>) => (
                                    <Select
                                      {...field}
                                      items={utilisateurs}
                                      label="Host"
                                      placeholder="Select a host"
                                      labelPlacement="outside"
                                      className="lg:w-[20vw] w-[35vw]"
                                      classNames={{
                                        trigger: "h-[2.5vw]  ",
                                        label: "lg:text-[0.8vw] text-[3vw] ",
                                        value: "rounded-none  px-3 text-[3vw] lg:text-[0.8vw] font-medium",
                                      }}
                                      renderValue={(items: SelectedItems<any>) =>
                                        items.map((item) => (
                                          <div key={item.key} className="flex items-center gap-2">
                                            <Avatar
                                              alt={item.data?.utilisateur}
                                              className="flex-shrink-0"
                                              size="sm"
                                              src={item.data?.avatar}
                                            />
                                            <div className="flex flex-col">
                                              <span>{item.data?.utilisateur}</span>
                                              <span className="text-default-500 text-tiny">({item.data?.email})</span>
                                            </div>
                                          </div>
                                        ))
                                      }
                                    >
                                      {(user: any) => (

                                        <SelectItem
                                          key={user.id}
                                          textValue={user.utilisateur}
                                          onSelect={() => setFieldValue('id_host', user.id)}
                                        >
                                          <div className="flex gap-2 items-center">
                                            <Avatar alt={user.id} className="flex-shrink-0" size="sm" src={user.avatar} />
                                            <div className="flex flex-col">
                                              <span className="text-small">{user.utilisateur}</span>
                                              <span className="text-tiny text-default-400">{user.email}</span>
                                            </div>
                                          </div>
                                        </SelectItem>
                                      )}
                                    </Select>
                                  )}
                                </Field>

                                <Field
                                  as={Input}
                                  autoFocus
                                  labelPlacement="outside"
                                  onChange={handleChange}
                                  id="price"
                                  value={values.price}
                                  type="number"
                                  label="Prix"
                                  name="price"
                                  key="outside"
                                  className="lg:w-[10vw] w-[15vw]"
                                  classNames={{
                                    base: " rounded-full ",
                                    inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                    label: "lg:text-[0.8vw] text-[3vw] ",
                                    input: "rounded-none text-darck bg-search px-3 text-[3vw] lg:text-[0.8vw] font-medium"
                                  }}
                                  placeholder="Entrer le prix"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <ModalHeader className="flex flex-col lg:flex-row lg:gap-[3vw] items-center lg:items-start">
                        <div className="flex flex-col gap-[0.5vw] items-center lg:items-start">
                          <h1 className="text-[5vw] lg:text-[1.2vw] font-semibold text-darck">Ajouter un match</h1>
                          <span className="font-base text-base text-text-mini-2 text-center lg:text-start text-[4vw] lg:text-[0.85vw] ">
                            Remplissez les informations ci-dessous pour ajouter un match
                          </span>
                        </div>
                        <Image
                          src={'/step-2.svg'}
                          width={0}
                          height={0}
                          style={{ width: 'auto', height: '1.7vw' }}
                          alt="step-2"
                        />
                      </ModalHeader>

                      <ModalBody>
                        <div className="flex flex-col gap-[4vh]">
                          <span className="font-medium text-[0.95vw] text-darck">Information du match</span>
                        </div>
                        <div className='flex flex-col gap-6'>
                          <div className="flex justify-between items-end gap-[1.5vw] pr-[4vw]">
                            <Field
                              as={Input}
                              autoFocus
                              type="number"
                              label="Duree"
                              id="duration"
                              name="duration"
                              onChange={handleChange}

                              value={values.duration}
                              labelPlacement="outside"
                              classNames={{
                                base: " rounded-full ",
                                inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                                input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                              }}
                              placeholder="Entrez la duree"
                            />
                            <Field
                              as={Select}
                              className="max-w-xs"
                              label="Nationalite"
                              id="id_country"
                              name="id_country"
                              endContent={<SelectIcon color='rgba(17, 19, 66, 1)' />}
                              key="outside"
                              classNames={{
                                trigger: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                value: "rounded-none  px-3 text-[0.8vw] font-medium",
                                selectorIcon: "hidden"
                              }}
                              labelPlacement="outside"
                              onChange={handleChange}

                              value={values.id_country}
                            >
                              <SelectItem key="argentina" startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}>
                                Argentina
                              </SelectItem>
                              <SelectItem key="venezuela" startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}>
                                Venezuela
                              </SelectItem>
                              {/* Add more countries here */}
                            </Field>
                            <Field
                              as={Input}
                              type="text"
                              label="Ville"
                              labelPlacement="outside"
                              name="city"
                              id="city"
                              onChange={handleChange}

                              value={values.city}
                              classNames={{
                                base: " rounded-full ",
                                inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                                input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                              }}
                              placeholder="Enter your user"
                            />
                          </div>
                          <div className="flex justify-between gap-[1vw] pr-[4vw] items-start">
                            <Input
                              label="Adresse"
                              id="address"
                              name="title"
                              classNames={{
                                base: " rounded-full ",
                                inputWrapper: "h-[4vw] w-[18vw] bg-search flex text-sub-title rounded-lg border-none hover:!bg-search pr-6",
                                // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                                input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                              }}
                              labelPlacement="outside"
                              endContent={<AdressIcon />}
                              placeholder="Entrez adresse"
                              onChange={handleChange}

                              value={values.title}

                            />
                            <Field
                              as={Input}
                              value={values.time}
                              type="date"
                              label="Date de match"
                              labelPlacement="outside"
                              name="time"
                              id="time"
                              classNames={{
                                base: " rounded-full ",
                                inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                                input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                              }}
                              placeholder="Enter your user"
                            />

                            <Field
                              as={Input}
                              type="time"
                              label="Heure du match"
                              labelPlacement="outside"
                              name="heure"
                              onChange={handleChange}

                              value={values.heure}
                              // endContent={<SelectIcon color='rgba(17, 19, 66, 1)'/>}
                              classNames={{
                                base: " rounded-full ",
                                inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                                // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                                input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                              }}
                              placeholder="Enter your user"
                            />
                          </div>
                          <div className="flex justify-between gap-[1vw] pr-[4vw] items-start">
                            <Field
                              as={Textarea}
                              type='text'
                              label="Description"
                              onChange={handleChange}

                              value={values.description}
                              classNames={{
                                base: " rounded-full ",
                                inputWrapper: "h-[5vw] w-[18vw] bg-search flex text-sub-title rounded-lg border-none hover:!bg-search pr-6",
                                // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                                input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                              }}
                              labelPlacement="outside"
                              placeholder="Entrez description"

                              name='description'
                            />
                          </div>
                        </div>
                      </ModalBody>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <ModalHeader className="flex gap-[5vw]">
                        <div className="flex flex-col gap-[0.5vw]">
                          <h1 className="text-[1.2vw] font-semibold text-darck">Ajouter un match</h1>
                          <span className="font-base text-base text-text-mini-2">
                            Remplissez les informations ci-dessous pour ajouter un match
                          </span>
                        </div>
                        <Step3 />
                      </ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col ">
                          <span className="font-medium text-[0.95vw] text-darck">Ajouter une image</span>
                          <span className="font-base text-[0.65vw] text-text-mini-2">
                            Telecharger une image ou selectionner parmi les images au dessus
                          </span>
                        </div>
                        <div className='flex flex-col gap-6'>

                        </div>

                      </ModalBody>
                    </>
                  )}
                  <ModalFooter className='flex gap-[1.5vw] items-center'>
                    {step === 0 ? <></> : (
                      <Button size="lg" className='bg-WT lg:text-[0.7vw]' onClick={() => setStep((current) => current - 1)} startContent={<ArrowIcon />}>
                        Retour
                      </Button>
                    )}
                    <Button
                      className='bg-green lg:w-[6vw] lg:h-[2.2vw] rounded-md'
                      size="sm"

                      variant="flat"
                      type="submit"
                    >
                      <span className='text-WT lg:text-[0.7vw]'> {step === 2 ? 'Ajouter' : 'Suivant'}</span>
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          )}
        </ModalContent>
      </Modal>

    </>
  );
}
