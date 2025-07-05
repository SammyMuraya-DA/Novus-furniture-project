// This file is no longer needed as orders are sent directly to WhatsApp
// Keeping it empty to avoid breaking imports, but it's not used anymore

export const useCreateOrder = () => {
  return {
    mutateAsync: async () => {
      throw new Error('This hook is deprecated. Orders are now sent to WhatsApp.');
    },
    isPending: false,
  };
};
