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

interface CMT {
  id: string;
  tukangPotongCode: string;
  tukangPotongName: string;
  cmtCode: string;
  cmtName: string;
}

export default function MasterCMTPage() {
  const [cmts, setCmts] = useState<CMT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [editingCmt, setEditingCmt] = useState<string | null>(null);
  const [deleteCmtId, setDeleteCmtId] = useState<string | null>(null);

  const fetchCmts = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCmts([
        {
          id: "1",
          tukangPotongCode: "TP1",
          tukangPotongName: "Ahmad Sutrisno",
          cmtCode: "C01",
          cmtName: "CMT Jakarta Pusat",
        },
        // ... rest of your mock data
      ]);
    } catch (error) {
      console.error("Error fetching CMTs:", error);
      setCmts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your CMT component logic

  useEffect(() => {
    fetchCmts();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Master Tukang Potong / CMT</h2>

      {/* Rest of your CMT component JSX */}
      {/* ... */}
    </div>
  );
}