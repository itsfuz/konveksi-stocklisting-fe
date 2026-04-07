"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaginationControls from "@/components/PaginationControls";

interface Artikel {
  id: string;
  motifCode: string;
  artikelCode: string;
  artikelName: string;
}

interface Motif {
  id: string;
  motifCode: string;
  motifName: string;
}

export default function MasterArtikelPage() {
  const [artikels, setArtikels] = useState<Artikel[]>([]);
  const [motifs, setMotifs] = useState<Motif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editingArtikel, setEditingArtikel] = useState<string | null>(null);
  const [deleteArtikelId, setDeleteArtikelId] = useState<string | null>(null);
  const [artikelForm, setArtikelForm] = useState({
    selectedMotifId: "",
    artikelCodeSuffix: "",
    artikelName: "",
  });

  const fetchArtikels = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setArtikels([
        { id: "1", motifCode: "M01", artikelCode: "M01001", artikelName: "Floral Shirt" },
        // ... rest of your mock data
      ]);
    } catch (error) {
      console.error("Error fetching artikels:", error);
      setArtikels([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMotifs = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMotifs([
        { id: "1", motifCode: "M01", motifName: "Floral Pattern" },
        // ... rest of your mock data
      ]);
    } catch (error) {
      console.error("Error fetching motifs:", error);
      setMotifs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your Artikel component logic

  useEffect(() => {
    fetchMotifs();
    fetchArtikels();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Master Artikel</h2>

      {/* Rest of your Artikel component JSX */}
      {/* ... */}
    </div>
  );
}