import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Ad = { id: number; title: string; image: string; publishedDate: string; views: number; likes: number; price: string; };

const adsData: Ad[] = [
  { id: 1, title: "Mansion in South Lekki", image: "/ad.jpg", publishedDate: "04-Dec-2023", views: 98, likes: 1, price: "$2,300,000" },
  { id: 2, title: "Mansion in South Lekki", image: "/ad.jpg", publishedDate: "04-Dec-2023", views: 98, likes: 1, price: "$2,300,000" },
  { id: 3, title: "Mansion in South Lekki", image: "/ad.jpg", publishedDate: "04-Dec-2023", views: 98, likes: 1, price: "$2,300,000" },
  { id: 4, title: "Mansion in South Lekki", image: "/ad.jpg", publishedDate: "04-Dec-2023", views: 98, likes: 1, price: "$2,300,000" },
];

export default function MyPostedAds() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-white">My Posted Ads</h2>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="border-b border-gray-800/40 flex space-x-6 pb-2 bg-transparent">
          <TabsTrigger value="active" onClick={() => setActiveTab("active")}
            className={activeTab === "active" ? "font-semibold text-cyan-400 border-b-2 border-cyan-400" : "text-gray-500"}>
            Active Ads <Badge className="ml-1">5</Badge>
          </TabsTrigger>
          <TabsTrigger value="expired" onClick={() => setActiveTab("expired")}
            className={activeTab === "expired" ? "font-semibold text-cyan-400 border-b-2 border-cyan-400" : "text-gray-500"}>
            Expired Ads
          </TabsTrigger>
          <TabsTrigger value="unpublished" onClick={() => setActiveTab("unpublished")}
            className={activeTab === "unpublished" ? "font-semibold text-cyan-400 border-b-2 border-cyan-400" : "text-gray-500"}>
            Unpublished <Badge variant="destructive" className="ml-1">4</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="pt-4">
          {adsData.map((ad) => (
            <Card key={ad.id} className="mb-4 p-4 flex items-center justify-between bg-gray-900/40 border-gray-800/50">
              <div className="flex items-center space-x-4">
                <img src={ad.image} alt={ad.title} className="w-20 h-20 rounded-xl object-cover" />
                <div>
                  <h3 className="text-base font-semibold text-white">{ad.title}</h3>
                  <p className="text-sm text-gray-500">Published: {ad.publishedDate}</p>
                  <p className="text-sm text-gray-500">Views: {ad.views} · Liked: {ad.likes}</p>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm">Delete</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="default" size="sm">Messages</Button>
                  </div>
                </div>
              </div>
              <div className="text-lg font-semibold text-cyan-400 font-mono">{ad.price}</div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      <div className="flex justify-center space-x-2 mt-4">
        <Button variant="outline" size="sm">1</Button>
        <Button variant="outline" size="sm">2</Button>
        <Button variant="outline" size="sm">3</Button>
      </div>
    </div>
  );
}
