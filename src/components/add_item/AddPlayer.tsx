import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
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
} from '@nextui-org/react';
import { PlusIcon } from '../icons/PlusIcon';

const initialValues = {
  step: 0,
  name: '',
  email: '',
  age: '',
  nationality: '',
  city: '',
};

const validationSchema = [
  Yup.object().shape({
    name: Yup.string().required('Nom is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  }),
  Yup.object().shape({
    age: Yup.number().required('Age is required'),
    nationality: Yup.string().required('Nationality is required'),
    city: Yup.string().required('City is required'),
  }),
];

const stepLabels = ['Choisir l identité', 'Information du joueur'];

export default function AddPlayer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="success" onClick={onOpen} endContent={<PlusIcon />}>
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="4xl">
        <ModalContent>
          {(onClose) => (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (values.step < 1) {
                  values.step++;
                } else {
                  // Handle final submission here
                  console.log('Form submitted:', values);
                  onClose();
                }
              }}
            >
              {({ values, setFieldValue, isValid }) => (
                <Form>
                  {values.step === 0 && (
                    <>
                      <ModalHeader className="flex gap-[5vw]">
                        <div className="flex flex-col gap-1">
                          <h1 className="text-xl font-semibold">Ajouter un joueur</h1>
                          <span className="font-normal text-base text-text-mini-2">
                            Remplissez les informations ci-dessous pour ajouter un joueur
                          </span>
                        </div>
                        <div className="flex flex-col items-start">
                          <Image
                            src={'/player.svg'}
                            width={0}
                            height={0}
                            style={{ width: 'auto', height: '3vh' }}
                            alt="player"
                          />
                          <Image
                            src={'/step-1.svg'}
                            width={0}
                            height={0}
                            style={{ width: 'auto', height: '3vh' }}
                            alt="step-2"
                          />
                        </div>
                      </ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col gap-[4vh]">
                          <span className="font-normal text-xl text-gray-400">Choisir l&apos;identité</span>
                          <div className="flex gap-[2vw]">
                            <div className="w-[8vw] h-auto py-[3vh] flex justify-center shadow-md rounded-xl hover:border-[0.2vw] border-termine">
                              <Image
                                src="/player.svg"
                                width={0}
                                height={0}
                                style={{ width: '4vw', height: 'auto' }}
                                alt="player"
                              />
                            </div>
                            <div className="w-[8vw] h-auto flex py-[3vh] justify-center shadow-md rounded-xl">
                              <Image
                                src="/host.svg"
                                width={0}
                                height={0}
                                style={{ width: '2vw', height: 'auto' }}
                                alt="host"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between gap-[2vw] pr-[4vw]">
                          <Field
                            as={Input}
                            autoFocus
                            type="text"
                            key="outside"
                            classNames={{
                              base: " rounded-full ",
                              inputWrapper: "h-[2.5vw] bg-search text-sub-title rounded-lg border-none hover:!bg-search ",
                              // label: "text-[0.8vw] text-default-500 font-medium px-3 ",
                              input: "rounded-none text-darck bg-search px-3 text-[0.8vw] font-medium"
                            }}
                            label="Nom"
                            name="name"
                            
                            placeholder="Enter your nom"
                          />
                          <p className="text-default-500 text-small">
                            <ErrorMessage name="name" />
                          </p>
                          <Field
                            as={Input}
                            autoFocus
                            type="text"
                            label="Email"
                            name="email"
                            variant="bordered"
                            placeholder="Enter your email"
                          />
                          <p className="text-default-500 text-small">
                            <ErrorMessage name="email" />
                          </p>
                        </div>
                      </ModalBody>
                    </>
                  )}
                  {values.step === 1 && (
                    <>
                      <ModalHeader className="flex gap-[5vw]">
                        <div className="flex flex-col gap-1">
                          <h1 className="text-xl font-semibold">Ajouter un joueur</h1>
                          <span className="font-normal text-base text-text-mini-2">
                            Remplissez les informations ci-dessous pour ajouter un joueur
                          </span>
                        </div>
                        <Image
                          src={'/step-2.svg'}
                          width={0}
                          height={0}
                          style={{ width: 'auto', height: '5vh' }}
                          alt="step-2"
                        />
                      </ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col gap-[4vh]">
                          <span className="font-normal text-xl text-gray-400">Information du joueur</span>
                        </div>
                        <div className="flex justify-between gap-[2vw] pr-[4vw]">
                          <Field
                            as={Input}
                            autoFocus
                            type="number"
                            label="Age"
                            name="age"
                            variant="bordered"
                            placeholder="Enter your age"
                          />
                          <p className="text-default-500 text-small">
                            <ErrorMessage name="age" />
                          </p>
                          <Field
                            as={Select}
                            className="max-w-xs"
                            label="Nationalite"
                            name="nationality"
                          >
                            <SelectItem key="argentina" startContent={<Avatar alt="Argentina" className="w-6 h-6" src="https://flagcdn.com/ar.svg" />}>
                              Argentina
                            </SelectItem>
                            <SelectItem key="venezuela" startContent={<Avatar alt="Venezuela" className="w-6 h-6" src="https://flagcdn.com/ve.svg" />}>
                              Venezuela
                            </SelectItem>
                            {/* Add more countries here */}
                          </Field>
                          <p className="text-default-500 text-small">
                            <ErrorMessage name="nationality" />
                          </p>
                          <Field
                            as={Input}
                            type="text"
                            label="Ville"
                            name="city"
                            variant="bordered"
                            placeholder="Enter your city"
                           />
                          <p className="text-default-500 text-small">
                            <ErrorMessage name="city" />
                          </p>
                        </div>
                      </ModalBody>
                    </>
                  )}
                  <ModalFooter>
                    {values.step === 1 && (
                      <Button size="sm" variant="bordered" onClick={() => setFieldValue('step', values.step - 1)}>
                        Retour
                      </Button>
                    )}
                    <Button
                      color="success"
                      size="sm"
                      variant="flat"
                      type= "submit"
                    >
                      {values.step === 0 ? 'Suivant' : 'Ajouter'}
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


