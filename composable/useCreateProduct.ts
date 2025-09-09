const showCreateProduct = ref(false);
const previousRoute = ref<string | null>(null);
export function useCreateProduct() {
  return { showCreateProduct, previousRoute };
}
