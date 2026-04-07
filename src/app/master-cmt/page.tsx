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

interface CMT {
  id: string
  tukangPotongCode: string
  tukangPotongName: string
  cmtCode: string
  cmtName: string
}

interface CMTForm {
  tukangPotongCode: string
  tukangPotongName: string
  cmtCode: string
  cmtName: string
}

export default function Page() {
  const [cmts, setCmts] = useState<CMT[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [cmtCurrentPage, setCmtCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [editingCmt, setEditingCmt] = useState<string | null>(null)
  const [deleteCmtId, setDeleteCmtId] = useState<string | null>(null)

  const fetchCmts = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCmts([
        {
          id: "1",
          tukangPotongCode: "TP1",
          tukangPotongName: "Ahmad Sutrisno",
          cmtCode: "C01",
          cmtName: "CMT Jakarta Pusat",
        },
        {
          id: "2",
          tukangPotongCode: "TP2",
          tukangPotongName: "Budi Santoso",
          cmtCode: "C02",
          cmtName: "CMT Bandung Timur",
        },
        {
          id: "3",
          tukangPotongCode: "TP3",
          tukangPotongName: "Sari Dewi",
          cmtCode: "C03",
          cmtName: "CMT Surabaya Selatan",
        },
        {
          id: "4",
          tukangPotongCode: "TP4",
          tukangPotongName: "Eko Prasetyo",
          cmtCode: "C04",
          cmtName: "CMT Yogyakarta",
        },
        {
          id: "5",
          tukangPotongCode: "TP5",
          tukangPotongName: "Citra Dewi",
          cmtCode: "C05",
          cmtName: "CMT Surabaya",
        },
        {
          id: "6",
          tukangPotongCode: "TP6",
          tukangPotongName: "Fitri Handayani",
          cmtCode: "C06",
          cmtName: "CMT Medan",
        },
        {
          id: "7",
          tukangPotongCode: "TP7",
          tukangPotongName: "Gunawan Lim",
          cmtCode: "C07",
          cmtName: "CMT Makassar",
        },
        {
          id: "8",
          tukangPotongCode: "TP8",
          tukangPotongName: "Hendra Wijaya",
          cmtCode: "C08",
          cmtName: "CMT Palembang",
        },
        {
          id: "9",
          tukangPotongCode: "TP9",
          tukangPotongName: "Indira Sari",
          cmtCode: "C09",
          cmtName: "CMT Denpasar",
        },
        {
          id: "10",
          tukangPotongCode: "T10",
          tukangPotongName: "Joko Susilo",
          cmtCode: "C10",
          cmtName: "CMT Malang",
        },
        {
          id: "11",
          tukangPotongCode: "T11",
          tukangPotongName: "Kartika Putri",
          cmtCode: "C11",
          cmtName: "CMT Solo",
        },
        {
          id: "12",
          tukangPotongCode: "T12",
          tukangPotongName: "Lukman Hakim",
          cmtCode: "C12",
          cmtName: "CMT Balikpapan",
        },
      ])
    } catch (error) {
      console.error("Error fetching CMTs:", error)
      setCmts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCmtSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cmtForm = { tukangPotongCode: "", tukangPotongName: "", cmtCode: "", cmtName: "" }
    if (
      !cmtForm.tukangPotongCode.trim() ||
      !cmtForm.tukangPotongName.trim() ||
      !cmtForm.cmtCode.trim() ||
      !cmtForm.cmtName.trim()
    )
      return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingCmt) {
        setCmts((prev) => prev.map((cmt) => (cmt.id === editingCmt ? { ...cmt, ...cmtForm } : cmt)))
      } else {
        const newCmt: CMT = {
          id: Date.now().toString(),
          ...cmtForm,
        }
        setCmts((prev) => [...prev, newCmt])
      }

      setEditingCmt(null)
    } catch (error) {
      console.error("Error saving CMT:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCmtUpdate = (cmt: CMT) => {
    setEditingCmt(cmt.id)
  }

  const handleCmtDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCmts((prev) => prev.filter((cmt) => cmt.id !== id))
    } catch (error) {
      console.error("Error deleting CMT:", error)
    } finally {
      setIsLoading(false)
      setDeleteCmtId(null)
    }
  }

  const resetCmtForm = () => {
    setEditingCmt(null)
  }

  const isCmtFormValid = () => {
    const currentCmt = cmts.find((c) => c.id === editingCmt)
    return (
      currentCmt?.tukangPotongCode?.trim() &&
      currentCmt?.tukangPotongName?.trim() &&
      currentCmt?.cmtCode?.trim() &&
      currentCmt?.cmtName?.trim()
    )
  }

  useEffect(() => {
    fetchCmts()
  }, [])

  const paginatedCmts = cmts.slice((cmtCurrentPage - 1) * itemsPerPage, cmtCurrentPage * itemsPerPage)

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Master Tukang Potong / CMT</h2>

      <Card>
        <CardHeader>
          <CardTitle>CMT List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tukang Potong Code</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tukang Potong Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">CMT Code</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">CMT Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : paginatedCmts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      No CMT records found
                    </td>
                  </tr>
                ) : (
                  paginatedCmts.map((cmt) => (
                    <tr key={cmt.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{cmt.tukangPotongCode}</td>
                      <td className="py-3 px-4 text-gray-800">{cmt.tukangPotongName}</td>
                      <td className="py-3 px-4 text-gray-800">{cmt.cmtCode}</td>
                      <td className="py-3 px-4 text-gray-800">{cmt.cmtName}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCmtUpdate(cmt)}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteCmtId(cmt.id)}
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
            currentPage={cmtCurrentPage}
            totalPages={Math.ceil(cmts.length / itemsPerPage)}
            onPageChange={setCmtCurrentPage}
          />
        </CardContent>
      </Card>

      {/* Form for adding or updating CMTs */}
      <Card>
        <CardHeader>
          <CardTitle>{editingCmt ? "Update CMT" : "Add New CMT"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCmtSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tukangPotongCode">Tukang Potong Code</Label>
                <Input
                  id="tukangPotongCode"
                  value={cmts.find((c) => c.id === editingCmt)?.tukangPotongCode || ""}
                  onChange={(e) =>
                    setCmts((prev) =>
                      prev.map((c) =>
                        c.id === editingCmt
                          ? { ...c, tukangPotongCode: e.target.value.slice(0, 3).toUpperCase() }
                          : c,
                      ),
                    )
                  }
                  maxLength={3}
                  placeholder="e.g., TP1"
                  required
                  className="uppercase"
                />
                <p className="text-xs text-gray-500">Maximum 3 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tukangPotongName">Tukang Potong Name</Label>
                <Input
                  id="tukangPotongName"
                  value={cmts.find((c) => c.id === editingCmt)?.tukangPotongName || ""}
                  onChange={(e) =>
                    setCmts((prev) =>
                      prev.map((c) =>
                        c.id === editingCmt ? { ...c, tukangPotongName: e.target.value.slice(0, 200) } : c,
                      ),
                    )
                  }
                  maxLength={200}
                  placeholder="e.g., Ahmad Sutrisno"
                  required
                />
                <p className="text-xs text-gray-500">Maximum 200 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cmtCode">CMT Code</Label>
                <Input
                  id="cmtCode"
                  value={cmts.find((c) => c.id === editingCmt)?.cmtCode || ""}
                  onChange={(e) =>
                    setCmts((prev) =>
                      prev.map((c) =>
                        c.id === editingCmt ? { ...c, cmtCode: e.target.value.slice(0, 3).toUpperCase() } : c,
                      ),
                    )
                  }
                  maxLength={3}
                  placeholder="e.g., C01"
                  required
                  className="uppercase"
                />
                <p className="text-xs text-gray-500">Maximum 3 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cmtName">CMT Name</Label>
                <Input
                  id="cmtName"
                  value={cmts.find((c) => c.id === editingCmt)?.cmtName || ""}
                  onChange={(e) =>
                    setCmts((prev) =>
                      prev.map((c) =>
                        c.id === editingCmt ? { ...c, cmtName: e.target.value.slice(0, 200) } : c,
                      ),
                    )
                  }
                  maxLength={200}
                  placeholder="e.g., CMT Jakarta Pusat"
                  required
                />
                <p className="text-xs text-gray-500">Maximum 200 characters</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              {editingCmt && (
                <Button type="button" variant="outline" onClick={resetCmtForm}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isLoading || !isCmtFormValid()}>
                {isLoading ? "Saving..." : editingCmt ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteCmtId} onOpenChange={() => setDeleteCmtId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this CMT record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteCmtId && handleCmtDelete(deleteCmtId)}
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
