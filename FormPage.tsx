// pages/FormPage.tsx
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import { useRouteBlocker } from "../hooks/useRouteBlocker";
import { useBeforeUnload } from "../hooks/useBeforeUnload";
import { useState } from "react";
import { ConfirmNavigationModal } from "../components/ConfirmNavigationModal";

const FormBlocker = () => {
  const { dirty } = useFormikContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmFn, setConfirmFn] = useState<() => void>(() => {});
  const [cancelFn, setCancelFn] = useState<() => void>(() => {});

  useBeforeUnload(dirty);

  useRouteBlocker(dirty, (proceed, cancel) => {
    setConfirmFn(() => () => {
      setModalOpen(false);
      proceed();
    });
    setCancelFn(() => () => {
      setModalOpen(false);
      cancel();
    });
    setModalOpen(true);
  });

  return (
    <ConfirmNavigationModal open={modalOpen} onCancel={cancelFn} onConfirm={confirmFn} />
  );
};

export const FormPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Form Page</h1>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({ name: Yup.string().required("Required") })}
        onSubmit={(values) => alert(JSON.stringify(values))}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <FormBlocker />
            <label className="block">
              Name:
              <Field name="name" className="border p-2 ml-2" />
            </label>
            {errors.name && touched.name && (
              <div className="text-red-600">{errors.name}</div>
            )}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
