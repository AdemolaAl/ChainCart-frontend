import { IApiResponse } from "@/@types/types";
import AppButton from "../shared/AppButton";
import { useDeleteProductMutation } from "@/api/prodService";

export type IAddCardProps = {
  title: string; image_of_land: string; price: number; stock?: number; _id?: string;
};

const AdCard = ({ title, image_of_land, stock, _id, price }: IAddCardProps) => {
  const [deleteProduct, { isLoading: loadDelete }] = useDeleteProductMutation();

  const handleProductDelete = async (productId?: string) => {
    if (!productId) return;
    try {
      const result: IApiResponse = await deleteProduct({ productId }).unwrap();
      console.log(result);
    } catch (error) { console.error("Error deleting product:", error); }
  };

  return (
    <section className="flex items-center gap-4 p-4 border border-gray-800/50 rounded-2xl bg-gray-900/40 hover:border-cyan-500/20 transition-all duration-300">
      <img src={image_of_land} alt={title} className="w-24 h-24 rounded-xl object-cover" />
      <div className="flex-1">
        <h3 className="font-medium text-white">{title}</h3>
        <h3 className="font-medium text-cyan-400 font-mono text-sm">{price} XION</h3>
        <p className={`text-xs tracking-wider uppercase ${stock && stock > 0 ? "text-cyan-400/70" : "text-red-400"}`}>
          {stock && stock > 0 ? `Available: ${stock}` : "Out of Stock"}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <AppButton label="View Details" onClick={() => console.log(_id)} variant="outline" size="sm" />
        <AppButton label="Delete" onClick={() => handleProductDelete(_id)} variant="destructive" size="sm" isLoading={loadDelete} />
      </div>
    </section>
  );
};

export default AdCard;
