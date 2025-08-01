// components/ConfirmNavigationModal.tsx
import React from "react";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmNavigationModal = ({ open, onCancel, onConfirm }: Props) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg space-y-4 w-80">
        <h2 className="text-lg font-semibold">Unsaved Changes</h2>
        <p>Do you really want to leave this page?</p>
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>Leave</button>
        </div>
      </div>
    </div>
  );
};
