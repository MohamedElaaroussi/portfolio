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

// Define the types for your form values and other variables
interface FormValues {
  name: string;
  status: string[];
  host: any[];
  age: string;
  city: string;
}

const initialValues: FormValues = {
  name: '',
  status: [],
  host: [],
  age: '',
  city: '',
};

export default function MatchFilter({handleFilters}:{handleFilters:any}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button className="bg-filter flex lg:px-[1.7vw] w-[20vw] lg:w-auto justify-center items-center rounded-md" onClick={onOpen}>
        <LayoutIcon width={13} />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" size="4xl">
        <ModalContent>
          {(onClose) => (
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                onClose();
                console.log(values);
                handleFilters(values)
                // Handle form submission with the 'values' object
              }}
            >
            {({ values, setFieldValue }) => (
              <Form>
                <ModalHeader className="flex gap-[5vw]">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-semibold">Ajouter un joueur</h1>
                  </div>
                  <div className="flex flex-col items-start"></div>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-[4vh]">
                    <div className="flex gap-[2vw]"></div>
                  </div>
                  <div className="flex justify-between gap-[2vw] pr-[4vw]">
                    <Field
                      as={Input}
                      autoFocus
                      type="text" // Fixed 'user' to 'type'
                      label="Nom"
                      name="name"
                      variant="bordered"
                      placeholder="Enter your nom"
                    />
                    <p className="text-default-500 text-small">
                      <ErrorMessage name="name" />
                    </p>
                    <Field
                      as={Dropdown}
                      autoFocus
                      label="Status"
                      name="status"
                      variant="bordered"
                      placeholder="Status"
                    >
                      <DropdownTrigger className="hidden sm:flex">
                        <Button
                          startContent={<ChevronDownIcon className="text-small" />}
                          variant="flat"
                          className="bg-BG h-[6vh]"
                        >
                          Status
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table matchColumns"
                        closeOnSelect={false}
                        selectedKeys={values.status} // Use 'values.status' for selectedKeys
                        selectionMode="multiple"
                        onSelectionChange={(selectedStatus) => {
                          // Handle selection change
                          setFieldValue('status', selectedStatus);
                        }}
                      >
                        {/* Render your status options here */}
                        {statusOptions.map((status) => (
                          <DropdownItem key={status.uid} className="capitalize">
                            {status.name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Field>
                    <p className="text-default-500 text-small">
                      <ErrorMessage name="status" />
                    </p>
                  </div>
                  <div className="flex justify-between gap-[2vw] pr-[4vw]">
                    {/* <Field
                      as={Input}
                      autoFocus
                      type="number" // Fixed 'user' to 'type'
                      label="Age"
                      name="age"
                      variant="bordered"
                      placeholder="Enter your age"
                    />
                    <p className="text-default-500 text-small">
                      <ErrorMessage name="age" />
                    </p> */}
                    <Field
                      as={Select}
                      items={users}
                      label="Host"
                      name="host"
                      variant="bordered"
                      isMultiline={true}
                      selectionMode="multiple"
                      placeholder="Select a host"
                      // labelPlacement="outside"
                      classNames={{
                        base: 'max-w-xs',
                        trigger: 'min-h-unit-12 py-2',
                      }}
                      renderValue={(items: SelectedItems) => {
                        return (
                          <div className="flex flex-wrap gap-2">
                            {items.map((item: any) => (
                              <div key={item.key}>{item.data.joueur}</div>
                            ))}
                          </div>
                        );
                      }}
                    >
                      {(user:any) => (
                        <SelectItem key={user.id} textValue={user.joueur}>
                          <div className="flex gap-2 items-center">
                            <Avatar alt={user.joueur} className="flex-shrink-0" size="sm" src={user.avatar} />
                            <div className="flex flex-col">
                              <span className="text-small">{user.joueur}</span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Field>
                    <p className="text-default-500 text-small">
                      <ErrorMessage name="host" />
                    </p>
                    <Field
                      as={Input}
                      type="text" // Fixed 'user' to 'type'
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
                <ModalFooter>
                  <Button color="success" size="sm" variant="flat" type="submit">
                    Ajouter
                  </Button>
                </ModalFooter>
              </Form>)}
            </Formik>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
