"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Motif {
  id?: string
  motifCode: string
  motifName: string
}

interface MotifForm {
  motifCode: string
  motifName: string
}

export default function Page() {
  const [motifs, setMotifs] = useState<Motif[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [motifCurrentPage, setMotifCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [currentMotif, setCurrentMotif] = useState<Motif>({
    id: undefined,
    motifCode: '',
    motifName: ''
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  //const [editingMotif, setEditingMotif] = useState<string | null>(null)
  //const [deleteMotifId, setDeleteMotifId] = useState<string | undefined>(null)

  const fetchMotifs = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setMotifs([
        { id: "1", motifCode: "M01", motifName: "Floral Pattern" },
        { id: "2", motifCode: "M02", motifName: "Geometric Design" },
        { id: "3", motifCode: "M03", motifName: "Abstract Art" },
        { id: "4", motifCode: "M04", motifName: "Striped Design" },
        { id: "5", motifCode: "M05", motifName: "Polka Dot Pattern" },
        { id: "6", motifCode: "M06", motifName: "Traditional Batik" },
        { id: "7", motifCode: "M07", motifName: "Modern Stripes" },
        { id: "8", motifCode: "M08", motifName: "Vintage Roses" },
        { id: "9", motifCode: "M09", motifName: "Tropical Leaves" },
        { id: "10", motifCode: "M10", motifName: "Ocean Waves" },
        { id: "11", motifCode: "M11", motifName: "Mountain View" },
        { id: "12", motifCode: "M12", motifName: "City Lights" },
        { id: "13", motifCode: "M13", motifName: "Forest Green" },
        { id: "14", motifCode: "M14", motifName: "Desert Sand" },
      ])
    } catch (error) {
      console.error("Error fetching motifs:", error)
      setMotifs([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(currentMotif);
    e.preventDefault()
    const motifForm = { motifCode: "", motifName: "" }
    if (!motifForm.motifCode.trim() || !motifForm.motifName.trim()) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // if (editingMotif) {
      //   setMotifs((prev) =>
      //     prev.map((motif) =>
      //       motif.id === editingMotif
      //         ? { ...motif, motifCode: motifForm.motifCode, motifName: motifForm.motifName }
      //         : motif,
      //     ),
      //   )
      // } else {
      //   const newMotif: Motif = {
      //     id: Date.now().toString(),
      //     motifCode: motifForm.motifCode,
      //     motifName: motifForm.motifName,
      //   }
      //   setMotifs((prev) => [...prev, newMotif])
      // }

      //setEditingMotif(null)
    } catch (error) {
      console.error("Error saving motif:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = (motif: Motif) => {
    //setEditingMotif(motif.id)
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setMotifs((prev) => prev.filter((motif) => motif.id !== id))
    } catch (error) {
      console.error("Error deleting motif:", error)
    } finally {
      setIsLoading(false)
      //setDeleteMotifId(null)
    }
  }

  const resetForm = () => {
    //setEditingMotif(null)
  }

  const isMotifFormValid = () => {
    //const currentMotif = motifs.find((m) => m.id === editingMotif)


    return currentMotif?.motifCode?.trim() && currentMotif?.motifName?.trim()
  }

  useEffect(() => {
    fetchMotifs()
  }, [])

  const paginatedMotifs = motifs.slice((motifCurrentPage - 1) * itemsPerPage, motifCurrentPage * itemsPerPage)

  const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }) => {
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={page === currentPage ? "bg-gray-800 text-white" : ""}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setCurrentMotif((prev) => ({
      ...prev,          // Keep existing fields (like id)
      [id]: value,      // Update the field that matches the Input id
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Master Motif</h2>

      <Card>
        <CardHeader>
          <CardTitle>Motif List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Motif Code</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Motif Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : paginatedMotifs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-500">
                      No motifs found
                    </td>
                  </tr>
                ) : (
                  paginatedMotifs.map((motif) => (
                    <tr key={motif.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{motif.motifCode}</td>
                      <td className="py-3 px-4 text-gray-800">{motif.motifName}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setCurrentMotif(motif);
                              setIsEdit(true);
                            }}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setCurrentMotif(motif);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <PaginationControls
            currentPage={motifCurrentPage}
            totalPages={Math.ceil(motifs.length / itemsPerPage)}
            onPageChange={setMotifCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Form for adding or updating motifs */}
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "Update Motif" : "Add New Motif"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motifCode">Motif Code</Label>
                <Input
                  id="motifCode"
                  value={currentMotif?.motifCode}
                  onChange={handleInputChange}
                  maxLength={3}
                  placeholder="e.g., M01"
                  required
                  className="uppercase"
                />
                <p className="text-xs text-gray-500">Maximum 3 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motifName">Motif Name</Label>
                <Input
                  id="motifName"
                  value={currentMotif?.motifName}
                  onChange={handleInputChange}
                  maxLength={200}
                  placeholder="e.g., Floral Pattern"
                  required
                />
                <p className="text-xs text-gray-500">Maximum 200 characters</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              {isEdit && (
                <Button type="button" variant="outline" onClick={() => {
                  resetForm();
                  setIsEdit(false);
                  setCurrentMotif({
                    id: undefined,
                    motifCode: '',
                    motifName: ''
                  });
                }}>
                  Cancel
                </Button>
              )}
              <Button type="submit">
                {isLoading ? "Saving..." : isEdit ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteModal} onOpenChange={() => setShowDeleteModal(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this motif? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(currentMotif?.motifCode ?? "")}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
