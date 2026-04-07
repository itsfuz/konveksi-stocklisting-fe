"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PaginationControls from "@/components/PaginationControls";

interface Motif {
  id: string;
  motifCode: string;
  motifName: string;
}

export default function MasterMotifPage() {
  const [motifs, setMotifs] = useState<Motif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editingMotif, setEditingMotif] = useState<string | null>(null);
  const [deleteMotifId, setDeleteMotifId] = useState<string | null>(null);

  const fetchMotifs = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMotifs([
        { id: "1", motifCode: "M01", motifName: "Floral Pattern" },
        { id: "2", motifCode: "M02", motifName: "Geometric Design" },
        // ... rest of your mock data
      ]);
    } catch (error) {
      console.error("Error fetching motifs:", error);
      setMotifs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentMotif = motifs.find((m) => m.id === editingMotif);
    if (!currentMotif?.motifCode.trim() || !currentMotif?.motifName.trim()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Handle save logic here
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (motif: Motif) => {
    setEditingMotif(motif.id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMotifs((prev) => prev.filter((motif) => motif.id !== id));
    } finally {
      setIsLoading(false);
      setDeleteMotifId(null);
    }
  };

  const resetForm = () => {
    setEditingMotif(null);
  };

  const isFormValid = () => {
    const currentMotif = motifs.find((m) => m.id === editingMotif);
    return currentMotif?.motifCode?.trim() && currentMotif?.motifName?.trim();
  };

  useEffect(() => {
    fetchMotifs();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Master Motif</h2>

      {/* Rest of your Master Motif component JSX */}
      {/* ... */}
    </div>
  );
}