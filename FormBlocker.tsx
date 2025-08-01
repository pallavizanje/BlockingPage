import { useFormikContext } from "formik";
import { useState, useCallback, useEffect } from "react";
import { ConfirmNavigationModal } from "../components/ConfirmNavigationModal";
import { useRouteBlocker } from "../hooks/useRouteBlocker";
import { useBeforeUnload } from "../hooks/useBeforeUnload";

export const FormBlocker = () => {
  const { dirty } = useFormikContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [proceedFn, setProceedFn] = useState<() => void>(() => () => {});
  const [cancelFn, setCancelFn] = useState<() => void>(() => () => {});

  useBeforeUnload(dirty);

  const handleBlock = useCallback((proceed: () => void, cancel: () => void) => {
    setProceedFn(() => () => {
      setModalOpen(false);
      proceed();
    });
    setCancelFn(() => () => {
      setModalOpen(false);
      cancel();
    });
    setModalOpen(true);
  }, []);

  useRouteBlocker(dirty, handleBlock);

  return (
    <ConfirmNavigationModal
      open={modalOpen}
      onCancel={cancelFn}
      onConfirm={proceedFn}
    />
  );
};
