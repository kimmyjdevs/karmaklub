import ProductForm from '../ProductForm';

export default function NewProductPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display font-bold text-3xl uppercase tracking-widest text-white mb-8">
        New Product
      </h1>
      <ProductForm />
    </div>
  );
}
