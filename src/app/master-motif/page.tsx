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
import { SmartPagination } from "@/components/SmartPagination"
import { api } from "@/lib/api"
import Cookies from "js-cookie"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { CheckCircle2, XCircle } from "lucide-react"

interface Motif {
  id?: string
  motifCode: string
  motifName: string
}

interface CreateUpdateMotifResponseModel {
  isSuccess: boolean,
  message: string
}

interface MotifDataListModel {
  motifDataList: Motif[]
  totalData: number
}

export default function Page() {
  const [motifs, setMotifs] = useState<Motif[]>([])
  const [totalDataCount, setTotalDataCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2
  const [currentMotif, setCurrentMotif] = useState<Motif>({
    id: undefined,
    motifCode: '',
    motifName: ''
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<"success" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const username = Cookies.get('currentUser')

  const fetchMotifs = async () => {
    setIsLoading(true)
    try {
      const data = await api.post<MotifDataListModel>("/api/v1/motif-api/get-motif-list", {
        pageNumber: currentPage,
        pageSize: itemsPerPage
      });

      setMotifs(data.motifDataList);
      setTotalDataCount(data.totalData);

    } catch (error) {
      console.error("Error fetching motifs:", error)
      setMotifs([]);
      setTotalDataCount(0);
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true)
    try {
      if (isEdit) {
        const data = await api.post<CreateUpdateMotifResponseModel>("/api/v1/motif-api/update-motif", {
          motifCode: currentMotif.motifCode.toUpperCase(),
          motifName: currentMotif.motifName.toUpperCase(),
          username: username
        });

        if (data.isSuccess === false) {
          setErrorMessage(data.message);
          setModalStatus("error");
        }
        else {
          setModalStatus("success");
        }

      }
      else {
        const data = await api.post<CreateUpdateMotifResponseModel>("/api/v1/motif-api/create-motif", {
          motifCode: currentMotif.motifCode.toUpperCase(),
          motifName: currentMotif.motifName.toUpperCase(),
          username: username
        });

        if (data.isSuccess === false) {
          setErrorMessage(data.message);
          setModalStatus("error");
        }
        else {
          setModalStatus("success");
        }
      }

    } catch (error) {
      console.error("Error saving motif:", error)
    }
    finally {
      fetchMotifs();
      setCurrentMotif({
        id: undefined,
        motifCode: '',
        motifName: ''
      });
      setIsEdit(false);
      setIsLoading(false);
    }
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
    }
  }

  const resetForm = () => {
    //setEditingMotif(null)
  }

  useEffect(() => {
    fetchMotifs()
  }, [currentPage])

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
                { totalDataCount === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-500">
                      No Motifs Found
                    </td>
                  </tr>
                ) : (
                  motifs.map((motif) => {
                    return (
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
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <SmartPagination
              totalItems={totalDataCount} // This would come from your .NET API count
              pageSize={itemsPerPage}
              currentPage={currentPage}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
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
                  disabled={isEdit === true}
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
                  className="uppercase"
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
      <Dialog open={modalStatus === "success"} onOpenChange={() => setModalStatus(null)}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="flex flex-col items-center justify-center gap-2">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <DialogTitle>Success!</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            The new motif has been successfully added to the database.
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <Button type="button" onClick={() => setModalStatus(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* FAILED MODAL */}
      <Dialog open={modalStatus === "error"} onOpenChange={() => setModalStatus(null)}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="flex flex-col items-center justify-center gap-2">
            <XCircle className="h-12 w-12 text-destructive" />
            <DialogTitle>Operation Failed</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {errorMessage}
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <Button
              variant="destructive"
              type="button"
              onClick={() => setModalStatus(null)}
            >
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
