const showCreateProduct = ref(false);
const previousRoute = ref<string | null>(null);
const showSaveModal = ref(false);
export function useCreateProduct() {
  return { showCreateProduct, previousRoute, showSaveModal };
}
