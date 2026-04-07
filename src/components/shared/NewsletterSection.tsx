import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
  return (
    <section className="bg-gray-950/80 border-y border-gray-800/40 py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-400">
          <a href="#" className="!text-cyan-400 hover:underline">$20 discount</a> for your first order
        </p>
        <h2 className="text-2xl font-bold mt-2 text-white">Join our newsletter and get...</h2>
        <p className="text-gray-500 text-sm mt-2">Join our email subscription now to get updates on promotions and coupons.</p>
        <div className="mt-4 flex justify-center gap-2">
          <Input type="email" placeholder="Your email address" className="w-64" />
          <Button variant="outline">Subscribe</Button>
        </div>
      </div>
    </section>
  );
}
