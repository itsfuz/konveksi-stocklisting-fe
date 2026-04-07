"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Motif {
  id: string
  motifCode: string
  motifName: string
}

interface Artikel {
  id: string
  motifCode: string
  artikelCode: string
  artikelName: string
}

interface ArtikelForm {
  selectedMotifId: string
  artikelCodeSuffix: string
  artikelName: string
}

export default function Page() {
  const [motifs, setMotifs] = useState<Motif[]>([])
  const [artikels, setArtikels] = useState<Artikel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [artikelCurrentPage, setArtikelCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [editingArtikel, setEditingArtikel] = useState<string | null>(null)
  const [deleteArtikelId, setDeleteArtikelId] = useState<string | null>(null)

  const [artikelForm, setArtikelForm] = useState<ArtikelForm>({
    selectedMotifId: "",
    artikelCodeSuffix: "",
    artikelName: "",
  })

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
      ])
    } catch (error) {
      console.error("Error fetching motifs:", error)
      setMotifs([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchArtikels = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setArtikels([
        { id: "1", motifCode: "M01", artikelCode: "M01001", artikelName: "Floral Shirt" },
        { id: "2", motifCode: "M01", artikelCode: "M01002", artikelName: "Floral Dress" },
        { id: "3", motifCode: "M02", artikelCode: "M02001", artikelName: "Geometric Blouse" },
        { id: "4", motifCode: "M02", artikelCode: "M02002", artikelName: "Geometric Pants" },
        { id: "5", motifCode: "M03", artikelCode: "M03001", artikelName: "Abstract Jacket" },
        { id: "6", motifCode: "M03", artikelCode: "M03002", artikelName: "Abstract Skirt" },
        { id: "7", motifCode: "M04", artikelCode: "M04001", artikelName: "Striped T-Shirt" },
        { id: "8", motifCode: "M04", artikelCode: "M04002", artikelName: "Striped Shorts" },
        { id: "9", motifCode: "M05", artikelCode: "M05001", artikelName: "Polka Dot Top" },
        { id: "10", motifCode: "M05", artikelCode: "M05002", artikelName: "Polka Dot Scarf" },
        { id: "11", motifCode: "M06", artikelCode: "M06001", artikelName: "Batik Traditional" },
        { id: "12", motifCode: "M06", artikelCode: "M06002", artikelName: "Batik Modern" },
      ])
    } catch (error) {
      console.error("Error fetching artikels:", error)
      setArtikels([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleArtikelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!artikelForm.selectedMotifId || !artikelForm.artikelCodeSuffix.trim() || !artikelForm.artikelName.trim()) {
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const selectedMotif = motifs.find((m) => m.id === artikelForm.selectedMotifId)
      if (!selectedMotif) return

      const fullArtikelCode = selectedMotif.motifCode + artikelForm.artikelCodeSuffix

      if (editingArtikel) {
        setArtikels((prev) =>
          prev.map((artikel) =>
            artikel.id === editingArtikel
              ? {
                ...artikel,
                motifCode: selectedMotif.motifCode,
                artikelCode: fullArtikelCode,
                artikelName: artikelForm.artikelName,
              }
              : artikel,
          ),
        )
        setEditingArtikel(null)
      } else {
        const newArtikel: Artikel = {
          id: Date.now().toString(),
          motifCode: selectedMotif.motifCode,
          artikelCode: fullArtikelCode,
          artikelName: artikelForm.artikelName,
        }
        setArtikels((prev) => [...prev, newArtikel])
      }

      setArtikelForm({
        selectedMotifId: "",
        artikelCodeSuffix: "",
        artikelName: "",
      })
    } catch (error) {
      console.error("Error saving artikel:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArtikelUpdate = (artikel: Artikel) => {
    const motif = motifs.find((m) => m.motifCode === artikel.motifCode)
    if (motif) {
      setArtikelForm({
        selectedMotifId: motif.id,
        artikelCodeSuffix: artikel.artikelCode.substring(3),
        artikelName: artikel.artikelName,
      })
      setEditingArtikel(artikel.id)
    }
  }

  const handleArtikelDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setArtikels((prev) => prev.filter((artikel) => artikel.id !== id))
      setDeleteArtikelId(null)
    } catch (error) {
      console.error("Error deleting artikel:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetArtikelForm = () => {
    setEditingArtikel(null)
    setArtikelForm({
      selectedMotifId: "",
      artikelCodeSuffix: "",
      artikelName: "",
    })
  }

  const isArtikelFormValid = () => {
    return artikelForm.selectedMotifId && artikelForm.artikelCodeSuffix.trim() && artikelForm.artikelName.trim()
  }

  useEffect(() => {
    fetchMotifs()
    fetchArtikels()
  }, [])

  const paginatedArtikels = artikels.slice(
    (artikelCurrentPage - 1) * itemsPerPage,
    artikelCurrentPage * itemsPerPage,
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Master Artikel</h2>

      <Card>
        <CardHeader>
          <CardTitle>Artikel List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Motif Code</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Artikel Code</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Artikel Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedArtikels.map((artikel) => (
                      <tr key={artikel.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{artikel.motifCode}</td>
                        <td className="py-3 px-4 text-gray-800">{artikel.artikelCode}</td>
                        <td className="py-3 px-4 text-gray-800">{artikel.artikelName}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleArtikelUpdate(artikel)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            >
                              Update
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeleteArtikelId(artikel.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing {(artikelCurrentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(artikelCurrentPage * itemsPerPage, artikels.length)} of {artikels.length} entries
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setArtikelCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={artikelCurrentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: Math.ceil(artikels.length / itemsPerPage) }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={page === artikelCurrentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setArtikelCurrentPage(page)}
                        className={page === artikelCurrentPage ? "bg-gray-800 text-white" : ""}
                      >
                        {page}
                      </Button>
                    ),
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setArtikelCurrentPage((prev) =>
                        Math.min(prev + 1, Math.ceil(artikels.length / itemsPerPage)),
                      )
                    }
                    disabled={artikelCurrentPage === Math.ceil(artikels.length / itemsPerPage)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{editingArtikel ? "Update Artikel" : "Add New Artikel"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleArtikelSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="motif-select">Master Motif</Label>
                <Select
                  value={artikelForm.selectedMotifId}
                  onValueChange={(value) =>
                    setArtikelForm((prev) => ({ ...prev, selectedMotifId: value }))
                  }
                  required
                >
                  <SelectTrigger id="motif-select" className="w-full">
                    <SelectValue placeholder="Select Motif" />
                  </SelectTrigger>
                  <SelectContent>
                    {motifs.map((motif) => (
                      <SelectItem key={motif.id} value={motif.id || ""}>
                        {motif.motifCode} - {motif.motifName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Artikel Code</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md min-w-[60px] justify-center">
                    {artikelForm.selectedMotifId
                      ? motifs.find((m) => m.id === artikelForm.selectedMotifId)?.motifCode || "---"
                      : "---"}
                  </span>
                  <input
                    type="text"
                    value={artikelForm.artikelCodeSuffix}
                    onChange={(e) => setArtikelForm((prev) => ({ ...prev, artikelCodeSuffix: e.target.value }))}
                    disabled={!artikelForm.selectedMotifId}
                    className={`flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${!artikelForm.selectedMotifId ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                      }`}
                    placeholder="001"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Artikel Name</label>
                <input
                  type="text"
                  value={artikelForm.artikelName}
                  onChange={(e) => setArtikelForm((prev) => ({ ...prev, artikelName: e.target.value }))}
                  disabled={!artikelForm.selectedMotifId}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${!artikelForm.selectedMotifId ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                    }`}
                  placeholder="Enter artikel name"
                  maxLength={200}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              {editingArtikel && (
                <Button type="button" variant="outline" onClick={resetArtikelForm} className="mr-2">
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={isLoading || !isArtikelFormValid()}
                className="bg-gray-800 text-white hover:bg-gray-700"
              >
                {isLoading ? "Saving..." : editingArtikel ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {deleteArtikelId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this artikel? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteArtikelId(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => handleArtikelDelete(deleteArtikelId)}
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
